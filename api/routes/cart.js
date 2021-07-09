const express = require("express");
const router = express.Router();

const {
	createOrder,
	addProduct,
	removeProduct,
	getOrderById,
	decrementProduct,
	incrementProduct,
	orderToPending,
	getAllOrders,
	orderToConfirmed,
	orderToRejected,
	getAllOrdersOfUser
} = require("../controllers/cartControllers");

const { auth, authAdmin } = require("../controllers/authControllers");

// create a new order
router.post("/:userId", auth, createOrder);
// adding a product in the specific order
router.post("/:orderId/addProduct", auth, addProduct);
// change the order to pending and send email
router.patch("/:orderId/pending", auth, orderToPending);
// change the order to confirmed
router.patch("/:orderId/confirmed", orderToConfirmed);
// change the order to rejected 
router.patch("/:orderId/rejected", orderToRejected);
//get all orders of a single user
router.get("/orders", getAllOrdersOfUser)
// get all orders
router.get("/", auth, authAdmin, getAllOrders);
// get actual cart
router.get("/:orderId", auth, getOrderById);
// remove a product of a 'open' order
router.delete("/:orderDetailId", auth, removeProduct);
// reduce product quantity of a product -1
router.patch("/:orderDetailId/decrement", auth, decrementProduct);
// add product quantity of a product +1
router.patch("/:orderDetailId/increment", auth, incrementProduct);

module.exports = router;
