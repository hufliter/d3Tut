'use strict';

/**
 * @ngdoc directive
 * @name tutD3AngApp.directive:barChart
 * @description
 * # barChart
 */
angular.module('tutD3AngApp')
  .directive('barChart', function (d3Service, $window) {
    return {
      restrict: 'AE',
      scope: {
  		data: '='
      },
      link: function postLink(scope, element, attrs) {
        d3Service.d3().then( function(d){
        	var margin = parseInt(attrs.margin) || 20,
          		barHeight = parseInt(attrs.barHeight) || 20,
      			barPadding = parseInt(attrs.barPadding) || 5;

        	var svg = d3.select(element[0]).append('svg').style('width', '100%');

        	window.onresize = function(){
        		scope.$apply();
        	}

        	//add example data
        	// scope.barChartData = [
        	// 	{ name: 'red', score: 42 },
        	// 	{ name: 'green', score: 78 },
        	// 	{ name: 'blue', score: 88 },
        	// 	{ name: 'pink', score: 58 },
        	// ];

        	//Watch for resize event
        	scope.$watch(function(){
        		return angular.element($window)[0].innerWidth;
        	}, function(){
        		scope.render(scope.data);
        	});

        	scope.render = function(data){
        		//our custom d3 code here
        		svg.selectAll('*').remove();

        		//chekc if dont pass any data, return
        		if( !data ) return;

        		//setup variable
        		var width = d3.select(element[0]).node().offsetWidth - margin,
        		//explain above: select first ele -> return first node in selection -> get offset width - margin
        		
        		//calculate the height
        		height = scope.data.length * (barHeight + barPadding),

        		//Use the category20() scale function for multicolor support
        		color = d3.scale.category20(),
        		// our XScale
        		XScale = d3.scale.linear().domain([0, d3.max(data, function(d){
        			return d.score;
        		})]).range([0, width]);

        		// set the height base on the calculator above
        		svg.attr('height', height);

        		//create retangle for thebar chart
        		svg.selectAll('rect')
        		.data(data)
        		.enter()
        		.append('rect')
        		.attr('height', barHeight)
        		.attr('width', 140)
        		.attr('x', Math.round(margin/2))
        		.attr('y', function(d, i) {
        			return i * (barHeight + barPadding);
        		})
        		.attr('fill', function(d) {
        			return color(d.score);
        		})
        		.transition()
        		.duration(1000)
        		.attr('width', function(d){
        			return XScale(d.score);
        		});
        	}

        	scope.$watch('data', function(newVals, oldVals){
        		return scope.render(newVals);
        	}, true);
        });
      }
    };
  });
