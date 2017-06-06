'use strict'

exports.action = {
  name: 'createTodo',
  description: 'an actionhero action',
  blockedConnectionTypes: [],
  outputExample: {},
  matchExtensionMimeType: false,
  version: 1.0,
  toDocument: true,
  middleware: [],

  inputs: {
    title: {
      required: true
    },
    description: {
      required: false
    },
    deadline: {
      required: false
    }
  },

  run: function (api, data, next) {
    api.models.Todo.create({
      title: data.params.title,
      description: data.params.description
    })
    .then(task => {
      data.response.task = task
      next()
    })
    .catch(error => {
      next(error)
    })
  }
}
