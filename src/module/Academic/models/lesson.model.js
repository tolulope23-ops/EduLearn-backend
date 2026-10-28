import sequelize from "../../../database/connection.js";
import { DataTypes } from "sequelize";

const Lesson = sequelize.define("Lesson", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    classLevelId: {
      type: DataTypes.UUID,
      allowNull: false,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    sequenceNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "lessons",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["courseId", "classLevelId", "sequenceNumber"],
      },
    ],
  }
);

export default Lesson;