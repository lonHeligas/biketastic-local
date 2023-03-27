const { Category } = require("../models");

module.exports = {

    async addCategory(req, res) {
        try {
            const newCategory = await Category.create(req.body);

            res.status(200).json(newCategory);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateCategory(req, res) {
        try {
            const updatedCategory = await Category.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            );

            if (!updatedCategory) {
                res.status(404).json({ message: "Category not found" });
            } else {
                res.status(200).json(updatedCategory);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getAllCategories(req, res) {
        try {
            const categories = await Category.find().populate({
                path: "products",
            });

            res.status(200).json(categories);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getOneCategory(req, res) {
        try {
            const category = await Category.findOne({
                _id: req.params.id,
            }).populate({ path: "products" });

            if (!category) {
                res.status(404).json({ message: "Category not found" });
            } else {
                res.status(200).json(category);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeCategory(req, res) {
        try {
            const deletedCategory = await Category.findOneAndDelete({
                _id: req.params.id,
            });

            if (!deletedCategory) {
                res.status(404).json({ message: "Category not found" });
            } else {
                res.status(200).json(deletedCategory);
            }
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
};
