'use strict';

//Grades service used for communicating with the articles REST endpoints
angular.module('grades').factory('Grades', ['$resource',
  function ($resource) {
    return $resource('api/grades/:gradeId', {
      gradeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);
