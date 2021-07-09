const { Product, Order, User, OrderDetails , ProductModel} = require('../models');
const nodemailer = require("nodemailer");

const createOrder = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (userId == null) res.send()
    const haveOldOrder = await Order.findOne({where: {state: 'open', userId: userId}, include: {model: OrderDetails, include: {model: ProductModel, include: {model: Product}}}})
    // console.log(haveOldOrder);
    if (haveOldOrder === null) {
      Order.create({
        state: 'open',
      })
      .then(orderCreated => {
        User.findOne({
          where: { id: userId }
        })
        .then(user => {
          user.addOrder(orderCreated)
          orderCreated.setUser(user)
          // console.log(Object.keys(Order.prototype));
          // console.log(Object.keys(User.prototype));
          user.save()
          orderCreated.save()
          res.send({
            msg: 'Order created',
            order: orderCreated
          })
        })
      })
    } else  {
      res.send({
        msg: 'Order recovering',
        order: haveOldOrder
      })
    }
  
  } catch (err) {
    next(err)
  }
}

// get a order by id
const getOrderById = async (req,res,next) => {
  try {
    // we receive the order id by params
    const order = await Order.findByPk(req.params.orderId, {include: {model: OrderDetails, include: {model: ProductModel, include: {model: Product}}}})
    let price = 0;
    for(item of order.order_details){
      price += item.price
    }
    order.amount = price
    order.save()
    res.send({msg: "orden finded", order: order})    
  } catch (err) {
    next(err)
  }
}

// get all orders 
const getAllOrders = async(req,res,next) => {
  try {
    const orders = await Order.findAll({include: {model: User}, order: [['id', 'ASC']]})
    res.send({msg: "All orders", orders})
  } catch (err) {
    next(err)
  }
}

// get all orders of a single user
const getAllOrdersOfUser = async(req,res,next) => {
  try {
    const userId = req.user.id;
    const orders = await Order.findAll({where: {userId: userId}  ,include: {model: User}, order: [['id', 'DESC']]})
    res.send({msg: `All orders of the user ${userId}`, orders})
  } catch (err) {
    next(err)
  }
}

// into the body we receice the product id and the quantity.
const addProduct = (req, res, next) => {
  Order.findOne({
    where: { id: req.params.orderId }
  })
  .then(oneOrder => {
    ProductModel.findOne({
      where: { id: req.body.productModelId  }
    })
    .then(productModel => {
      let priceOrderDetails = productModel.price * req.body.quantity
      OrderDetails.findOrCreate({where :{ 
        orderId: req.params.orderId,
        productModelId: req.body.productModelId
      }, defaults: {
        price : priceOrderDetails,
        quantity : req.body.quantity
      }}).then(orderDetail => {

        if (orderDetail[1] === false){
          orderDetail[0].price = priceOrderDetails;
          orderDetail[0].quantity = req.body.quantity;
        }
        // console.log(Object.keys(OrderDetails.prototype));
        // console.log(Object.keys(Order.prototype));
        // console.log(Object.keys(Product.prototype));
        oneOrder.amount = oneOrder.amount + priceOrderDetails
        oneOrder.addOrder_details(orderDetail[0]);
        orderDetail[0].setOrder(oneOrder);
        orderDetail[0].setProductModel(productModel);
        productModel.addOrder_details(orderDetail[0])
        oneOrder.save();
        orderDetail[0].save();
        productModel.save();
        // orderDetail.save()
        res.send({
          msg: 'Add successfully',
          orderDet: orderDetail
        })
      })
    })
  })
}

const removeProduct = (req, res, next) => {
  OrderDetails.destroy({where: {
    id: req.params.orderDetailId
  }}).then(() => {
    res.send({msg: "Product deleted of the cart"})
  }).catch((err) => {
    console.log(err);
  })
}

// decrement the quantity of a product in the cart 
// receive orderId and productModelId
const decrementProduct = async (req,res,next) => {
  try {
    const orderDetailId = req.params.orderDetailId;
    const productModelId = req.body.productModelId
    const productModel = await ProductModel.findByPk(productModelId)
    const orderDetailMod = await OrderDetails.findByPk(orderDetailId)
    if(orderDetailMod.quantity <= 1 ){
      await OrderDetails.destroy({where: {id:orderDetailId }})
      res.send({msg: "order-detail deleted"})
    } else  {
      orderDetailMod.quantity = orderDetailMod.quantity - 1;
      orderDetailMod.price = productModel.price * orderDetailMod.quantity;
      orderDetailMod.save()
      res.send({msg: "quantity decremented"})
    }    
  } catch (err) {
    next(err)
  }
}

