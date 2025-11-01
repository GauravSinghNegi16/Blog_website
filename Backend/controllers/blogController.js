import fs from "fs";
import blog from "../models/Blog.js";
import Comment from "../models/Comment.js";
import imagekit from "../Config/ImageKit.js";
import main from "../Config/gemini.js";

// Add Blog
export const addBlog = async (req, res) => {
  try {
    const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
    const imageFile = req.file;

    if (!title || !description || !category || !imageFile) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    // Read image buffer
    const fileBuffer = fs.readFileSync(imageFile.path);

    // Upload image to ImageKit
    const uploadResponse = await imagekit.upload({
      file: fileBuffer,
      fileName: imageFile.originalname,
      folder: "/blogs",
    });

    // Generate optimized image URL
    const optimizedImageUrl = imagekit.url({
      path: uploadResponse.filePath,
      transformation: [
        { quality: "auto" },
        { format: "webp" },
        { width: "1280" },
      ],
    });

    // Save blog to database
    await blog.create({
      title,
      subTitle,
      description,
      category,
      isPublished,
      image: optimizedImageUrl,
    });

    res.json({ success: true, message: "Blog added successfully" });
  } catch (error) {
    console.error("Error adding blog:", error);
    res.json({ success: false, message: error.message });
  }
};

// Get all published blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blog.find({ isPublished: true });
    res.json({ success: true, blogs });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get blog by ID
export const getBlogByID = async (req, res) => {
  try {
    const { blogId } = req.params;
    const Blog = await blog.findById(blogId);
    if (!Blog) {
      return res.json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, Blog });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Delete blog and its comments
export const deleteBlogByID = async (req, res) => {
  try {
    const { id } = req.body;
    await blog.findByIdAndDelete(id);
    await Comment.deleteMany({ blog: id });
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Toggle blog publish status
export const togglePublish = async (req, res) => {
  try {
    const { id } = req.body;
    const Blog = await blog.findById(id);
    if (!Blog) return res.json({ success: false, message: "Blog not found" });

    Blog.isPublished = !Blog.isPublished;
    await Blog.save();

    res.json({ success: true, message: "Blog updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Add comment
export const addComments = async (req, res) => {
  try {
    const { blog: blogId, name, content } = req.body;
    if (!blogId || !name || !content)
      return res.json({ success: false, message: "Missing comment fields" });

    await Comment.create({ blog: blogId, name, content });
    res.json({ success: true, message: 'Comment added for review' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get approved comments for a blog
export const getBlogComments = async (req, res) => {
  try {
    const { blogId } = req.body;
    const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({
      createdAt: -1,
    });
    res.json({ success: true, comments });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const generateContent = async (req, res) => {
  try {
    const { prompt } = req.body;
    const content = await main(prompt + 'Generate a blog content for this topic in simple text format')

    if (!prompt) {
      return res.json({ success: false, message: "Prompt is required" });
    }
    res.json({ success: true, content });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};