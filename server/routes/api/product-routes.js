const router = require("express").Router();

const {
    getAllProducts,
    getOneProduct,
    addProduct,
    removeProduct,
    updateProduct,
} = require("../../controllers/product-controller");

router.route("/").get(getAllProducts).post(addProduct);
router
    .route("/:id")
    .get(getOneProduct)
    .put(updateProduct)
    .delete(removeProduct);

module.exports = router;
