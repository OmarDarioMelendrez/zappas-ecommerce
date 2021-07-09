const express = require("express");
const router = express.Router();
const passport = require("passport");
const {
	register,
    registerAdmin,
	getAllUsers,
	getUserById,
	login,
	logout,
	isLogged,
	updateUser,
	deleteUser,
    setAdmin
} = require("../controllers/userControllers");

const { auth, authSuperAdmin, authAdmin } = require("../controllers/authControllers");

// register user
router.post("/", register);

// register user ONLY FOR S-ADMINS
router.post("/admin",auth, authSuperAdmin, registerAdmin);

// set users to admin, ONLY FOR SUPER-ADMINS
router.post("/admin/promove",auth, authSuperAdmin, setAdmin)

// return user logged if exists
router.get("/logged", auth, isLogged);

// get user by id with his favorites
router.get("/:userId", auth, getUserById);

// get all users, ONLY FOR ADMINS
router.get("/", auth, authAdmin, getAllUsers);

// login
router.post("/login", passport.authenticate("local"), login);

// logout
router.post("/logout", auth, logout);

// update user
router.put("/:userId", auth, updateUser);

// delete user , ONLY FOR ADMINS
router.delete("/:userId", auth, authAdmin, deleteUser);


module.exports = router
