'use strict';

/**
 * @ngdoc directive
 * @name tutD3AngApp.directive:playGround
 * @description
 * # playGround
 */
angular.module('tutD3AngApp')
  .directive('playGround', function () {
    return {
      	restrict: 'EA',
      	link: function postLink(scope, element, attrs) {
      		var width = 960,
			    height = 550,
				radius = Math.min(width, height) / 2;


        	var svg = d3.select(element[0])
				.append("svg")
				.style('width',width)
				.style('height',height)
				.append("g")

			svg.append("g")
				.attr("class", "slices");
			svg.append("g")
				.attr("class", "labels");
			svg.append("g")
				.attr("class", "lines");

			var pie = d3.layout.pie()
				.sort(null)
				.value(function(d) {
					return d.value;
				});

			var arc = d3.svg.arc()
				.outerRadius(radius * 0.8)
				.innerRadius(radius * 0.4);

			var outerArc = d3.svg.arc()
				.innerRadius(radius * 0.9)
				.outerRadius(radius * 0.9);

			svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

			var key = function(d){ return d.data.label; };

			var color = d3.scale.ordinal()
				.domain(["Lorem ipsum", "dolor sit", "amet"])
				.range(["#98abc5", "#8a89a6", "#7b6888"]);

			//create random data function
			function randomData (){
				var labels = color.domain();
				return labels.map(function(label){
					return { label: label, value: Math.random() }
				});
			}


			//create function change when click button
			function change(data) {
				var slice = svg.select(".slices").selectAll("path.slice")
					.data(pie(data), key);

				slice.enter()
					.insert("path")
					.style("fill", function(d) { return color(d.data.label); })
					.attr("class", "slice");

				slice		
					.transition().duration(1000)
					.attrTween("d", function(d) {
						this._current = this._current || d;
						var interpolate = d3.interpolate(this._current, d);
						this._current = interpolate(0);
						return function(t) {
							return arc(interpolate(t));
						};
					})

				slice.exit()
					.remove();


				var text = svg.select(".labels").selectAll("text")
					.data(pie(data), key);

				text.enter()
					.append("text")
					.attr("dy", ".35em")
					.text(function(d) {
						return d.data.label;
					});
				
				function midAngle(d){
					return d.startAngle + (d.endAngle - d.startAngle)/2;
				}

				text.transition().duration(1000)
					.attrTween("transform", function(d) {
						this._current = this._current || d;
						var interpolate = d3.interpolate(this._current, d);
						this._current = interpolate(0);
						return function(t) {
							var d2 = interpolate(t);
							var pos = outerArc.centroid(d2);
							pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
							return "translate("+ pos +")";
						};
					})
					.styleTween("text-anchor", function(d){
						this._current = this._current || d;
						var interpolate = d3.interpolate(this._current, d);
						this._current = interpolate(0);
						return function(t) {
							var d2 = interpolate(t);
							return midAngle(d2) < Math.PI ? "start":"end";
						};
					});

				text.exit()
					.remove();


				var polyline = svg.select(".lines").selectAll("polyline")
					.data(pie(data), key);
				
				polyline.enter()
					.append("polyline");

				polyline.transition().duration(1000)
					.attrTween("points", function(d){
						this._current = this._current || d;
						var interpolate = d3.interpolate(this._current, d);
						this._current = interpolate(0);
						return function(t) {
							var d2 = interpolate(t);
							var pos = outerArc.centroid(d2);
							pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
							return [arc.centroid(d2), outerArc.centroid(d2), pos];
						};			
					});
				polyline.exit()
					.remove();
			};

			change(randomData());

			d3.select(".randomize")
			.on("click", function(){
				change(randomData());
			});

			//Test purpose Selection Exit
			/*var numbers  = [1, 2, 4, 8, 16, 32];
			function updateTest(){
				var selection = d3.select(".exit")
				    .selectAll(".bar").data(numbers)
				    .style("height", function(d){ 
				      return d + "px"; 
				    })
				    .style("margin-top", function(d){ 
				      return (100 - d) + "px"; 
				    });
				selection.enter()
				    .append("div").attr("class", "bar")
				    .style("height", function(d){
				      	return d + "px"; 
				    })
				    .style("margin-top", function(d){ 
				      	return (100 - d) + "px"; 
				    })
				    .on("click", function(e, i){
				    	// console.log(e);
				      	// numbers.splice(i, 1);
				      	numbers[i] += 15;
				      	// console.log(numbers[i]);
				      	updateTest();
				    });

				selection.transition().duration(1000)
				.styleTween("height", function(d){
				})
			  	selection.exit().remove();
			}
			updateTest();*/

      	}
    };
});
