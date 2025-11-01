import express from 'express';

import { adminLogin, approveCommentByID, deleteCommentByID, getAllBlogsAdmin, getAllCommentsAdmin, getDashboard } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';

const adminRouter = express.Router();

adminRouter.post("/login",adminLogin);
adminRouter.post("/delete-comments",auth,deleteCommentByID);
adminRouter.post("/approve-comments",auth, approveCommentByID);
adminRouter.get("/comments",auth,getAllCommentsAdmin);
adminRouter.get("/blogs",auth,getAllBlogsAdmin);
adminRouter.get("/dashboard",auth,getDashboard);


export default adminRouter;