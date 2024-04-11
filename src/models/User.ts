import mongoose , {Document, Types} from "mongoose";
const Schema = mongoose.Schema;


export interface UserDoc extends Document {
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  password: string,
  posts: string[],
  followingCount: number,
  followerCount: number


}



const userSchema = new Schema({

  firstName: {type: String},
  lastName: {type: String},
  userName: {type: String},
  email: {type: String},
  password: {type: String},
  posts: {type: [String]},
  followingCount: {type: Number},
  followerCount: {type: Number}  
},{timestamps: true})



export default mongoose.model("User", userSchema)


