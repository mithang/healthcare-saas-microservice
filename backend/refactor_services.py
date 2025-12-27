#!/usr/bin/env python3
"""
Batch refactor backend services to use PrismaService injection instead of extending PrismaClient.
This fixes TypeScript compilation errors where services try to access Prisma models directly.
"""

import os
import re
from pathlib import Path

def find_service_file(service_dir):
    """Find the main service file in a service directory."""
    src_dir = service_dir / 'src'
    if not src_dir.exists():
        return None
    
    # Try different naming patterns
    service_name = service_dir.name.replace('-service', '')
    patterns = [
        f'{service_name}.service.ts',
        f'{service_dir.name}.service.ts',
    ]
    
    for pattern in patterns:
        service_file = src_dir / pattern
        if service_file.exists():
            return service_file
    
    return None

def refactor_service_file(service_path):
    """Refactor a single service file to use PrismaService injection."""
    service_file = find_service_file(service_path)
    
    if not service_file:
        print(f"⚠️  Skipping {service_path.name}: service file not found")
        return False
    
    content = service_file.read_text()
    
    # Skip if already using PrismaService
    if 'constructor(private readonly prisma: PrismaService)' in content:
        print(f"✓  {service_path.name}: already using PrismaService")
        return True
    
    # Skip if not extending PrismaClient
    if 'extends PrismaClient' not in content:
        print(f"✓  {service_path.name}: not extending PrismaClient")
        return True
    
    print(f"🔧 Refactoring {service_path.name}...")
    
    # Replace import
    content = re.sub(
        r"import \{ PrismaClient \} from '@prisma/client';",
        "import { PrismaService } from '@app/common';",
        content
    )
    
    # Replace class declaration
    content = re.sub(
        r'export class (\w+Service) extends PrismaClient implements OnModuleInit',
        r'export class \1 implements OnModuleInit',
        content
    )
    
    # Add constructor after class declaration
    content = re.sub(
        r'(export class \w+Service implements OnModuleInit \{)\s*async onModuleInit',
        r'\1\n    constructor(private readonly prisma: PrismaService) {}\n\n    async onModuleInit',
        content
    )
    
    # Remove $connect() call
    content = re.sub(
        r'\s*await this\.\$connect\(\);\s*\n',
        '',
        content
    )
    
    # Replace all `this.modelName` with `this.prisma.modelName`
    # This regex finds patterns like: this.user, this.badge, etc.
    # But excludes: this.prisma, this.methodName (methods start with lowercase verb)
    lines = content.split('\n')
    new_lines = []
    
    for line in lines:
        # Skip if line already has this.prisma
        if 'this.prisma.' in line:
            new_lines.append(line)
            continue
        
        # Replace this.modelName with this.prisma.modelName
        # Match: this. followed by lowercase letter (model names start lowercase)
        # Exclude: method calls (have parentheses after)
        modified_line = re.sub(
            r'\bthis\.([a-z][A-Za-z]*)\b(?=\.)',
            r'this.prisma.\1',
            line
        )
        new_lines.append(modified_line)
    
    content = '\n'.join(new_lines)
    
    service_file.write_text(content)
    print(f"✅ {service_path.name}: refactored successfully")
    return True

def main():
    backend_dir = Path(__file__).parent
    apps_dir = backend_dir / 'apps'
    
    if not apps_dir.exists():
        print("❌ apps directory not found!")
        return
    
    print("Starting batch refactoring of backend services...")
    print("=" * 60)
    
    success_count = 0
    skip_count = 0
    
    # Get all service directories
    services = sorted([d for d in apps_dir.iterdir() if d.is_dir() and not d.name.startswith('.')])
    
    for service_dir in services:
        if refactor_service_file(service_dir):
            success_count += 1
        else:
            skip_count += 1
    
    print("=" * 60)
    print(f"Refactoring complete!")
    print(f"  Processed: {success_count}")
    print(f"  Skipped: {skip_count}")
    print(f"  Total: {len(services)}")

if __name__ == '__main__':
    main()
