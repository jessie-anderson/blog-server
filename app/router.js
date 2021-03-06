import { Router } from 'express';
import * as Posts from './controllers/post_controller';


const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'welcome to our blog api!' });
});

router.route('/posts')
.post(Posts.createPost)
.get(Posts.getPosts);

router.route('/posts/:postId')
.put(Posts.updatePost)
.get(Posts.getPost)
.delete(Posts.deletePost);

// your routes will go here

export default router;
