import express from "express";
import userController from "../controllers/userController";
const router = express.Router();



router.get("/feed", userController.userFeed )



export default router