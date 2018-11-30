
	var div = d3.select("body").append("div")
	.attr("class", "tooltip")
	.style("opacity", 0);

d3.csv("bardata1.csv").then(d => chart(d));

function chart(csv) {

	csv.forEach(function(d) {
		d.year = d.date; d.country = d.code;
		d.value = +d.value;
		return d;
	})

	var countries = [...new Set(csv.map(d => d.country))],
		years  = [...new Set(csv.map(d => d.year))];


	var options = d3.select("#year").selectAll("option")
		.data(years)
	.enter().append("option")
		.text(d => d)

	var svg = d3.select("#chart"),
		margin = {top: 20, left: 80, bottom: 40, right: 60},
		width = +svg.attr("width") - margin.left - margin.right,
		height = +svg.attr("height") - margin.top - margin.bottom;


	var x = d3.scaleBand()
		.range([margin.left, width - margin.right])
		.padding(0.1)
		.paddingOuter(0.2)

	var y = d3.scaleLinear()
		.range([height - margin.bottom, margin.top])


	var xAxis = g => g
		.attr("transform", "translate(0," + (height - margin.bottom) + ")")
		.call(d3.axisBottom(x).tickSizeOuter(0))

	var yAxis = g => g
		.attr("transform", "translate(" + margin.left + ",0)")
		.call(d3.axisLeft(y))

	svg.append("g")
		.attr("class", "x-axis")

	svg.append("g")
		.attr("class", "y-axis")

	update(d3.select("#year").property("value"), 0)

	function update(year, speed) {

		var data = csv.filter(f => f.year == year)

		y.domain([0, d3.max(data, d => d.value)]).nice()


		svg.selectAll(".y-axis").transition().duration(speed)
			.call(yAxis);

		data.sort(d3.select("#sort").property("checked")
			? (a, b) => b.value - a.value
			: (a, b) => countries.indexOf(a.country) - countries.indexOf(b.country))

		x.domain(data.map(d => d.country))

		svg.selectAll(".x-axis").transition().duration(speed)
			.call(xAxis)



		var bar = svg.selectAll(".bar")
			.data(data, d => d.country)

		bar.exit().remove();



		bar.enter().append("rect")
			.attr("class", "bar")
			.attr("width", x.bandwidth())
			.merge(bar)
		.transition().duration(speed)
			.attr("x", d => x(d.country))
			.attr("y", d => y(d.value))
			.attr("height", d => y(0) - y(d.value))
			.attr('fill', '#46B4AF')
			.attr('stroke', 'black')
			.attr('stroke-width', '1px')

			svg.selectAll('rect')
			.on("mouseover", function(d) {
					div.transition()
					.duration(200)
					.style("opacity", .9);
					div.html("Total Trade Value: " + d.value)
					.style("left", (d3.event.pageX) + "px")
					.style("top", (d3.event.pageY) + "px");
			})
			.on("mouseout", function(d) {
					div.transition()
					.duration(500)
					.style("opacity", 0);
			});

	}

	d3.select('#chart').append('text')
		.attr('x', 425)
		.attr('y', 450)
		.attr('text-anchor', 'middle')
		.attr("font-family","arial")
		.text('Country')
	d3.select('#chart').append('text')
		.attr('x', -200)
		.attr('y', 13)
		.attr("text-anchor", "middle")
		.attr("font-family","arial")
		.text('Total Trade Value')
		.attr("transform", "rotate(-90)");

	chart.update = update;
}

var select = d3.select("#year")
	.style("border-radius", "5px")
	.on("change", function() {
		chart.update(this.value, 750)
	})

var checkbox = d3.select("#sort")
	.style("margin-left", "45%")
	.on("click", function() {
		chart.update(select.property("value"), 800)
	})
