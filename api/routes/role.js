const express = require("express");
const router = express.Router();

const { createRole, getAllRoles } = require("../controllers/roleControllers");

const { auth, authAdmin } = require("../controllers/authControllers");

// create a role
router.post("/", createRole);

// get all roles
router.get("/", auth, authAdmin, getAllRoles);

module.exports = router;
