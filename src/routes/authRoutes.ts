import express from "express"
const router = express.Router();

import AuthController from "../controllers/authController";








router.post("/login", AuthController.userLogin)
router.post("/register", AuthController.userRegistration)



export default router
