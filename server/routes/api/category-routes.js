const router = require("express").Router();


const {
    addCategory,
    updateCategory,
    getAllCategories,
    getOneCategory,
    removeCategory,
} = require("../../controllers/category-controller");

router.route("/").get(getAllCategories).post(addCategory);
router
    .route("/:id")
    .get(getOneCategory)
    .put(updateCategory)
    .delete(removeCategory);


module.exports = router;
