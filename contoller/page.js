import express from "express"

import Article from "../model/articleModel.js"


// create an article
export const articlePage=async (req, res)=>{
  const {title,content,author}=req.body

  try {
    if(!title||!content||!author){
      throw new Error("All fields required")
    }
    const article=new Article({
      title,content,author,createdAt:Date.now()
    })
    await article.save()
    res.status(201).json({success:true,message:"Article created successsfully",article:{...article._doc ||article}})
  } catch (error) {
    res.status(400).json({success:false,message:error.message})
  }
  
 }

//  read all articles
 export const articleShow=async (req, res)=>{
  try {
    const myArticle=await Article.find()
    res.json(myArticle)
  } catch (error) {
    res.status(500).send("server error")
  }
 }


//  read one article using any parameter to serarch

export const oneArticle = async (req, res) => {
  try {
    const query = {};
    
    if (req.query.id) query._id = req.query.id;
    if (req.query.title) query.title = new RegExp(req.query.title, 'i'); // Case-insensitive search
    if (req.query.author) query.author = req.query.author;
    

    const articles = await Article.find(query);
    
    if (!articles.length) {
      return res.status(404).json({
        success: false,
        message: "No articles found matching the criteria"
      });
    }

    res.status(200).json({
      success: true,
      message: "Articles Found",
      articles: articles
    });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error finding articles",
      error: error.message
    });
  }
}

// updating an article after searching with the params
export const updateArticle = async (req, res) => {
  try {
    // Build search query from request query parameters
    const searchQuery = {};
    if (req.query.id) searchQuery._id = req.query.id;
    if (req.query.title) searchQuery.title = new RegExp(req.query.title, 'i');
    if (req.query.author) searchQuery.author = req.query.author;

    // Get update data from request body
    const updateData = req.body;

    // Find and update the article
    const updatedArticle = await Article.findOneAndUpdate(
      searchQuery,
      updateData,
      { new: true } // Returns the updated document
    );

    if (!updatedArticle) {
      return res.status(404).json({
        success: false,
        message: "No article found matching the criteria"
      });
    }

    res.status(200).json({
      success: true,
      message: "Article updated successfully",
      article: updatedArticle
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating article",
      error: error.message
    });
  }
}


// deleting an aricle
export const deleteArticle = async (req, res) => {
  try {
    // Build search query from request query parameters
    const searchQuery = {};
    if (req.query.id) searchQuery._id = req.query.id;
    if (req.query.title) searchQuery.title = new RegExp(req.query.title, 'i');
    if (req.query.author) searchQuery.author = req.query.author;

    // Find and delete the article(s)
    const deletedArticle = await Article.findOneAndDelete(searchQuery);

    if (!deletedArticle) {
      return res.status(404).json({
        success: false,
        message: "No article found matching the criteria"
      });
    }

    res.status(200).json({
      success: true,
      message: "Article deleted successfully",
      article: deletedArticle
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting article",
      error: error.message
    });
  }
}