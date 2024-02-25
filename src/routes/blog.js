// routes/blogRoutes.js

const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');

router.get('/getAll', blogController.getAllBlogs);
router.get('/getById/:id', blogController.getBlogById);
router.post('/create/', blogController.createBlog);
router.put('/update/:id', blogController.updateBlog);
router.delete('/delete/:id', blogController.deleteBlog);

module.exports = router;
