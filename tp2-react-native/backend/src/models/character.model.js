import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const CharacterModel = sequelize.define(
  "Character",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bounty: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    race: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    crew: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    paranoid: false,
  },
);
