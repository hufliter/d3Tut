'use strict';

/**
 * @ngdoc directive
 * @name tutD3AngApp.directive:scatterBarTrans
 * @description
 * # scatterBarTrans
 */
angular.module('tutD3AngApp')
  .directive('scatterBarTrans', function () {
    return {
      	restrict: 'EA',
      	link: function postLink(scope, element, attrs) {
        	/* Setup data */
        	var dataSet = [];
        	var numDataPoints = 15;
        	var maxRange = Math.random() * 1000;  // Max range of new values
        	for(var i=0; i < numDataPoints; i++) {
                var newNumber1 = Math.floor(Math.random() * maxRange);  // New random integer
                var newNumber2 = Math.floor(Math.random() * maxRange);  // New random integer
                dataSet.push([newNumber1, newNumber2]);  // Add new number to array
            }
            /*End Setup Data*/

            /*Setup setting for Chart*/
            var width = 600,
            	height = 400,
            	padding = 30;

        	var xScale = d3.scale.linear()
        				.domain([0, d3.max(dataSet, function(d){ return d[0]; })])
        				.range([padding, width - padding * 2]),
				yScale = d3.scale.linear()
						.domain([0, d3.max(dataSet, function(d){ return d[1]; })])
						.range([height - padding, padding]),
				xAxis = d3.svg.axis()
						.scale(xScale)
						.orient('bottom')
						.ticks(5),
				yAxis = d3.svg.axis()
						.scale(yScale)
						.orient('left')
						.ticks(5),
				svg = d3.select(element[0]).append('svg')
						.attr('width', width)
						.attr('height', height);

				svg.selectAll('circle').data(dataSet)
				.enter()
				.append('circle')
				.attr('cx', function(d){ return xScale(d[0]); })
				.attr('cy', function(d){ return yScale(d[1]); })
				.attr('r', 2);

				svg.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0,' + (height - padding ) + ')' )
				.call(xAxis);

				svg.append('g')
				.attr('class','y axis')
				.attr('transform', 'translate(' + padding + ',0)')
				.call(yAxis);

				d3.select('.update').on('click', function(){
					var dataSet = [];
		        	var numDataPoints = /*Math.floor(Math.random() * 50) + 1*/ 15;
		        	var maxRange = Math.random() * 1000;  // Max range of new values
		        	for(var i=0; i < numDataPoints; i++) {
		                var newNumber1 = Math.floor(Math.random() * maxRange);  // New random integer
		                var newNumber2 = Math.floor(Math.random() * maxRange);  // New random integer
		                dataSet.push([newNumber1, newNumber2]);  // Add new number to array
		            }

		            xScale.domain([0, d3.max(dataSet, function(d){ return d[0]; })]);
		            yScale.domain([0, d3.max(dataSet, function(d){ return d[1]; })]);

		            svg.selectAll('circle')
		            .data(dataSet)
		            .transition()
		            .duration(1000)
		            .each('start', function(){
		            	d3.select(this)
		            	.attr('fill', 'pink')
		            	.attr('r', 10);
		            })
		            .delay(function(d, i){
		            	return i / dataSet.length * 500;
		            })
		            .attr('cx', function(d){ return xScale(d[0]); })
		            .attr('cy', function(d){ return yScale(d[1]); })
		            .each('end', function(){
		            	d3.select(this)
		            	.transition()
		            	.duration(1000)
		            	.attr('fill', 'green')
		            	.attr('r', 2);
		            });

		            svg.select('.x.axis')
		            .transition()
		            .duration(1000)
		            .call(xAxis);

		            svg.select('.y.axis')
		            .transition()
		            .duration(1000)
		            .call(yAxis);

				});
            /*End setting for Chart*/
      	}
    };
});
