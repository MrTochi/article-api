import express from "express"
import { connectDb } from "./db/connectDb.js";
import dotenv from "dotenv"
import articlRoutes from "./routes/articleRoutes.js"

dotenv.config()

const app=express()
const PORT=process.env.PORT || 5000

app.use(express.json())
app.use("/api",articlRoutes)


app.listen(PORT,()=>{
  console.log(`server is running on Port:${PORT}`);
  connectDb()
})
