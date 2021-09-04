import { db } from "../config/db.config";
import { Model, DataTypes } from "sequelize";
import RefreshToken from "./refreshToken.model";
import { UserAttributes } from "../types/auth.types";

interface UserInstance extends Model<UserAttributes>, UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const User = db.define<UserInstance>("user", {
  fullname: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
});
export default User;

User.hasOne(RefreshToken, {
  foreignKey: "userId",
});
RefreshToken.belongsTo(User, {
  foreignKey: "userId",
});
