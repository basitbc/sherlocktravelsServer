// controllers/blogController.js

const Blog = require('../models/blog');

// Get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get blog by ID
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog == null) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(blog);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Create a new blog
const createBlog = async (req, res) => {
  const blog = new Blog({
    userId: req.body.userId,
    dateOfPublish: req.body.dateOfPublish,
    category: req.body.category,
    duration: req.body.duration,
    title: req.body.title,
    subtitle: req.body.subtitle,
    imagesId: req.body.imagesId,
  });

  try {
    const newBlog = await blog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a blog
const updateBlog = async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedBlog == null) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    res.json(updatedBlog);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};
