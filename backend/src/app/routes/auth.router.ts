import { Router } from "express";
import {
  getAllUsers,
  getUser,
  postLogin,
  postRefreshToken,
  postSignIn,
} from "../controllers/auth.controller";
import { isAuth } from "../middleware/isAuth";

export function authRouter(app: any) {
  const authRouter = Router();

  authRouter.post("/signin", postSignIn);
  authRouter.post("/login", postLogin);
  authRouter.post("/refresh-token", postRefreshToken);
  authRouter.post("/users", isAuth, getAllUsers); // you should add isAuth for those routes that you gonna protect them

  authRouter.get("/user", isAuth, getUser);

  app.use("/api/auth/", authRouter);
}
