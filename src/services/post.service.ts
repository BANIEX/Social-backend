import PostRepository from "../repository/postRepository";

class PostService {
  private postRepository: PostRepository;

  constructor() {
    this.postRepository = new PostRepository();
  }

  createNewPost = async (postObject: any) => {
    try {
      return await this.postRepository.Create(postObject);
    } catch (error) {
      console.log(error);
    }
  };
}



export default  PostService;


