import { User } from "../interface/user";
import loggerWithNameSpace from "../utils/logger";
import { createUser, getUserByEmail } from "./user";
import bcrypt from "bcrypt";
import config from "../config";
import { sign, verify } from "jsonwebtoken";
import { UnauthenticatedError } from ".././errors/UnauthenticatedError";
import { RefreshToken } from ".././interface/auth";
import { resolve } from "path";

const logger = loggerWithNameSpace("AuthService");

export async function signup(user: User) {
  logger.info("signup");
  await createUser(user);
}

export async function login(body: Pick<User, "email" | "password">) {
  logger.info("login");

  const existingUser = await getUserByEmail(body.email);

  if (!existingUser) {
    logger.info("Incorrect Email");
    throw new UnauthenticatedError("incorrect email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    body.password,
    existingUser.password
  );

  if (!isPasswordValid) {
    logger.info("Incorrect Password");
    throw new UnauthenticatedError("incorrect email or password");
  }

  const payload = {
    id: existingUser.id,
    name: existingUser.name,
    email: existingUser.email,
    role: existingUser.role,
  };

  const accessToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.accessTokenExpirySeconds,
  });

  const refreshToken = sign(payload, config.jwt.secret!, {
    expiresIn: config.jwt.refreshTokenExpirySeconds,
  });

  return {
    accessToken,
    refreshToken,
  };
}

export function refresh(body: RefreshToken) {
  logger.info("Refresh");
  const { refreshToken } = body;
  if (!refreshToken) {
    return;
  }

  try {
    const decoded = verify(refreshToken, config.jwt.secret!);
    if (typeof decoded === "string") {
      return;
    }

    logger.info("Valid refresh token");

    const payload = {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
    };
    const accessToken = sign(payload, config.jwt.secret!, {
      expiresIn: config.jwt.accessTokenExpirySeconds,
    });

    if (accessToken) {
      return { accessToken };
    }
  } catch (error) {
    return;
  }
}
