'use strict';

angular.module('core.admin').run(['Menus',
  function (Menus) {
    Menus.addMenuItem('topbar', {
      title: 'Admin',
      state: 'admin',
      type: 'dropdown',
      roles: ['admin']
    });

    Menus.addMenuItem('topbar', {
      title: 'Home',
      state: 'home',
      type: 'item',
      roles: ['*']
    });



    Menus.addMenuItem('topbar', {
      title: 'Topics',
      state: 'topics',
      type: 'item',
      roles: ['*']
    });

    Menus.addMenuItem('topbar', {
      title: 'Fees',
      state: 'fees',
      type: 'item',
      roles: ['*']
    });

    Menus.addMenuItem('topbar', {
      title: 'About',
      state: 'about',
      type: 'item',
      roles: ['*']
    });

    Menus.addMenuItem('topbar', {
      title: 'Portfolio',
      state: 'portfolio',
      type: 'item',
      roles: ['*']
    });

    Menus.addMenuItem('topbar', {
      title: 'Contact',
      state: 'contact',
      type: 'item',
      roles: ['*']
    });
  }
]);
