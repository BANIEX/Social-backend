import express from "express"
const router = express.Router();
import PostController from "../controllers/postController";



router.post("/", PostController.createPost )


router.post("/one", (req, res)=>{
  res.send("calma")
})











export default router


