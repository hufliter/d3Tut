'use strict';

/**
 * @ngdoc directive
 * @name tutD3AngApp.directive:scatterChart
 * @description
 * # scatterChart
 */
angular.module('tutD3AngApp')
  .directive('scatterChart', function (d3Service, $window) {
    return {
      	restrict: 'EA',
      	scope: {},
      	link: function postLink(scope, element, attrs) {
        	d3Service.d3().then(function(){
        		//sample data
        		var data = [ [5,3], [1,2], [4,6], [2,8] ];
        		var margin = { top: 20 , right: 15 , bottom: 60 , left: 60 },
        			width = 960 - margin.left - margin.right,
        			height = 500 - margin.top - margin.bottom;

    			var x = d3.scale.linear().domain([0, d3.max(data, function(d){
    				return d[0];
    			})]).range([0, width]);

    			var y = d3.scale.linear().domain([0, d3.max(data, function(d){
    				return d[1];
    			})]).range([height, 0]);

    			var chart = d3.select(element[0]).append('svg:svg')
    			.attr('width', width + margin.right + margin.left)
    			.attr('height', height + margin.top + margin.bottom)
    			.attr('class', 'scatter_chart');

    			var main = chart.append('g').attr('transform', 'translate('+ margin.left + ',' + margin.top + ')')
    			.attr('width', width)
    			.attr('height', height)
    			.attr('class', 'main');

    			//draw the x Axis
    			var xAxis = d3.svg.axis()
    			.scale(x)
    			.orient('bottom');

    			main.append('g')
    			.attr('transform', 'translate(0,' + height + ')')
    			.attr('class', 'main axis date')
    			.call(xAxis);
    			//End draw x Axis

    			//draw the y Axis
    			var yAxis = d3.svg.axis()
    			.scale(y).
    			orient('left');

    			main.append('g')
    			.attr('transform', 'translate(0,0)')
    			.attr('class', 'main axis date')
    			.call(yAxis);
    			//end draw y Axis

    			var g = main.append('svg:g');
    			g.selectAll('scatter-dots')
    			.data(data)
    			.enter()
    			.append('svg:circle')
    			.attr('cx', function(d, i) { return x(d[0]); })
    			.attr('cy', function(d) { return y(d[1]); })
    			.attr('r', 8);

        	});
  		}
    };
});
