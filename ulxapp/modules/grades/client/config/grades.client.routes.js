'use strict';

// Setting up route
angular.module('grades').config(['$stateProvider',
  function ($stateProvider) {
    // Grades state routing
    $stateProvider
      .state('grades', {
        abstract: true,
        url: '/grades',
        template: '<ui-view/>'
      })
      .state('grades.list', {
        url: '',
        templateUrl: 'modules/grades/client/views/list-grade.client.view.html'
      })
      .state('grades.create', {
        url: '/create',
        templateUrl: 'modules/grades/client/views/create-grade.client.view.html',
        data: {
          roles: ['admin']
        }
      })
      .state('grades.view', {
        url: '/:gradeId',
        templateUrl: 'modules/grades/client/views/view-grade.client.view.html'
      })
      .state('grades.edit', {
        url: '/:gradeId/edit',
        templateUrl: 'modules/grades/client/views/edit-grade.client.view.html',
        data: {
          roles: ['admin']
        }
      });
  }
]);
