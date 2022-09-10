'use strict';
const dbConfig = require("../config/db.config.js");
const fs = require('fs');
const path = require('path');
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  define: {
    freezeTableName: true
  }
});

const db = {};
const models = path.join(__dirname, '../models/'); 

fs.readdirSync(models)
	.filter(function (file) {
		return file.indexOf('.') !== 0 && file.slice(-3) === '.js';
	})
	.forEach(function (file) {
		const model = require(path.join(models, file))(
			sequelize,
			Sequelize.DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach(function (modelName) {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});
require('./associations')(db);
sequelize.sync().then((_result) => {
    console.log('Sequelize: All models were synchronized successfully.');
}).catch((err) => {
    console.log(err);
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.sequelize.sync({ force: false, alter: true })

module.exports = db;