'use strict';

describe('Articles E2E Tests:', function () {
  describe('Test grades page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/grades');
      expect(element.all(by.repeater('grade in grades')).count()).toEqual(0);
    });
  });
});
