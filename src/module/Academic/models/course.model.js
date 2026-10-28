import sequelize from "../../../database/connection.js";
import { DataTypes } from "sequelize";

const Course = sequelize.define("Course",{
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "courses",
    timestamps: true,
  }
);

export default Course;