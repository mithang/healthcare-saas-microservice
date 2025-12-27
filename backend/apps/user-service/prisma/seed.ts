import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    // Create permissions
    const viewUsersPermission = await prisma.permission.upsert({
        where: { name: 'view_users' },
        update: {},
        create: {
            name: 'view_users',
            description: 'Can view users',
        },
    });

    const manageUsersPermission = await prisma.permission.upsert({
        where: { name: 'manage_users' },
        update: {},
        create: {
            name: 'manage_users',
            description: 'Can create, update, and delete users',
        },
    });

    // Create admin role
    const adminRole = await prisma.role.upsert({
        where: { name: 'admin' },
        update: {},
        create: {
            name: 'admin',
            description: 'Administrator role with full access',
            permissions: {
                connect: [
                    { id: viewUsersPermission.id },
                    { id: manageUsersPermission.id },
                ],
            },
        },
    });

    // Create user role
    const userRole = await prisma.role.upsert({
        where: { name: 'user' },
        update: {},
        create: {
            name: 'user',
            description: 'Regular user role',
            permissions: {
                connect: [{ id: viewUsersPermission.id }],
            },
        },
    });

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const adminUser = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            userId: 'admin-001',
            email: 'admin@example.com',
            password: hashedPassword,
            name: 'Admin User',
            roles: {
                connect: [{ id: adminRole.id }],
            },
        },
    });

    // Create test user
    const testHashedPassword = await bcrypt.hash('test123', 10);
    const testUser = await prisma.user.upsert({
        where: { email: 'test@example.com' },
        update: {},
        create: {
            userId: 'user-001',
            email: 'test@example.com',
            password: testHashedPassword,
            name: 'Test User',
            roles: {
                connect: [{ id: userRole.id }],
            },
        },
    });

    console.log('✅ User service seeded:', { adminUser, testUser, adminRole, userRole });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
