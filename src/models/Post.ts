import mongoose, {Document, Types} from "mongoose";
const Schema = mongoose.Schema;





export interface PostDoc extends Document{
  userId:  Types.ObjectId
  content: string
  image?:  string
  likes:  number
  comments:  number 

}



const postSchema = new Schema({

  userId: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  content: {type: String},
  image: {type: String},
  likes: {type: Number},
  comments: {type: Number}

},{timestamps: true})


export default mongoose.model("Post", postSchema)