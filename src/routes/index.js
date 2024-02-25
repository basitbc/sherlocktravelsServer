const express = require("express");
const router = express.Router();
let blogs = require("./blog");


router.use("/api/blogs", blogs);


module.exports = router;
