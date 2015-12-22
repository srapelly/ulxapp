'use strict';

// Configuring the Grades module
angular.module('grades').run(['Menus',
  function (Menus) {
    // Add the grades dropdown item
    Menus.addMenuItem('topbar', {
      title: 'Grades',
      state: 'grades',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'grades', {
      title: 'List Grades',
      state: 'grades.list',
      roles: ['admin']
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'grades', {
      title: 'Create Grades',
      state: 'grades.create',
      roles: ['admin']
    });
  }
]);
