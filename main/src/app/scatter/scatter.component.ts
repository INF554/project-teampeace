import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css']
})
export class ScatterComponent implements OnInit {

  varructor() { }

  ngOnInit() {


    // d3.select('#tooltip-scatter1').classed('hidden', true);

    // WorldMid is map
    // var svg = d3.select("#worldMid"),
    //   width = +svg.attr("width"),
    //   height = +svg.attr("height");

    var files = [
      "WarAndTrade_From1900.csv"
    ];


    var promises = [];

    files.forEach(function (url) {
      var partsOfurl = url.split('.');

      if (partsOfurl[partsOfurl.length - 1] == "geojson" || partsOfurl[partsOfurl.length - 1] == "json") { promises.push(d3.json(url)) }
      if (partsOfurl[partsOfurl.length - 1] == "csv") { promises.push(d3.csv(url)) }

    });


    var percentMil = [0, 1];

    Promise.all(promises).then(function (values) {

      var dataset = values[0]
      console.log(values[0])




      // var marginExX = 15;
      // var marginEx = 60;
      // var width = 1150 - 2 * marginEx;
      // var height = 800 - 2 * marginEx + 100;

      // var svg = d3.select('#chartSc');
      // var chart = svg.attr('transform', `translate(${marginExX}, ${marginEx})`).append('g').attr('transform', `translate(${marginExX}, ${marginEx})`);
      // var yScale = d3.scaleLinear()
      //   .range([height, 0])
      //   .domain([0, 100]);

      // chart.append('g')
      //   .call(d3.axisLeft(yScale).tickFormat(d3.format("-")));

      // var xScale = d3.scaleLinear()
      //   .range([0, width])
      //   .domain([0, 100])
      // // .domain()
      // // .padding(0)

      // chart.append('g')
      //   .attr('transform', `translate(0, ${height})`)
      //   // attr('transform', `translate(${width}, 0)`)
      //   .call(d3.axisBottom(xScale));


      // chart.append("text")
      //   .attr("transform",
      //     "translate(" + (width / 2) + " ," +
      //     (815) + ")")
      //   .style("text-anchor", "middle")
      //   .attr('font-size', '14px')
      //   .text("Average(%) of Percentage between 1970s and 1980s");

      // svg.append("text")
      //   .attr("transform", "rotate(-90)")
      //   .attr("y", 0 - (30))
      //   .attr("x", 0 - (height / 2 + 50))
      //   .attr("dy", "1em")
      //   .style("text-anchor", "middle")
      //   .attr('font-size', '14px')
      //   .text("Average(%) of Percentage between 1990s and 2000s ");










      // var margin = { top: 20, left: 10, bottom: 50, right: 10 };
      // var widthMIDBar = 1100 - margin.left - margin.right;
      // var heightMIDBar = 200 - margin.top - margin.bottom;

      // var svgmidsBar = d3.select("#chartSc").append("svg").attr("id", "midsBar")
      //   .attr('width', widthMIDBar + margin.left + margin.right)
      //   .attr('height', heightMIDBar + margin.top + margin.bottom)
      //   .append('g')
      //   .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');






      var margin = { top: 65, left: 70, bottom: 65, right: 70 };
      var width = 1000 - margin.left - margin.right;
      var height = 600 - margin.top - margin.bottom;
      var numPoints = 0;
      var numTexts = 0;

      var svg = d3.select("#scatterChart1Div").append("svg")
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');




      // var x = d3.scaleBand();
      // var y = d3.scaleLinear();



      var x = d3.scaleLinear();
      var y = d3.scaleLinear();


      svg.append("text")
        .attr("x", width / 2 - 200)
        .attr("y", height + 35)
        // .text("Total amount of international trade");
        .text("Total amount of International Trade in US millions of current dollars");

      svg.append("text")
        .attr("x", -height / 2 - 90)
        .attr("y", -40)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("# of countries at wars");

      // numCountry or SumTrade
      var maxSumTrade: any = d3.max(dataset, function (d: any) {
        // console.log(d)  
        return +d["SumTrade"];

      });


      var maxCounWar: any = d3.max(dataset, function (d: any) {
        // console.log(d)  
        return +d["countCouWars"];

      });


      x.domain([0, maxSumTrade])
        // .range([width, 0]);
        .range([0, width]);



      y.domain([0, 20])
        .range([height, 0]);

      

      svg.append("rect")
        .attr("x", '0')
        .attr("y", '523')
        .attr("width", '15')
        .attr("height", '10')
        .attr("fill", "#f46d43")
        .attr('id', 'rgr1')
        .on("mouseover", function (this: any) {
          var tempId = this.id.toString()
          tempId = tempId.replace('r', '');
          // console.log(tempId)
          tempId = '.' + tempId


          d3.selectAll(tempId)
            // .style('fill','#f768a1')
            .style("stroke", "black")
            .style("stroke-width", "2")
          d3.select(this)
            // .style('fill','#f768a1')
            .style("stroke", "black")
            .style("stroke-width", "2")


        })
        .on("mouseout", function (this: any) {
          var tempId = this.id.toString()
          tempId = tempId.replace('r', '');
          console.log(tempId)
          tempId = '.' + tempId


          d3.selectAll(tempId)

            .style("stroke-width", "0")
          d3.select(this)

            .style("stroke-width", "0")


        })


      svg.append("text")
        .attr("x", '20')
        .attr("y", '533')
        .text("Before 1965")
        .attr('id', 'trgr1')
        .on("mouseover", function (this: any) {
          var tempId = this.id.toString()
          tempId = tempId.replace('tr', '');
          // console.log(tempId)
          tempId = '.' + tempId


          d3.selectAll(tempId)
            // .style('fill','#f768a1')
            .style("stroke", "black")
            .style("stroke-width", "2")
          d3.select(this)
            // .style('fill','#f768a1')
            .style("stroke", "black")
            .style("stroke-width", "2")
        })
        .on("mouseout", function (this: any) {
          var tempId = this.id.toString()
          tempId = tempId.replace('tr', '');
          // console.log(tempId)
          tempId = '.' + tempId

          // d3.selectAll(tempId)
          // .style('fill','#66c2a4')

          d3.selectAll(tempId)
            // .style('fill','#f768a1')
            // .style("stroke","")
            .style("stroke-width", "0")

          d3.select(this)
            // .style('fill','#f768a1')
            // .style("stroke","black")
            .style("stroke-width", "0")

          // d3.selectAll(tempId)
          // .style('border','1px')

        })














      var xAxisSe: any = d3.axisBottom(this)
        .scale(x)
      // .ticks(5, 'd')
      // .tickValues(x.domain().filter(function(d,i){ return !(i%10)}));



      // var xAxisTe: any = d3.axisBottom(this)
      //   .scale(xTe)
      //   .ticks(10, 'd');


      // console.log(xAxis)

      svg.append("g")
        .attr("id", "x-axis")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        // .call(xAxis);
        .call(xAxisSe);
      // .call(d3.axisBottom(x)
      // .ticks(2));

      var yAxis: any = d3.axisLeft(this)
        .scale(y)
        .ticks(10, 'd');

      svg.append("g")
        .attr("id", "y-axis")
        .attr("class", "axis")
        .call(yAxis);
















      svg.append("rect")
        .attr("x", '155')
        .attr("y", '523')
        .attr("width", '15')
        .attr("height", '10')
        .attr("fill", "#f768a1")
        .attr('id', 'rgr2')
        .on("mouseover", function (this: any) {
          var tempId = this.id.toString()
          tempId = tempId.replace('r', '');
          // console.log(tempId)
          tempId = '.' + tempId


          d3.selectAll(tempId)
            // .style('fill','#f768a1')
            .style("stroke", "black")
            .style("stroke-width", "2")

          d3.select(this)
            // .style('fill','#f768a1')
            .style("stroke", "black")
            .style("stroke-width", "2")
        })
        .on("mouseout", function (this: any) {
          var tempId = this.id.toString()
          tempId = tempId.replace('r', '');
          // console.log(tempId)
          tempId = '.' + tempId

          // d3.selectAll(tempId)
          // .style('fill','#66c2a4')

          d3.selectAll(tempId)
            // .style('fill','#f768a1')
            // .style("stroke","")
            .style("stroke-width", "0")


          d3.select(this)
            // .style('fill','#f768a1')
            // .style("stroke","black")
            .style("stroke-width", "0")

          // d3.selectAll(tempId)
          // .style('border','1px')

        })








      svg.append("text")
        // .attr("x", '220')
        .attr("x", '175')
        .attr("y", '533')
        .attr('id', 'trgr2')
        .text("1965 to 1980")
        .on("mouseover", function (this: any) {
          var tempId = this.id.toString()
          tempId = tempId.replace('tr', '');
          // console.log(tempId)
          tempId = '.' + tempId

          // String(d3.select(idString).attr("fill")



          d3.selectAll(tempId)
            // .style('fill','#f768a1')
            .style("stroke", "black")
            .style("stroke-width", "2")
          d3.select(this)
            // .style('fill','#f768a1')
            .style("stroke", "black")
            .style("stroke-width", "2")
        })
        .on("mouseout", function (this: any) {
          var tempId = this.id.toString()
          tempId = tempId.replace('tr', '');
          // console.log(tempId)
          tempId = '.' + tempId

          // d3.selectAll(tempId)
          // .style('fill','#66c2a4')

          d3.selectAll(tempId)
            // .style('fill','#f768a1')
            // .style("stroke","")
            .style("stroke-width", "0")
          d3.select(this)
            // .style('fill','#f768a1')
            // .style("stroke","black")
            .style("stroke-width", "0")

          // d3.selectAll(tempId)
          // .style('border','1px')

        })
      svg.append("rect")
        .attr("x", '335')
        .attr("y", '523')
        .attr("width", '15')
        .attr("height", '10')
        .attr("fill", "#3690c0")
        .attr('id', 'rgr3')
        .on("mouseover", function (this: any) {
          var tempId = this.id.toString()
          tempId = tempId.replace('r', '');
          // console.log(tempId)
          tempId = '.' + tempId

          // String(d3.select(idString).attr("fill")



          d3.selectAll(tempId)
            // .style('fill','#f768a1')
            .style("stroke", "black")
            .style("stroke-width", "2")

          d3.select(this)
            // .style('fill','#f768a1')
            .style("stroke", "black")
            .style("stroke-width", "2")
        })
        .on("mouseout", function (this: any) {
          var tempId = this.id.toString()
          tempId = tempId.replace('r', '');
          // console.log(tempId)
          tempId = '.' + tempId

          // d3.selectAll(tempId)
          // .style('fill','#66c2a4')

          d3.selectAll(tempId)
            // .style('fill','#f768a1')
            // .style("stroke","")
            .style("stroke-width", "0")


          d3.select(this)
            // .style('fill','#f768a1')
            // .style("stroke","black")
            .style("stroke-width", "0")

          // d3.selectAll(tempId)
          // .style('border','1px')

        })




      svg.append("text")
        .attr("x", '355')
        .attr("y", '533')
        .attr('id', 'trgr3')
        .text("1965 to 1980")
        .on("mouseover", function (this: any) {
          var tempId = this.id.toString()
          tempId = tempId.replace('tr', '');
          // console.log(tempId)
          tempId = '.' + tempId

          // String(d3.select(idString).attr("fill")



          d3.selectAll(tempId)
            // .style('fill','#f768a1')
            .style("stroke", "black")
            .style("stroke-width", "2")
          d3.select(this)
            // .style('fill','#f768a1')
            .style("stroke", "black")
            .style("stroke-width", "2")
        })
        .on("mouseout", function (this: any) {
          var tempId = this.id.toString()
          tempId = tempId.replace('tr', '');
          // console.log(tempId)
          tempId = '.' + tempId

          // d3.selectAll(tempId)
          // .style('fill','#66c2a4')

          d3.selectAll(tempId)
            // .style('fill','#f768a1')
            // .style("stroke","")
            .style("stroke-width", "0")

          d3.select(this)
            .style("stroke-width", "0")
          // d3.selectAll(tempId)
          // .style('border','1px')

        })

      svg.append("rect")
        .attr("x", '533')
        .attr("y", '523')
        .attr("width", '15')
        .attr("height", '10')
        .attr("fill", "#66bd63")
        .attr('id', 'rgr4')
        .on("mouseover", function (this: any) {
          var tempId = this.id.toString()
          tempId = tempId.replace('r', '');
          // console.log(tempId)
          tempId = '.' + tempId

          // String(d3.select(idString).attr("fill")



          d3.selectAll(tempId)
            // .style('fill','#f768a1')
            .style("stroke", "black")
            .style("stroke-width", "2")
          d3.select(this)
            // .style('fill','#f768a1')
            .style("stroke", "black")
            .style("stroke-width", "2")

        })
        .on("mouseout", function (this: any) {
          var tempId = this.id.toString()
          tempId = tempId.replace('r', '');
          // console.log(tempId)
          tempId = '.' + tempId

          // d3.selectAll(tempId)
          // .style('fill','#66c2a4')

          d3.selectAll(tempId)
            // .style('fill','#f768a1')
            // .style("stroke","")
            .style("stroke-width", "0")

          d3.select(this)
            // .style('fill','#f768a1')
            // .style("stroke","black")
            .style("stroke-width", "0")

          // d3.selectAll(tempId)
          // .style('border','1px')

        })





      svg.append("text")
        .attr("x", '555')
        .attr("y", '533')
        .attr('id', 'trgr4')
        .text("1980 to 1990")
        .on("mouseover", function (this: any) {
          var tempId = this.id.toString()
          tempId = tempId.replace('tr', '');
          // console.log(tempId)
          tempId = '.' + tempId

          // String(d3.select(idString).attr("fill")



          d3.selectAll(tempId)
            // .style('fill','#f768a1')
            .style("stroke", "black")
            .style("stroke-width", "2")
          d3.select(this)
            // .style('fill','#f768a1')
            .style("stroke", "black")
            .style("stroke-width", "2")
        })
        .on("mouseout", function (this: any) {
          var tempId = this.id.toString()
          tempId = tempId.replace('tr', '');
          // console.log(tempId)
          tempId = '.' + tempId

          // d3.selectAll(tempId)
          // .style('fill','#66c2a4')

          d3.selectAll(tempId)
            // .style('fill','#f768a1')
            // .style("stroke","")
            .style("stroke-width", "0")
          d3.select(this)
            // .style('fill','#f768a1')
            // .style("stroke","black")
            .style("stroke-width", "0")

          // d3.selectAll(tempId)
          // .style('border','1px')

        })





      svg.append("rect")
        .attr("x", '735')
        .attr("y", '523')
        .attr("width", '15')
        .attr("height", '10')
        .attr("fill", "#cb181d")
        .attr('id', 'rgr5')
        .on("mouseover", function (this: any) {
          var tempId = this.id.toString()
          tempId = tempId.replace('r', '');
          // console.log(tempId)
          tempId = '.' + tempId

          // String(d3.select(idString).attr("fill")



          d3.selectAll(tempId)
            // .style('fill','#f768a1')
            .style("stroke", "black")
            .style("stroke-width", "2")

          d3.select(this)
            // .style('fill','#f768a1')
            .style("stroke", "black")
            .style("stroke-width", "2")
        })
        .on("mouseout", function (this: any) {
          var tempId = this.id.toString()
          tempId = tempId.replace('r', '');
          // console.log(tempId)
          tempId = '.' + tempId

          // d3.selectAll(tempId)
          // .style('fill','#66c2a4')

          d3.selectAll(tempId)
            // .style('fill','#f768a1')
            // .style("stroke","")
            .style("stroke-width", "0")
          d3.select(this)
            // .style('fill','#f768a1')
            // .style("stroke","black")
            .style("stroke-width", "0")
          // d3.selectAll(tempId)
          // .style('border','1px')

        })




      svg.append("text")
        .attr("x", '755')
        .attr("y", '533')
        .attr('id', 'trgr5')
        .text("1990 to 2003")
        .on("mouseover", function (this: any) {
          var tempId = this.id.toString()
          tempId = tempId.replace('tr', '');
          // console.log(tempId)
          tempId = '.' + tempId

          // String(d3.select(idString).attr("fill")



          d3.selectAll(tempId)
            // .style('fill','#f768a1')
            .style("stroke", "black")
            .style("stroke-width", "2")

          d3.select(this)
            // .style('fill','#f768a1')
            .style("stroke", "black")
            .style("stroke-width", "2")
        })
        .on("mouseout", function (this: any) {
          var tempId = this.id.toString()
          tempId = tempId.replace('tr', '');
          // console.log(tempId)
          tempId = '.' + tempId

          // d3.selectAll(tempId)
          // .style('fill','#66c2a4')

          d3.selectAll(tempId)
            // .style('fill','#f768a1')
            // .style("stroke","")
            .style("stroke-width", "0")
          d3.select(this)
            // .style('fill','#f768a1')
            // .style("stroke","black")
            .style("stroke-width", "0")
          // d3.selectAll(tempId)
          // .style('border','1px')

        })





        





      // console.log(data)
      svg.selectAll("circle")
        .data(dataset)
        .enter()

        .append("circle")
        .attr('id', function (data) {
          return data['year']
        })

        .attr('cx', function (data) {


          return x(+data["SumTrade"])

        })
        .attr('cy', function (data) {


          return (y(+data["countCouWars"]));

        })
        .attr('r', function () {
          return 8;
        })
        .attr("class", function (data) {

          var cla;
          // if (+data['year'] < 1900) {
          //   // cla = "B1900";
          //   cla = "gr1";
          // }

          if ( +data['year'] < 1965) {
            // cla = "1900To1965";
            cla = "gr1";
          }

          if (+data['year'] >= 1965 && +data['year'] < 1980) {
            // cla= "1965To1980";
            cla = "gr2";
          }

          if (+data['year'] >= 1980 && +data['year'] < 1990) {
            // cla = "1980To1990";
            cla = "gr3";
          }

          if (+data['year'] >= 1990 && +data['year'] <= 1999) {
            // cla = "1990To2003";
            cla = "gr4";
          }

          if (+data['year'] >= 2000 && +data['year'] <= 2003) {
            // cla = "1990To2003";
            cla = "gr5";
          }

          return cla
        })
        .style("fill", function (data) {

          var color;
          // if (+data['year'] < 1900) {
          //   color = "#66c2a4";
          // }

          if ( +data['year'] < 1965) {
            color = "#f46d43";
          }

          if (+data['year'] >= 1965 && +data['year'] < 1980) {
            color = "#f768a1";
          }

          if (+data['year'] >= 1980 && +data['year'] < 1990) {
            // color = "#cb181d";
            color = "#3690c0";
          }

          if (+data['year'] >= 1990 && +data['year'] <= 1999) {
            color = "#66bd63";
            // color = "#f46d43";
          }

          // if (+data['year'] >= 2000 && +data['year'] < 2000) {
          //   // color = "#3690c0";
          //   color = "#f46d43";
          // }

          if (+data['year'] >= 2000 ) {
            // color = "#3690c0";
            color = "#cb181d";
          }

          return color
        })
        .on("mouseover", function (this: any, d: any) {

          var tooltipSpan = document.getElementById('tooltip-scatter1');

          window.onmousemove = function (e) {
            var x = e.clientX,
              y = e.clientY;
            // (x)
            // console.log(y)
            tooltipSpan.style.top = (y - 115) + 'px';
            // console.log(y)
            tooltipSpan.style.left = (x + 2) + 'px';

            if (y < 150) {
              tooltipSpan.style.top = (y + 20) + 'px';
            }
            if (x > 1000) {
              tooltipSpan.style.left = (x - 125) + 'px';
            }
          };

          // console.log(d)
          d3.select('#tooltip-scatter1')

            .select('#planet-info-scatter1')
            .html('<h4>' + 'Year: ' + d.year + '<br>' + " # of Countries at Wars: " + d.countCouWars + '<br>' + 'Total trade amount: ' + d.SumTrade + '<br>');

          d3.select('#tooltip-scatter1').classed('hidden', false);




          d3.select(this)
            // .style('fill','#f768a1')
            .style("stroke", "black")
            .style("stroke-width", "2")

        })
        .on('mouseout', function (this: any) {

          d3.select('#tooltip-scatter1').classed('hidden', true);
          d3.select('#planet-info-scatter1').classed('hidden', true);

          d3.select(this)
            .style("stroke-width", "0")

          // var idString = "#" + this.id.toString()
          // idString = String(idString)
          // d3.select(idString).attr("fill", String(d3.select(idString).attr("fillX")));


          // d3.select('#card-name-bub1').html('Country Information');
          // d3.select('#card-desc-bub1').html('Mouse over bars for quick facts.<br/><br/><br/>');
        })


      


    })
  }



}
