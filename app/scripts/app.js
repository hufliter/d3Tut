'use strict';

/**
 * @ngdoc overview
 * @name tutD3AngApp
 * @description
 * # tutD3AngApp
 *
 * Main module of the application.
 */
angular
  .module('tutD3AngApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/bar-chart', {
        templateUrl: 'views/barChart.html',
        controller: 'MainCtrl',
        controllerAs: 'barchart'  
      })
      .when('/scatter-chart', {
        templateUrl: 'views/scatterChart.html',
        controller: 'MainCtrl',
        controllerAs: 'scatterchart'  
      })
      .when('/line-chart', {
        templateUrl: 'views/lineChart.html',
        controller: 'MainCtrl',
        controllerAs: 'linechart'  
      })
      .when('/pie-chart', {
        templateUrl: 'views/pieChart.html',
        controller: 'MainCtrl',
        controllerAs: 'piechart'  
      })
      .when('/stacked-bar', {
        templateUrl: 'views/stackedBar.html',
        controller: 'MainCtrl',
        controllerAs: 'stackedbar'  
      })
      .when('/grouped-bar', {
        templateUrl: 'views/groupedBar.html',
        controller: 'MainCtrl',
        controllerAs: 'groupedbar'  
      })
      .when('/play-ground', {
        templateUrl: 'views/playGround.html',
        controller: 'MainCtrl',
        controllerAs: 'playground'  
      })
      .when('/scatter-bar-trans', {
        templateUrl: 'views/scatterChartTrans.html',
        controller: 'MainCtrl',
        controllerAs: 'scatterTrans'  
      })
      .otherwise({
        redirectTo: '/'
      });
  });
