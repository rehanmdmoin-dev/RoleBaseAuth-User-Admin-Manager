const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },

    productPrice: {
      type: Number,
      required: true,
    },

    desc: {
      type: String,
      required: true,
    },

    imagePublicId: {
      type: String,
      default: "",
    },

    size: [
      {
        type: String,
      },
    ],

    color: [
      {
        type: String,
      },
    ],

    brand: {
      type: String,
      required: true,
    },

    isdeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },

);

module.exports = mongoose.model(
  "Product",
  ProductSchema
);