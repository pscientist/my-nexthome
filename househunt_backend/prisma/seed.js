const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const alice = await prisma.agent.upsert({
        where: { email: 'alice.agent@example.com' },
        update: {},
        create: { name: 'Alice Ng', email: 'alice.agent@example.com', phone: '+64 21 111 2222' }
    });

    const ben = await prisma.agent.upsert({
        where: { email: 'ben.agent@example.com' },
        update: {},
        create: { name: 'Ben Rangi', email: 'ben.agent@example.com', phone: '+64 21 333 4444' }
    });

    await prisma.house.createMany({
        data: [
            {
                title: 'Sunny Mt Eden Villa',
                price: 1390000,
                bedrooms: 4,
                bathrooms: 2,
                location: 'Mount Eden, Auckland',
                imageUrl: 'https://picsum.photos/seed/villa1/800/500',
                agentId: alice.id
            },
            {
                title: 'Modern City Apartment',
                price: 780000,
                bedrooms: 2,
                bathrooms: 1,
                location: 'Auckland CBD',
                imageUrl: 'https://picsum.photos/seed/apartment1/800/500',
                agentId: ben.id
            }
        ]
    });
}

main()
    .then(() => {
        console.log('✅ Database seeded!');
        return prisma.$disconnect();
    })
    .catch((err) => {
        console.error(err);
        prisma.$disconnect();
    });
