import express from 'express';
import { addBlog, addComments, deleteBlogByID, generateContent, getAllBlogs, getBlogByID, getBlogComments, togglePublish } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();
blogRouter.post('/generate',auth, generateContent)

blogRouter.post('/add',upload.single('image'),auth,addBlog);
blogRouter.post('/delete',auth,deleteBlogByID);
blogRouter.post('/toggel-publish',auth, togglePublish);
blogRouter.get('/all', getAllBlogs)
blogRouter.get('/:blogId', getBlogByID)

blogRouter.post('/add-comments',addComments)
blogRouter.post('/comments',getBlogComments)


export default blogRouter;