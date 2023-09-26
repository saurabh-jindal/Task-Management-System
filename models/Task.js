// models/Task.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('tasks', 'root', 'hello', {
  host: '127.0.0.1',
  port: '3306',
  dialect: 'mysql',
});

const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  status: DataTypes.STRING,
  timeline: DataTypes.DATE,
});

sequelize.sync();

module.exports = Task;
