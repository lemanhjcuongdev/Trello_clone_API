/* eslint-disable quotes */
require("dotenv").config();

export const env = {
  MONGODB_URI: process.env.MONGODB_URI,
  DATABASE_NAME: process.env.DATABASE_NAME,
  HOSTNAME: process.env.HOSTNAME,
  PORT: process.env.PORT,
};
