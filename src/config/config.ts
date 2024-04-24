import dotenv from "dotenv";

type TConfig = {
  [key: string]: EnvironmentConfig;
};

type EnvironmentConfig = {
  app: AppConfig;
  db: DbConfig;
  cloudinary: CloudinaryConfig;
};

type CloudinaryConfig = {
  CLOUD_NAME: string;
  API_KEY: string;
  API_SECRET: string;
};

type AppConfig = {
  PORT: string | number;
};

type DbConfig = {
  URI: string;
};

if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env.development" });
}

const ENV = process.env.NODE_ENV ?? "development";

const {
  PORT,
  MONGODB_URI,
  CLOUDINARY_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_SECRET,
} = process.env;

const CONFIG: TConfig = {
  development: {
      app: {
          PORT: PORT || 4001,
      },
      db: {
          URI: MONGODB_URI || "mongodb://localhost:27017",
      },
      cloudinary: {
          CLOUD_NAME: CLOUDINARY_NAME || "cloud_name",
          API_KEY: CLOUDINARY_API_KEY || "api_key",
          API_SECRET: CLOUDINARY_SECRET || "api_secret",
      },
  },
  production: {
      app: {
          PORT: process.env.PORT || 8081,
      },
      db: {
          URI: process.env.MONDOBD_URI || "mongodb://localhost:27017",
      },
      cloudinary: {
          CLOUD_NAME: CLOUDINARY_NAME || "cloud_name",
          API_KEY: CLOUDINARY_API_KEY || "api_key",
          API_SECRET: CLOUDINARY_SECRET || "api_secret",
      },
  },
};


export default CONFIG[ENV];
