import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bubbleformajorpow',
  templateUrl: './bubbleformajorpow.component.html',
  styleUrls: ['./bubbleformajorpow.component.css']
})
export class BubbleformajorpowComponent implements OnInit {

  constructor() { }

  ngOnInit() {



    // var diameter = 750,
    var diameter = 600,
      format = d3.format(",d");
    // var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#900bc5", "#43cbc5", "#f05d56"]);
    var color=d3.scaleOrdinal(d3.schemeCategory10)
    // console.log(d3.schemeCategory10)
    var countryName=[];
    
    var bubble = d3.pack()
      .size([diameter, diameter])
      .padding(1.5);
     

    // d3.json("Mil2016EachParty.json").then(function (data: any) {
    d3.json("MilRealExpend2018MajorForBubble.json").then(function (data: any) {
      // d3.json("MIL10YearAver(A8)Ver2.json").then(function (data) {
      d3.select('#tooltip-bub1').classed('hidden', true);

      // console.log(data.name);

      var svg = d3.select("#BubbleChart1Div").append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
        .attr("class", "bubble");

      var root = d3.hierarchy(classes(data))
        .sum(function (d: any) {
          // console.log(d);  
          return d.value;
        })
        .sort(function (a, b) { return b.value - a.value; });

      bubble(root);
      var node = svg.selectAll(".node")
        .data(root.children)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function (d: any) { return "translate(" + d.x + "," + d.y + ")"; });

      // node.append("title")
      //   .text(function(d) { return d.data.className + ": " + format(d.value); });

      node.append("circle")
        .attr("class", "cir1")
        .attr("r", function (d: any) {
          // console.log(d)
          countryName.push(d.data.className); 
          countryName.sort()
          color.domain(countryName.sort());
          return d.r;
        }).style("fill", function (d: any) {
          return color(d.data.className);
  
          // return color(d.data); 
          // return "#ff4572"; 
        });
        
        // console.log(countryName.sort());
      // color.domain(countryName.sort());
        // console.log(countryName)
      
      // node.attr("fill", function (d: any) {
      //   return color(d.data.className);

      //   // return color(d.data); 
      //   // return "#ff4572"; 
      // });


      node.append("text")
        // .attr("dy", "3em")
        .style("text-anchor", "middle")
        .text(function (d: any) {
          // console.log(d)
          return d.data.className.substring(0, d.r / 3);
        });
        


      node.selectAll('.cir1')
        .on('mouseover', function (d: any) {
          
          //set relative to mouse
          // var xPosition = parseFloat(d3.mouse(this)[0]);
          var xPosition = d.x + 50;
          xPosition += (xPosition > diameter) ? -200 : 50;  //switch sides
          if (xPosition>500)
          {
            xPosition=xPosition-500
          }
          // var yPosition = parseFloat(d3.mouse(this)[1]);
          var yPosition = d.y - 50;
          yPosition += (yPosition > diameter) ? -50 : 80;  //switch up/bottom
          d3.select('#tooltip-bub1')
            .style('left', xPosition + 'px')
            .style('top', yPosition + 'px')
            .select('#planet-info-bub1')
            .html('<h4>' + d.data.className + '</h4>' + 'Expenditure: ' +'$'+d.data.value +' <br/>');
          d3.select('#tooltip-bub1').classed('hidden', false);

          // d3.select('#card-name-bub1').html(d.data.className);
          // d3.select('#card-desc-bub1').html('country: ' + d.data.value);
          
        })
        .on('mouseout', function () {
          d3.select('#tooltip-bub1').classed('hidden', true);
          // d3.select('#card-name-bub1').html('Country Information');
          // d3.select('#card-desc-bub1').html('Mouse over bars for quick facts.<br/><br/><br/>');
        });

      // node.select('.x.axis').style('display', 'initial');
      // node.select('.y.axis').style('display', 'initial');
      // node.selectAll('.name').style('display', 'none');
      // node.selectAll('.gravity').style('display', 'none');

      d3.select('#tooltip-bub1').classed('hidden', true);

    });


    
    // Returns a flattened hierarchy containing all leaf nodes under the root.
    function classes(root) {
      var classes = [];

      function recurse(name, node) {
        if (node.children) node.children.forEach(function (child) { recurse(node.name, child); });
        else classes.push({ packageName: name, className: node.name, value: node.expenditure });
      }

      recurse(null, root);
      return { children: classes };
    }

    d3.select(self.frameElement).style("height", diameter + "px");

  }

}
