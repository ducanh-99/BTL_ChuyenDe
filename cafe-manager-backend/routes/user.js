const express = require('express');
const router = express.Router();
const User = require('../models/User');
//Getting list of user
router.get('/user', async (req, res) => {
    try {
        let limit = Number(req.query.limit);
        let page = Number(req.query.page);
        const user = await User.find({
            role: { $in: ['admin', 'cashier', 'inventoryManager'] },
        })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(limit * page);
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Getting list of cashier
router.get('/cashier', async (req, res) => {
    try {
        // let limit = Number(req.query.limit);
        // let page = Number(req.query.page);
        const saleStaff = await User.find({ role: 'cashier' }).sort({
            createdAt: -1,
        });
        // .limit(limit)
        // .skip(limit * page);
        res.json(saleStaff);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Getting list of inventoryManager
router.get('/inventoryManager', async (req, res) => {
    try {
        let limit = Number(req.query.limit);
        let page = Number(req.query.page);
        const repoStaff = await User.find({ role: 'inventoryManager' })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(limit * page);
        res.json(repoStaff);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Getting list of admin
router.get('/admin', async (req, res) => {
    try {
        // let limit = Number(req.query.limit);
        // let page = Number(req.query.page);
        const admin = await User.find({ role: 'admin' }).sort({
            createdAt: -1,
        });
        // .limit(limit)
        // .skip(limit * page);
        res.json(admin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Update one
router.patch('/user/:id', getUserById, async (req, res) => {
    if (req.body.name != null) {
        req.user.name = req.body.name;
    }
    if (req.body.email != null) {
        req.user.email = req.body.email;
    }
    if (req.body.phone != null) {
        req.user.phone = req.body.phone;
    }
    if (req.body.address != null) {
        req.user.address = req.body.address;
    }
    if (req.body.role != null) {
        req.user.role = req.body.role;
    }
    if (req.body.photo != null) {
        req.user.photo = req.body.photo;
    }

    try {
        const updateUser = await req.user.save();
        res.json(updateUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Update in-active one
router.patch('/user/deactive/:id', getUserById, async (req, res) => {
    if (req.user.status != null) {
        req.user.status = !req.user.status;
    }
    try {
        const updateUser = await req.user.save();
        res.json(updateUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Getting one
router.get('/user/:id', getUserById, async (req, res) => {
    res.send(req.user);
});

//Deleting one
router.delete('/user/:id', getUserById, async (req, res) => {
    try {
        await req.user.remove();
        res.json({ message: `Deleted User` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getUserById(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Can not find user' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    req.user = user;
    next();
}

module.exports = router;
