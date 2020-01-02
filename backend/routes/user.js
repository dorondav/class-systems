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

module.exports = router;
