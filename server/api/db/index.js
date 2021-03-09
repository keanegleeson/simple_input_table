const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'projects.db',
  logging: false
});

const db = {
  sequelize,
  Sequelize,
  models: {},
};

db.models.Project = require('./models/project.js')(sequelize);

module.exports = db;