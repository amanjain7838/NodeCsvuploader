module.exports = {
    HOST: process.env.databasehost,
    USER: process.env.dbuser,
    PASSWORD: process.env.dbpassword,
    DB: "csvuploader",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  