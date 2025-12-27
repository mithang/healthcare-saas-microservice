import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Create sample API keys
    const apiKey1 = await prisma.apiKey.upsert({
        where: { key: 'test-key-12345' },
        update: {},
        create: {
            key: 'test-key-12345',
            name: 'Test API Key',
            userId: 'admin-001',
            isActive: true,
        },
    });

    const apiKey2 = await prisma.apiKey.upsert({
        where: { key: 'demo-key-67890' },
        update: {},
        create: {
            key: 'demo-key-67890',
            name: 'Demo API Key',
            userId: 'user-001',
            isActive: true,
        },
    });

    console.log('✅ API Key service seeded:', { apiKey1, apiKey2 });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
