'use strict';

(function () {
  // Articles Controller Spec
  describe('Grades Controller Tests', function () {
    // Initialize global variables
    var GradesController,
      scope,
      $httpBackend,
      $stateParams,
      $location,
      Authentication,
      Grades,
      mockGrade;

    // The $resource service augments the response object with methods for updating and deleting the resource.
    // If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
    // the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
    // When the toEqualData matcher compares two objects, it takes only object properties into
    // account and ignores methods.
    beforeEach(function () {
      jasmine.addMatchers({
        toEqualData: function (util, customEqualityTesters) {
          return {
            compare: function (actual, expected) {
              return {
                pass: angular.equals(actual, expected)
              };
            }
          };
        }
      });
    });

    // Then we can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Authentication_, _Grades_) {
      // Set a new global scope
      scope = $rootScope.$new();

      // Point global variables to injected services
      $stateParams = _$stateParams_;
      $httpBackend = _$httpBackend_;
      $location = _$location_;
      Authentication = _Authentication_;
      Grades = _Grades_;

      // create mock grade
      mockGrade = new Grades({
        _id: '525a8422f6d0f87f0e407a44',
        name: 'Fifth',
        code: 'V',
        standard: '5'
      });

      // Mock logged in user
      Authentication.user = {
        roles: ['admin']
      };

      // Initialize the Grades controller.
      GradesController = $controller('GradesController', {
        $scope: scope
      });
    }));

    it('$scope.find() should create an array with at least one grade object fetched from XHR', inject(function (Grades) {
      // Create a sample grade array that includes the new grade
      var sampleGrades = [mockGrade];

      // Set GET response
      $httpBackend.expectGET('api/grades').respond(sampleGrades);

      // Run controller functionality
      scope.find();
      $httpBackend.flush();

      // Test scope value
      expect(scope.grades).toEqualData(sampleGrades);
    }));

    it('$scope.findOne() should create an array with one grade object fetched from XHR using a gradeId URL parameter', inject(function (Grades) {
      // Set the URL parameter
      $stateParams.gradeId = mockGrade._id;

      // Set GET response
      $httpBackend.expectGET(/api\/grades\/([0-9a-fA-F]{24})$/).respond(mockGrade);

      // Run controller functionality
      scope.findOne();
      $httpBackend.flush();

      // Test scope value
      expect(scope.grade).toEqualData(mockGrade);
    }));

    describe('$scope.create()', function () {
      var sampleGradePostData;

      beforeEach(function () {
        // Create a sample grade object
        sampleGradePostData = new Grades({
          name: 'Fifth',
          code: 'V',
          standard: '5'
        });

        // Fixture mock form input values
        scope.name = 'An Article about MEAN';
        scope.code = 'MEAN rocks!';
        scope.standard = '2';

        spyOn($location, 'path');
      });

      it('should send a POST request with the form input values and then locate to new object URL', inject(function (Grades) {
        // Set POST response
        $httpBackend.expectPOST('api/grades', sampleGradePostData).respond(mockGrade);

        // Run controller functionality
        scope.create(true);
        $httpBackend.flush();

        // Test form inputs are reset
        expect(scope.title).toEqual('');
        expect(scope.content).toEqual('');

        // Test URL redirection after the grades was created
        expect($location.path.calls.mostRecent().args[0]).toBe('grades/' + mockGrade._id);
      }));

      it('should set scope.error if save error', function () {
        var errorMessage = 'this is an error message';
        $httpBackend.expectPOST('api/grades', sampleGradePostData).respond(400, {
          message: errorMessage
        });

        scope.create(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      });
    });

    describe('$scope.update()', function () {
      beforeEach(function () {
        // Mock grade in scope
        scope.grade = mockGrade;
      });

      it('should update a valid grade', inject(function (Grades) {
        // Set PUT response
        $httpBackend.expectPUT(/api\/grades\/([0-9a-fA-F]{24})$/).respond();

        // Run controller functionality
        scope.update(true);
        $httpBackend.flush();

        // Test URL location to new object
        expect($location.path()).toBe('/grades/' + mockGrade._id);
      }));

      it('should set scope.error to error response message', inject(function (Grades) {
        var errorMessage = 'error';
        $httpBackend.expectPUT(/api\/grades\/([0-9a-fA-F]{24})$/).respond(400, {
          message: errorMessage
        });

        scope.update(true);
        $httpBackend.flush();

        expect(scope.error).toBe(errorMessage);
      }));
    });

    describe('$scope.remove(grade)', function () {
      beforeEach(function () {
        // Create new grades array and include the grade
        scope.grades = [mockGrade, {}];

        // Set expected DELETE response
        $httpBackend.expectDELETE(/api\/grades\/([0-9a-fA-F]{24})$/).respond(204);

        // Run controller functionality
        scope.remove(mockGrade);
      });

      it('should send a DELETE request with a valid gradeId and remove the grade from the scope', inject(function (Grades) {
        expect(scope.grades.length).toBe(1);
      }));
    });

    describe('scope.remove()', function () {
      beforeEach(function () {
        spyOn($location, 'path');
        scope.grade = mockGrade;

        $httpBackend.expectDELETE(/api\/grades\/([0-9a-fA-F]{24})$/).respond(204);

        scope.remove();
        $httpBackend.flush();
      });

      it('should redirect to grades', function () {
        expect($location.path).toHaveBeenCalledWith('grades');
      });
    });
  });
}());
