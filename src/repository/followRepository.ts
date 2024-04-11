import Follow from "../models/Follow";


class FollowRepository {

  async FollowOne(followObject: any){
    try {
      const newFollow = await Follow.create(followObject);
      return newFollow
      
    } catch (error) {
      console.log(error)
      
    }
  }

  async UnFollowOne(unFollowObject: any){
    try {
      const deleteFollow = await Follow.deleteOne(unFollowObject);
      return deleteFollow
      
    } catch (error) {
      console.log(error);

      
    }
  }

  async IsFollowing(isFollowingObject: any){
    try{
      return await Follow.findOne(isFollowingObject)
    }catch(error){
      console.log(error)

    }
  }


  async FindFollowers(findFollowersObject: any){
    try{
      const followers = await Follow.find(findFollowersObject)

    }catch(error){
      console.log(error);


    }
  }

  async FindFollowing(findFollowingObject: any){
    try{

      const followingArray = await Follow.find(findFollowingObject, "followeeId" );
      return followingArray

    }catch(error){
      console.log(error);


    }
  }

}


export default FollowRepository;