import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const TaskModel = sequelize.define(
  "task",
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "title",
    },
    description: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "description",
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "is_completed",
    },
  },
  {
    underscored: true,
    // timestamps: false,
    // createdAt: "created_at",
  },
);
