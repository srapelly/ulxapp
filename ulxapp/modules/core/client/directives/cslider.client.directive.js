'use strict';

/**
 * Edits by Satya Rapelly
 * Credit: WebThemez.com */

angular.module('core')
  .directive('csliderWidget', function() {
  return {
    // Restrict it to be an attribute in this case
    restrict: 'A',
    // responsible for registering DOM listeners as well as updating the DOM
    link: function(scope, element, attrs) {
        $(element).cslider({
          autoplay: true,
          bgincrement: 0
        });
    }
  };
});
