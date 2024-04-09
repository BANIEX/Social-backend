import { Request, Response, NextFunction } from "express";
import JwtAuth from "./JwtAuth";
import UserService from "../services/user.service";

class AuthenticateUser {
  private jwtAuth: JwtAuth;
  private userService: UserService;
  constructor() {
    this.jwtAuth = new JwtAuth();
    this.userService = new UserService();
  }

  public deserialToken = async (
    req: Request | any,
    res: Response,
    next: NextFunction
  ) => {
    let token = null;
    let decoded = null;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies) {
      token = req.cookies.access_token;
    }

    if (!token) {
      return res.status(401).json({ message: "Auth Token required" });
    }
    try {
      decoded = this.jwtAuth.verifyJWT(token) as {
        userId: string;
      };
    } catch (error) {
      console.log(error);
      return res
        .status(401)
        .json({ message: "Invalid token or user doesn't exist" });
    }

    const userDetails = await this.userService.checkForUserId(decoded.userId);
    if (!userDetails) {
      return res
        .status(401)
        .json({ message: "User with that token no longer exists" });
    }

    req.user = userDetails;
    console.log(userDetails)
    next();
  };
}

export default new AuthenticateUser();
