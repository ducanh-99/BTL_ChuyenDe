const mongoose = require("mongoose");
const User = require("./User");

const materialSchema = new mongoose.Schema({
  materialID: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    required: true,
    min: 0,
    max: 30,
  },
  name_type: {
    type: String,
    required: true,
    max: 255,
    min: 0,
  },
  description: {
    type: String,
    required: false,
    max: 255,
    min: 0,
  },
  amountInput: {
    type: Number,
    required: false,
    min: 0,
    default: 0,
  },
  amountOutput: {
    type: Number,
    required: false,
    min: 0,
    default: 0,
  },
  import: [
    {
      time: {
        type: Date,
        required: true,
        default: Date.now,
      },
      amount: {
        type: Number,
        default: 0,
      },
    },
  ],
  export: [
    {
      time: {
        type: Date,
        required: true,
        default: Date.now,
      },
      amount: {
        type: Number,
        default: 0,
      },
    },
  ],
  amount: {
    type: Number,
    default: 0,
  },
  unit: {
    type: String,
    required: true,
    max: 128,
    min: 0,
  },
  provider: {
    type: String,
    required: false,
    max: 128,
    min: 0,
  },
  priceperunit: {
    type: Number,
    require: true,
  },
});

module.exports = mongoose.model("Material", materialSchema);
