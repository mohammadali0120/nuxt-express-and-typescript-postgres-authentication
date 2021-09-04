import { Sequelize } from "sequelize";
import * as dotenv from "dotenv";

dotenv.config();


export const db = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`);

