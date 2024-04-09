import express from "express";

const PORT = 4000;
const app = express();


import "./connectToDB"




// Routes
import postRouter from './routes/postRoutes'
import authRouter from './routes/authRoutes'

import authCheck from "./middlewares/authCheck";


app.use(express.json())

app.use("/api/v1/auth", authRouter)


app.use("/api/v1/post",authCheck.deserialToken, postRouter)










app.listen(PORT, ()=> { console.log(`server is running on port ${PORT}`)})