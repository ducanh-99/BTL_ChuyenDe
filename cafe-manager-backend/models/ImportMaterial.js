const mongoose = require("mongoose");

const importMaterialSchema = new mongoose.Schema({
  // amount: {
  //     type: Number,
  //     required: true,
  //     max: 128,
  //     min: 0
  // },
  // createdDate: {
  //     type: Date,
  //     default: Date.now,
  // },
  // modifiedDate: {
  //     type: Date,
  //     default: Date.now
  // },
  // createdUID: {
  //     type: User
  // }
  name: {
    type: String,
  },
  totalPrice: {
    type: Number,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  import: [
    {
      material: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
      },
      amount: Number,
    },
  ],
});
importMaterialSchema.set("timestamps", true);
module.exports = mongoose.model("ImportMaterial", importMaterialSchema);
