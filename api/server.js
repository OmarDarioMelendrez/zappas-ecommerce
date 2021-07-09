const express = require("express");
const app = express();
const port = 3001;
const db = require("./db");
const passport = require("passport");
const helmet = require("helmet");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

// morgan dependence to log the request to the server
const morgan = require("morgan");
// import models of the database
const {
	User,
	Category,
	Order,
	Product,
	ProductModel,
	Review,
	Role,
	Tag,
	OrderDetails
} = require("./models");

const routes = require("./routes");
const { faSmile } = require("@fortawesome/free-solid-svg-icons");
// middlewares
app.use(helmet())
app.use(morgan("tiny"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//passport config
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
	console.log("antes de passport");
	next();
});

// passport config
passport.use(
	new LocalStrategy(
	  { usernameField: "email", passwordField: "password" },
	  async function (email, password, cb) {
		try {
		  const user = await User.findOne({
			where: {
			  email: email,
			},
		  });
		  if (!user) {
			console.log("usuario invalido");
			return cb(null, false);
		  }
		  if (!(await user.isValidPassword(password))) {
			console.log("password invalido");
			return cb(null, false);
		  }
		  return cb(null, user);
		} catch (err) {
		  return cb(err);
		}
	  }
	)
  );

// How we save the user
passport.serializeUser(function (user, done) {
	done(null, user.id);
  });
  // How we look for the user
  passport.deserializeUser(function (id, done) {
	User.findByPk(id).then((user) => done(null, user));
  });
  
app.use((req, res, next) => {
	console.log("antes de las rutas");
	next();
});
// routes
app.use("/api", routes);

db.sync({ force: false }).then(() => {
	console.log("db connected");
	app.listen(port, () => {
		console.log(`App listening at http://localhost:${port}`);
	});
});
