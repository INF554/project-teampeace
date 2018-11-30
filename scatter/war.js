d3.csv("war.csv", function (d) {
return {
year: d.year,
count: +d.count,
countWars: +d.countWars
};
}).then(function (data) {
console.log(data);
});

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

    d3.csv("war.csv").then(function(data) {
      var margin = { top: 10, left: 50, bottom: 90, right: 50 };
      var width = 1400 - margin.left - margin.right;
      var height = 700 - margin.top - margin.bottom;
      var svg = d3.select('#chart2')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
      var year = data.map(function(t){ return t.year; });
      var x = d3.scaleLinear()
        .domain([1823, 2003])
        .range([0, width]);
      var y = d3.scaleLinear()
        .domain([0, 10])
        .range([height, 0]);
      svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', 10)
        .attr('cx', function (d, i) { return x(d.year); })
        .attr('cy', function (d) { return y(d.countWars); })
        .attr('transform', 'translate(' + 0 + ', 0)')
        .attr('fill', '#46B4AF')
        .attr('stroke', 'black')
        .attr('stroke-width', '1px')
        .on("mouseover", function(d) {
            div.transition()
            .duration(200)
            .style("opacity", .9);
            div.html("Year:" + d["year"] + "<br/>" + "Number of Wars:" + d.countWars)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
            .duration(500)
            .style("opacity", 0);
        });


      var xAxis = d3.axisBottom()
        .scale(x)
        .ticks(10, 'd');
      svg.append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)
        .selectAll('text')
        .attr('text-anchor', 'start')
        .attr('transform', 'rotate(25)');
      var yAxis = d3.axisLeft()
        .scale(y)
        .ticks(10, 'd')
      svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis);
      d3.select('#chart2').append('text')
        .attr('x', 700)
        .attr('y', 650)
        .attr('text-anchor', 'middle')
        .attr("font-family","arial")
        .text('Year')
      d3.select('#chart2').append('text')
        .attr('x', -250)
        .attr('y', 15)
        .attr("text-anchor", "middle")
        .attr("font-family","arial")
        .text('Number of Wars')
        .attr("transform", "rotate(-90)");
      d3.select('#chart2').append("text")
        .attr("x", "700")
        .attr("y", "30")
        .attr("text-anchor", "middle")
        .attr("fill", "rgb(50, 62, 85)")
        .attr("font-size", "22px")
        .attr("font-family","arial")
        .text("War Data from 1823 to 2003")

    });
