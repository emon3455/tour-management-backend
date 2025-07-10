import { Router } from "express";
import { UserControllers } from "./user.controller";


const router = Router();

router.get("/all-users", UserControllers.getAllUser);

router.post("/register", UserControllers.createUser);

export const UserRoutes = router;