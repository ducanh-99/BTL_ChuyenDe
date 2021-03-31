const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const Table = require('../models/Table');
const Product = require('../models/Product');
const moment = require('moment');

//Getting All (For Admin)
router.get('/statistic', async (req, res) => {
    try {
        let begin = moment(Number.parseInt(req.query.begin));
        let end = moment(Number.parseInt(req.query.end));
        console.log(begin, end);
        const order = await Order.find({
            updatedAt: {
                $gte: begin.get('time'),
                $lte: end.get('time'),
            },
            status: 'paid',
        })
            .sort({ updatedAt: -1 })
            // .populate('order.product')
            .populate({
                path: 'order.product',
                populate: {
                    path: 'type',
                },
            })
            .populate('user', 'name')
            .populate('table', 'name');
        let resData = order.map((item, index) => {
            return { totalPrice: item.totalPrice, time: item.updatedAt };
        });
        res.json(resData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/statistic/product', async (req, res) => {
    try {
        const product = await Product.find();
        let resData = product.map((item, index) => {
            let book = item.book.map((item, index) => item.amount);
            return {
                name: item.name,
                total: book.reduce((total, num) => total + num, 0),
            };
        });
        res.json(resData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
