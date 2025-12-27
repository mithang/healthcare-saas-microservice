#!/usr/bin/env python3
"""
Create service-specific PrismaService for each backend microservice.
Each service gets its own prisma.service.ts that extends the Prisma Client
generated from that service's schema.
"""

from pathlib import Path

PRISMA_SERVICE_TEMPLATE = """import {{ Injectable, OnModuleInit, OnModuleDestroy }} from '@nestjs/common';
import {{ PrismaClient }} from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{{
  async onModuleInit() {{
    await this.$connect();
  }}

  async onModuleDestroy() {{
    await this.$disconnect();
  }}
}}
"""

def create_prisma_service(service_dir):
    """Create a local PrismaService for a service."""
    prisma_dir = service_dir / 'src' / 'prisma'
    schema_file = service_dir / 'prisma' / 'schema.prisma'
    
    # Skip if no schema
    if not schema_file.exists():
        return False
    
    # Create prisma directory
    prisma_dir.mkdir(exist_ok=True)
    
    # Create prisma.service.ts
    service_file = prisma_dir / 'prisma.service.ts'
    service_file.write_text(PRISMA_SERVICE_TEMPLATE)
    
    # Create index.ts for easy import
    index_file = prisma_dir / 'index.ts'
    index_file.write_text("export * from './prisma.service';\n")
    
    return True

def update_module_file(service_dir):
    """Update module file to provide local PrismaService."""
    service_name = service_dir.name.replace('-service', '')
    module_file = service_dir / 'src' / f'{service_name}.module.ts'
    
    if not module_file.exists():
        return False
    
    content = module_file.read_text()
    
    # Check if already has local PrismaService
    if './prisma' in content:
        return True
    
    # Add import
    if "import { PrismaService } from '@app/common';" in content:
        content = content.replace(
            "import { PrismaService } from '@app/common';",
            "import { PrismaService } from './prisma';"
        )
    elif "PrismaModule" in content:
        # Remove PrismaModule import and add PrismaService
        import_lines = []
        for line in content.split('\n'):
            if 'PrismaModule' in line and '@app/common' in line:
                import_lines.append("import { PrismaService } from './prisma';")
            else:
                import_lines.append(line)
        content = '\n'.join(import_lines)
        
        # Replace PrismaModule with PrismaService in providers
        content = content.replace('PrismaModule', 'PrismaService')
    
    module_file.write_text(content)
    return True

def main():
    backend_dir = Path(__file__).parent
    apps_dir = backend_dir / 'apps'
    
    print("Creating service-specific PrismaService for each microservice...")
    print("=" * 60)
    
    success_count = 0
    skip_count = 0
    
    services = sorted([d for d in apps_dir.iterdir() if d.is_dir() and not d.name.startswith('.')])
    
    for service_dir in services:
        service_name = service_dir.name
        
        if create_prisma_service(service_dir):
            update_module_file(service_dir)
            print(f"✅ {service_name}: created local PrismaService")
            success_count += 1
        else:
            print(f"⚠️  {service_name}: no Prisma schema, skipped")
            skip_count += 1
    
    print("=" * 60)
    print(f"Complete!")
    print(f"  Created: {success_count}")
    print(f"  Skipped: {skip_count}")
    print(f"  Total: {len(services)}")

if __name__ == '__main__':
    main()
