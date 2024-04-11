import UserRepository from "../repository/userRepository";
import PostRepository from "../repository/postRepository";
import FollowRepository from "../repository/followRepository";


class UserService {
  private userRepository: UserRepository;
  private postRepository: PostRepository;
  private followRepository: FollowRepository;


  constructor() {
    this.userRepository = new UserRepository();
    this.postRepository = new PostRepository();
    this.followRepository = new FollowRepository()
  }

  checkForUser = async (email: any) => {
    try {
      return await this.userRepository.FindOne({ email });
    } catch (error) {
      console.log(error);
    }
  };

  checkForUserId = async (userId: any) => {
    try {
      return await this.userRepository.FindOne({ _id : userId });
    } catch (error) {
      console.log(error);
    }
  };

  createNewUser = async (userObject: any) => {
    try {
      return await this.userRepository.Create(userObject);
    } catch (error) {
      console.log(error);
    }
  };



  fetchUserFeed = async (userFeedObject: any) => {
    const findFollowingObject = {
      followerId : userFeedObject.userId
    }

    

    try {

      const usersFollowing = await this.followRepository.FindFollowing(findFollowingObject);
      console.log(usersFollowing, "usersfollowin");
      if(!usersFollowing){
        return "following no users"
      }


      const followedUserIds = usersFollowing.map((object) => object.followeeId);


      const noOfPosts = await this.postRepository.FindUsersNoOfPost(followedUserIds)
      console.log(noOfPosts);

      if(noOfPosts === 0){
        return "no posts available for now"
      }

      const userFeedObjectMod = {...userFeedObject, noOfPosts, followedUserIds}
      console.log(userFeedObjectMod);

      let feed = await this.postRepository.FindUsersPosts(userFeedObjectMod);

      return {
        feed,
        noOfPosts,
        noOfPages: Math.ceil(noOfPosts || 0 / userFeedObject.limit),
        currentPage: userFeedObject.page
      };

      console.log(feed, "feed")


      






    } catch(error){

      console.log(error);
      
    }
  }
}


export default UserService