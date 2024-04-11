import mongoose, { Document, Types } from "mongoose";
const Schema = mongoose.Schema;

export interface FollowDoc extends Document {
  followerId: Types.ObjectId;
  followeeId: string;
  
}

const followSchema = new Schema(
  {
    followerId: { type: mongoose.Schema.Types.ObjectId },
    followeeId: { type: mongoose.Schema.Types.ObjectId },
    
  },
  { timestamps: true }
);

export default mongoose.model("Follow", followSchema);
