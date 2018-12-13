import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.css']
})
export class PiechartComponent implements OnInit {

  constructor() { }

  ngOnInit() {


    var margin = { top: 20, left: 80, bottom: 50, right: 10 };
    var width = 800 - margin.left - margin.right;
    var height = 600 - margin.top - margin.bottom;
    var numPoints = 0;
    var numTexts = 0;

    var svg = d3.select("#PieChart1Div").append("svg")
      .attr("id","svgidone")
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');


      // resize()
      // d3.select(window).on('resize', resize);
      // resize()

      // var width = parseInt(d3.select('#svgidone').style('width')) - margin.left - margin.right;
      // // console.log("resize here")
      // var height = parseInt(d3.select('#svgidone').style('height')) - margin.top - margin.bottom;

      // // console.log(width)
      // d3.select('#svgidone').attr('width', width)
      //   .attr('height', height)

    //  svg.append("rect")
    //  .attr('x',)
    //  .attr('y')

    //  svg.append("rect")
    //     .attr("x", '700')
    //     .attr("y", '350')
    //     .attr("width", '15')
    //     .attr("height", '10')
    //     .attr("fill", "#66c2a4")


    // var svg = d3.select("#pieChart1"),
    //     width = +svg.attr("width"),
    //     height = +svg.attr("height"),
    var radius = Math.min(width, height) / 2,
      g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
    // var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00","#900bc5","#43cbc5","#f05d56"]);
    // var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#6b486b", "#d0743c", "#ff8c00"]);
    // var color = d3.scaleOrdinal([d3.schemeCategory10[2],d3.schemeCategory10[3],d3.schemeCategory10[5],d3.schemeCategory10[4],d3.schemeCategory10[9]])
    var color = d3.scaleOrdinal([d3.schemeSet3[3],d3.schemeSet3[4]])
    var pie = d3.pie<any>() //pie generator
      .sort(null)
      .value(function (d: any) {
        return d.value;
      });




      svg.append("rect")
      .attr("x", '0')
      .attr("y", '70')
      .attr('id','pathLine12r')
      .attr("width", '20')
      .attr("height", '15')
      .attr("fill", "#fb8072")
      .on("mouseover",function(this: any)
      {
        var tempId = this.id.toString()
        tempId = tempId.replace('r', '');
        // console.log(tempId)
        tempId = '#' + tempId
        // console.log(tempId)

        // console.log(this.toString())
        svg.select(tempId.toString()).attr("fill", "MediumVioletRed");
      })
      .on("mouseout",function(this: any)
      {
        var tempId = this.id.toString()
        tempId = tempId.replace('r', '');
        // console.log(tempId)
        tempId = '#' + tempId 
        console.log(tempId)

        // console.log(this.toString())
        svg.select(tempId.toString()).attr("fill", "#fb8072");
      })

      svg.append("text")
      .attr("x", '25')
      .attr("y", '83')
      // .attr("width", '15')
      // .attr("height", '10')
      .text("Less than 0.1")
      
      // .("text-anchor,"middle")


      svg.append("rect")
      .attr("x", '0')
      .attr("y", '10')
      .attr('id','pathLine13r')
      .attr("width", '20')
      .attr("height", '15')
      .attr("fill", "#80b1d3")
      .on("mouseover",function(this: any)
      {
        var tempId = this.id.toString()
        tempId = tempId.replace('r', '');
        // console.log(tempId)
        tempId = '#' + tempId

        console.log(tempId)
        svg.select(tempId.toString()).attr("fill", "darkorange");
      })
      .on("mouseout",function(this: any)
      {
        var tempId = this.id.toString()
        tempId = tempId.replace('r', '');
        // console.log(tempId)
        tempId = '#' + tempId

        console.log(tempId)
        // console.log(this.toString())
        svg.select(tempId.toString()).attr("fill", "#80b1d3");
      })


      svg.append("text")
      .attr("x", '25')
      .attr("y", '23')
      // .attr("width", '15')
      // .attr("height", '10')
      .text("Greater than or equal to 0.1")
      

      // console.log(color)

    var countryName = [];
    var path = d3.arc<any>()
      .outerRadius(radius - 10)
      .innerRadius(0); //make != 0 for a donut chart

    var label = d3.arc()
      .outerRadius(radius - 60)
      .innerRadius(radius - 60);

    // d3.json("MILoneYear(A7)2016Ver3.json", function (d) {
    //     d.value = +d.value;
    //     return d;
    // }).then(function (data) {

    // d3.json("MILoneYear(A7)2016Ver3.json", function (d) {

    //     d.value = +d.value;
    //     return d;
    // }).then(function (data) {
    d3.select('#tooltip-mid').classed('hidden', false);
    d3.select('#tooltip-midInfor').classed('hidden', false);
    
    d3.json("tradeImportanceAndWarsPoint1.json").then(function (data: any) 
    {

      data.value = +data.value;
      // console.log(data.value)
      var arc = g.selectAll(".arc")
        .data(pie(data)) //use pie generator to create the data needed for the each slice of the pie
        .enter().append("g")
        .attr("class", "arc");
      arc.append("path") //for each slide use arc path generator to draw the pie
        .attr("d", path)
        .attr("class", "pathLine")
        .attr("id", function (d: any) {
          countryName.push(d.data.category); 
          countryName.sort()
          color.domain(countryName.sort());
          numPoints = numPoints + 1;
          return "pathLine1" + (numPoints + 1).toString();
        })
        .attr("fill", function (d: any) {
          // console.log(color(d.data.value))
          return color(d.data.value); }); //get data from node (select and 0.__data__ in console)
      arc.append("text") //for each slide use label path generator to place the text
        .attr("transform", function (d: any) {
          // console.log(label.centroid(d));
          return "translate(" + label.centroid(d) + ")";
        })
        .attr("class", function () {
          return "textonpie"
        })
        .attr("id", function () {
          numTexts = numTexts + 1;
          return "textonpie" + (numTexts + 1).toString();
        })
        // .attr("dy", "0.5em")
        .text(function (d: any) { return d.data.per+'%'; });


      arc.selectAll(".pathLine")
        .on('mouseover', function (this: any, d: any) {
          var idString = "#" + this.id.toString();
          idString = String(idString)
          console.log(this.id.toString())

          
          // d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
          // d3.select(idString).attr("fill", "red")
          // #80b1d3
          d3.select('#card-subtitle1').html('');
          d3.select('#card-subtitle2').html('');

          d3.select('#card-name-pie1').html("Information");
          
          d3.select('#card-desc-pie1').html('category: ' + d.data.category + '<br/>' +
            'Number of cases: ' + d.data.value + ' <br/>' + 
            'Percentage: ' + d.data.per +'%'+' <br/>');
          d3.select('#card-desc2-pie1').html('');
          // d3.select('#card-subtitle2').html('');
          // d3.select('#card-desc').html('Expenditure: ' + d.data.value+ ' % of GDP<br/>');
        })
        .on('mouseout', function (this: any) {
          // console.log(this);
          var idString = "#" + this.id.toString()
          idString = String(idString)
          
          // d3.select(idString).attr("fill", String(d3.select(idString).attr("fillX")));
          // d3.select(idString).attr("fill", "#f0027f")
          d3.select('#card-subtitle1').html('Data');
          d3.select('#card-subtitle2').html('How to interact with this pie chart');

          d3.select('#card-name-pie1').html('Generic Information');
          
          d3.select('#card-desc-pie1').html('This data is about war records between two countries from 1823 to 2003. The data set is provided by <a href="http://www.correlatesofwar.org/">this the Correlates of War project</a>');
          // d3.select('#card-desc-pie1').html(' This data is about military expenditure for the 5 countries. Some information is from <a href="https://en.wikipedia.org/wiki/Military_budget">this wikipedia</a>. U.S.A has the highest average. On the other hand, China has the lowest value among the 5 countries.');
          
          d3.select('#card-desc2-pie1').html('By mouseovering the each pie, you can check the percentage. If "Less than 0.1" represents that War outbreaks between two countries whose maximum value of trade dependency is less than 0.1');
        });




      arc.selectAll(".textonpie")
        .on('mouseover', function (this: any, d: any) {
          // console.log("I am on the text!!!!");
          // console.log(this);
          var idString = "#" + this.id.toString();
          // console.log(idString);
          idString = String(idString)

          d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
          // d3.select(idString).attr("fill","#f0027f")

          d3.select('#card-subtitle1').html('');
          d3.select('#card-subtitle2').html('');

          d3.select('#card-name-pie1').html("Information");
          d3.select('#card-desc-pie1').html('category: ' + d.data.category + '<br/>' +
            'Number of cases: ' + d.data.value + ' <br/>'+ 
            'Percentage: ' + d.data.per + '%'+' <br/>');
          d3.select('#card-desc2-pie1').html('');
          // d3.select('#card-subtitle2').html('');
          // d3.select('#card-desc').html('Expenditure: ' + d.data.value+ ' % of GDP<br/>');
        })
        .on('mouseout', function (this: any) {
          // console.log(this);
          var idString = "#" + this.id.toString()
          idString = String(idString)
          d3.select(idString).attr("fill", String(d3.select(idString).attr("fillX")));

          d3.select('#card-subtitle1').html('Data');
          d3.select('#card-subtitle2').html('How to interact with this pie chart');

          // d3.select('#tooltip-pie1').classed('hidden', true);
          d3.select('#card-name-pie1').html('Generic Information');
          d3.select('#card-desc-pie1').html('This data is about war records between two countries from 1823 to 2003. The data set is provided by <a href="http://www.correlatesofwar.org/">this the Correlates of War project</a>');
          // d3.select('#card-desc-pie1').html(' This data is about military expenditure for the 5 countries. Some information is from <a href="https://en.wikipedia.org/wiki/Military_budget">this wikipedia</a>. U.S.A has the highest expenditure. On the other hand, Germany has the lowest value among the 5 countries.');
          // d3.select('#card-desc').html('5 countries.<br/><br/><br/>');
          d3.select('#card-desc2-pie1').html('By mouseovering the each pie, you can check the percentage. If "Less than 0.1" represents that War outbreaks between two countries whose maximum value of trade dependency is less than 0.1');
        });


    });



    function resize() {
      console.log("resize here")

      var width = parseInt(d3.select('#svgidone').style('width')) - margin.left - margin.right;
      // console.log("resize here")
      var height = parseInt(d3.select('#svgidone').style('height')) - margin.top - margin.bottom;

      // console.log(width)
      d3.select('#svgidone').attr('width', width)
        .attr('height', height)

      // var xScale = xScale.range([0, width]);
      // var yScale = yScale.range([height, 0]).nice();

      // svg.selectAll('.bar')
      //   // .data(dataset, function (d: any) { return d.name; })  //UPDATE
      //   .data(dataset, function (d: any) { return d.country;})
      //   .attr('x', function (d) { return xScale(d.country); })
      //   .attr('y', function (d) { return yScale(d.gravity); })
      //   .attr('width', xScale.bandwidth())
      //   .attr('height', function (d) { return height - yScale(d.gravity); });

      // if (width < 550 || height < 90) {
      //   svg.select('.x.axis').style('display', 'none');
      //   svg.select('.y.axis').style('display', 'none');

      //   svg.selectAll('.bar')
      //     .data(dataset, function (d: any) { return d.country; })  //UPDATE
      //     .attr('x', function (d: any) { return xScale(d.country) + xScale.bandwidth() / 2; })
      //     .attr('y', function (d: any) { return height + 10; })
      //     .style('display', 'initial');

      //   svg.selectAll('.gravity')
      //     .data(dataset, function (d: any) { return d.country; })  //UPDATE
      //     .attr('x', function (d: any) { return xScale(d.country) + xScale.bandwidth() / 2; })
      //     .attr('y', function (d: any) { return height + 20; })
      //     .style('display', 'initial');
      // } else {
      //   yAxis.ticks(Math.max(height / 50, 2));  //one every 50 pixels
      //   xAxis.ticks(Math.max(width / 50, 2));

      //   svg.select('.x.axis')
      //     .attr('transform', 'translate(0,' + height + ')')
      //     .call(xAxis);

      //   svg.select('.y.axis')
      //     .call(yAxis);

      //   svg.select('.x.axis').style('display', 'initial');
      //   svg.select('.y.axis').style('display', 'initial');
      //   svg.selectAll('.name').style('display', 'none');
      //   svg.selectAll('.gravity').style('display', 'none');
      // }




    }


    
  }

}
