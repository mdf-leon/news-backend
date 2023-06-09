import { Request, Response } from "express"; 
import Article from "../models/Article";
import User from "../models/User"; 
import Tag from "../models/Tag"; 

export const getArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Article.getAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving articles" });
  }
} 

export const getArticleById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const article = await Article.getById(id);
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ message: "Article not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving article" });
  }
}

export const createArticle = async (req: Request, res: Response) => {
  const { title, description, body, author } = req.body;

  try {
    const id = await Article.create({
      title,
      description,
      body,
      author: req.session.user?.id || author,
    });

    const article = await Article.getById(id);
    res.status(201).json({ message: "Article created successfully", article });
  } catch (error) {
    res.status(400).json({ message: "Error creating article" });
  }
};

export const updateArticle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, body, author } = req.body;

  try {
    await Article.update(id, {
      title,
      description,
      body,
      author,
    });

    const updatedArticle = await Article.getById(id);
    res.status(200).json({ message: "Article updated successfully", article: updatedArticle });
  } catch (error) {
    res.status(400).json({ message: "Error updating article" });
  }
};

export const deleteArticle = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await Article.delete(id);
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting article" });
  }
};

export const subscribeToTag = async (req: Request, res: Response) => {
  const { tagId } = req.params;
  const userId = req.session.user!.id;

  try {
    // Check if the tag exists
    const tag = await Tag.getById(tagId);

    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }

    // Subscribe the user to the tag
    await User.subscribeToTag(userId, Number(tagId));

    res.status(200).json({ message: "Subscribed to the tag successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error subscribing to the tag" });
  }
};

export const getNewsFromSubscribedTags = async (req: Request, res: Response) => {
  const userId = req.session.user!.id;

  try {
    // Retrieve all news from subscribed tags for the user
    const news = await User.getNewsFromSubscribedTags(userId);

    res.status(200).json({ news });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving news from subscribed tags" });
  }
};

export const saveArticle = async (req: Request, res: Response) => {
  const { articleId } = req.params;
  const { folder } = req.body;
  const userId = req.session.user!.id;

  try {
    // Check if the article exists
    const article = await Article.getById(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Save the article to the specified folder
    await User.saveArticle(userId, Number(articleId), folder);

    res.status(200).json({ message: "Article saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving the article" });
  }
};