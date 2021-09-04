import { db } from "../config/db.config";
import { Model, DataTypes } from "sequelize";
import { RefreshTokenAttributes } from "../types/auth.types";

interface RefreshTokenInstance
  extends Model<RefreshTokenAttributes>,
    RefreshTokenAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const RefreshToken = db.define<RefreshTokenInstance>("refreshToken", {
  token: DataTypes.STRING,
  expiryDate: DataTypes.DATE,
});
export default RefreshToken;
