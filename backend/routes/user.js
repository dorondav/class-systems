const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const router = express.Router();

router.post('/register', (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                name: req.body.name,
                password: hash,
                permission: req.body.permission,
                email: req.body.email,
                phone: req.body.phone,
            });
            user
                .save()
                .then(result => {
                    res.status(201).json({
                        message: "User created!",
                        user: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        message: "Invalid authentication credentials!"
                    });
                });
        })
        .catch(error => {
            console.log(error);

        });
});

router.post('/login', (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.loginEmail })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            fetchedUser = user;

            return bcrypt.compare(req.body.loginPassword, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }

            const token = jwt.sign(
                { email: fetchedUser.email, password: fetchedUser._id },
                process.env.JWT_KEY,
                { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                // userId: fetchedUser._id,
                // userRole: fetchedUser.permission,
                // username: fetchedUser.name,
                // userEmail: fetchedUser.email,
                // userPhone: fetchedUser.phone,
                fetchedUser
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Invalid authentication credentials!"
            });
        });
});

module.exports = router;
