import User from "../models/User";


 class UserRepository {
  // Create a User
  async Create(userObj: any) {
    try {
      
      const newUser = await User.create(userObj);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  // Find one User
  async FindOne(searchObj: any) {
    try {
      const data = await User.findOne(searchObj);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

}





export default UserRepository