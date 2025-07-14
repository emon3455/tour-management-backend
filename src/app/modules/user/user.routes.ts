import { Router } from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./user.validation";
import checkAuth from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = Router();

router.get("/all-users", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), UserControllers.getAllUser);

router.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser);

export const UserRoutes = router;