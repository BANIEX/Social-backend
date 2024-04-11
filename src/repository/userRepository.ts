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

  async IncreaseFollowAndFollowingCount(followObject: any){
    console.log(followObject.followeeId, "Right here")
    try{
      const followeeUpdate = await User.findOneAndUpdate({_id: followObject.followeeId}, {$inc: {followerCount: 1}});
      const followerUpdate = await User.findOneAndUpdate(
        { _id: followObject.followerId },
        { $inc: { followingCount: 1 } }
      );

      // console.log(followeeUpdate)
      // console.log(followerUpdate);


    }catch(error){

    }
  }


  

}





export default UserRepository