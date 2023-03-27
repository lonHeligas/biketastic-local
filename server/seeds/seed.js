const connection = require("../config/connection");
const mongoose = require("mongoose");
const { Category, Product, User, Order } = require("../models");
const productData = require("../seeds/productData.json");
const userData = require("../seeds/userData.json");
const categoryData = require("../seeds/categoryData.json");
connection.on("error", (err) => err);
connection.once("open", async () => {
  console.log("connected");
  // console.log([productData]);
  // console.log([userData]);
  // console.log([categoryData]);

  await Product.deleteMany({});
  await Category.deleteMany({});
  await User.deleteMany({});
  await Order.deleteMany({});

  const products = await Product.insertMany(productData);
  // const categories = await Category.insertMany(categoryData);
  const users = await User.insertMany(userData);
  
  // console.log(products);

    // ^ this code below looks for each product via it's stripe_id and checks their cateogory (catname). it then continues to match the product with the category and figure out which stripe_ids belong to the category. However, the real sorting is already in the product-controller @ (lines 33 onwards) const categories = await Category.find().populate({.......

  const prods = products.map((product) => {
    // console.log(product.stripe_id);
    const foundCat = productData.find(
      (prod) => prod.stripe_id == product.stripe_id
    );

    return {
      _id: product._id,
      catname: foundCat.catname,
    };
  });
  // console.log(prods);
  categoryDataNew = categoryData.map((category) => {
    category.products = prods.filter((producto) => {
      if ((producto.catname == category.name)) {
        { $push: { producto: [category.products]}}
        return category;
      }
    })
    // console.log(category.products)
    return category;
  });
   console.log(categoryDataNew);
   

  await Category.insertMany(categoryData);
  // *console.log("category data is: ", categoryData);

  process.exit(0);
});
