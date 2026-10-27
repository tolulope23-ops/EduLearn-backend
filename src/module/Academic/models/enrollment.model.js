import sequelize from "../../../common/database/connection.js";
import { DataTypes } from "sequelize";

const Enrollment = sequelize.define("Enrollment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  studentId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
  },

   dailyGoal: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  classLevelId: {
    type: DataTypes.UUID,
    allowNull: true,
  },

  courseIds: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
    validate: {
      hasNoDuplicates(value) {
        if (Array.isArray(value) && new Set(value).size !== value.length) {
          throw new Error("Duplicate course IDs are not allowed");
        }
      }
    },
  }
},
  {
    timestamps: true,
    tableName: 'enrollments',
  }
);

export default Enrollment;