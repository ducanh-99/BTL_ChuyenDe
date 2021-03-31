const express = require("express");
const router = express.Router();
const ExportMaterial = require("../models/ExportMaterial");
const Material = require("../models/Material");
const { number, func } = require("joi");

//get all export material
router.get("/exportMaterial", async (req, res) => {
  try {
    const exportMaterial = await ExportMaterial.find().sort({ createdAt: -1 }).populate('export.material');
    res.json(exportMaterial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Save one
router.post("/exportMaterial", async (req, res) => {
  try {
    let totalPrice = 0;
    for (let i = 0; i < req.body.export.length; i++) {
      let material = await Material.findById(req.body.export[i].material);
      totalPrice +=
        Number(material.priceperunit) * Number(req.body.export[i].amount);
        if(material.amount >= req.body.export[i].amount){
          material.amount -= req.body.export[i].amount;
        } else {
          res.status(400).json({material: material.name });
        }
     
      let newExport = { amount: req.body.export[i].amount, time: new Date() };
      if (!material.export) material.export = [];
      material.export.push(newExport);
      try {
        await material.save();
      } catch (error) {
        res.status(400).json({ message: err.message });
      }
    }
    const exportMaterial = new ExportMaterial({
      name: req.body.name,
      export: req.body.export,
      totalPrice: totalPrice,
    });

    const newExportMaterial = await exportMaterial.save();

    const material = res.status(201).json(newExportMaterial);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Getting one
router.get("/exportMaterial/:id", getExportMaterialById, async (req, res) => {
  res.send(req.exportMaterial);
});

//Deleting one
router.delete(
  "/exportMaterial/:id",
  getExportMaterialById,
  async (req, res) => {
    try {
      await req.exportMaterial.remove();
      res.json({ message: `Deleted ExportMaterial` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

async function getExportMaterialById(req, res, next) {
  let exportMaterial;
  try {
    exportMaterial = await ExportMaterial.findById(req.params.id);
    if (exportMaterial == null) {
      return res.status(404).json({ message: "Can not find exportMaterial" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  req.exportMaterial = exportMaterial;
  next();
}

module.exports = router;
