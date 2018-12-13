import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bubble-war-trade',
  templateUrl: './bubble-war-trade.component.html',
  styleUrls: ['./bubble-war-trade.component.css']
})
export class BubbleWarTradeComponent implements OnInit {

  constructor() { }

  ngOnInit() {


    

    var diameter = 750,
      format = d3.format(",d");
    // var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00", "#900bc5", "#43cbc5", "#f05d56"]);
    var color=d3.scaleOrdinal(d3.schemeSet3)
    // var color=d3.interpolateSpectral(t)
    // d3.interpolateRainbow(t)
    // console.log(d3.schemeCategory10)
    var countryName=[];
    
    var bubble = d3.pack()
      .size([diameter, diameter])
      .padding(1.5);


    d3.json("BothWarAndTradeInter10ForBubble.json").then(function (data: any) {
      // console.log(data)
      // d3.json("MIL10YearAver(A8)Ver2.json").then(function (data) {
      d3.select('#tooltip-bubwt1').classed('hidden', true);
      
      // console.log(data.name);

      var svg = d3.select("#bubwtbleChart1Div").append("svg")
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

          // console.log(color(d.data.className))

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
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("alignment-baseline", "middle")
        .text(function (d: any) {
          // console.log(d)
          return d.data.className.substring(0, d.r / 3);
        });
        


        // node.append("text")
        // .attr("dy", "3em")
        // .attr("x", "middle")
        // .attr("y", "middle")
        // .text(function (d: any) {
        //   // console.log(d)
        //   return d.data.className.substring(0, d.r / 3);
        // });


      node.selectAll('.cir1')
        .on('mouseover', function (d: any) {
          
          var xPosition = d.x + 50;
          xPosition += (xPosition > diameter) ? -200 : 50;  //switch sides
          // var yPosition = parseFloat(d3.mouse(this)[1]);
          var yPosition = d.y - 50;
          yPosition += (yPosition > diameter) ? -50 : 80;  //switch up/bottom
          // console.log("!!!!!!!!")
          // console.log(yPosition)
          // if (yPosition<=300 && xPosition>700)
          if (xPosition>600)
          {
            xPosition=xPosition -330
          }
          d3.select('#tooltip-bubwt1')
            .style('left', xPosition + 'px')
            .style('top', yPosition + 'px')
            .select('#planet-info-bubwt1')
            // .html('<h4>' + d.data.className + '</h4>' + 'Countries at wars: ' + d.data.value +' % of GDP<br/>');
            .html('Countries at wars per year: ' + d.data.value +'<br>' + 'Major War: ' + d.data.warname);
          d3.select('#tooltip-bubwt1').classed('hidden', false);


          // d3.select("#card-name-bub1").html("Information");
          d3.select("#card-name-bubwt1").html("Summary");
          // d3.select("#card-subtitle1-bub1").html("Summary")
          d3.select("#card-subtitle1-bubwt1").html('')
          d3.select('#card-desc-bubwt1').html(d.data.contentwar);
          d3.select('#card-subtitle2-bubwt').html('');
          d3.select('#card-desc2-bubwt1').html('');
          // d3.select('#card-desc-bub1').html('country: ' + d.data.value);
          
        })
        .on('mouseout', function () {
          d3.select('#tooltip-bubwt1').classed('hidden', true);


          d3.select("#card-name-bubwt1").html("Generic Information");
          d3.select("#card-subtitle1-bubwt1").html("Data")
          d3.select('#card-desc-bubwt1').html('This data is about how many countries were at wars in each period from 1823 to 2003. The data set is provided by <a href="http://www.correlatesofwar.org/">this the Correlates of War project.</a>')
          d3.select('#card-subtitle2-bubwt').html('How to interact with this bub chart');
          d3.select('#card-desc2-bubwt1').html('By mouseovering the each bubble, you can check the number of countries at wars in each period.');
          // d3.select("#card-desc3-bub1").html('')
          
        });

     

      d3.select('#tooltip-bubwt1').classed('hidden', true);

    });


    
    // Returns a flattened hierarchy containing all leaf nodes under the root.
    function classes(root) {
      var classes = [];

      // function recurse(name, node) {
      //   if (node.children) node.children.forEach(function (child) { recurse(node.name, child); });
      //   else classes.push({ packageName: name, className: node.name, value: node.totalSumTrade });
      // }

      function recurse(name, node) {
        if (node.children) node.children.forEach(function (child) { recurse(node.name, child); });
        // else classes.push({ packageName: name, className: node.name, value: node.totalcountCouWars , avera: node.aver ,warname: node.war, totaltrade:node.totalSumTrade, contentwar:node.content });
        else classes.push({ packageName: name, className: node.name , value: node.aver , totalcountCouWars: node.totalcountCouWars ,warname: node.war, totaltrade:node.totalSumTrade, contentwar:node.content });
      }

      recurse(null, root);
      return { children: classes };
    }

    d3.select(self.frameElement).style("height", diameter + "px");
  }

}
