const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Project extends Sequelize.Model {}
  Project.init({
    // Set custom primary key column
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        },
    project_name: {
        type: Sequelize.STRING,
        allowNull: false, //disallow null
        validate: { 
            notEmpty: {
                // custom error message
                msg: 'Please provide a value for "project_name"',
            },
        },
    },
    technology: {
        type: Sequelize.STRING,
        allowNull: false, //disallow null
        validate: { },
     },
     purchase_type: {
        type: Sequelize.STRING,
        allowNull: false, //disallow null
        validate: { },
     },
    start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false, //disallow null
        validate: { },
    },
    end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false, //disallow null
        validate: { },
    },
    usage: {
        type: Sequelize.INTEGER,
        allowNull: false, //disallow null
        validate: { 
            notEmpty:{
                // custom error message
                 msg: 'Please provide a value for "usage"',
            },
        },
    },
    additionality: {
        type: Sequelize.BOOLEAN,
        allowNull: true, //allow null
        validate: { },
    },
  }, { sequelize });

  return Project;
};