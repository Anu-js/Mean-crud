const User = require("../models/user");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const config = require("../config/config");



const objectid = require("mongoose").Types.ObjectId;

exports.registerUser = (req, res) => {
    let newUser = new User({
        name: req.body.user.name,
        email: req.body.user.email,

        password: req.body.user.password,
      
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            console.log(err);
            let msg = "";
            if (err.errors.email) msg += "Email already exists.";
            if (err.errors.mobilenumber) msg += "Mobilenumber already exists";
            res.json({
                success: false,
                msg,
            });
        } else {
            return res.json({
                success: true,
                msg: "Registered Succesfully",
                user,
            });
        }
    });
};

exports.authenticateUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({
                success: false,
                msg: "User Not Found Please Register!!",
            });
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                let payload = {
                    user: {
                        id: user._id,
                    },
                };
                const token = jwt.sign(payload, config.secret, {
                    expiresIn: "3h", // weak
                });

                res.json({
                    success: true,
                    token: token,
                    expiresIn: (3600 * 3),
                    msg: `Welcome Back!!`,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                       
                    },
                });
            } else {
                return res.json({
                    success: false,
                    msg: "Wrong Password",
                });
            }
        });
    });
};



exports.updateUser = (req, res) => {
    if (!objectid.isValid(req.params.id))
        return res.json({
            success: false,
            msg: `No records found with given id ${req.params.id} `,
        });
    const password = req.body.password;

    User.getUserById(req.params.id, (err, user) => {
        if (err) throw err;
        if (user) {
            User.comparePassword(password, user.password, (error, isMatch) => {
                if (error) throw error;
                if (isMatch) {
                    User.findByIdAndUpdate(
                        req.params.id, {
                            $set: {
                                name: req.body.name,
                                email: req.body.email,
                               
                            },
                        }, {
                            new: true,
                        },
                        (err, user) => {
                            if (err) throw err;
                            else {
                                return res.json({
                                    user: {
                                        id: user._id,
                                        name: user.name,
                                        email: user.email,
                                       
                                    },
                                    success: true,
                                    msg: `${user.name} Profile Details Updated!!`,
                                });
                            }
                        }
                    );
                }
            });
        }
    });
};




exports.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            return res.json({
                success: false,
                msg: " User Cant be deleted!!",
            });
        } else {
            return res.json({
                user,
                success: true,
                msg: ` Deleted!!`,
            });
        }
    });
};

exports.getAllusers = (req, res) => {
    User.find((err, users) => {
        if (!err) {
            res.send(users);
        }
    });
};

exports.getUserById = (req, res, next) => {
    if (!objectid.isValid(req.params.id))
        return res.json({
            success: false,
            msg: "No records found with given id",
        });

    User.findById(req.params.id, (err, user) => {
        if (!err) {
            res.send(user);
        } else {
            console.log("update error" + err);
        }
    });
};