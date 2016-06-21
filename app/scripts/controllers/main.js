'use strict';

/**
 * @ngdoc function
 * @name tutD3AngApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tutD3AngApp
 */
angular.module('tutD3AngApp')
  .controller('MainCtrl', function ($scope) {
  	$scope.barChartData = [
		{ name: 'red', score: 42 },
		{ name: 'green', score: 78 },
		{ name: 'blue', score: 88 },
		{ name: 'pink', score: 58 },
	];
});
