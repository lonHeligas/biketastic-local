const { Order } = require("../models");

module.exports = {
    async addOrder(req, res) {
        try {
            const newOrder = await Order.create(req.body);

            res.status(200).json(newOrder);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getAllOrders(req, res) {
        try {
            const orders = await Order.find();

            res.status(200).json(orders);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getOneOrder(req, res) {
        try {
            const order = await Order.findOne({ _id: req.params.id });

            if (!order) {
                res.status(404).json({ message: "Order not found" });
            } else {
                res.status(200).json(order);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateOrder(req, res) {
        try {
            const updatedOrder = await Order.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            );

            if (!updatedOrder) {
                res.status(404).json({ message: "Order not found" });
            } else {
                res.status(200).json(updatedOrder);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeOrder(req, res) {
        try {
            const deletedOrder = await Order.findOneAndDelete({
                _id: req.params.id,
            });

            if (!deletedOrder) {
                res.status(404).json({ message: "Order not found" });
            } else {
                res.status(200).json(deletedOrder);
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
