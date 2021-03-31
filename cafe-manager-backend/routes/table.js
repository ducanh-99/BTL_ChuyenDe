const express = require('express');
const router = express.Router();
const Table = require('../models/Table');
//Getting All
router.get('/table', async (req, res) => {
    try {
        let limit = Number(req.query.limit);
        let page = Number(req.query.page);
        const table = await Table.find()
            .sort({ createAt: -1 })
            .limit(limit)
            .skip(limit * page);
        res.json(table);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
//Save one
router.post('/table', async (req, res) => {
    const table = new Table({
        name: req.body.name,
        description: req.body.description,
    });
    try {
        const newTable = await table.save();
        res.status(201).json(newTable);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
//Update one
router.patch('/table/:id', getTableById, async (req, res) => {
    if (req.body.name != null) {
        req.table.name = req.body.name;
    }

    if (req.body.description != null) {
        req.table.description = req.body.description;
    }

    try {
        const updateTable = await req.table.save();
        res.json(updateTable);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// //Update in-active one
// router.patch('/table/active/:id', getTableById, async (req, res) => {

//     // if (req.body.status != null) {
//     //     if (req.body.status == true) {
//     //         req.table.status = false;
//     //     } else {
//     //         req.table.status = true;
//     //     }
//     // }
//     let id = req.body._id;
//     try {
//         const updateTable = await req.table.updateOne(
//             { _id: id },
//             {
//                 $set: {
//                     status: true
//                 }
//             });
//         res.json(updateTable);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });
//Update status one
router.patch('/table/status/:status/:id', getTableById, async (req, res) => {
    if (req.table.status != null) {
        req.table.status = req.params.status;
    }
    try {
        const updateTable = await req.table.save();
        res.json(updateTable);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Book table
router.patch('/table/book/:id', getTableById, async (req, res) => {
    if (req.table.status != null) {
        switch (req.table.status) {
            case 'booked':
                if (req.table.user == req.body.user) {
                    return res
                        .status(200)
                        .json({ message: 'You booked this table' });
                } else {
                    let lengthBook = req.table.book.length;
                    let time = req.table.book[lengthBook - 1].time;
                    return res
                        .status(200)
                        .json({ message: 'Table was booked', time: time });
                }
            case 'busy':
                if (req.table.user == req.body.user) {
                    return res
                        .status(200)
                        .json({ message: 'You booked this table' });
                } else
                    return res.status(200).json({ message: 'Table is busy' });
            case 'deactive':
                return res
                    .status(200)
                    .json({ message: 'This table is not active' });
        }
    }
    if (req.body.user != null) {
        req.table.user = req.body.user;
        let book = {
            user: req.body.user,
            time: req.body.time,
        };
        req.table.book.push(book);
        req.table.status = 'booked';
    }
    try {
        const updateTable = await req.table.save();
        res.json(updateTable);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Getting one
router.get('/table/:id', getTableById, async (req, res) => {
    res.send(req.table);
});

//Deleting one
router.delete('/table/:id', getTableById, async (req, res) => {
    try {
        await req.table.remove();
        res.json({ message: `Deleted Table` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getTableById(req, res, next) {
    let table;
    try {
        table = await Table.findById(req.params.id);
        if (table == null) {
            return res.status(404).json({ message: 'Can not find table' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    req.table = table;
    next();
}

module.exports = router;
