const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Type = require("../models/Type");

//Getting All
router.get("/product", async (req, res) => {
  try {
    let typeId = String(req.query.typeId);
    let limit = Number(req.query.limit);
    let page = Number(req.query.page);
    console.log(typeId);
    // const product = await Product.find({ type: typeId })
    //   .sort({ createdAt: -1 })
    //   .populate("type", "name");
    let product = [];
    if(typeId === "undefined") {
         product = await Product.find()
      .sort({ createdAt: -1 })
      .populate("type", "name").limit(limit).skip(limit * page);;
    } else {
         product = await Product.find({ type: typeId })
      .sort({ createdAt: -1 })
      .populate("type", "name").limit(limit).skip(limit * page);;
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Find by string
router.get("/product/find/name/:string", async (req, res) => {
  try {
    const order = await Order.find({
      $or: [
        { name: req.params.string },
        { description: req.params.string },
        { type: req.params.string },
      ],
    }).sort({ createdAt: -1 });
    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Save one
router.post("/product", async (req, res) => {
  const product = new Product({
    productID: req.body.productID,
    name: req.body.name,
    description: req.body.description,
    status: true,
    price: req.body.price,
    type: req.body.type,
    photo: req.body.photo,
  });
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Update one
router.patch("/product/:id", getProductById, async (req, res) => {
  if (req.body.name != null) {
    req.product.name = req.body.name;
  }
  if (req.body.productID != null) {
    req.product.productID = req.body.productID;
  }

  if (req.body.description != null) {
    req.product.description = req.body.description;
  }
  if (req.body.price != null) {
    req.product.price = req.body.price;
  }

  if (req.body.type != null) {
    req.product.type = req.body.type;
  }
  if (req.body.photo != null) {
    req.product.photo = req.body.photo;
  }
  if (req.body.status != null) {
    req.product.status = req.body.status;
  }
  try {
    const updateProduct = await req.product.save();
    res.json(updateProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// //Update in-active one
// router.patch('/product/active/:id', getProductById, async (req, res) => {

//     // if (req.body.status != null) {
//     //     if (req.body.status == true) {
//     //         req.product.status = false;
//     //     } else {
//     //         req.product.status = true;
//     //     }
//     // }
//     let id = req.body._id;
//     try {
//         const updateProduct = await req.product.updateOne(
//             { _id: id },
//             {
//                 $set: {
//                     status: true
//                 }
//             });
//         res.json(updateProduct);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });
//Update in-active one
router.patch("/product/deactive/:id", getProductById, async (req, res) => {
  if (req.product.status != null) {
    // if (req.body.status == true) {
    req.product.status = !req.product.status;
    // } else {
    //     req.product.status = true;
    // }
  }
  try {
    const updateProduct = await req.product.save();
    res.json(updateProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Book product
// router.patch('/product/book/:id', getProductById, async (req, res) => {

//     if (req.product.status != null) {
//         // if (req.body.status == true) {
//             req.product.status = !req.product.status;
//         // } else {
//         //     req.product.status = true;
//         // }
//     }
//     try {
//         const updateProduct = await req.product.save();
//         res.json(updateProduct);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

//Getting one
router.get("/product/:id", getProductById, async (req, res) => {
  console.log(req.product)
  res.send(req.product);
});

//Deleting one
router.delete("/product/:id", getProductById, async (req, res) => {
  try {
    await req.product.remove();
    res.json({ message: `Deleted Product` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getProductById(req, res, next) {
  let product;
  try {
    product = await (await Product.findById(req.params.id)).populate('type','name');
    if (product == null) {
      return res.status(404).json({ message: "Can not find product" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  try {
    type = await (await Type.findById(product.type)).populate('type','name');
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  product.type = type;
  req.product = product;

  next();
}

module.exports = router;
