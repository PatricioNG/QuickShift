const express = require('express');
const router = express.Router();
const prisma = require('./PrismaClient');

router.get('/user', async (req, res) => {
    try {
        res.status(200).send(await getUserOrCreateNew(req.user['http://quickshift']));
    } catch (e) {
        res.status(500).json({ error: e });
    }
})

const getUserOrCreateNew = async (email) => {

    const user = await prisma.users.findOne({ where: { email: email }, select: { id: true } })
    const business = await prisma.businesses.findOne({ where: { business_email: email }, select: { id: true } })

    if (user !== null) {
        return {
            user: user,
            type: 'user'
        }
    } else if (business !== null) {
        return {
            user: business,
            type: 'business'
        }
    } else if (business === null && user === null) {
        newUser = await prisma.users.create({
            data: {
                first_name: 'unset',
                last_name: 'unset',
                email: email,
                profile_image_link: 'https://i.imgur.com/PQ8lfO5.png'
            },
            select: { id: true }
        })
        return {
            user: newUser,
            type: 'user'
        }
    } else {
        throw "System error";
    }
}

module.exports = router;