import { AnyExpression } from "mongoose";
import FollowRepository from "../repository/followRepository";
import UserRepository from "../repository/userRepository";


class FollowService {
  private followRepository: FollowRepository;
  private userRepository: UserRepository;

  constructor(){
    this.followRepository = new FollowRepository();
    this.userRepository = new UserRepository();
  }

  followUser = async (followUserObject: any) => {
    try {

      this.userRepository.IncreaseFollowAndFollowingCount(followUserObject);
      return await this.followRepository.FollowOne(followUserObject);
    } catch (error) {
      console.log(error)

      
    }
  }


  


  isFollowingUser = async (isFollowingObject: any) => {
    try{

      return await this.followRepository.IsFollowing(isFollowingObject);

    }catch(error){
      console.log(error)

    }
  }

}

export default FollowService