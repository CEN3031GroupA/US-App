'use strict';

/**
 * Module dependencies.
 */
var projects = require('../controller/project.server.controller.js');

module.exports = function(app) {

  app.route('/api/projects')
    .post(projects.create)
    .get(projects.list);

  app.route('/api/projects/:projectId')
    .get(projects.read)
    .put(projects.update)
    .delete(projects.delete);

  app.param('projectId', projects.projectById);
};