const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ ok: true }));

// Helpers for pagination
function getPaging(req) {
    const limit = Math.min(parseInt(req.query.limit || '10', 10), 100);
    const offset = parseInt(req.query.offset || '0', 10);
    return { take: limit, skip: offset, limit, offset };
}

// GET /houses?q=&min_price=&max_price=&bedrooms=&sort=price|createdAt&order=asc|desc&limit=&offset=
app.get('/houses', async (req, res) => {
    const { q, min_price, max_price, bedrooms, sort = 'createdAt', order = 'desc' } = req.query;
    const { take, skip, limit, offset } = getPaging(req);

    const where = {
        AND: [
            q ? { OR: [{ title: { contains: q, mode: 'insensitive' } }, { location: { contains: q, mode: 'insensitive' } }] } : {},
            min_price ? { price: { gte: Number(min_price) } } : {},
            max_price ? { price: { lte: Number(max_price) } } : {},
            bedrooms ? { bedrooms: Number(bedrooms) } : {}
        ]
    };

    const [items, total] = await Promise.all([
        prisma.house.findMany({
            where,
            include: { agent: true },
            orderBy: { [sort]: order.toLowerCase() === 'asc' ? 'asc' : 'desc' },
            take,
            skip
        }),
        prisma.house.count({ where })
    ]);

    res.set('X-Total-Count', String(total));
    res.json({
        meta: { total, limit, offset },
        data: items
    });
});

// GET /houses/:id
app.get('/houses/:id', async (req, res) => {
    const id = Number(req.params.id);
    const house = await prisma.house.findUnique({ where: { id }, include: { agent: true } });
    if (!house) return res.status(404).json({ error: 'Not found' });
    res.json(house);
});

// POST /houses
app.post('/houses', async (req, res) => {
    const { title, price, bedrooms, bathrooms, location, imageUrl, notes, agentId } = req.body;
    try {
        const created = await prisma.house.create({
            data: { title, price, bedrooms, bathrooms, location, imageUrl, notes, agentId }
        });
        res.status(201).json(created);
    } catch (e) {
        res.status(400).json({ error: 'Invalid body or agentId', details: String(e) });
    }
});

// PATCH /houses/:id
app.patch('/houses/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const updated = await prisma.house.update({ where: { id }, data: req.body });
        res.json(updated);
    } catch {
        res.status(404).json({ error: 'Not found' });
    }
});

// DELETE /houses/:id
app.delete('/houses/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        await prisma.house.delete({ where: { id } });
        res.status(204).end();
    } catch {
        res.status(404).json({ error: 'Not found' });
    }
});

// GET /agents?limit=&offset=
app.get('/agents', async (req, res) => {
    const { take, skip, limit, offset } = getPaging(req);
    const [items, total] = await Promise.all([
        prisma.agent.findMany({
            take,
            skip,
            orderBy: { id: 'asc' },
            include: { listings: true }
        }),
        prisma.agent.count()
    ]);
    res.set('X-Total-Count', String(total));
    res.json({ meta: { total, limit, offset }, data: items });
});

// GET /agents/:id
app.get('/agents/:id', async (req, res) => {
    const id = Number(req.params.id);
    const agent = await prisma.agent.findUnique({ where: { id }, include: { listings: true } });
    if (!agent) return res.status(404).json({ error: 'Not found' });
    res.json(agent);
});

// POST /agents
app.post('/agents', async (req, res) => {
    const { name, email, phone } = req.body;
    try {
        const created = await prisma.agent.create({ data: { name, email, phone } });
        res.status(201).json(created);
    } catch (e) {
        res.status(400).json({ error: 'Invalid body or duplicate email', details: String(e) });
    }
});

// PATCH /agents/:id
app.patch('/agents/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const updated = await prisma.agent.update({ where: { id }, data: req.body });
        res.json(updated);
    } catch {
        res.status(404).json({ error: 'Not found' });
    }
});

// DELETE /agents/:id
app.delete('/agents/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        await prisma.agent.delete({ where: { id } });
        res.status(204).end();
    } catch {
        res.status(404).json({ error: 'Not found' });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
