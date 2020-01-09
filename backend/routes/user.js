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
                fetchedUser
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Invalid authentication credentials!"
            });
        });
});


router.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: "User not found!" });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching User failed!"
            });
        });
});
module.exports = router;

router.put('/:id', (req, res, next) => {
    console.table(req.params.id);

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                _id: req.params.id,
                name: req.body.name,
                password: hash,
                permission: req.body.permission,
                email: req.body.email,
                phone: req.body.phone,
            });
            User.updateOne({ _id: req.params.id }, user)
                .then(result => {
                    res.status(200).json({
                        message: 'User update successful!',
                        userData: user
                    });
                })

        })
        .catch(error => {
            res.status(500).json({
                message: "Update user failed!"
            });
        });
});