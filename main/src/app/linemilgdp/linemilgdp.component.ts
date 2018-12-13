import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-linemilgdp',
  templateUrl: './linemilgdp.component.html',
  styleUrls: ['./linemilgdp.component.css']
})
export class LinemilgdpComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    var margin = { top: 20, left: 50, bottom: 50, right: 50 };
    var width = 750 - margin.left - margin.right;
    var height = 450 - margin.top - margin.bottom;

    var svg = d3.select("#LineChart1Div").append("svg")
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');



    var x = d3.scaleLinear().rangeRound([0, width]);
    var y = d3.scaleLinear().rangeRound([height, 0]);
    // var c = d3.scaleOrdinal();
    var c=d3.scaleOrdinal(d3.schemeCategory10)
  
    y.domain(d3.extent([0, 5]));
    // x.domain(d3.extent([2007, 2016]));


    //Line generator
    var line = d3.line()
      // .curve(d3.curveBasis)
      .curve(d3.curveLinear)
      .x(function (data: any, i) {

        // console.log(data);
        // a = i * 90;
        var b = i + 2008;
        // console.log(a)
        // console.log(x(b));
        return x(b);
        // return a;
      })
      .y(function (data: any) {
        // console.log(d);
        // return d*200;
        // return y(d.expend);
        // console.log(data);
        // console.log(y(data));
        // return y(data);
        return y(data);
        // return data*150;
      });





    // d3.json("Mil10Year(a8)Ver3.json", function (d) {
    // var dataset;
    // var countNa;
    var countryName = new Array();
    var yearsString = new Array();
    var years = new Array();
    var numPoints = 0;
    var numLines=0;
    var numLegends=0;
    var numLegendNames=0;

    var trig = 0


    // console.log("!!!!!!!!!!")
    // Mil10GDPFrom2007To2017.json
    // d3.json("Mil10YearFrom2007To2018(a8).json").then(function (data: any) {
    d3.json("Mil10GDPFrom2008To2017.json").then(function (data: any) {  
      // console.log(data);
      // console.log(data[i].country);

      d3.select('#tooltip-line1').classed('hidden', true);

      if (trig == 0) {
        trig = 1
        var i;
        for (i = 0; i < data.length; i++) {
          // console.log(data[i].country);
          countryName.push(data[i].country);
          // console.log(countryName);
        }

        yearsString = Object.keys(data[0].expend);

        for (i = 0; i < yearsString.length; i++) {
          // console.log(data[i].country);
          +yearsString[i]
          years.push(+yearsString[i]);
          // console.log(countryName);
        }


        // console.log(years);
        // x.domain(years)
        x.domain(d3.extent(years));
        countryName.sort()
        c.domain(countryName);
          // .range()
        // console.log(c("Australia"))

      }
      // console.log(countryName);
      // console.log("!!!!!!!!!!")
      svg.append("g")
        // .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(d3.format("d")))
        .attr("x", 6)
        .append("text")
        .attr("fill", "#000")
        // .attr("transform", "translate(0," + weight/2 + ")")
        .attr("x", width / 2)
        .attr("dy", "3em")
        .attr("text-anchor", "end")
        .text("years");

      svg.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "-4em")
        .attr("text-anchor", "end")
        .text("Expenditure(% of GDP)");




      //Lines
      var ecountry = svg.selectAll(".ecountry")
        .data(data)
        .enter().append("g")
        .attr("class", "ecountry");

      ecountry.append("path")
        .attr("class", "line1")
        .attr("id",function () {
          numLines = numLines + 1;
          return "line" + (numLines + 1).toString();

        })
        .attr("fill", "none")
        // .attr("stroke", "red")
        .attr("stroke", function(data:any){return String(c(data.country));})
        .attr("stroke-linejoin", "bevel")
        .attr("stroke-linecap", "bevel")
        .attr("stroke-width", 4.5)
        .attr("d", function (data:any) {
          // keysss = Object.keys(data);
          data = Object.values(data.expend);

          return line(data);
        })
        .on("mouseover", linehandleMouseOver)
        .on("mouseout", linehandleMouseOut);








      // Points
      var points = svg.selectAll(".ec")
        .data(data)
        .enter().append("g")
        .attr("class", "dot1Group")
        .attr("fill", "transparent")
        .attr("country", function (data: any) {return data.country;})
        .selectAll(".dot")
        .data(function (data: any) {
          var k = Object.values(data.expend);
          return k;
        })
        .enter().append("circle")
        .attr("id", function () {
          numPoints = numPoints + 1;
          return "dot1" + (numPoints + 1).toString();
        })
        .attr("class", "dot1")
        .attr("r", 3)
        .attr("cx", function (d: any, i) {
          var b = i + 2008;
          return x(b);
        })
        .attr("cy", function (d: any, i) {
          return y(d);
        })
        .attr("expend", function (d: any) {
          return d.toFixed(2);
        })
        .on("mouseover", dothandleMouseOver)
        .on("mouseout", dothandleMouseOut);



        //Legend box
        var legend=svg.selectAll('re')
        .data(data)
        .enter().append("rect")
        .attr("fill",function(data:any){return String(c(data.country));})
        .attr("x", function(d:any,i){
          return width/10*i+20;
        })
        .attr("y",function(d:any,i){
          return height+2*margin.top;
        })
        .attr("id", function () {
          numLegends = numLegends + 1;
          return "legend" + (numLegends + 1).toString();

        })
        .attr("width","15") 
        .attr("height","10");

        // .on("mouseover", doLegendMouseOver)
        // .on("mouseout", doLegendMouseOut);



        // Legend Name
        var legendCounName=svg.selectAll('re')
        .data(data)
        .enter().append("text")
        .attr("x", function(d:any,i){
          return width/10*i+37;
        })
        .attr("y",function(d:any,i){
          return height+2.35*margin.top;
        })
        .attr('fill', 'black')
        .attr("font-size","10")
        .attr("id", function () {
          numLegendNames = numLegendNames + 1;
          return "legendName" + (numLegendNames + 1).toString();

        })
        .text(function(d:any){
          
          return d.country;
        })
        
        .on("mouseover", legendNameMouseOver)
        .on("mouseout", legendNameMouseOut);









        function dothandleMouseOver() {
          // console.log(this.id);
          var idString = "#" + this.id.toString()
          idString = String(idString)

  
          d3.select(idString)
            .attr("fillX", String(d3.select(idString).attr("fill")));
  
  
          d3.select(idString)

            .attr("fill", function (data) {
              return "yellow";
            })
            .attr("r", 10);

          var xPosition = +d3.select(idString).attr("cx");
          xPosition += (xPosition > width / 2) ? -250 : 80;  //switch sides
          var yPosition = +d3.select(idString).attr("cy");
          yPosition += (yPosition > height / 2) ? -50 : 80;  //switch up/bottom
  
          d3.select('#tooltip-line1')
            .style('left', xPosition + 'px')
            .style('top', yPosition + 'px')
            .select('#planet-info-line1')
            .html('<h4>' + "Country: " + d3.select(this.parentNode).attr("country") + '</h4>' + 'Expenditure: ' + d3.select(idString).attr("expend")+' % of GDP<br/>');
  
          d3.select('#tooltip-line1').classed('hidden', false);
  
          // d3.select('#card-name-line1').html('country: ' + d3.select(this.parentNode).attr("country"));
          // d3.select('#card-desc-line1').html('Expenditure: ' + d3.select(idString).attr("expend"));
  
  
  
  
  
  
  
  
        }
        function dothandleMouseOut() {
  
          var idString = "#" + this.id.toString()
          idString = String(idString)
          // console.log(idString);
          // console(this);
          d3.select(idString)

            .attr("r", 4);
  
          document.getElementById(this.id.toString()).removeAttribute("fill");

          d3.select('#tooltip-line1').classed('hidden', true);
          // d3.select('#card-name-line1').html('Country Information');
          // d3.select('#card-desc-line1').html('Mouse over bars for quick facts.<br/><br/><br/>');
  
  
        }



      function legendNameMouseOver() {

        d3.select('#tooltip-line1').classed('hidden', true);
        // console.log(this.id);
        var idString = "#" + this.id.toString()
        idString = String(idString)
        // console.log(idString);


        // var corLineId="#" +"line" +idString[idString.length-1]

        // var str = "Rs. 6,67,000";
        var res = idString.replace(/\D/g, "");
        var corLineId="#" +"line" + res



        d3.select(idString)

          .attr("font-weight", function (data) {
            // font-weight: bold
            return "bold";

          });

        // console.log(corLineId);
        d3.select(corLineId)
          .attr("stroke-widthX", String(d3.select(corLineId).attr("stroke-width")));
        d3.select(corLineId)
        .attr("stroke-width", "9px")
 


      }
      function legendNameMouseOut() {

        d3.select('#tooltip-line1').classed('hidden', true);
        var idString = "#" + this.id.toString()
        idString = String(idString)


        var res = idString.replace(/\D/g, "");
        var corLineId="#" +"line" + res

        // console.log(idString[idString.length-1]);
        console.log(corLineId);
       d3.select(idString)
          // .attr("fill","orange")
          .attr("font-weight", function (data) {
            // font-weight: bold
            return "normal";

          });


        d3.select(corLineId)
        .attr("stroke-width", String(d3.select(corLineId).attr("stroke-widthX")));

      }


      function linehandleMouseOver() {
        console.log(this.id);
        var idString = "#" + this.id.toString()
        idString = String(idString)


        var res = idString.replace(/\D/g, "");
        var corLegendId="#" +"legendName" + res
        
        // console.log(idString);

        // console.log(d3.select(this.parentNode).attr("country"));
        // console.log(d3.select(idString).attr("fill"));
        // d3.select(idString).attr("fill")


        d3.select(idString)
          .attr("stroke-widthX", String(d3.select(idString).attr("stroke-width")));


        d3.select(idString)
        .attr("stroke-width", "9px")


        d3.select(corLegendId)
          // .attr("fill","orange")
          .attr("font-weight", function (data) {
            // font-weight: bold
            return "bold";

          });




      }
      function linehandleMouseOut() {

        var idString = "#" + this.id.toString()
        idString = String(idString)
        // console.log(idString);
        // console(this);
        var res = idString.replace(/\D/g, "");
        var corLegendId="#" +"legendName" + res
        

        d3.select(idString)
        .attr("stroke-width", String(d3.select(idString).attr("stroke-widthX")));

        d3.select(corLegendId)
          // .attr("fill","orange")
          .attr("font-weight", function (data) {
            // font-weight: bold
            return "normal";

          });
   
        // d3.select('#tooltip-line1').classed('hidden', true);
        // d3.select('#card-name-line1').html('Country Information');
        // d3.select('#card-desc-line1').html('Mouse over bars for quick facts.<br/><br/><br/>');


      }
      

      function doLegendMouseOver() {
        console.log(this.id);
        var idString = "#" + this.id.toString()
        idString = String(idString)
        // console.log(idString);

        // console.log(d3.select(this.parentNode).attr("country"));
        // console.log(d3.select(idString).attr("fill"));
        // d3.select(idString).attr("fill")

        
        d3.select(idString)
          .attr("stroke-widthX", String(d3.select(idString).attr("stroke-width")));


        d3.select(idString)
        .attr("stroke-width", "9px")


        // d3.select('#card-name').html("Hello");

        // d3.select('#card-name-line1').html('country: ' + d3.select(this.parentNode).attr("country"));
        // d3.select('#card-desc-line1').html('Expenditure: ' + d3.select(idString).attr("expend"));

        //set relative to mouse
        // var xPosition = parseFloat(d3.mouse(this)[0]);

        // var xPosition = +d3.select(idString).attr("cx");
        // // console.log(xPosition)
        // xPosition += (xPosition > width / 2) ? -200 : 80;  //switch sides
        // // console.log(typeof x);
        // var yPosition = +d3.select(idString).attr("cy");
        // yPosition += (yPosition > height / 2) ? -50 : 80;  //switch up/bottom

        // d3.select('#tooltip-line1')
        //   .style('left', xPosition + 'px')
        //   .style('top', yPosition + 'px')
        //   .select('#planet-info-line1')
        //   .html('<h4>' + "Country: " + d3.select(this.parentNode).attr("country") + '</h4>' + 'Expenditure: ' + d3.select(idString).attr("expend"));

        // d3.select('#tooltip-line1').classed('hidden', false);









      }

      function doLegendMouseOut() {

        var idString = "#" + this.id.toString()
        idString = String(idString)
        // console.log(idString);
        // console(this);
        d3.select(idString)
        .attr("stroke-width", String(d3.select(idString).attr("stroke-widthX")));

   
        // d3.select('#tooltip-line1').classed('hidden', true);
        // d3.select('#card-name-line1').html('Country Information');
        // d3.select('#card-desc-line1').html('Mouse over bars for quick facts.<br/><br/><br/>');


      }


    });

  }

}
