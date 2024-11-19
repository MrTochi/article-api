import express from "express"
import { articlePage, deleteArticle, oneArticle, updateArticle } from "../contoller/page.js"
import { articleShow } from "../contoller/page.js"


const router=express.Router()

router.post("/articles",articlePage)
router.get("/articles",articleShow)
router.get("/articles", oneArticle)
router.put("/articles/update", updateArticle)  
router.delete("/articles", deleteArticle)
export default router