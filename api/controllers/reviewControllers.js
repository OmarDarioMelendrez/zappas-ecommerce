const { Review, Product } = require("../models");

const getReviews = (req, res, next) => {
  Review.findAll({
    where: {
      productId: req.params.productId,
    },
  }).then((reviews) => {
    res.send(reviews);
  });
};

const createReview = async (req, res, next) => {

  let userId = req.user.dataValues.id;
  let product = await Product.findByPk(req.params.productId);
  let currentReview = await Review.findOne({ where: { userId } });

  if (currentReview) {
    currentReview.update({
      description: req.body.description,
      raiting: req.body.raiting,
      userId,
    });
  } else {
    currentReview = await Review.create({
      description: req.body.description,
      raiting: req.body.raiting,
      userId,
    });
  }

  product.addReview(currentReview);
  currentReview.setProduct(product);

  Product.average(req.params.productId).then((avg) => {
    product.raiting = avg;
    currentReview.save();
    product.save();
    res.send({ msg: "Product review created", review: currentReview });
  });

};

const deleteReview = (req, res, next) => {
  Review.destroy({
    where: {
      id: req.params.reviewId,
    },
  }).then(
    res.send({ msg: `The review with id ${req.params.reviewId} was deleted` })
  );
};

module.exports = {
  getReviews,
  createReview,
  deleteReview,
};
