import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
import passport from "passport";
import cors from "cors";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import "./app/config/passport";
import notFound from "./app/middlewares/notFound";
import { envVariable } from "./app/config/env";
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use(expressSession({
    secret: envVariable.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());


app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Welcome to Tour Management Server"
    })
})

app.use(globalErrorHandler)

app.use(notFound)

export default app;