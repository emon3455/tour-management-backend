import { Router } from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema } from "./user.validation";

const router = Router();

router.get("/all-users", UserControllers.getAllUser);

router.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser);

export const UserRoutes = router;