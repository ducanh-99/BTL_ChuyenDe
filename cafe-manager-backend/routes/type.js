const express = require("express");
const router = express.Router();
const Type = require("../models/Type");
//Getting All
router.get("/type", async (req, res) => {
  try {
    let limit = Number(req.query.limit);
    let page = Number(req.query.page);
    const type = await Type.find()
      // .sort({ createdAt: -1 })
      .limit(limit)
      .skip(limit * page);
    res.json(type);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Save one
router.post("/type", async (req, res) => {
  const type = new Type({
    name: req.body.name,
    description: req.body.description,
    photo: req.body.photo,
    status: req.body.status,
  });
  try {
    const newType = await type.save();
    res.status(201).json(newType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Update one
router.patch("/type/:id", getTypeById, async (req, res) => {
  if (req.body.name != null) {
    req.type.name = req.body.name;
  }

  if (req.body.description != null) {
    req.type.description = req.body.description;
  }
  if (req.body.photo != null) {
    req.type.photo = req.body.photo;
  }
  if (req.type.status != null) {
    req.type.status = req.body.status;
  }
  try {
    const updateType = await req.type.save();
    res.json(updateType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Update status one
router.patch("/type/status/:id", getTypeById, async (req, res) => {
  if (req.type.status != null) {
    req.type.status = !req.type.status;
  }
  try {
    const updateType = await req.type.save();
    res.json(updateType);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Getting one
router.get("/type/:id", getTypeById, async (req, res) => {
  res.send(req.type);
});

//Deleting one
router.delete("/type/:id", getTypeById, async (req, res) => {
  try {
    await req.type.remove();
    res.json({ message: `Deleted Type` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTypeById(req, res, next) {
  let type;
  try {
    type = await Type.findById(req.params.id);
    if (type == null) {
      return res.status(404).json({ message: "Can not find type" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  req.type = type;
  next();
}

module.exports = router;
