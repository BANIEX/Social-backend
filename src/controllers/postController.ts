import { Request, Response } from "express"
import PostService from "../services/post.service";

class PostController {
  private postService: PostService

  constructor(){
    this.postService =  new PostService()
  }


  createPost = async (request : Request | any , response: Response) => {

    const postObj = {
      
        content: request.body.content,
        image: request.body.image,
        userId: request.user._id,
        likes: 0,
        comments: 0
      
    };


    const newPost = await this.postService.createNewPost(postObj);
    if(newPost){
      return response.status(200).json({
        error: false,
        message: "Successfuly created a new post"
      })
    }

    return response.send("Error creating new post")

  }

}

export default new PostController()