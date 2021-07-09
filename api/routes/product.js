const express = require("express");
const router = express.Router();

const {
	getOneProduct,
	postProduct,
	updateProduct,
	deleteProduct,
	postProductModel,
	getProductsBySearch,
} = require("../controllers/productControllers");

const { auth, authAdmin } = require("../controllers/authControllers");

// returns all the products
// http://localhost:3001/api/product?all=false&category=&search=
router.get("/", getProductsBySearch);
// select a product by id
router.get("/:productId", getOneProduct);
// create a new product
router.post("/",auth, authAdmin, postProduct);
// create a model of a specific product.
router.post("/:productId/addModel",auth, authAdmin, postProductModel);
// update a product
router.put("/:id",auth, authAdmin, updateProduct);
// delete a product
router.delete("/:id",auth, authAdmin, deleteProduct);

module.exports = router;
