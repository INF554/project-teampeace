import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-choro-world-map-in-mil-exp',
  templateUrl: './choro-world-map-in-mil-exp.component.html',
  styleUrls: ['./choro-world-map-in-mil-exp.component.css']
})
export class ChoroWorldMapInMilExpComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    var svg = d3.select("#worldChor"),
      width = +svg.attr("width"),
      height = +svg.attr("height");



    // var files = ["us.json", "us-state-centroids.json"];
    var files = ["map_COW.geojson", "MIDLOCA_2.0.csv"];


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

    var legend = svg.selectAll(".rect")
      .data(microCo)
      .enter()
      .append("rect")
      .attr("fill", function (d: any) {
        // console.log(d)
        return d;
      })
      .attr("x", function (d, i) {
        return 800 + i * 0.2
      })
      .attr("y", 40)
      .attr("width", 0.19)
      .attr("height", 12);




    var percentMil = [0, 1];

    var labels = svg.selectAll(".text")
      .data(percentMil)
      .enter()
      .append("text")
      .attr("x", function (d, i) {
        return 800 + i * 175
      })
      .attr("y", 65)
      .attr("font-size", '10px')
      .attr("dy", "0.1em")
      .text(d3.format(".0%"));

    svg.append("text")
      .attr("x", 800)
      .attr("y", 30)
      .attr("font-size", '10px')
      .text("The share of world military expenditure (%)");

    Promise.all(promises).then(function (values) {

      // console.log(values[0]);
      // var colF = d3.scaleSequential(d3.interpolateOranges);
      var colF = d3.scaleSequential(d3.interpolateBlues);
      //U.S.A location data
      var locCountry = values[0]

      //State population data in U.S.A 
      var expMilCountries = values[1];

      // console.log(expMilCountries);

      // console.log(popuUS)


      // console.log(popuUS.features.geometry.coordinates)



      var projection = d3.geoMercator().fitSize([width, height], locCountry);
      // var projection2 = d3.geoAlbersUsa().fitSize([width, height], popuUS);

      var path = d3.geoPath().projection(projection);



      svg.selectAll(".states")
        .data(locCountry.features)
        .enter()
        .append("path")
        .attr("fill", "white")
        .attr("id", function (d: any) {
          // console.log(d.properties.A3);
          //country name
          return d.properties.A3
        })
        .attr("stroke", "gray")
        .attr("d", path);

      var buttonA=1;

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
      //       .attr("r", 2)
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
      //       .attr("r", 2)
      //       .attr("fill", "blue")
      //       .attr("class", "bubble")
      //   }
        
      // }

      svg.selectAll(".conflict")
        .data(expMilCountries)
        .enter()
        .append("circle")
        .attr("cx", function(d: any){
          // console.log(+d.midloc11_longitude)
          var marker=projection([+d.midloc11_longitude,+d.midloc11_latitude])
          return marker[0]
        })
        .attr("cy",function(d: any){
          var marker=projection([+d.midloc11_longitude,+d.midloc11_latitude])
          return marker[1]
        })
        .attr("id",function(d: any){
          var tempId="conflict"+String(d.dispnum)
          return String(tempId);
        })
        .attr("r", 2)
        .attr("fill", "blue")
        .attr("class", "bubble")
        .on('mouseover', function (this: any, d: any) {
          // console.log("I am on the text!!!!");
          // console.log(this);
          var idString = "#" + this.id.toString();
          console.log(idString);
          idString = String(idString)
          d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
          d3.select(idString).attr("fill","red")
        })
        .on('mouseout', function (this: any) {
          // console.log(this);
          var idString = "#" + this.id.toString()
          idString = String(idString)
          d3.select(idString).attr("fill", String(d3.select(idString).attr("fillX")));


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
      //     .attr("r", 2)
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



    });




  }

}
