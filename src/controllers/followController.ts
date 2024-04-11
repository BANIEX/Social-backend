import {Request, Response} from "express"
import FollowService from "../services/follow.service"



class FollowController {

  private followService : FollowService

  constructor(){
    this.followService= new FollowService();

  }

  followUser = async (request: Request | any, response: Response) => {


    const followerId = request.user._id;
    const followeeId = request.params.userId;

    const followerUserObject = {
      followerId, followeeId, 
    }




    const isFollowingUser = await this.followService.isFollowingUser(followerUserObject);


    if(isFollowingUser){
      return response.status(400).json({
        error: true,
        message: "Already following user"
      })
    }
   
    

    const followUser = await this.followService.followUser(followerUserObject);
    // console.log(followUser);
    if(followUser){
      return response.status(200).json({
        error: false,
        message: "Succesfully following user"
      })
    }



    return response.send("follow endpint active")

  }



}


export default new FollowController()