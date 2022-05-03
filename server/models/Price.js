const mongoose = require("mongoose");

const { Schema } = mongoose;

const priceSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0.99
  },
  additional: {
    type: Boolean,
    default: false
  },
});

const Price = mongoose.model("Price", priceSchema);

module.exports = Price;
