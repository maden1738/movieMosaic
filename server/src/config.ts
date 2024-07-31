import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/../.env" });

const config = {
     port: process.env.PORT,
     database: {
          client: process.env.DB_CLIENT,
          host: process.env.DB_HOST,
          port: process.env.DB_PORT,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          name: process.env.DB_NAME,
     },

     jwt: {
          secret: process.env.JWT_SECRET,
          accessTokenExpirySeconds: 3000,
          refreshTokenExpirySeconds: 50000,
     },

     cloudinary: {
          cloudName: process.env.CLOUDINARY_CLOUD_NAME,
          apiKey: process.env.CLOUDINARY_API_KEY,
          apiSecret: process.env.CLOUDINARY_API_SECRET,
     },
};

export default config;
