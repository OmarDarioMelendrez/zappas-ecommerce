const {Role} = require('../models');
// create new role
const createRole = async (req,res,next) => {
    try {
        const newRole = await Role.create({role: req.body.role})
        res.send({msg: "role created", role: newRole})
    } catch (err) {
        next(err)
    }
}

// get all roles
const getAllRoles = async (req,res,next) => {
    try {
        const allRoles = await Role.findAll()
        res.send({msg: "All roles", roles: allRoles })
    } catch (err) {
        next(err)
    }
}



module.exports = {
    createRole,
    getAllRoles
}