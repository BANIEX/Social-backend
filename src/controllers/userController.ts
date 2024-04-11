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
    const limit = 10

    console.log(page, userId)

    const userFeedObject = {userId, page, limit}

    await this.userService.fetchUserFeed(userFeedObject);

    

    return response.send("follow endpint active");
  }





















}

export default new UserController();
