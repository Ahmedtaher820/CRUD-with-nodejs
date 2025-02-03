const express = require('express')
const router = express.Router()
const Users = require("../models/User");
const userControllers = require('../controllers/userController')
router.post("/createUser",userControllers.createUser);

router.get("/", userControllers.getUsers);

router.get("/:id",userControllers.getUserById);

router.delete("/:id",userControllers.deleteUser);

router.put("/:id", userControllers.updateUser);

//query
router.post("/search",userControllers.getUserBySearch);

module.exports = router