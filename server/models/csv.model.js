module.exports = (sequelize, Sequelize) => {
    const Csv = sequelize.define("csv", {
      id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      }
    });
  
    return Csv;
  };
  