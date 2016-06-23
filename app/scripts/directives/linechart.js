'use strict';

/**
 * @ngdoc directive
 * @name tutD3AngApp.directive:lineChart
 * @description
 * # lineChart
 */
angular.module('tutD3AngApp')
  .directive('lineChart', function (d3Service) {
    return {
      	restrict: 'EA',
      	scope: {},
      	link: function postLink(scope, element, attrs) {
    		var margin = { top: 20 , right: 15 , bottom: 60 , left: 60 },
    			width = 960 - margin.left - margin.right,
    			height = 500 - margin.top - margin.bottom;
			var formatDate = d3.time.format('%d-%b-%y');
			var x = d3.time.scale()
			.range([0, width]);

			var y = d3.scale.linear()
			.range([height, 0]);

			var xAxis = d3.svg.axis()
			.scale(x)
			.orient('bottom');

			var yAxis = d3.svg.axis()
			.scale(y)
			.orient('left');

			var line = d3.svg.line()
			.x(function(d){ return x(d.date); })
			.y(function(d){ return y(d.close); });

			//area
			var area = d3.svg.area()
			.x(function(d){ return x(d.date); })
			.y0(height)
			.y1(function(d){ return y(d.close); });

			var svg = d3.select(element[0]).append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', 'translate(' + margin.left + "," + margin.top + ")");
			
			d3.tsv('data/lineChartData.tsv', type, function(err, data){
				if( err ) throw err;
				x.domain(d3.extent(data, function(d) { return d.date; }));
				y.domain(d3.extent(data, function(d){ return d.close }));

				svg.append('g')
				.attr('class', 'x axis')
				.attr('transform', 'translate(0,'+ height + ')')
				.call(xAxis);

				svg.append('g')
				.attr('class','y axis')
				.call(yAxis)
				.append('text')
				.attr('transform',"rotate(-90)")
				.attr('y' , 6)
				.attr('dy', '.71em')
				.style('text-anchor', 'end')
				.text('Price ($)');

				svg.append('path')
				.datum(data)
				.attr('class', 'area')
				.attr('d', area)
				.attr('opacity', '0.15')
				.transition().duration(1000);
			});

			function type(d){
				d.date = formatDate.parse(d.date);
				d.close = +d.close;
				return d;
			}
      	}
	};
});
