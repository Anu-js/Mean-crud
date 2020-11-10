const express = require("express");
const router = express.Router();

const UserController = require("../controllers/users");
const checkAuth = require("../middleware/check-auth");

//register
router.post("/register", UserController.registerUser);

//authenticate

router.post("/login", UserController.authenticateUser);

///get all users

router.get("/users", checkAuth, UserController.getAllusers);

router.get("/:id", checkAuth,UserController.getUserById);

// update user details

router.put("/update/:id", checkAuth, UserController.updateUser);

////delete users

router.delete("/:id",checkAuth, UserController.deleteUser);

module.exports = router;
