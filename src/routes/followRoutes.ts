import express from "express";
import followController from "../controllers/followController";
const router = express.Router();



router.post("/follow/:userId", followController.followUser )



router.delete("/unfollow/:userId", );













export default router