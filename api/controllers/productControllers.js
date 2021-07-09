const { Op } = require("sequelize");
const { Product, Category, ProductModel, User } = require("../models");

// get products by search into a name description and category
const getProductsBySearch = async (req, res, next) => {
	console.log("category ", req.query.category);
	console.log("search ", req.query.search);
	try {
		if (req.query.category != "") {
      // search filtering for a category
      console.log("entro a filtro de categorias");
      Product.findAll({
				include: [
					{ model: Category, as: "category" },
					{ model: ProductModel },
				],
			}).then((products) => {
        // filtered the list of al products by categories.
        const productsCategory = products.filter(product => product.category.name === req.query.category)
				res.send({ msg: "todos los productos", products: productsCategory });
			});
		} else if (req.query.all === "true") {
      // we use search with all for search all the products
			Product.findAll({
				include: [
					{ model: Category, as: "category" },
					{ model: ProductModel },
				],
			}).then((products) => {
				res.send({ msg: "todos los productos", products: products });
			});
		} else if (req.query.search != "")  {
      // search filtering for a string
      Product.findAll({
				include: [
					{ model: Category, as: "category" },
					{ model: ProductModel },
				],
			}).then((products) => {
				const productsFiltered = products.filter(product => product.name.toLowerCase().includes(req.query.search.toLowerCase()) || product.brand.toLowerCase().includes(req.query.search.toLowerCase()) || product.description.toLowerCase().includes(req.query.search.toLowerCase()))
				res.send({ msg: "todos los productos", products: productsFiltered });
			});
    } else {
      // this case is for when the search and category query it's empty
      res.send({ msg: "No se encontraron coincidencias", products: [] });
    }
	} catch (err) {
		next(err);
	}
};


// get one product by id
const getOneProduct = (req, res, next) => {
	Product.findOne({
		where: { id: req.params.productId },
		include: [{ model: Category, as: "category" }, { model: ProductModel }],
	}).then((product) => {
		res.send(product);
	});
};


// update product
const postProduct = async (req, res, next) => {

	const { categoryName } = req.body;
	let category = await Category.findOne({ where: { name: categoryName } })


	let currentProduct = await Product.create(req.body)

  await ProductModel.destroy({
      where: { 'productId': currentProduct.id },
      includes: [{ model: Product, as: 'product' }],
  })

	for(model of req.body.productModels) {
		let newModel = await ProductModel.create(model)
		newModel.setProduct(currentProduct);
		currentProduct.addProductModel(newModel);
		newModel.save()
	}

	currentProduct.setCategory(category)
	currentProduct.save()

	res.send({ msg: "product created", product: currentProduct });

};

// // create product with a specific category
// const postProduct = (req, res, next) => {
// 	//receive category id in the req.body
// 	//receive product data in the req.body
// 	const { categoryName } = req.body;
// 	Product.create(req.body).then((product) => {
// 		Category.findOne({ where: { name: categoryName } })
// 			.then((category) => {
// 				console.log(Object.keys(Category.prototype));
// 				category.addProduct(product);
// 				product.setCategory(category);
// 				category.save();
// 				product.save();
// 				res.send({ msg: "product created", product: product });
// 			})
// 			.catch((err) => console.log(err));
// 	});
// };

// create productModel with a specific product
const postProductModel = (req, res, next) => {
	//receive productId in req.params.productId
	//receive productModel data in the req.body
	const productId = req.params.productId;
	ProductModel.create(req.body).then((productModel) => {
		Product.findByPk(productId)
			.then((product) => {
				productModel.setProduct(product);
				product.addProductModel(productModel);
				productModel.save();
				product.save();
				res.send({
					msg: "productModel created",
					productModel: productModel,
				});
			})
			.catch((err) => console.log(err));
	});
};

// update product
const updateProduct = async (req, res, next) => {

	const { categoryName } = req.body;
	let category = await Category.findOne({ where: { name: categoryName } })

	await Product.update(req.body, {
    where: { id: req.params.id },
  })

  await ProductModel.destroy({
      where: { 'productId': req.params.id },
      includes: [{ model: Product, as: 'product' }],
  })

	let currentProduct = await Product.findByPk(req.params.id)

	currentProduct.setCategory(category)

	for(model of req.body.productModels) {
		let newModel = await ProductModel.create(model)
		newModel.setProduct(currentProduct);
		currentProduct.addProductModel(newModel);
		newModel.save()
		currentProduct.save()
	}

	res.send({msg:'ok'})

};

// delete product
const deleteProduct = (req, res, next) => {
	Product.destroy({ where: { id: req.params.id } }).then(() => {
		res.sendStatus(204);
	});
};

module.exports = {
	getOneProduct,
	postProduct,
	updateProduct,
	deleteProduct,
	postProductModel,
	getProductsBySearch,
};
