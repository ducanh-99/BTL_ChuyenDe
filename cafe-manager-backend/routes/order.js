const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const Table = require('../models/Table');
const Product = require('../models/Product');
const { number, func } = require('joi');
//Getting All (For Admin)
router.get('/order', async (req, res) => {
    try {
        let limit = Number(req.query.limit);
        let page = Number(req.query.page);
        const order = await Order.find()
            .sort({ updatedAt: -1 })
            .limit(limit)
            .skip(limit * page)
            // .populate('order.product')
            .populate({
                path: 'order.product',
                populate: {
                    path: 'type',
                },
            })
            .populate('user', 'name')
            .populate('table', 'name');
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Save one
router.post('/order', async (req, res) => {
    let totalPrice = 0;
    for (let i = 0; i < req.body.order.length; i++) {
        let product = await Product.findById(req.body.order[i].product);
        totalPrice += Number(product.price) * Number(req.body.order[i].amount);
        let newBook = { amount: req.body.order[i].amount, time: new Date() };
        console.log(newBook);
        if (!product.book) product.book = [];
        product.book.push(newBook);
        console.log(product.book);
    }
    const order = new Order({
        user: req.body.user,
        table: req.body.table,
        order: req.body.order,
        status: req.body.status,
        totalPrice,
    });

    let table;
    try {
        table = await Table.findById(req.body.table);
        if (table != null) {
            table.status = 'busy';
        }
        await table.save();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Save one email
router.post('/orderemail', async (req, res) => {
    let totalPrice = 0;
    for (let i = 0; i < req.body.order.length; i++) {
        let product = await Product.findById(req.body.order[i].product);
        totalPrice += Number(product.price) * Number(req.body.order[i].amount);
        let newBook = { amount: req.body.order[i].amount, time: new Date() };
        if (!product.book) product.book = [];
        product.book.push(newBook);
        // product.book.amount += req.body.order[i].amount;
        try {
            await product.save();
        } catch (error) {
            res.status(400).json({ message: err.message });
        }
    }
    let userId = await User.findOne({ email: req.body.email });
    let tableId = await Table.findOne({ user: userId });
    if (req.body.table) {
        tableId = req.body.table;
    }
    if (!tableId) {
        res.status(200).json({ message: 'Bạn đã mua hàng chưa đặt bàn!' });
    }
    console.log(userId);
    const order = new Order({
        user: userId._id,
        table: tableId,
        order: req.body.order,
        status: req.body.status,
        totalPrice,
    });

    if (tableId) {
        let table;
        try {
            table = await Table.findById(tableId);
            if (table != null) {
                table.status = 'busy';
            }
            await table.save();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
//Update one
// router.patch('/order/:id', getOrderById, async (req, res) => {
//     if (req.body.name != null) {
//         req.order.name = req.body.name;
//     }

//     if (req.body.description != null) {
//         req.order.description = req.body.description;
//     }

//     try {
//         const updateOrder = await req.order.save();
//         res.json(updateOrder);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });
//Caculate totalPrice one
// router.patch('/order/:id', getOrderById, async (req, res) => {
//     try {
//         let order = req.order.order;
//         let totalPrice = await caculateTotalPrice(order);
//         res.json({ 'totalPrice': totalPrice });
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });
//Update status one
router.patch('/order/:id/status/:status', getOrderById, async (req, res) => {
    if (req.order.status != null) {
        req.order.status = req.params.status;
    }
    try {
        const updateOrder = await req.order.save();
        res.json(updateOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Update status one
router.patch('/order/:id/add', getOrderById, async (req, res) => {
    let order = req.order;
    let orderList = req.order.order;
    orderList.push(req.body.order);

    try {
        const updateOrder = await req.order.save();
        res.json(updateOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Calculate one
router.get('/order/:id/calculate', getOrderById, async (req, res) => {
    try {
        let order = req.order.order;
        let totalPrice = await caculateTotalPrice(order);
        req.order.totalPrice = totalPrice;
        res.json(req.order);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
//Getting one
router.get('/order/:id', getOrderById, async (req, res) => {
    try {
        res.send(req.order);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
//Deleting one (For Admin)
router.delete('/order/:id', getOrderById, async (req, res) => {
    try {
        await req.order.remove();
        res.json({ message: `Deleted Order` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getOrderById(req, res, next) {
    let order;
    try {
        order = await Order.findById(req.params.id)
            .populate('order.product')
            .populate('user', 'username')
            .populate('table', 'name');
        if (order == null) {
            return res.status(404).json({ message: 'Can not find order' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    req.order = order;
    next();
}

async function caculateTotalPrice(order) {
    let totalPrice = 0;
    try {
        for (let i = 0; i < order.length; i++) {
            let product = order[i];
            totalPrice += product.product.price * product.amount;
        }
        return totalPrice;
    } catch (error) {
        return 0;
    }
}

module.exports = router;
