import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  userFeed = async (request: Request | any, response: Response) => {
    const userId = request.user._id;
    const page = parseInt(request.query.page) || 1;
    const limit = 1

    console.log("here")

    const userFeedObject = {userId, page, limit}
    try{
      let userFeed = await this.userService.fetchUserFeed(userFeedObject);

      if(userFeed === "following no users"){
       return  response.status(200).json({
          error: false,
          message: "No feed available, users is following no one",
        });

      }

      if (userFeed === "no posts available for now") {
        return response.status(200).json({
          error: false,
          message: "No feed available",
        });
      }


      if(userFeed){


         return response.status(200).json({
           error: false,
           message: "User feed fetched successfully",
           data: userFeed,
         });
      
      }

     
      



    }catch(error){
      return response.sendStatus(500)

    }

  }





















}

export default new UserController();
