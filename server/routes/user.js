const express = require("express");
const router = express.Router();

const UserController = require("../controllers/users");


//register
router.post("/register", UserController.registerUser);

//authenticate

router.post("/login", UserController.authenticateUser);

///get all users

router.get("/users",  UserController.getAllusers);

router.get("/:id", UserController.getUserById);

// update user details

router.put("/updateUser/:id",  UserController.updateUser);

////delete users

router.delete("/:id", UserController.deleteUser);

module.exports = router;
