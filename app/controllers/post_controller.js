import Post from '../models/post_model';

export const createPost = (req, res) => {
  const post = new Post();
  post.title = req.body.title;
  post.content = req.body.content;
  post.tags = req.body.tags;
  post.save()
  .then(result => {
    res.json({ message: 'Post created!' });
  })
  .catch(error => {
    res.json({ error });
  });
};
export const getPosts = (req, res) => {
  Post.find()
  .then(response => {
    const cleanPosts = (posts) => {
      return response.map(post => {
        return { id: post.id, content: post.content, title: post.title, tags: post.tags };
      });
    };
    res.json(cleanPosts(response));
  })
  .catch(error => {
    res.json(error);
  });
};
export const getPost = (req, res) => {
  Post.findById(req.params.postId)
  .then(response => {
    res.json(response);
  })
  .catch(error => {
    res.json(error);
  });
};
export const deletePost = (req, res) => {
  Post.findById(req.params.postId).remove(err => { console.log(err); });
  res.send('delete a post here');
};
export const updatePost = (req, res) => {
  res.send('update a post here');
};
