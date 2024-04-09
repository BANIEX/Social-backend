import UserRepository from "../repository/userRepository";



class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
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
}


export default UserService