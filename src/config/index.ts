import { Sequelize } from "sequelize";
export const newSequelize = new Sequelize({
  dialect: "postgres",
  host: "ep-hidden-breeze-00331592.us-east-2.aws.neon.tech",
  username: "mirzafar7765",
  password: "nb04GMrsdevW",
  database: "intexdb",
  logging: false,
});