const { Schema, model } = require("mongoose");
const productSchema = require("./Product");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      }, 
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

categorySchema.virtual("productCount").get(function () {
  return this.products.length;
});

const Category = model("Category", categorySchema);
module.exports = Category;
