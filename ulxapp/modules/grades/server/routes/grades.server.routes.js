'use strict';

/**
 * Module dependencies.
 */
var gradesPolicy = require('../policies/grades.server.policy'),
  grades = require('../controllers/grades.server.controller');

module.exports = function (app) {
  // Grades collection routes
  app.route('/api/grades').all(gradesPolicy.isAllowed)
    .get(grades.list)
    .post(grades.create);

  // Single grade routes
  app.route('/api/grades/:gradeId').all(gradesPolicy.isAllowed)
    .get(grades.read)
    .put(grades.update)
    .delete(grades.delete);

  // Finish by binding the article middleware
  app.param('gradeId', grades.gradeByID);
};
