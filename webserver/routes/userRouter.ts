import { Router} from "express";  
import checkAuthentication from "../middlewares/authMiddleware";

import { forceLoginHandler, loginHandler, protectedRouteHandler, registerHandler, statusHandler } from "../controllers/UserController";

const router = Router(); 

router.get("/protected", checkAuthentication, protectedRouteHandler);
router.get("/status", statusHandler);
router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.get("/forcelogin/:uid", forceLoginHandler);
