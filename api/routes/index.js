const express = require('express')
const router = express.Router();

const productRouter = require('./product')
const userRouter = require('./user')
const cartRouter = require('./cart')
const roleRouter = require('./role')
const categoryRouter = require('./category')
const reviewRouter = require('./review')

router.use("/product", productRouter)
router.use("/user", userRouter)
router.use("/role", roleRouter)
router.use("/category", categoryRouter)
router.use("/cart", cartRouter)
router.use("/reviews", reviewRouter)

module.exports = router;