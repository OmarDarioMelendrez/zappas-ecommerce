const {User} = require('../models');

// auth of the user is loged in
const auth = (req,res,next) => {
    let user = req.user
    if (user){
        next()
    } else {
        res.status(401).send({msg: "unathorized"})
    }
}

// auth is Super Admin
const authSuperAdmin = async (req,res,next) => {
    let user = req.user
    if (user){
        const superAdmin = await User.findByPk(req.user.id)
        if(superAdmin.roleId === 1){
            console.log("auth super admin succed");
            next()
        } else  {
            res.status(401).send({msg: "unathorized for this action"})       
        }
    } else {
        res.status(401).send({msg: "unathorized"})
    }
}

// auth is Admin
const authAdmin = async (req,res,next) => {
    let user = req.user
    if (user){
        const superAdmin = await User.findByPk(req.user.id)
        if(superAdmin.roleId === 2 || superAdmin.roleId === 1){
            console.log("auth admin succed");
            next()
        } else  {
            res.status(401).send({msg: "unathorized for this action"})       
        }
    } else {
        res.status(401).send({msg: "unathorized"})
    }
}

module.exports = {
    auth,
    authSuperAdmin,
    authAdmin
}