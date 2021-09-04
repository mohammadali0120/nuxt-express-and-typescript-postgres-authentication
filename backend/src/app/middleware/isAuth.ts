import jwt from "jsonwebtoken";
import { config } from "../config/auth.config";

export function isAuth(req: any, res: any, next: any) {
  let authHeader: any = req.get("Authorization");
  if (!authHeader) {
    return res.status(403).json({ message: "No token provided!" });
  }
  const token: any = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  try {
    jwt.verify(token, config.secret, (err: any, decodedToken: any) => {
      if (err || !decodedToken) {
        return res.status(401).json({ message: "Not authenticated" });
      }
      req.userId = decodedToken.id;
      next();
    });
  } catch (err) {
    console.log(err);
  }
}
