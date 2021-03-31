const express = require('express');

const router = express.Router();
const Material = require('../models/Material');
//Getting All
router.get('/material', async (req, res) => {
    try {
        const material = await Material.find();
        res.json(material);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/materialInput', async (req, res) => {
    try {
        const material = await Material.find({ amountInput: { $ne: 0 } });
        res.json(material);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/materialOutput', async (req, res) => {
    try {
        const material = await Material.find({ amountOutput: { $ne: 0 } });
        res.json(material);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

//Save one
// router.post('/importMaterial', async (req, res) => {
//     const material = new Material(
//         {
//             name: req.body.name,
//             name_type: req.body.name_type,
//             description: req.body.description,
//             amountInput: req.body.amountInput,
//             unit: req.body.unit,
//             priceperunit: req.body.priceperunit
//         }
//     );
//     try {
//         const newMaterial = await material.save();
//         res.status(201).json(newMaterial);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// router.post('/exportMaterial', async (req, res) => {
//     const material = new Material(
//         {
//             name: req.body.name,
//             name_type: req.body.name_type,
//             description: req.body.description,
//             amountOutput: req.body.amountOutput,
//             unit: req.body.unit,
//             priceperunit: req.body.priceperunit
//         }
//     );
//     try {
//         const newMaterial = await material.save();
//         res.status(201).json(newMaterial);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

//update one
router.patch('/updateImportMaterial/:id', getMaterialById, async (req, res) => {
    if (req.body.name != null) {
        req.material.name = req.body.name;
    }

    if (req.body.description != null) {
        req.material.description = req.body.description;
    }
    if (req.body.amountInput != null) {
        req.material.amountInput = req.body.amountInput;
    }
    if (req.body.unit != null) {
        req.material.unit = req.body.unit;
    }
    if (req.body.name_type != null) {
        req.material.name_type = req.body.name_type;
    }
    if (req.body.priceperunit != null) {
        req.material.priceperunit = req.body.priceperunit;
    }
    if (req.body.amountOutput != null) {
        req.material.amountOutput = req.body.amountOutput;
    }

    try {
        const updateMaterial = await req.material.save();
        res.json(updateMaterial);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

//Deleting one
router.delete('/material/:id', getMaterialById, async (req, res) => {
    try {
        await req.material.remove();
        res.json({ message: `Deleted Material` });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getMaterialById(req, res, next) {
    let material;
    try {
        material = await Material.findById(req.params.id);
        if (material == null) {
            return res.status(404).json({ message: 'Can not find material' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
    req.material = material;
    next();
}

module.exports = router;

