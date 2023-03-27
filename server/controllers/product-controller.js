const { Product } = require("../models");

module.exports = {
    async addProduct(req, res) {
        try {
            const newProduct = await Product.create(req.body);

            res.status(200).json(newProduct);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateProduct(req, res) {
        try {
            const updatedProduct = await Product.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!updatedProduct) {
                res.status(404).json({ message: "Product not found" });
            } else {
                res.status(200).json(updatedProduct);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getAllProducts(req, res) {
        try {
            const products = await Product.find();

            res.status(200).json(products);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getOneProduct(req, res) {
        try {
            const product = await Product.findOne({ _id: req.params.id });

            if (!product) {
                res.status(404).json({ message: "Product not found" });
            } else {
                res.status(200).json(product);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeProduct(req, res) {
        try {
            const deletedProduct = await Product.findOneAndDelete({
                _id: req.params.id,
            });

            if (!deletedProduct) {
                res.status(404).json({ message: "Product not found" });
            } else {
                res.status(200).json(deletedProduct);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
