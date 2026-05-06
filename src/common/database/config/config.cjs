// require('dotenv').config();

// module.exports = {
//   development: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     dialect: process.env.DB_DIALECT,
//     port: process.env.DB_PORT,
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000
//     }
//   },
//   production: {
//     username: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     dialect: process.env.DB_DIALECT,
//     pool: {
//       max: 10,
//       min: 0,
//       acquire: 60000,
//       idle: 10000
//     }
//   }
// };


require("dotenv").config();

module.exports = {
  development: {
    use_env_variable: "DATABASE_URL",
    dialect: "mysql",
  },

  test: {
    use_env_variable: "DATABASE_URL",
    dialect: "mysql",
  },

  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "mysql",
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