d3.csv("data_2014.csv").then(function (data) {
      var dataset = data;
      var svg = d3.select("#svg_barchart"),
        margin = {top: 20, left: 80, bottom: 40, right: 60},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

      var x = d3.scaleBand()
            .domain(data.map(function (d) { return d.country_abv; }))
            .range([0, width])
            .padding(0.05);


      var y = d3.scaleLinear()
            .domain([0, 5337800])
            .range([height, 0]);
            // d3.max(data, function(d) { return d.value; })
      var xAxis = d3.axisBottom()
            .scale(x);
      var yAxis = d3.axisLeft()
            .scale(y);
      var svg = d3.select("#svg_barchart2").append('svg')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

      svg.selectAll('.bar')
            .data(dataset)
            .enter()
            .append('rect')
            .attr("class", "bar")
            .attr('x', function (d) { return x(d.country_abv); })
            .attr("width", x.bandwidth())
            .attr('y', function (d) { return y(d.value); })
            .attr('height', function (d) { return height - y(d.value);})
            .attr('fill', '#46B4AF')
        .attr('stroke', 'black')
        .attr('stroke-width', '1px')
        .on("mouseover", function(d) {
            div.transition()
            .duration(200)
            .style("opacity", .9);
            div.html("Country: " + d["country_name"] + "<br/>" + "Total Trade Value: " + d.value)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
            .duration(500)
            .style("opacity", 0);
        });

      svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);
      svg.append("g")
            .call(yAxis);
      svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -80)
            .attr("x", -160)
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Total Trade ($USD Millions)");
      svg.append("text")
            .attr("y", height + 35)
            .attr("x", width / 2)
            .style("text-anchor", "middle")
            .text("Country");
});
