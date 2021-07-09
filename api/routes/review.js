const express = require("express");
const router = express.Router();

const {
	getReviews,
	createReview,
	deleteReview,
} = require("../controllers/reviewControllers");

const { auth, authAdmin } = require("../controllers/authControllers");

//traer todas las reviews
router.get("/:productId", getReviews);

//postear una review
router.post("/:productId", auth, createReview);

// //eliminar una review
router.delete("/:id", auth, authAdmin, deleteReview);

module.exports = router;
