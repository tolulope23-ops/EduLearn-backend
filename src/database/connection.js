import { Sequelize } from 'sequelize';

// Create Sequelize instance using DATABASE_URL (production standard)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "mysql",
  seederStorage: "sequelize",
  seederStorageTableName: "SequelizeMeta",
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