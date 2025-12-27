#!/usr/bin/env python3
"""
Update all Prisma schemas to use custom output paths.
Each service will generate its Prisma Client to a unique directory.
"""

from pathlib import Path
import re

def update_schema_output(schema_file):
    """Update a Prisma schema to use custom output path."""
    service_dir = schema_file.parent.parent
    service_name = service_dir.name
    
    content = schema_file.read_text()
    
    # Check if already has custom output
    if 'output =' in content:
        print(f"⚠️  {service_name}: already has custom output")
        return False
    
    # Update generator block to include custom output
    new_generator = f'''generator client {{
  provider = "prisma-client-js"
  output   = "../../node_modules/.prisma/client-{service_name}"
}}'''
    
    content = re.sub(
        r'generator client \{[^}]+\}',
        new_generator,
        content,
        flags=re.DOTALL
    )
    
    schema_file.write_text(content)
    print(f"✅ {service_name}: updated schema with custom output")
    return True

def update_prisma_service_import(service_dir):
    """Update PrismaService to import from custom path."""
    service_name = service_dir.name
    prisma_service_file = service_dir / 'src' / 'prisma' / 'prisma.service.ts'
    
    if not prisma_service_file.exists():
        return False
    
    content = prisma_service_file.read_text()
    
    # Update import to use custom path
    new_import = f"import {{ PrismaClient }} from '.prisma/client-{service_name}';"
    content = re.sub(
        r"import \{ PrismaClient \} from '@prisma/client';",
        new_import,
        content
    )
    
    prisma_service_file.write_text(content)
    print(f"✅ {service_name}: updated PrismaService import")
    return True

def main():
    backend_dir = Path(__file__).parent
    apps_dir = backend_dir / 'apps'
    
    print("Updating Prisma schemas with custom output paths...")
    print("=" * 60)
    
    updated_count = 0
    
    for service_dir in sorted(apps_dir.iterdir()):
        if not service_dir.is_dir() or service_dir.name.startswith('.'):
            continue
        
        schema_file = service_dir / 'prisma' / 'schema.prisma'
        if not schema_file.exists():
            continue
        
        if update_schema_output(schema_file):
            update_prisma_service_import(service_dir)
            updated_count += 1
    
    print("=" * 60)
    print(f"Updated {updated_count} services with custom Prisma Client paths")

if __name__ == '__main__':
    main()
