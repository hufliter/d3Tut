'use strict';

describe('Directive: playGround', function () {

  // load the directive's module
  beforeEach(module('tutD3AngApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<play-ground></play-ground>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the playGround directive');
  }));
});
