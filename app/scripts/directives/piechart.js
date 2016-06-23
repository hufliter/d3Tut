'use strict';

/**
 * @ngdoc directive
 * @name tutD3AngApp.directive:pieChart
 * @description
 * # pieChart
 */
angular.module('tutD3AngApp')
  .directive('pieChart', function (d3Service) {
    return {
      	restrict: 'EA',
      	scope: {},
      	link: function postLink(scope, element, attrs) {
    		var width = 960,
				height = 500,
				radius = Math.min(width, height) / 2;
			var color = d3.scale.ordinal()
			.range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

			var arc = d3.svg.arc()
			.outerRadius(radius - 10)
			.innerRadius(0);

			var labelArc = d3.svg.arc()
			.outerRadius(radius - 40)
			.innerRadius(radius - 40);

			var pie = d3.layout.pie()
			.sort(null)
			.value(function(d){ return d.population; });

			var svg = d3.select(element[0]).append('svg')
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr('transform', 'translate(' + width / 2 + "," + height / 2 + ")");

			d3.csv('data/pieChartData.csv', type, function(err, data){
				if( err ) throw err;
				var g = svg.selectAll('.arc')
				.data(pie(data))
				.enter()
				.append('g')
				.attr('class', 'arc');

				g.append('path')
				.attr('d', arc)
				.style('fill', function(d){ return color(d.data.age); });

				g.append('text')
				.attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
				.attr("dy", ".35em")
				.style('font', '10px san-serif')
				.style('text-anchor','middle')
				.text(function(d) { return d.data.age; });
			});
			function type(d){
				d.population = +d.population;
				return d;
			}
      	}
    };
});
