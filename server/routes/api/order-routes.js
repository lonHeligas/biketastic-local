const router = require("express").Router();

const {
    addOrder,
    getAllOrders,
    getOneOrder,
    removeOrder,
    updateOrder,
} = require("../../controllers/order-controller");

router.route("/").get(getAllOrders).post(addOrder);
router.route("/:id").get(getOneOrder).put(updateOrder).delete(removeOrder);

module.exports = router;
