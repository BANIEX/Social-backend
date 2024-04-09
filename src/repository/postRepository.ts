import Post from "../models/Post";

class PostRepository {
  // Create a Post
  async Create(userObj: any) {
    try {
      const newPost = await Post.create(userObj);
      return newPost;
    } catch (error) {
      console.log(error);
    }
  }

  // Find one Post
  async FindOne(searchObj: any) {
    try {
      const data = await Post.findOne(searchObj);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default PostRepository;
