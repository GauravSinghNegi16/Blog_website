import jwt from 'jsonwebtoken';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

// ------------------------
// ADMIN LOGIN
// ------------------------
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ------------------------
// GET ALL BLOGS (ADMIN)
// ------------------------
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ------------------------
// GET ALL COMMENTS (ADMIN)
// ------------------------
export const getAllCommentsAdmin = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });

    res.json({ success: true, comments });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ------------------------
// GET DASHBOARD DATA
// ------------------------
export const getDashboard = async (req, res) => {
  try {
    const recentBlogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .limit(5);

    const blogs = await Blog.countDocuments();
    const comments = await Comment.countDocuments();
    const draft = await Blog.countDocuments({ isPublished: false });

    const DashboardData = {
      blogs,
      comments,
      draft,
      recentBlogs,
    };

    res.json({ success: true, DashboardData });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// ------------------------
// DELETE COMMENT BY ID
// ------------------------
export const deleteCommentByID = async (req, res) => {
  try {
    const { id } = req.body; // ❗ FIXED (was res.body before)
    await Comment.findByIdAndDelete(id);
    res.json({ success: true, message: "Comment deleted successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ------------------------
// APPROVE COMMENT BY ID
// ------------------------
export const approveCommentByID = async (req, res) => {
  try {
    const { id } = req.body; // ❗ FIXED (was res.body before)
    await Comment.findByIdAndUpdate(id, { isApproved: true });
    res.json({ success: true, message: "Comment approved successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
