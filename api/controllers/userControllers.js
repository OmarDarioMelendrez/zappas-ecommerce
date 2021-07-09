const {User, Role} = require('../models');

// register user for admins
const registerAdmin = async (req,res,next) => {
    try {
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        })
        const userRole = await Role.findOne({where: {role: req.body.role}})
        newUser.setRole(userRole)
        userRole.addUser(newUser)
        newUser.save()
        userRole.save()
        newUser.password = null
        // console.log(Object.keys(User.prototype));
        res.status(201).send({msg: "user created", user: newUser})
    } catch (err) {
        console.log("entro al catch register");
        next(err)
    }
}

// register user
const register = async (req,res,next) => {
    try {
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        })
        const userRole = await Role.findOne({where: {role: 'user'}})
        newUser.setRole(userRole)
        userRole.addUser(newUser)
        newUser.save()
        userRole.save()
        newUser.password = null
        // console.log(Object.keys(User.prototype));
        res.status(201).send({msg: "user created", user: newUser})
    } catch (err) {
        console.log("entro al catch register");
        next(err)
    }
}

// delete User
const deleteUser = async (req,res,next) => {
    try {
        const destroyed = await User.destroy({where: {id: req.params.userId}})
        res.send({msg: "user deleted"})
    } catch (err) {
        next(err)
    }
}

// get all users
const getAllUsers = async (req,res,next) => {
    try {
        const users = await User.findAll({include: {model: Role}});
        users.map(user => user.password = null)
        res.send({msg: "all the users", users: users})
    } catch (err) {
        next(err)
    }
}

// get user by id with his favorites
const getUserById = async (req,res,next) => {
    try {
        const user = await User.findByPk(req.params.userId)/* req.user.id */
            user.password = null
            res.send({msg:"Single user", user})
    } catch (err) {
        next(err)
    }
}

// log in user
const login = (req,res,next) => {
    let user = req.user;
    user.password = null;
    res.send({msg: "user logged in", user: user})
}

// logout
const logout = (req,res,next) => {
    req.logOut();
    res.send({msg: "user logged out"})
}
// verify if user logged exists
const isLogged = (req,res,next) => {
    res.send({msg: "user logged", user: req.user})
}

// update user info
const updateUser = async (req,res,next) => {
    try {
        const userUpdated = await User.update(req.body, {where: {id: req.params.userId}, returning: true})
        const userResponse = userUpdated[1][0];
        userResponse.password = null
        res.send({msg: "user updated", user:userResponse })
    } catch (err) {
        next(err)
    }

}

// set user to admin
const setAdmin = async (req,res,next) => {
    // recieves the id of the user into the req.body
    try {
        console.log("REQ.BODY.USERID", req.body.userId)
        const userUpdated = await User.findByPk(req.body.userId)
        console.log(userUpdated)
        const adminRole = await Role.findOne({where: {role: "admin"}})
        userUpdated.setRole(adminRole)
        adminRole.addUser(userUpdated)
        userUpdated.save()
        adminRole.save()
        userUpdated.password = null
        res.send({msg: "user upgraded to Admin", user: userUpdated})  
    } catch (err) {
        next(err)
    }
}

module.exports = {
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
}