module.exports = (sequelize, Sequelize) => {
    const Csv = sequelize.define("csv", {
      name: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      dob: {
        type: Sequelize.DATEONLY
      },
      reportingManager: {
        field: 'reporting_manager',
        type: Sequelize.STRING
      },
      salary: {
        type: Sequelize.DOUBLE
      },
      department: {
        type: Sequelize.STRING
      }
    },{
        timestamps: false
    });
  
    return Csv;
  };
  