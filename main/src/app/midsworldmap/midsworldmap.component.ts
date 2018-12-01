import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-midsworldmap',
  templateUrl: './midsworldmap.component.html',
  styleUrls: ['./midsworldmap.component.css']
})
export class MidsworldmapComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    var svg = d3.select("#worldMid"),
      width = +svg.attr("width"),
      height = +svg.attr("height");



    // var files = ["us.json", "us-state-centroids.json"];
    var files = ["map.geojson", "MIDLOCA_2.0.csv"];


    var promises = [];

    files.forEach(function (url) {
      var partsOfurl = url.split('.');


      if (partsOfurl[partsOfurl.length - 1] == "geojson" || partsOfurl[partsOfurl.length - 1] == "json") { promises.push(d3.json(url)) }
      if (partsOfurl[partsOfurl.length - 1] == "csv") { promises.push(d3.csv(url)) }

    });



    var colFleg = d3.scaleSequential(d3.interpolateBlues);
    var microCo = [];


    var intervCol = 0.001;
    var i = 0
    while (i <= 1) {
      // console.log(i)
      microCo.push(colFleg(i))
      i = i + intervCol;
      // console.log(i)
    }

    // var legend = svg.selectAll(".rect")
    //   .data(microCo)
    //   .enter()
    //   .append("rect")
    //   .attr("fill", function (d: any) {
    //     // console.log(d)
    //     return d;
    //   })
    //   .attr("x", function (d, i) {
    //     return 800 + i * 0.2
    //   })
    //   .attr("y", 40)
    //   .attr("width", 0.19)
    //   .attr("height", 12);




    var percentMil = [0, 1];

    // var labels = svg.selectAll(".text")
    //   .data(percentMil)
    //   .enter()
    //   .append("text")
    //   .attr("x", function (d, i) {
    //     return 800 + i * 175
    //   })
    //   .attr("y", 65)
    //   .attr("font-size", '10px')
    //   .attr("dy", "0.1em")
    //   .text(d3.format(".0%"));

    // svg.append("text")
    //   .attr("x", 800)
    //   .attr("y", 30)
    //   .attr("font-size", '10px')
    //   .text("The share of world military expenditure (%)");

    Promise.all(promises).then(function (values) {

      // console.log(values[0]);
      // var colF = d3.scaleSequential(d3.interpolateOranges);
      var colF = d3.scaleSequential(d3.interpolateBlues);
      //U.S.A location data
      var worldmapPath = values[0]

      //State population data in U.S.A 
      var expMilCountries = values[1];

      // console.log(expMilCountries);

      // console.log(popuUS)


      // console.log(popuUS.features.geometry.coordinates)



      var projection = d3.geoMercator().fitSize([width, height], worldmapPath);
      // var projection2 = d3.geoAlbersUsa().fitSize([width, height], popuUS);

      var path = d3.geoPath().projection(projection);

      // console.log(expMilCountries)
      var count=1820;

      d3.select("#res")
        .on("click", function () {
          // console.log(wardata)
          count=count+1
          // console.log(count)

          var temp = values[1].filter(x => x.year == String(count))
          // console.log(temp)

          expMilCountries = temp


          // console.log("After")
          // console.log(expMilCountries)

          redrawMIDs(expMilCountries)



        });
      // console.log("After")
      // console.log(expMilCountries)



      svg.selectAll(".states")
        .data(worldmapPath.features)
        .enter()
        .append("path")
        .attr("fill", "white")
        .attr("id", function (d: any) {
          // console.log(d.properties.A3);
          //country name
          return d.properties.A3
        })
        .attr("stroke", "gray")
        .attr("d", path)

        .on('mouseover', function (this: any, d: any) {
          var centr=path.centroid(d) 
          // console.log(t)
          var xPosition = centr[0] - 100;
          // xPosition += (xPosition > diameter) ? -200 : 50;  //switch sides
          // var yPosition = parseFloat(d3.mouse(this)[1]);
          var yPosition = centr[1];
          // yPosition += (yPosition > diameter) ? -50 : 80;  //switch up/bottom
          d3.select('#tooltip-mid')
            .style('left', xPosition + 'px')
            .style('top', yPosition + 'px')
            .select('#country-info-mid')
            .html('<h4>' + d.properties.A3 + '</h4>');
          d3.select('#tooltip-mid').classed('hidden', false);

          var idString = "#" + this.id.toString();
          idString = String(idString)
          d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
          d3.select(idString).attr("fill", "steelblue");

        })
        .on('mouseout', function (this: any) {
          d3.select('#tooltip-mid').classed('hidden', true);
          var idString = "#" + this.id.toString()
          idString = String(idString)
          d3.select(idString).attr("fill", String(d3.select(idString).attr("fillX")));
          // d3.select('#card-name-bub1').html('Country Information');
          // d3.select('#card-desc-bub1').html('Mouse over bars for quick facts.<br/><br/><br/>');
        });

      
      var buttonA = 1;

      // var i;
      // for (i = 0; i < expMilCountries.length; i++) {
      //   // setTimeout(function () { console.log(i);  }, 3000 * i);
      //   if (+expMilCountries[i].year >= 1816 && +expMilCountries[i].year <= 1950) {
      //     // var coord: any = [+expMilCountries[i].midloc11_latitude, expMilCountries[i].midloc11_longitude];
      //     var coord: any = [+expMilCountries[i].midloc11_longitude, expMilCountries[i].midloc11_latitude];
      //     var marker = projection(coord);
      //     // console
      //     svg.append("circle")
      //       .attr("cx", marker[0])
      //       .attr("cy", marker[1])
      //       .attr("r", 5)
      //       .attr("fill", "blue")
      //       .attr("class", "bubble")
      //   }

      // }


      // var i;
      // for (i = 0; i < expMilCountries.length; i++) {
      //   // setTimeout(function () { console.log(i);  }, 3000 * i);
      //   if (+expMilCountries[i].year >= 1816 && +expMilCountries[i].year <= 1950) {
      //     // var coord: any = [+expMilCountries[i].midloc11_latitude, expMilCountries[i].midloc11_longitude];
      //     var coord: any = [+expMilCountries[i].midloc11_longitude, expMilCountries[i].midloc11_latitude];
      //     var marker = projection(coord);
      //     // console
      //     svg.append("circle")
      //       .attr("cx", marker[0])
      //       .attr("cy", marker[1])
      //       .attr("r", 5)
      //       .attr("fill", "blue")
      //       .attr("class", "bubble")
      //   }

      // }

      //Draw all Conflict
      svg.selectAll(".conflict")
        .data(expMilCountries)
        .enter()
        .append("circle")
        .attr("cx", function (d: any) {
          // console.log(+d.midloc11_longitude)
          var marker = projection([+d.midloc11_longitude, +d.midloc11_latitude])
          return marker[0]
        })
        .attr("cy", function (d: any) {
          var marker = projection([+d.midloc11_longitude, +d.midloc11_latitude])
          return marker[1]
        })
        .attr("id", function (d: any) {
          var tempId = "conflict" + String(d.dispnum)
          return String(tempId);
        })
        .attr("r", 2)
        .attr("fill", "blue")
        .attr("class", "mid")
        .on('mouseover', function (this: any, d: any) {
          // console.log("I am on the text!!!!");
          // console.log(this);
          var idString = "#" + this.id.toString();
          // console.log(idString);
          idString = String(idString)
          d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
          d3.select(idString).attr("fill", "red")

          d3.select(idString).attr("rX", String(d3.select(idString).attr("r")));
          d3.select(idString).attr("r", "5")
        })
        .on('mouseout', function (this: any) {
          // console.log(this);
          var idString = "#" + this.id.toString()
          idString = String(idString)
          d3.select(idString).attr("fill", String(d3.select(idString).attr("fillX")));
          d3.select(idString).attr("r", String(d3.select(idString).attr("rX")));

        });







      // var i;
      // for (i = 0; i < expMilCountries.length; i++) {


      //   var d = expMilCountries[i].expend / 100
      //   // console.log(d)
      //   var c = colF(d)
      //   // var c = colF(0.35)
      //   // console.log(c)
      //   var ID = "#" + expMilCountries[i].country
      //   svg.select(ID)
      //     .style("fill", c);
      // }


      // var i;
      // for (i = 0; i < expMilCountries.length; i++) {


      //   var coord: any = [expMilCountries[i].coordinates[1], expMilCountries[i].coordinates[0]];
      //   var marker = projection(coord);
      //   // console
      //   svg.append("circle")
      //     .attr("cx", marker[0])
      //     .attr("cy", marker[1])
      //     .attr("r", 5)
      //     .attr("fill", "red")
      //     .attr("class", "bubble")


      //   if (marker[0] < 600) {
      //     svg.append("line")

      //       .attr("x1", marker[0] - 3)
      //       .attr("y1", marker[1])
      //       .attr("x2", marker[0] - 70)
      //       .attr("y2", marker[1])
      //       // .attr("fill", "none")
      //       .attr("stroke", "black")
      //       .attr("stroke-width", 1);


      //     svg.append("text")

      //       .attr("x", marker[0] - 95)
      //       .attr("y", marker[1] + 3)
      //       // .attr("fill", "none")
      //       .attr("dy", "0.1em")
      //       .attr("font-size", '10px')
      //       .text(expMilCountries[i].country);
      //   }


      //   if (600 <= marker[0] && marker[0] < 700) {
      //     svg.append("line")
      //       // .attr("x1", marker[0]+(1.414/2)*expMilCountries[i].expend)
      //       // .attr("y1", marker[1]+(1.414/2)*expMilCountries[i].expend)
      //       .attr("x1", marker[0])
      //       .attr("y1", marker[1] + 3)
      //       .attr("x2", marker[0] + 10)
      //       .attr("y2", marker[1] + 50)
      //       // .attr("fill", "none")
      //       .attr("stroke", "black")
      //       .attr("stroke-width", 1);


      //     svg.append("text")

      //       .attr("x", marker[0] + 12)
      //       .attr("y", marker[1] + 55)
      //       .attr("font-size", '10px')
      //       // .attr("fill", "none")
      //       .attr("dy", "0.1em")
      //       .text(expMilCountries[i].country);



      //   }



      //   if (700 <= marker[0] && marker[0] < 800) {
      //     svg.append("line")
      //       // .attr("x1", marker[0]+(1.414/2)*expMilCountries[i].expend)
      //       // .attr("y1", marker[1]+(1.414/2)*expMilCountries[i].expend)
      //       .attr("x1", marker[0] - 3)
      //       .attr("y1", marker[1])
      //       .attr("x2", marker[0] - 20)
      //       .attr("y2", marker[1])
      //       // .attr("fill", "none")
      //       .attr("stroke", "black")
      //       .attr("stroke-width", 1);


      //     svg.append("text")

      //       .attr("x", marker[0] - 45)
      //       .attr("y", marker[1] + 4)
      //       // .attr("fill", "none")
      //       .attr("font-size", '10px')
      //       .attr("dy", "0.1em")
      //       .text(expMilCountries[i].country);



      //   }

      //   if (800 < marker[0]) {


      //     svg.append("line")

      //       .attr("x1", marker[0])
      //       .attr("y1", marker[1] + 3)
      //       .attr("x2", marker[0] + 10)
      //       .attr("y2", marker[1] + 50)
      //       // .attr("fill", "none")
      //       .attr("stroke", "black")
      //       .attr("stroke-width", 1);


      //     svg.append("text")

      //       .attr("x", marker[0] + 12)
      //       .attr("y", marker[1] + 55)
      //       .attr("font-size", '10px')
      //       // .attr("fill", "none")
      //       .attr("dy", "0.1em")
      //       .text(expMilCountries[i].country);



      //   }
      // }



      function redrawMIDs(expMilCountries: any) {


        // console.log("redrawMIDs")
        // console.log(expMilCountries)

        // DATA JOIN
        var mids = svg.selectAll(".mid")
          .data(expMilCountries)

          // console.log(mids)

        var delay = function (d, i) {
          return i * 50;
        }

        // UPDATAE.
        // mids.transition()
        //   .duration(750)
        //   .delay(delay)
          mids.attr("cx", function (d: any) {
            // console.log(+d.midloc11_longitude)
            var marker = projection([+d.midloc11_longitude, +d.midloc11_latitude])
            return marker[0]
          })          
          .attr("cy", function (d: any) {
            var marker = projection([+d.midloc11_longitude, +d.midloc11_latitude])
            return marker[1]
          })
          .attr("r", 5)
          .attr("fill", "blue")
          .attr("class", "mid")

          // .attr("id", function (d: any) {
          //   var tempId = "conflict" + String(d.dispnum) +"re"
          //   console.log(tempId)
          //   return String(tempId);
          // })
          // .attr("r", 5)
          // .attr("fill", "blue")
          // .attr("class", "bubble")

        // console.log("mids")

        // ENTER.
        mids.enter()
          .append("circle")
          .attr("cx", function (d: any) {
            // console.log("Enter")
            // console.log(+d.midloc11_longitude)
            var marker = projection([+d.midloc11_longitude, +d.midloc11_latitude])
            return marker[0]
          })
          .attr("cy", function (d: any) {
            var marker = projection([+d.midloc11_longitude, +d.midloc11_latitude])
            return marker[1]
          })

          // .transition()
          // // .ease("elastic")
          // .duration(1000)

          .attr("id", function (d: any) {
            var tempId = "conflict" + String(d.dispnum)
            return String(tempId);
          })
          .attr("r", 5)
          .attr("fill", "blue")
          .attr("class", "mid")

          .on('mouseover', function (this: any, d: any) {
            // console.log("I am on the text!!!!");
            // console.log(this);
            var idString = "#" + this.id.toString();
            // console.log(idString);
            idString = String(idString)
            d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
            d3.select(idString).attr("fill", "red")

            d3.select(idString).attr("rX", String(d3.select(idString).attr("r")));
            d3.select(idString).attr("r", "5")
          })
          .on('mouseout', function (this: any) {
            // console.log(this);
            var idString = "#" + this.id.toString()
            idString = String(idString)
            d3.select(idString).attr("fill", String(d3.select(idString).attr("fillX")));
            d3.select(idString).attr("r", String(d3.select(idString).attr("rX")));

          });


              // EXIT.
          mids.exit()
          // .transition()
          // .duration(750)
          .style("opacity", 0)
          .remove();

          // mids.exit()
          // .remove();

      }

    });





  }



}


