const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    log: ['info', 'warn']
});

module.exports = prisma