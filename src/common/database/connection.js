import { Sequelize } from 'sequelize';
import config from './config/config.cjs';

// const env = process.env.NODE_ENV || 'development';
// const dbConfig = config[env];

// const sequelize = new Sequelize(
//   dbConfig.database,
//   dbConfig.username,
//   dbConfig.password,
//   dbConfig
// );



// Create Sequelize instance using DATABASE_URL (production standard)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  logging: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});


//Authenticate DB connetion
export const authenticateDB = async() => {
  try {
    await sequelize.authenticate(); 
    console.log('Connected to Database');
  } catch (error) {
    console.log('Connection to Database failed:', error.message);
    process.exit(1);
  };
};

export default sequelize;