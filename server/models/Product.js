const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  // _id: {
  //   type: Schema.Types.ObjectId,
  //   required: true,
  //   uniquie: true,
  // }, 
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [{ type: String }],
  stock: {
    type: Number,
  },
  stripe_id: {
    type: String,
    required: true,
    unique: true,
  },
  catname: {
    type: String,
    required: true,
  }

});

const Product = model("Product", productSchema);
module.exports = Product;
