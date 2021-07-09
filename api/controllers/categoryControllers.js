const { Category } = require("../models");

const getAllCategorys = (req, res, next) => {
  Category.findAll().then((categorys) => {
    res.send(categorys);
  });
};

const getOneCategory = (req, res, next) => {
  Category.findByPk(req.params.id).then((category) => {
    res.send(category);
  });
};

const postCategory = (req, res, next) => {
  Category.create(req.body).then((category) => {
    res.send({ msg: "category created", category: category });
  });
};

const updateCategory = (req, res, next) => {
  Category.update(req.body, {
    where: { id: req.params.id },
  }).then(() => {
    Category.findAll().then((categorys) => {
      res.send(categorys);
    });
  });
};

const deleteCategory = (req, res, next) => {
  Category.destroy({ where: { id: req.params.id } }).then(() => {
    res.sendStatus(204);
  });
};

module.exports = {
  getAllCategorys,
  getOneCategory,
  updateCategory,
  deleteCategory,
  postCategory,
};
