import { Request, Response } from "express";
import { userRegistrationValidation, userLoginValidation } from "../validations/authValidation";
import JwtAuth from "../middlewares/JwtAuth";
import UserService from "../services/user.service";
import bcrypt from "bcryptjs";





class AuthController {

  private userService: UserService;
  public jwtAuth: JwtAuth;
  private salt:number; //defining the generic salt
  constructor(){
    this.userService = new UserService();
    this.jwtAuth = new JwtAuth();
    this.salt = 10;

  }

  userRegistration = async (request: Request, response: Response) => {


    // console.log(request.body)


    const {error} = userRegistrationValidation(request.body);

    if (error) {
      return response.status(400).json({
        error: true,
        message: error.details[0].message.toUpperCase(),
      });
    }


    const userExist = await this.userService.checkForUser(request.body.email)
    // console.log(userExist)


    if(userExist){
      return response.status(400).json({
        error: true,
        message: "User Already Exist",
      });
    }


    const userObj = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      userName: request.body.userName,
      password: await bcrypt.hash(request.body.password, this.salt),
      followerCount: 0,
      followingCount: 0,
      posts: []
    };  


    const newUser = await this.userService.createNewUser(userObj);
    console.log(newUser);

    if(newUser){
      response.status(200).json({
        error: false,
        message: "User created successfully"
      })
    }


  }


  userLogin = async (request: Request, response: Response) => {

    const {error} = await userLoginValidation(request.body)
    if (error) {
      return response.status(400).json({
        error: true,
        message: error.details[0].message.toUpperCase(),
      });
    }

    const userExist = await this.userService.checkForUser(request.body.email);

    

    console.log(userExist)
    if(!userExist){
      return response.status(400).json({
        error: true,
        message: "Invalid email or password"
      });

    }

    const password: string = request.body.password
    const hashedPassword: string = userExist.password || "";

    async function compareHash(s: string, hash: string): Promise<boolean> {
      return await bcrypt.compare(s, hash);
    }
    const isPasswordValid = await compareHash(password, hashedPassword)
    if(!isPasswordValid){
       return response.status(400).json({
         error: true,
         message: "Invalid email or password",
       });
    }

    const jwtToken = await this.jwtAuth.createJWT({userId : userExist._id});
    if(jwtToken){
      const user = {
        firstName: userExist.firstName,
        lastName: userExist.lastName,
        email: userExist.email,
        username: userExist.userName
      }
      return response.status(200).json({
        status: true,
        message: "Login successful",
        user: user,
        token: jwtToken,
      });
    }

    return response.status(500).json({
      status: false,
      message: "Server error occured",
    });



    


  }

}



export default new AuthController()
