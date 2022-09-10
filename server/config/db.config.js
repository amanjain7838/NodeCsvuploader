module.exports = {
    HOST: process.env.MYSQL_HOST,
    USER: "root",
    PORT: process.env.MYSQL_PORT,
    PASSWORD: process.env.MYSQL_PASSWORD,
    DB: process.env.MYSQL_DATABASE,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  