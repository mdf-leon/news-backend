import { Router } from "express"; 
import checkAuthentication from "../middlewares/authMiddleware"; 

import {
  createArticle,
  updateArticle,
  deleteArticle,
  subscribeToTag,
  getNewsFromSubscribedTags,
  saveArticle,
  getArticleById,
  getArticles,
} from "../controllers/ArticleController";

const router = Router();
 
router.get("/", getArticles);
router.get("/:id", getArticleById);
router.post("/", checkAuthentication, createArticle);
router.put("/:id", checkAuthentication, updateArticle);
router.delete("/:id", checkAuthentication, deleteArticle);
router.post("/:tagId/subscribe", checkAuthentication, subscribeToTag);
router.get("/news", checkAuthentication, getNewsFromSubscribedTags);
router.post("/:articleId/save", checkAuthentication, saveArticle);

export default router;