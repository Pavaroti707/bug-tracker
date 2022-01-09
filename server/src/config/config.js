require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 5000,
  jwtSecret: process.env.JWT_SECRET || "paragon",
  mongoUser: process.env.MONGO_USER || "Paragon004",
  mongoPass: process.env.MONGO_PASS || "!400nogaraP$",
  database: process.env.PROJECT_NUMBER || "thirthyTwo",
  mongoCluster: process.env.MONGO_CLUSTER || "@cluster0.xrkyg.mongodb.net",
};

export default config;
