import { Router } from "express";
import { getUsers } from "../controllers/userscontroller";

const router = Router();
router.get("/", getUsers);
export default router;
