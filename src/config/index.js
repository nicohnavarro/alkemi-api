import { config } from "dotenv";

const envFound = config();

if (!envFound) {
  throw new Error("Couldn 't  find .env file.");
}

process.env.NODE_ENV = process.env.NODE_ENV || "development";

export const port = process.env.PORT;
export const api = {
  prefix: "/api/v1",
};
export const log = {
  level: process.env.LOG_LEVEL,
};
export const swagger = {
  path: "/docs",
};
export const database = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  name: process.env.DATABASE_NAME,
};
export const auth = {
  secret: process.env.AUTH_SECRET,
  ttl: process.env.AUTH_TTL,
};

export const aws = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretKey: process.env.AWS_SECRET_ACCESS_KEY,
  s3BucketName: process.env.AWS_S3_BUCKET_NAME,
};
