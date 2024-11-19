import mongoose from "mongoose";
import { type } from "os";

const ArticleSchema=new mongoose.Schema({
  title:{type:String,required:true},
  content:{type:String,required:true},
  author:{type:String,required:true},
  createdAt:{type:Date,default:Date.now},
})

const Article=mongoose.model(`Article`,ArticleSchema)

export default Article