const express = require('express');
const router = express.Router();
const { getUsers } = require("../../utils/users")

router.get("/", getUsers);

module.exports = router