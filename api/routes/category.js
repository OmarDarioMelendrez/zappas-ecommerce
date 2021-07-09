const express = require("express");
const router = express.Router();

const {
	getAllCategorys,
	getOneCategory,
	postCategory,
	updateCategory,
	deleteCategory,
} = require("../controllers/categoryControllers");

const { auth, authAdmin } = require("../controllers/authControllers");

router.get("/", getAllCategorys);
router.get("/:id",auth, authAdmin, getOneCategory);
router.post("/",auth, authAdmin, postCategory);
router.patch("/:id",auth, authAdmin, updateCategory);
router.delete("/:id",auth, authAdmin, deleteCategory);

module.exports = router;
