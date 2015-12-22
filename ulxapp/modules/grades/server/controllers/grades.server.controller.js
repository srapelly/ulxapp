'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Grade = mongoose.model('Grade'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a grade
 */
exports.create = function (req, res) {
  var grade = new Grade(req.body);
  grade.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(grade);
    }
  });
};

/**
 * Show the current grades
 */
exports.read = function (req, res) {
  res.json(req.grade);
};

/**
 * Update a grade
 */
exports.update = function (req, res) {
  var grade = req.grade;

  grade.name = req.body.name;
  grade.code = req.body.code;
  grade.standard = req.body.standard;

  grade.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(grade);
    }
  });
};

/**
 * Delete an grade
 */
exports.delete = function (req, res) {
  var grade = req.grade;

  grade.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(grade);
    }
  });
};

/**
 * List of Grades
 */
exports.list = function (req, res) {
  Grade.find().sort('-created').exec(function (err, grades) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(grades);
    }
  });
};

/**
 * Grade middleware
 */
exports.gradeByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Grade is invalid'
    });
  }

  Grade.findById(id).exec(function (err, grade) {
    if (err) {
      return next(err);
    } else if (!grade) {
      return res.status(404).send({
        message: 'No grade with that identifier has been found'
      });
    }
    req.grade = grade;
    next();
  });
};
