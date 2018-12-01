import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-warworldmap',
  templateUrl: './warworldmap.component.html',
  styleUrls: ['./warworldmap.component.css']
})
export class WarworldmapComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    var svg = d3.select("#warworld"),
      width = +svg.attr("width"),
      height = +svg.attr("height");



    // var files = ["us.json", "us-state-centroids.json"];
    var files = ["map.geojson", "directed_dyadic_war_lati_long.csv", "COW country codes_lati_long.csv", "Dyadic_COW_4.0_flow2_1870.json"];


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
      var wardata = values[1];

      var whcounNaLatLong = values[2];

      var test = values[3];

      // console.log(test.data)

      // console.log(expMilCountries);

      // console.log(popuUS)
      // console.log(popuUS.features.geometry.coordinates)



      var projection = d3.geoMercator().fitSize([width, height], locCountry);
      // var projection2 = d3.geoAlbersUsa().fitSize([width, height], popuUS);

      var path = d3.geoPath().projection(projection);

      var cirId = 1;
      var couNaId = 1;
      var areaId = 1;






      d3.select('#tooltip-mid').classed('hidden', true);


      // console.log(wardata)
      // d3.select("#res")
      //   .on("click", function () {
      //     // console.log(wardata)
      //     var temp=wardata.filter(x => x.warstrtyr == "1864")
      //     // console.log(temp)
          
      //     wardata=temp


      //   console.log("After")
      //   console.log(wardata)


      //   });





      svg.selectAll(".states")
        .data(locCountry.features)
        .enter()
        .append("path")
        .attr("fill", "white")
        // .attr("id", function (d: any) {
        //   // console.log(d.properties.A3);
        //   //country name
        //   return d.properties.A3
        // })
        .attr("id", function (d: any) {
          // console.log(d.StateNme)
          // var tid="area"+d.StateAbb + areaId.toString()
          // console.log(d.properties.A3)
          var tid = d.properties.A3 + areaId.toString()
          // console.log(tid)
          areaId++
          return tid;
          // idString=idString + couNaId.toString()
          // couNaId++

          // return d.StateNme; 
        })
        .attr("stroke", "gray")
        .attr("d", path)

        // .text(function (d:any) { return d.StateNme; })

        .on('mouseover', function (this: any, d: any) {
          // console.log("I am on the text!!!!");
          // console.log(this);
          var idString = "#" + this.id.toString();
          // console.log(idString)
          // console.log(idString)
          // console.log(String(d3.select(idString).attr("font-size")));


          // console.log(d3.select(idString).attr("cz"));
          // console.log(d3.select(idString).attr("cy"));

          idString = String(idString)
          d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
          d3.select(idString).attr("fill", "blue")

          // d3.select(idString).attr("rX", String(d3.select(idString).attr("r")));
          // d3.select(idString).attr("r", "5")
        })
        .on('mouseout', function (this: any) {
          // console.log(this);
          var idString = "#" + this.id.toString()
          idString = String(idString)
          d3.select(idString).attr("fill", String(d3.select(idString).attr("fillX")));
          // d3.select(idString).attr("r", String(d3.select(idString).attr("rX")));
        });

      var buttonA = 1;



      // svg.selectAll(".war")
      //   .data(wardata)
      //   .enter()
      //   .append("line")
      //   .attr("x1", function(d: any){
      //     // console.log([+d.alatitude,+d.alongitude])
      //     // var marker=projection([+d.alatitude,+d.alongitude])
      //     var marker=projection([+d.alongitude,+d.alatitude])
      //     // console.log(marker[0])
      //     return marker[0]
      //   })
      //   .attr("y1",function(d: any){
      //     var marker=projection([+d.alongitude,+d.alatitude])
      //     return marker[1]
      //   })
      //   .attr("x2", function(d: any){
      //     // console.log(+d.midloc11_longitude)
      //     // var marker=projection([+d.blatitude,+d.blongitude])
      //     var marker=projection([+d.blongitude,+d.blatitude])
      //     return marker[0]
      //   })
      //   .attr("y2",function(d: any){
      //     // var marker=projection([+d.blatitude,+d.blongitude])
      //     var marker=projection([+d.blongitude,+d.blatitude])
      //     return marker[1]
      //   })
      //   .attr("stroke","black");



      // war Curve
      svg.selectAll(".p")
        .data(wardata)
        .enter()
        .append("path")
        .attr("d", function (d: any) {
          // console.log(+d.a_longitude)
          var target = projection([+d.a_longitude, +d.a_latitude])
          var source = projection([+d.b_longitude, +d.b_latitude])

          var dx = target[0] - source[0],
            dy = target[1] - source[1],
            dr = Math.sqrt(dx * dx + dy * dy);
          return "M" + source[0] + "," + source[1] + "A" + dr + "," + dr +
            " 0 0,1 " + target[0] + "," + target[1];
        })
        .attr("fill", "none")
        .attr("stroke", function (d: any) {
          if (d.statea == 2) {
            return "blue";
          }

          else {
            return "none"
          }
        })
        .attr("stroke-width", "1");

      // .on('mouseover', function (this: any, d: any) {
      //   // console.log("I am on the text!!!!");
      //   // console.log(this);
      //   var idString = "#" + this.id.toString();
      //   console.log(idString);
      //   idString = String(idString)
      //   d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
      //   d3.select(idString).attr("fill", "red")

      //   d3.select(idString).attr("rX", String(d3.select(idString).attr("r")));
      //   d3.select(idString).attr("r", "5")
      // })
      // .on('mouseout', function (this: any) {
      //   // console.log(this);
      //   var idString = "#" + this.id.toString()
      //   idString = String(idString)
      //   d3.select(idString).attr("fill", String(d3.select(idString).attr("fillX")));
      //   d3.select(idString).attr("r", String(d3.select(idString).attr("rX")));

      // });




      //
      // svg.selectAll(".war")
      //   .data(wardata)
      //   .enter()
      //   .append("circle")
      //   .attr("cx", function (d: any) {
      //     console.log([+d.alatitude, +d.alongitude])
      //     // var marker=projection([+d.alatitude,+d.alongitude])
      //     var marker = projection([+d.alongitude, +d.alatitude])
      //     // console.log(marker[0])
      //     return marker[0]
      //   })
      //   .attr("cy", function (d: any) {
      //     var marker = projection([+d.alongitude, +d.alatitude])
      //     return marker[1]
      //   })
      //   .attr("r", "2");


      svg.selectAll(".war")
        .data(whcounNaLatLong)
        .enter()
        .append("text")
        .attr("x", function (d: any) {
          // console.log([+d.latitude, +d.longitude])
          // var marker=projection([+d.alatitude,+d.alongitude])
          var marker = projection([+d.longitude, +d.latitude])
          // console.log(marker[0])
          return marker[0]
        })
        .attr("y", function (d: any) {
          var marker = projection([+d.longitude, +d.latitude])
          return marker[1]
        })
        .attr("id", function (d: any) {
          // console.log(d.StateNme)
          var tid = d.StateAbb + couNaId.toString()
          // console.log(tid)
          couNaId++
          return tid;
          // idString=idString + couNaId.toString()
          // couNaId++

          // return d.StateNme; 
        })
        .text(function (d: any) { return d.StateNme; })
        .attr("font-family", "sans-serif")
        .attr("font-size", "2px")
        .attr("text-anchor", "middle")
        .attr("fill", "gray")
        .on('mouseover', function (this: any, d: any) {
          // console.log("I am on the text!!!!");
          // console.log(this);
          var idString = "#" + this.id.toString();
          // console.log(idString)
          // console.log(String(d3.select(idString).attr("font-size")));


          // console.log(d3.select(idString).attr("cz"));
          // console.log(d3.select(idString).attr("cy"));

          idString = String(idString)
          d3.select(idString).attr("font-sizeX", String(d3.select(idString).attr("font-size")));
          d3.select(idString).attr("font-size", "10")

          // d3.select(idString).attr("rX", String(d3.select(idString).attr("r")));
          // d3.select(idString).attr("r", "5")
        })
        .on('mouseout', function (this: any) {
          // console.log(this);
          var idString = "#" + this.id.toString()
          idString = String(idString)
          d3.select(idString).attr("font-size", String(d3.select(idString).attr("font-sizeX")));
          // d3.select(idString).attr("r", String(d3.select(idString).attr("rX")));
        });


      svg.selectAll(".war")
        .data(whcounNaLatLong)
        .enter()
        .append("circle")
        .attr("cx", function (d: any) {
          // console.log([+d.latitude, +d.longitude])
          // var marker=projection([+d.alatitude,+d.alongitude])
          var marker = projection([+d.longitude, +d.latitude])
          // console.log(marker[0])
          return marker[0]
        })
        .attr("cy", function (d: any) {
          var marker = projection([+d.longitude, +d.latitude])
          return marker[1]
        })

        .attr("cz", function (d: any) {
          // console.log(d)
          // var marker=projection([+d.alatitude,+d.alongitude])
          // var marker = projection([+d.longitude, +d.latitude])
          // console.log(marker[0])
          return d.longitude.toString() + " " + d.latitude.toString() + " " + d.StateNme
          // return d.StateAbb
        })

        .attr("r", "1.5")
        .attr("id", function (d: any) {
          'circle' + cirId.toString()
          cirId++
          return 'circle' + cirId.toString();
        })
        .on('mouseover', function (this: any, d: any) {
          // console.log("I am on the text!!!!");
          // console.log(this);
          var idString = "#" + this.id.toString();

          // console.log(d3.select(idString).attr("cz"));
          // console.log(d3.select(idString).attr("cy"));

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







      // .attr("id",function(d: any){
      //   var tempId="war"+String(d.dispnum)
      //   return String(tempId);
      // })
      // .attr("r", 2)
      // .attr("fill", "blue")
      // .attr("class", "bubble")
      // .on('mouseover', function (this: any, d: any) {
      //   // console.log("I am on the text!!!!");
      //   // console.log(this);
      //   var idString = "#" + this.id.toString();
      //   console.log(idString);
      //   idString = String(idString)
      //   d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
      //   d3.select(idString).attr("fill","red")

      //   d3.select(idString).attr("rX", String(d3.select(idString).attr("r")));
      //   d3.select(idString).attr("r","5")
      // })
      // .on('mouseout', function (this: any) {
      //   // console.log(this);
      //   var idString = "#" + this.id.toString()
      //   idString = String(idString)
      //   d3.select(idString).attr("fill", String(d3.select(idString).attr("fillX")));
      //   d3.select(idString).attr("r", String(d3.select(idString).attr("rX")));

      // });







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
