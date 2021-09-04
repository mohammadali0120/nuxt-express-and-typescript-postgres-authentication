import express from "express";
import { db } from "./app/config/db.config";
import { authRouter } from "./app/routes/auth.router";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());

app.use((req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

authRouter(app);

db.sync()
// db.sync({ force: true });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
