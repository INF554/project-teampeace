import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-choro-lacounty-map-in-popu',
  templateUrl: './choro-lacounty-map-in-popu.component.html',
  styleUrls: ['./choro-lacounty-map-in-popu.component.css']
})
export class ChoroLACountyMapInPopuComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    var svg = d3.select("#laCountyChor"),
      width = +svg.attr("width"),
      height = +svg.attr("height");



    var files = ["City Boundaries In LA County Latest.geojson", "County_of_Los_Angeles_Estimated_TotalPopulationVer3.csv"];


    var promises = [];

    files.forEach(function (url) {
      var partsOfurl = url.split('.');


      if (partsOfurl[partsOfurl.length - 1] == "geojson" || partsOfurl[partsOfurl.length - 1] == "json") { promises.push(d3.json(url)) }
      if (partsOfurl[partsOfurl.length - 1] == "csv") { promises.push(d3.csv(url)) }

    });


    var colorAllsch: any = d3.schemeBlues[9];

    var legend = svg.selectAll(".rect")
      .data(colorAllsch)
      .enter()
      .append("rect")
      .attr("fill", function (d:any) {
        // console.log(d)
        return d;
      })
      .attr("x", function (d, i) {
        // return 700 + i * 80
        return 900
      })
      .attr("y", function (d, i) {
        return 50 + i * 25
        // return 1000
      })
      .attr("width", 20)
      .attr("height", 25);


    var popuCate = [];
    
    for (var i = 2; i < 10; i++) {
      popuCate.push(10000 * i);
    }
    popuCate.push(100000 * 4)

    var popuCateAxis = popuCate
    popuCateAxis.splice(popuCate.length - 1, 1);

    var labels = svg.selectAll(".text")
      .data(popuCateAxis)
      .enter()
      .append("text")
      .attr("x", function (d, i) {
        // return 700 + i * 80
        return 925
      })
      .attr("y", function (d, i) {
        return 80 + i * 25
        // return 1000
      })
      // .attr("dy", "0.1em")
      .attr("font-size","10px")
      .text(d3.format(""));


    svg.append("text")
      .attr("x", 900)
      .attr("y", 30)
      .attr("font-size","10px")
      .text("Population");

    Promise.all(promises).then(function (values) {


      //U.S.A location data
      var Cities = values[0]


      //State population data in U.S.A 

      var popuLA = values[1]



 

      var shem: any=d3.schemeBlues[9]
      var colF = d3.scaleThreshold()
        .domain(popuCate)
        .range(shem);


      var projection = d3.geoMercator().fitSize([width, height], Cities);


      var path = d3.geoPath().projection(projection);
 

      svg.selectAll(".Cities")
        .data(Cities.features)
        .enter()
        .append("path")
        .attr("fill", function (d: any) {
          var c: any = 0;
          var trig = 0;
          var i;
          var totalPopTotal = 0;


          for (i = 0; i < popuLA.length; i++) {
            

            if (popuLA[i].CITYNAME == d.properties.city_name) {
              // console.log("same!!!!!!!!1")
              trig = 1;
              totalPopTotal = +popuLA[i].Total;
              // AllTotal.push(totalPop)

              c = colF(totalPopTotal);
              // c = colF(110000);
              console.log(totalPopTotal);
            }


          }

          if (trig == 0) {
            c = "white";
          }

          return c;
        })

        .attr("stroke", "gray")

        .attr("d", path);



      // console.log(popuLA.length)
      for (i = 0; i < popuLA.length; i++) {

        if (popuLA[i].CITYNAME.toString() != "Unincorporated") {
          var trig = 0;

          // for (j = 0; j < 50; j++) {
          for (var j = 0; j < Cities.features.length; j++) {


            if (Cities.features[j].properties.city_name.toString() != "Unincorporated" && +popuLA[i].Total < 10000) {
              if (popuLA[i].CITYNAME == Cities.features[j].properties.city_name && trig == 0) {


                trig = 1;

                var cen = path.centroid(Cities.features[j])

                var a = cen[0] - 509.72;
                var b = cen[1] - 241.78;

                var c = Math.sqrt(a * a + b * b);


                svg.append("circle")
                  .attr("cx", cen[0])
                  .attr("cy", cen[1])
                  .attr("r", 3)
                  .attr("fill", "#ff2329");



                svg.append("line")

                  .attr("x1", cen[0])
                  .attr("y1", cen[1])
                  .attr("x2", cen[0] + 100 * (cen[0] - 509.72) / c)
                  .attr("y2", cen[1] + 100 * (cen[1] - 241.78) / c)
                  // .attr("fill", "none")
                  .attr("stroke", "black")
                  .attr("stroke-width", 1);

                svg.append("text")

                  .attr("x", cen[0] + 105 * (cen[0] - 509.72) / c)
                  .attr("y", -2 + cen[1] + 105 * (cen[1] - 241.78) / c)
                  // .attr("fill", "none")
                  .attr("dy", "0.1em")
                  .attr("font-size","10px")
                  .text(popuLA[i].CITYNAME);

                // console.log(cen)
              }
              // console.log(Cities.features[i].properties.city_name)
            }
            //     Cities.features.properties.city_name



          }


        }


      }


    });



  }

}
