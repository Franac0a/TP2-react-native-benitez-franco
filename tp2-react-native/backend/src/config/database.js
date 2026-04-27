import { Sequelize } from "sequelize";
import "dotenv/config";

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
  },
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "La conexión a la base de datos ha sido establecida exitosamente.",
    );
    await sequelize.sync({ force: false });
  } catch (error) {
    console.error("No se pudo conectar a la base de datos:", error);
  }
};
