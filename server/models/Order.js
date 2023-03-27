const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    product_id: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    }],
    purchase_date: {
        type: Date,
        default: Date.now,
    },
});

const Order = model("Order", orderSchema);
module.exports = Order;
