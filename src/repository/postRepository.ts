import Post from "../models/Post";

class PostRepository {
  // Create a Post
  async Create(userObj: any) {
    try {
      const newPost = await Post.create(userObj);
      return newPost;
    } catch (error) {
      console.log(error);
    }
  }

  // Find one Post
  async FindOne(searchObj: any) {
    try {
      const data = await Post.findOne(searchObj);

      return data;
    } catch (error) {
      console.log(error);
    }
  }

  async FindUsersNoOfPost(followedUserIds: any) {
       const query = { userId: { $in: followedUserIds } };

    try{
      return await Post.countDocuments(query)

    } catch(error){


      console.log(error)

    }
  }


  async FindUsersPosts(userFeedObjectMod: any) {
       const query = { userId: { $in: userFeedObjectMod.followedUserIds } };

       try{
         let feed = await Post.find(query)
           .sort({ createdAt: -1 }) 
           .skip((userFeedObjectMod.page - 1) * userFeedObjectMod.limit) 
           .limit(userFeedObjectMod.limit) 
           .populate("userId", '-password -posts -createdAt -updatedAt -__v'); 

         return feed;
       }catch(error){
        console.log(error)
       }




  }

  
}

export default PostRepository;
