import express from "express";
import { createNewId} from "../controllers/signup.controller.js";
import { getuserid } from "../controllers/signin.controller.js";

const router = express.Router()

router.post("/up" , createNewId);
router.get("/in",getuserid);

export default router;
