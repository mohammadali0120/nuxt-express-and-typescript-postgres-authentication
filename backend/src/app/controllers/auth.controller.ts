import RefreshToken from "../models/refreshToken.model";
import { config } from "../config/auth.config";
import { v4 } from "uuid";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  SignInRequestBody,
  LoginRequestBody,
  RefreshTokenBody,
} from "../types/auth.types";

const createToken = async (user: any) => {
  const expiredAt: Date = new Date();
  expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

  const _token: string = v4();

  const refreshToken: any = await RefreshToken.create({
    token: _token,
    userId: user.id,
    expiryDate: expiredAt.getTime(),
  });
  return refreshToken.token;
};
export async function postSignIn(req: any, res: any, next: any) {
  const body = req.body as SignInRequestBody;
  try {
    const exsitUser: any = await User.findOne({
      where: {
        email: body.email,
      },
    });
    if (exsitUser) {
      return res.status(409).json({
        error: "Eamil already exist, please pick another email! ",
      });
    }

    const hashedPassword: string = await bcrypt.hash(body.password, 12);

    const user: any = await User.create({
      fullname: body.fullname,
      email: body.email,
      password: hashedPassword,
    });

    res.status(200).json({
      message: "User created",
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    console.log(err);
  }
}
let user: any;
let token: any;
export async function postLogin(req: any, res: any, next: any) {
  try {
    const body = req.body as LoginRequestBody;
    user = await User.findOne({
      where: {
        email: body.email,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const isPassValid: boolean = await bcrypt.compare(
      body.password,
      user.password
    );
    if (!isPassValid) {
      return res
        .status(401)
        .json({ accessToken: null, message: "Invalid password!" });
    }
    token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    const refreshToken: any = await createToken(user);
    res.status(200).json({
      token: token,
      refresh_token: refreshToken,
    });
  } catch (err) {
    console.log(err);
  }
}
export async function postRefreshToken(req: any, res: any, next: any) {
  const body = req.body as RefreshTokenBody;

  try {
    if (!body.refresh_token) {
      return res.status(403).json({ message: "Refresh Token is required!" });
    }

    const refreshToken: any = await RefreshToken.findOne({
      where: { token: body.refresh_token },
    });
    if (!refreshToken) {
      return res.status(403).json({ message: "Refresh token does not exist!" });
    }
    if (refreshToken.expiryDate.getTime() < new Date().getTime()) {
      await RefreshToken.destroy({ where: { id: refreshToken.id } });

      return res.status(403).json({
        message: "Refresh token was expired. Please login again!",
      });
    }
    const user = await refreshToken.getUser(); // getUser is magic method of sequelize
    // for seeing the magic methods you should assign a Model to another and for seeing its magic methods in here you should first do your job on Model
    // and assign it to a const or variable and then log its prototypes like below:
    // console.log(refreshToken.__proto__);
    const newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    return res.status(200).json({
      token: newAccessToken,
      refresh_token: refreshToken.token,
    });
  } catch (err) {
    console.log(err);
  }
}
export async function getUser(req: any, res: any, next: any) {
  res.status(200).json({
    user: {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
    },
  });
}

export async function getAllUsers(req: any, res: any, next: any) {
  const users = await User.findAll({
    attributes: ["id", "fullname", "email"],
  });
  res.status(200).json({ users: users });
}
