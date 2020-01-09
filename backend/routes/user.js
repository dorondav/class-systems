const express = require("express");
const UserController = require("../controllers/users");

const router = express.Router();

router.post('/register', UserController.createUser);

router.post('/login', UserController.loginUser);


router.get('/:id', UserController.getUserById);

router.put('/:id', UserController.updateUser);

module.exports = router;