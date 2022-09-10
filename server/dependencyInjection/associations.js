module.exports = function (models) {
    models.csv.hasMany(models.phone, {
      foreignKey: 'csvId'
    });
    models.phone.belongsTo(models.csv);
};