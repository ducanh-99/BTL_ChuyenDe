const express = require("express");
const router = express.Router();
const ImportMaterial = require("../models/ImportMaterial");
const Material = require("../models/Material");
const { number, func } = require("joi");

//get all import material
router.get("/importMaterial", async (req, res) => {
  try {
    const importMaterial = await ImportMaterial.find().populate('import.material').sort({ createdAt: -1 });
  //   .populate({
  //     path: 'import.material',
  //     populate: {
  //         path: 'name',
  //     },
  // });
    res.json(importMaterial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Save one
router.post("/importMaterial", async (req, res) => {
  try {
    let totalPrice = 0;
    for (let i = 0; i < req.body.import.length; i++) {
      let material = await Material.findById(req.body.import[i].material);
      totalPrice +=
        Number(material.priceperunit) * Number(req.body.import[i].amount);
      material.amount += req.body.import[i].amount;
      let newImport = { amount: req.body.import[i].amount, time: new Date() };
      if (!material.import) material.import = [];
      material.import.push(newImport);
      try {
        await material.save();
      } catch (error) {
        res.status(400).json({ message: err.message });
      }
    }
    const importMaterial = new ImportMaterial({
      name: req.body.name,
      import: req.body.import,
      totalPrice: totalPrice,
    });

    const newImportMaterial = await importMaterial.save();

    const material = res.status(201).json(newImportMaterial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Update one
router.patch("/importMaterial/:id", getImportMaterialById, async (req, res) => {
  if (req.body.name != null) {
    req.importMaterial.name = req.body.name;
  }

  try {
    const updateImportMaterial = await req.importMaterial.save();
    res.json(updateImportMaterial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Getting one
router.get("/importMaterial/:id", getImportMaterialById, async (req, res) => {
  res.send(req.importMaterial);
});

//Deleting one
router.delete(
  "/importMaterial/:id",
  getImportMaterialById,
  async (req, res) => {
    try {
      await req.importMaterial.remove();
      res.json({ message: `Deleted ImportMaterial` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

async function getImportMaterialById(req, res, next) {
  let importMaterial;
  try {
    importMaterial = await ImportMaterial.findById(req.params.id);
    if (importMaterial == null) {
      return res.status(404).json({ message: "Can not find importMaterial" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  req.importMaterial = importMaterial;
  next();
}

module.exports = router;
