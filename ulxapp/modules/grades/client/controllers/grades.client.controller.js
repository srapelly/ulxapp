'use strict';

// Grades controller
angular.module('grades').controller('GradesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Grades',
  function ($scope, $stateParams, $location, Authentication, Grades) {
    $scope.authentication = Authentication;

    // Create new Grades
    $scope.create = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'gradeForm');

        return false;
      }

      // Create new Grades object
      var grade = new Grades({
        name: this.name,
        code: this.code,
        standard: this.standard
      });

      // Redirect after save
      grade.$save(function (response) {
        $location.path('grades/' + response._id);

        // Clear form fields
        $scope.name = '';
        $scope.code = '';
        $scope.standard = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Remove existing Grades
    $scope.remove = function (grade) {
      if (grade) {
        grade.$remove();

        for (var i in $scope.grades) {
          if ($scope.grades[i] === grade) {
            $scope.grades.splice(i, 1);
          }
        }
      } else {
        $scope.grade.$remove(function () {
          $location.path('grades');
        });
      }
    };

    // Update existing Grades
    $scope.update = function (isValid) {
      $scope.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'gradeForm');

        return false;
      }

      var grade = $scope.grade;

      grade.$update(function () {
        $location.path('grades/' + grade._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    // Find a list of Grades
    $scope.find = function () {
      $scope.grades = Grades.query();
    };

    // Find existing Grades
    $scope.findOne = function () {
      $scope.grade = Grades.get({
        gradeId: $stateParams.gradeId
      });
    };
  }
]);
