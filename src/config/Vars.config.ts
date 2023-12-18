import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});

export const config = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || "localhost",
  debug: process.env.DEBUG || true,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
  accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY!,
};
