'use strict'
const Sequelize = require('sequelize')
let sequelize

module.exports = {
  loadPriority: 1000,
  startPriority: 1000,
  stopPriority: 1000,
  initialize: function (api, next) {
    sequelize = new Sequelize('todos', 'user', 'pass', {
      host: 'localhost',
      dialect: 'sqlite',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },
      storage: './database.sqlite'
    })

    api.models = {
      Todo: sequelize.define('todo', {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true
        },
        title: Sequelize.STRING,
        description: Sequelize.TEXT,
        deadline: Sequelize.DATE
      })
    }

    return next()
  },
  start: function (api, next) {
    sequelize
    .authenticate()
    .then(() => sequelize.sync())
    .then(() => {
      api.log('Connected to database.', 'info')
      next()
    })
    .catch(error => next(error))
  },
  stop: function (api, next) {
    return next()
  }
}
