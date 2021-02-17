import express from 'express';
import { getPosts, projectDelete, createPost, getPostById, deletePost, updatePost, createProject, getProjects, joinById } from '../controllers/posts.js'
const router = express.Router();
import bodyParser from 'body-parser';
var jsonParser = bodyParser.json()



router.get('/posts',jsonParser, getPosts);  
router.post('/posts', jsonParser, createPost);
router.get('/posts/:id',  getPostById);  
router.delete('/posts/:id',  deletePost);  
router.put('/posts/:id', jsonParser,  updatePost);  


router.post('/projects' , jsonParser , createProject);
router.get('/projectsall' , jsonParser , getProjects);

router.get('/join', jsonParser, joinById);
router.delete('/projectdelete/:id' , projectDelete)


export default router;