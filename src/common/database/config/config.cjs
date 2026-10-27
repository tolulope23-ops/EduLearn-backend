require("dotenv").config();

module.exports = {
  development: {
    use_env_variable: "DATABASE_URL",
    dialect: "mysql",
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeMeta",
  },

  test: {
    use_env_variable: "DATABASE_URL",
    dialect: "mysql",
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeMeta",
  },

  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "mysql",
    seederStorage: "sequelize",
    seederStorageTableName: "SequelizeMeta",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 10,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
  },
};