// increment the quantity of a product in the cart 
// receive orderId and productModelId
const incrementProduct = async (req,res,next) => {
  try {
    const orderDetailId = req.params.orderDetailId;
    const productModelId = req.body.productModelId
    const productModel = await ProductModel.findByPk(productModelId)
    const orderDetailMod = await OrderDetails.findByPk(orderDetailId)
      orderDetailMod.quantity = orderDetailMod.quantity + 1;
      orderDetailMod.price = productModel.price * orderDetailMod.quantity;
      console.log("order price ", orderDetailMod.price);
      orderDetailMod.save()
      res.send({msg: "quantity incremented"})  
  } catch (err) {
    next(err)
  }
}

// send mail logic 
const sendMailToUser = async (user, order) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "ayla.johnson55@ethereal.email",
      pass: "EXQ1UDB7RwQMYsPPEa",
    },
  });

  let total = 0;
  const htmlEmail = `
  <div style="width:100%;background:black;display:flex;justify-content:center;align-items:center;margin-bottom:30px">
      <h1 style="color:black;-webkit-text-stroke:2px white;font-size:50px;font-weight:bold;margin:40px">ZAPPAS</h1>
  </div>
  <span style='font-size:16px;font-weight:bold;margin:20px'>Hi, ${user.firstName}</span>
  <ul style="list-style-type:none; background:white; padding:20px">${
    order.order_details.map(({productModel, quantity, price}) => {
      let {brand, name} = productModel.product
      total += price
      return `<li style="border-bottom:1px solid grey; padding:3px" >
              ${brand} ${name} - ${productModel.description} x ${quantity}  <b style="float:right">${price}$</b>
              </li>`
    }).join('')
  }
  <li style='font-weight:bold;text-align:right;margin:40px'> TOTAL: ${total}$ </li>
  <li style='height:40px'></li>
  <li style='font-weight:bold;'> Shipping Address: ${order.address} </li>
  </ul>
  `

  const textEmail = `
  Hi, ${user.firstName}

${
    order.order_details.map(({productModel, quantity, price}) => {
      let {brand, name} = productModel.product
      total += price
      return `  *  ${brand} ${name} - ${productModel.description} x ${quantity}     ---   ${price}$`
    }).join('\n')
  }

  TOTAL: ${total}$
  Shipping Address: ${order.address}
  `

  return transporter.sendMail({
    from: '"Zappas" <admin@zappas.com>',
    to: user.email,
    subject: `ZAPPAS - Order #${order.id}`,
    text: textEmail,
    html: htmlEmail,
  });

};


// move order to pending
const orderToPending = async(req,res,next) => {
  // receive orderId for the params
  // receive adress for the body
  try {
    const order = await Order.findByPk(req.params.orderId, {include: {model: OrderDetails, include: {model: ProductModel, include: {model: Product}}}})
    await order.update({state: "pending", address: req.body.address})
    const user = await User.findByPk(req.user.id)
    await sendMailToUser(user, order)
    res.send({msg: "order updated to pending", order})
  } catch (err) {
    next(err)
  }
}

// move order to confirmed
const orderToConfirmed = async(req,res,next) => {
  // receive orderId for the params
  try {
    const orderId = req.params.orderId
    const order = await Order.findByPk(orderId)
    await order.update({state: "confirmed"})
    res.send({msg: "order updated to confirmed", order})
  } catch (err) {
    next(err)
  }
}

// move order to rejected
const orderToRejected = async(req,res,next) => {
  // receive orderId for the params
  try {
    const orderId = req.params.orderId
    const order = await Order.findByPk(orderId)
    await order.update({state: "rejected"})
    res.send({msg: "order updated to rejected", order})
  } catch (err) {
    next(err)
  }
}




module.exports = {
  createOrder,
  addProduct,
  removeProduct,
  getOrderById,
  decrementProduct,
  incrementProduct,
  orderToPending,
  getAllOrders,
  orderToRejected,
  orderToConfirmed,
  getAllOrdersOfUser
}