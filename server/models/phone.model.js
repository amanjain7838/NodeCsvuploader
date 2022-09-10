module.exports = (sequelize, Sequelize) => {
    const Phone = sequelize.define("phone", {
        id:{
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        csvId:{
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'csv',
                key: 'id',
            }
        },
        phone: {
            type: Sequelize.STRING
        }
    });
  
    return Phone;
};