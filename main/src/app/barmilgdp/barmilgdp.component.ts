import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-barmilgdp',
  templateUrl: './barmilgdp.component.html',
  styleUrls: ['./barmilgdp.component.css']
})
export class BarmilgdpComponent implements OnInit {

  constructor() { }

  ngOnInit() {



    var margin = { top: 20, left: 80, bottom: 50, right: 10 };
    var width = 700 - margin.left - margin.right;
    var height = 400 - margin.top - margin.bottom;

    var svg = d3.select("#chartlinemilgdp").append("svg")
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

    var x = d3.scaleBand();
    var y = d3.scaleLinear();

    var xAxis;
    var yAxis;

    var dataset;
    // var mode = "#all";
    var mode = "#ascend";
    // var modeSortMet = "#alpha";
    var modeSortMet = "#all";
    var datasetCop;

    var titleFirst;
    var titleSecond = "For Military Expenditure";
    var titleSort = "Alphabetical Order";


    var transition;

    // d3.json("MILoneYear(A7)Ver2.json").then(function (data) {
    d3.json("MILGDP2017.json").then(function (data) {
      dataset = data;
      dataset.sort(function (a, b) { return d3.ascending(a.country, b.country); });
      setMode("#alpha");
      setNumCouMode("#res");
      // setSortMet("#descen");
      drawBars(dataset);

      //resize()

    });

    // d3.select(window).on('resize', resize);
    // resize()

    d3.select("#res")
      .on("click", function () {
        //console.log("all")

        titleFirst = "The 10 countries"
        titleSort = "Alphabetical Order"

        setNumCouMode("#res")


        var datasetCop = dataset.slice(0)


        setMode("#alpha")

        datasetCop.sort(function (a, b) {
          return d3.ascending(a.country, b.country);
        });

        x.domain(datasetCop.sort(
          function (a, b) { return d3.ascending(a.country, b.country); }
        ).map(function (d) {
          // console.log(d)
          return d.country;
        }));
        transitionAxis();
        transitionHeader();
        transitionHeaderLowPart();
        redrawbars(datasetCop);

      });
    


    // d3.select(window).on('resize', resize);
    // resize()


    d3.select("#all")
      .on("click", function () {
        // console.log("all")

        titleFirst = "The 10 countries"

        setNumCouMode("#all")

        // console.log(mode)

        datasetCop = dataset.slice(0)

        if (mode == "#alpha") {
          // //console.log("inner alpha")
          setMode("#alpha")
          ////console.log(datasetCop);
          datasetCop.sort(function (a, b) {
            return d3.ascending(a.country, b.country);
          });
          ////console.log(datasetCop);
          x.domain(datasetCop.sort(
            function (a, b) { return d3.ascending(a.country, b.country); }
          ).map(function (d) {
            // console.log(d)
            return d.country;
          }));
          transitionAxis();
          transitionHeader();
          redrawbars(datasetCop)
        }

        if (mode == "#ascend") {
          setMode("#ascend")

          ////console.log(datasetCop);
          datasetCop.sort(function (a, b) {
            return d3.ascending(a.value, b.value);
          });
          ////console.log(datasetCop);

          x.domain(datasetCop.sort(
            function (a, b) { return d3.ascending(a.value, b.value); }
          ).map(function (d) {
            // console.log(d)
            return d.country;
          }));

          transitionAxis();
          transitionHeader();
          redrawbars(datasetCop)
        }
        if (mode == "#descen") {
          setMode("#descen")
          // //console.log("inner descen")
          ////console.log(datasetCop);
          datasetCop.sort(function (a, b) {
            return d3.descending(a.value, b.value);
          });
          ////console.log(datasetCop);
          x.domain(datasetCop.sort(
            function (a, b) { return d3.descending(a.value, b.value); }
          ).map(function (d) {
            // console.log(d)
            return d.country;
          }));

          transitionAxis();
          transitionHeader();
          redrawbars(datasetCop)
        }

        // redrawbars(datasetCop)
      });



    d3.select("#top")
      .on("click", function () {

        titleFirst = "The Top 5 countries"

        setNumCouMode("#top")

        if (mode == "#alpha") {
          datasetCop = dataset.slice(0)

          datasetCop.sort(function (a, b) {
            return d3.descending(a.value, b.value);
          });

          ////console.log(datasetCop);
          datasetCop.splice(5, 5);
          ////console.log(datasetCop);
          setMode("#alpha")
          // ////console.log(datasetCop);
          datasetCop = datasetCop.sort(function (a, b) {
            return d3.ascending(a.country, b.country);
            // return a.country-b.country;
          });


          x.domain(datasetCop.sort(
            function (a, b) { return d3.ascending(a.value, b.valuey); }
          ).map(function (d) {
            // console.log(d)
            return d.country;
          }));
          transitionAxis();
          transitionHeader();
          redrawbars(datasetCop)
        }

        if (mode == "#ascend") {

          datasetCop = dataset.slice(0)

          datasetCop.sort(function (a, b) {
            return d3.descending(a.value, b.value);
          });
          datasetCop.splice(5, 5)
          setMode("#ascend")
          ////console.log(datasetCop);
          datasetCop.sort(function (a, b) {
            return d3.ascending(a.value, b.value);
          });
          ////console.log(datasetCop);
          x.domain(datasetCop.sort(
            function (a, b) { return d3.ascending(a.value, b.value); }
          ).map(function (d) {
            // console.log(d)
            return d.country;
          }));
          transitionAxis();
          transitionHeader();
          redrawbars(datasetCop)
        }
        if (mode == "#descen") {

          datasetCop = dataset.slice(0)

          datasetCop.sort(function (a, b) {
            return d3.descending(a.value, b.value);
          });

          setMode("#descen")
          ////console.log(datasetCop);
          datasetCop.splice(5, 5)
          datasetCop.sort(function (a, b) {
            return d3.descending(a.value, b.value);
          });
          ////console.log(datasetCop);

          x.domain(datasetCop.sort(
            function (a, b) { return d3.descending(a.value, b.value); }
          ).map(function (d) {
            // console.log(d)
            return d.country;
          }));
          transitionAxis();
          transitionHeader();
          redrawbars(datasetCop)
        }

        // redrawbars(datasetCop)
      });


    d3.select("#bot")
      .on("click", function () {

        titleFirst = "The Bottom 5 countries"


        if (mode == "#alpha") {

          setNumCouMode("#bot")
          datasetCop = dataset.slice(0)

          datasetCop = datasetCop.sort(function (a, b) {
            return d3.descending(a.value, b.value);
          });

          datasetCop.splice(0, 5)

          setMode("#alpha")
          datasetCop = datasetCop.sort(function (a, b) {
            return d3.ascending(a.country, b.country);
          });

          x.domain(datasetCop.sort(
            function (a, b) { return d3.ascending(a.country, b.country); }
          ).map(function (d) {
            // console.log(d)
            return d.country;
          }));
          transitionAxis();
          transitionHeader();
          redrawbars(datasetCop)
        }

        if (mode == "#ascend") {

          setNumCouMode("#bot")
          datasetCop = dataset.slice(0)

          datasetCop = datasetCop.sort(function (a, b) {
            return d3.descending(a.value, b.value);
          });

          datasetCop.splice(0, 5)

          setMode("#ascend")
          datasetCop = datasetCop.sort(function (a, b) {
            return d3.ascending(a.value, b.value);
          });

          x.domain(datasetCop.sort(
            function (a, b) { return d3.ascending(a.value, b.value); }
          ).map(function (d) {
            // console.log(d)
            return d.country;
          }));
          transitionAxis();
          transitionHeader();
          redrawbars(datasetCop)
        }
        if (mode == "#descen") {

          setNumCouMode("#bot")
          datasetCop = dataset.slice(0)

          datasetCop = datasetCop.sort(function (a, b) {
            return d3.descending(a.value, b.value);
          });

          datasetCop.splice(0, 5)

          setMode("#descen")
          datasetCop = datasetCop.sort(function (a, b) {
            return d3.descending(a.value, b.value);
          });

          x.domain(datasetCop.sort(
            function (a, b) { return d3.descending(a.value, b.value); }
          ).map(function (d) {
            // console.log(d)
            return d.country;
          }));
          transitionAxis();
          transitionHeader();
          redrawbars(datasetCop)
        }

        // redrawbars(datasetCop)
      });


    d3.select("#alpha")
      .on("click", function () {

        titleSort = "Alphabetical Order"

        setMode("#alpha")

        if (modeSortMet == "#res") {
          setNumCouMode("#res")
          datasetCop = dataset.slice(0)

          datasetCop = datasetCop.sort(function (a, b) {
            return d3.ascending(a.country, b.country);
          });


          x.domain(datasetCop.sort(
            function (a, b) { return d3.ascending(a.country, b.country); }
          ).map(function (d) {
            // console.log(d)
            return d.country;
          }));
          transitionAxis();
          transitionHeaderLowPart();
          redrawbars(datasetCop)
        }


        if (modeSortMet == "#all") {
          setNumCouMode("#all")
          datasetCop = dataset.slice(0)

          datasetCop = datasetCop.sort(function (a, b) {
            return d3.ascending(a.country, b.country);
          });


          x.domain(datasetCop.sort(
            function (a, b) { return d3.ascending(a.country, b.country); }
          ).map(function (d) {
            // console.log(d)
            return d.country;
          }));
          transitionAxis();
          transitionHeaderLowPart();
          redrawbars(datasetCop)
        }

        if (modeSortMet == "#top") {


          datasetCop = dataset.slice(0)
          // console.log(datasetCop.country)

          setNumCouMode("#top")
          datasetCop = datasetCop.sort(function (a, b) {
            return d3.ascending(a.value, b.value);
          });

          datasetCop = datasetCop.splice(5, 5)

          datasetCop = datasetCop.sort(function (a, b) {
            return d3.ascending(a.country, b.country);
          });

          //console.log(datasetCop)
          datasetCop.splice(5, 5)
          //console.log(datasetCop)

          x.domain(datasetCop.sort(
            function (a, b) { return d3.ascending(a.country, b.country); }
          ).map(function (d) {
            // console.log(d)
            return d.country;
          }));
          transitionAxis();
          transitionHeaderLowPart();
          redrawbars(datasetCop)
        }
        if (modeSortMet == "#bot") {
          setNumCouMode("#bot")
          datasetCop = dataset.slice(0)

          datasetCop = datasetCop.sort(function (a, b) {
            return d3.ascending(a.value, b.value);
          });

          datasetCop = datasetCop.splice(0, 5)

          datasetCop = datasetCop.sort(function (a, b) {
            return d3.ascending(a.country, b.country);
          });

          // //console.log(datasetCop)
          datasetCop = datasetCop.splice(0, 5)


          x.domain(datasetCop.sort(
            function (a, b) { return d3.ascending(a.country, b.country); }
          ).map(function (d) {
            // console.log(d)
            return d.country;
          }));
          transitionAxis();
          transitionHeaderLowPart();
          redrawbars(datasetCop)

          // ////console.log(datasetCop)
        }

        // redrawbars(datasetCop)
      });


    d3.select("#ascend")
      .on("click", function () {

        titleSort = "Ascending Order"
        //console.log("ascend")
        setMode("#ascend")

        if (modeSortMet == "#all") {
          datasetCop = dataset.slice(0)
          setNumCouMode("#all")
          datasetCop = datasetCop.sort(function (a, b) {
            return d3.ascending(a.value, b.value);
          });
          ////console.log(datasetCop);

          x.domain(datasetCop.sort(
            function (a, b) { return d3.ascending(a.value, b.value); }
          ).map(function (d) {
            // console.log(d)
            return d.country;
          }));
          transitionAxis();
          transitionHeaderLowPart();
          redrawbars(datasetCop);
        }

        if (modeSortMet == "#res") {
          datasetCop = dataset.slice(0)
          setNumCouMode("#res")
          datasetCop = datasetCop.sort(function (a, b) {
            return d3.ascending(a.value, b.value);
          });
          ////console.log(datasetCop);

          x.domain(datasetCop.sort(
            function (a, b) { return d3.ascending(a.value, b.value); }
          ).map(function (d) {
            // console.log(d)
            return d.country;
          }));
          transitionAxis();
          transitionHeaderLowPart();
          redrawbars(datasetCop);
        }

        if (modeSortMet == "#top") {
          datasetCop = dataset.slice(0)
          setNumCouMode("#top")
          datasetCop = datasetCop.sort(function (a, b) {
            return d3.ascending(a.value, b.value);
          });

          ////console.log(datasetCop)
          datasetCop = datasetCop.splice(5, 5)
          ////console.log(datasetCop)

          x.domain(datasetCop.sort(
            function (a, b) { return d3.ascending(a.value, b.value); }
          ).map(function (d) {
            // console.log(d)
            return d.country;
          }));
          transitionAxis();
          transitionHeaderLowPart();
          redrawbars(datasetCop)
        }
        if (modeSortMet == "#bot") {
          datasetCop = dataset.slice(0)
          setNumCouMode("#bot")
          datasetCop = datasetCop.sort(function (a, b) {
            return d3.ascending(a.value, b.value);
          });
          ////console.log(datasetCop)
          datasetCop = datasetCop.splice(0, 5)
          ////console.log(datasetCop)

          x.domain(datasetCop.sort(
            function (a, b) { return d3.ascending(a.value, b.value); }
          ).map(function (d) {
            // console.log(d)
            return d.country;
          }));
          transitionAxis();
          transitionHeaderLowPart();
          redrawbars(datasetCop)
          // ////console.log(datasetCop)
        }

        // redrawbars(datasetCop)
      });

    d3.select("#descen")
      .on("click", function () {

        titleSort = "Descending Order"
        //console.log("descen")
        setMode("#descen")
        datasetCop = dataset.slice(0)


        if (modeSortMet == "#all") {
          setNumCouMode("#all")
          datasetCop = datasetCop.sort(function (a, b) {
            return d3.descending(a.value, b.value);
          });


          x.domain(datasetCop.sort(
            function (a, b) { return d3.descending(a.value, b.value); }
          ).map(function (d) {
            // console.log(d)
            return d.country;
          }));
          transitionAxis();
          transitionHeaderLowPart();
          redrawbars(datasetCop)
        }

        if (modeSortMet == "#res") {
          setNumCouMode("#res")
          datasetCop = datasetCop.sort(function (a, b) {
            return d3.descending(a.value, b.value);
          });


          x.domain(datasetCop.sort(
            function (a, b) { return d3.descending(a.value, b.value); }
          ).map(function (d) {
            // console.log(d)
            return d.country;
          }));
          transitionAxis();
          transitionHeaderLowPart();
          redrawbars(datasetCop)
        }

        if (modeSortMet == "#top") {
          setNumCouMode("#top")
          datasetCop = datasetCop.sort(function (a, b) {
            return d3.descending(a.value, b.value);
          });
          ////console.log(datasetCop)
          datasetCop = datasetCop.splice(0, 5)
          ////console.log(datasetCop)
          x.domain(datasetCop.sort(
            function (a, b) { return d3.descending(a.value, b.value); }
          ).map(function (d) {
            // console.log(d)
            return d.country;
          }));
          transitionAxis();
          transitionHeaderLowPart();
          redrawbars(datasetCop)
          // ////console.log(datasetCop)
        }
        if (modeSortMet == "#bot") {
          console.log("botttom!")
          setNumCouMode("#bot")
          datasetCop = datasetCop.sort(function (a, b) {
            return d3.descending(a.value, b.value);
          });

          ////console.log(datasetCop)
          datasetCop = datasetCop.splice(5, 5)
          ////console.log(datasetCop)
          x.domain(datasetCop.sort(
            function (a, b) { return d3.descending(a.value, b.value); }
          ).map(function (d) {
            // console.log(d)
            return d.country;
          }));


          transitionAxis();
          transitionHeaderLowPart();
          redrawbars(datasetCop)
        }

      });


    // d3.select(window).on('resize', resize);
    // resize()

    function transitionAxis() {

      // console.log("transitionAxis()")
      transition = svg.transition()
        .duration(750);

      // var delay = function (d, i) {
      //     return i * 50;
      // };


      transition.select("#x-axis")
        .call(xAxis);

      // console.log("transitionAxis()OUT")

    }

    function transitionHeader() {

      var newTitle = titleFirst + ' ' + titleSecond
      // newTitleLowPart = "In 2016" + "-" + titleSort
      console.log("transitionHeader()")
      d3.select("#barChartHead")
        .transition()
        .duration(300)
        .on("start", function transitionHeaderIn() {
          var t = d3.active(this)
            .style("opacity", 0)
            .remove();


          d3.select("#barChartHead")
            .style("opacity", 0)
            .text(newTitle)
            .transition(t)
            .style("opacity", 1)
            .transition()
            .delay(100);
        });



      svg.selectAll(".bar")
        .attr("fill", "steelblue")

    }

    function transitionHeaderLowPart() {
      // console.log("transitionHeaderLowPart()")
      // newTitle = titleFirst + ' ' + titleSecond
      var newTitleLowPart = "In 2017" + "-" + titleSort


      d3.select("#barChartHiHead")
        .transition()
        .duration(300)
        .on("start", function transitionHeaderIn() {
          var t = d3.active(this)
            .style("opacity", 0)
            .remove();


          d3.select("#barChartHiHead")
            .style("opacity", 0)
            .text(newTitleLowPart)
            .transition(t)
            .style("opacity", 1)
            .transition()
            .delay(100);
        });

      svg.selectAll(".bar")
        .attr("fill", "steelblue")

    }

    function redrawbars(dataset: any) {

      //update scale
      console.log("hsfd")
      x.domain(dataset.map(function (d) { return d.country; }));

      ////////////////////////////////
      // DATA JOIN FOR BARS.
      var bars = svg.selectAll(".bar")
        .data(dataset, function (d: any) { return d.country; });

      var delay = function (d, i) {
        return i * 50;
      }

      // UPDATE.
      bars.transition()
        .duration(750)
        .delay(delay)
        .attr("x", function (d) { return x(d.country); })
        .attr("width", x.bandwidth());

      // ENTER.
      bars.enter().append("rect")
        .attr("x", function (d) { return x(d.country); })
        .attr("y", function (d) { return y(d.value); })
        .attr("fill", "steelblue")
        .transition()
        .duration(1000)
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.country); })
        .attr("y", function (d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(d.value); })
        .attr("fill", "steelblue");

      // EXIT.
      bars.exit()
        .transition()
        .duration(750)
        .style("opacity", 0)
        .remove();


      svg.selectAll(".bar")
        .attr("fill", "steelblue")

    }



    function setMode(id) {
      d3.select("#alpha").style("background-color", "whitesmoke");
      d3.select("#ascend").style("background-color", "whitesmoke");
      d3.select("#descen").style("background-color", "whitesmoke");
      d3.select(id).style("background-color", "lightblue");
      mode = id;



      // //console.log(mode)
    }

    function setNumCouMode(id) {
      d3.select("#res").style("background-color", "lightblue");
      d3.select("#all").style("background-color", "lightblue");
      d3.select("#top").style("background-color", "lightblue");
      d3.select("#bot").style("background-color", "lightblue");

      d3.select(id).style("background-color", "#FF3366");
      modeSortMet = id;

      // console.log(modeSortMet)
    }

    function drawBars(dataset: any) {

      x.domain(dataset.map(function (d: any) { return d.country; }))
        .range([0, width])
        .paddingInner(0.05);

      y.domain([0, d3.max(dataset, function (d: any) { return +d.value; })])
        .range([height, 0]);

      svg.selectAll(".bar")
        .data(dataset, function (d: any) { return d.country; })
        // svg.selectAll(".bar")
        .attr("fill", "steelblue")
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.country); })
        .attr("y", function (d) { return y(+d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function (d) { return height - y(+d.value); })
        .attr("fill", "steelblue");


      xAxis = d3.axisBottom(this)
        .scale(x)


      svg.append("g")
        .attr("id", "x-axis")
        .attr("class", "axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);



      yAxis = d3.axisLeft(this)
        .scale(y)
      // .ticks(5, 'd');

      svg.append("g")
        .attr("id", "y-axis")
        .attr("class", "axis")
        .call(yAxis);

      svg.append("text")
        .attr("x", - height / 2)
        .attr("y", - margin.left + 30)
        .attr("transform", "rotate(-90)")
        .attr('class', 'ylabel')
        .append("tspan").text("Expenditure(% of GDP)")
        // .append("tspan").text("-2")
        .style("baseline-shift", "super")
        .style("font-size", "0.7em");


      svg.selectAll(".bar")
        .attr("fill", "steelblue")


    }

    function resize() {
      console.log("resize here")

      // var width = parseInt(d3.select('#chart').style('width')) - margin.left - margin.right;
      // console.log("resize here")
      // var height = parseInt(d3.select('#chart').style('height')) - margin.top - margin.bottom;

      // svg.attr('width', width)
      //   .attr('height', height)

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
