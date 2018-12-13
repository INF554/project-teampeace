import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-mids-wars-trade-inf-world',
  templateUrl: './mids-wars-trade-inf-world.component.html',
  styleUrls: ['./mids-wars-trade-inf-world.component.css']
})
export class MidsWarsTradeInfWorldComponent implements OnInit {

  constructor() { }

  ngOnInit() {







    // WorldMid is map
    var svg = d3.select("#worldMid"),
      width = +svg.attr("width"),
      height = +svg.attr("height");

      width=width-50
      height=height-70
    // var files = [
    //   // "map.geojson",
    //   "map_COW.geojson",//values[0] map 
    //   "MIDLOCA_2.0.csv",//values[1] MIDs
    //   // "directed_dyadic_war_lati_long_stateName.csv",
    //   "directed_dyadic_war_lati_long_stateName_allYear.csv",//values[2]
    //   "COW country codes_lati_long.csv",//values[3]
    //   "Dyadic_COW_4.0_flow2_1870.json",//values[4]
    //   // "MIDLOCA_2.0_groupbycountbyyear.csv",
    //   // "MIDLOCA_2.0_groupbycountbyyear.csv__allYear.csv",//values[5]
    //   "MIDLOCA_2.0_groupbycountbyyearAllYearConti.csv",//values[5]
    //   // "directed_dyadic_war_lati_long_stateNamecountbyyear.csv",
    //   // "directed_dyadic_war_lati_long_stateNamecountbyyearAllVer2.csv",
    //   "directed_dyadic_war_lati_long_stateNamecountbyyearAllVer3.csv",//values[6]
    //   // "Dyadic_COW_4.0_Processed.csv",//trade dataset //values[7],
    //   "Dyadic_COW_4.0_Processed_WithCcode.csv", //trade dataset //values[7],
    //   "Inter-StateWarsList-Ver2.csv",//values[8]
    //   "National_COW_4.0.csv"
    //   // "test.json"
    // ];


    var files = [

      "map_COW.geojson",//values[0] map 
      "MIDLOCA_2.0.csv",//values[1] MIDs
      "directed_dyadic_war_lati_long_stateName_allYear.csv",//values[2]
      "COW country codes_lati_long.csv",//values[3]
      "Dyadic_COW_4.0_flow2_1870.json",
      "MIDLOCA_2.0_groupbycountbyyearAllYearConti.csv",//values[5]
      "directed_dyadic_war_lati_long_stateNamecountbyyearAllVer3.csv",//values[6]
      "Dyadic_COW_4.0_Processed_WithCcode.csv", //trade dataset //values[7],
      "Inter-StateWarsList-Ver2.csv",//values[8]
      "National_COW_4.0.csv"

    ];


    var promises = [];

    files.forEach(function (url) {
      var partsOfurl = url.split('.');

      if (partsOfurl[partsOfurl.length - 1] == "geojson" || partsOfurl[partsOfurl.length - 1] == "json") { promises.push(d3.json(url)) }
      if (partsOfurl[partsOfurl.length - 1] == "csv") { promises.push(d3.csv(url)) }

    });


    var percentMil = [0, 1];

    Promise.all(promises).then(function (values) {

      var worldmapPath = values[0]

      // var midsRecord = values[1];

      // var wardata = values[2];

      // var whcounNaLatLong = values[3];

      var allCCodeOnmap = [];

      var removeCoun = [];

      // var drawMidsPoint = 0;

      d3.select('#tooltip-mid').classed('hidden', true);
      d3.select('#tooltip-midInfor').classed('hidden', true);

      drawBasicInforOnMap()


      // pulse()


      // changeElementColor(d3.select("#conflict4489"));



      // MIDs Bar chart part
      drawMIDSbars(values[5])

      // War Bar chart part
      drawWARSbars(values[6])

      // Trade Part
      drawTRADEbars(values[7])


      // World Map Part
      drawMapOrigin(width, height, worldmapPath)





      //MAP part
      d3.select('#tooltip-mid').classed('hidden', true);
      d3.select('#tooltip-midInfor').classed('hidden', true);
      //South Korea
      // var projection = d3.geoMercator().fitSize([width, height], worldmapPath.features[40]);
      var projection = d3.geoMercator().fitSize([width, height], worldmapPath);
      // var projection2 = d3.geoAlbersUsa().fitSize([width, height], popuUS);

      var path = d3.geoPath().projection(projection);

      var warCount = 1828;

      var refixcoID = [];


      d3.select("#warbot")
        .on("click", function () {
          // console.log("click")
          warCount = warCount + 1
          // console.log(warCount)
          // console.log(values[2])
          var temp = values[2].filter(x => x.year == String(warCount))
          // console.log(values[2])
          // console.log(temp)

          // midsRecord = temp
          // console.log(temp);
          // drawWars(temp)

        });


      // d3.select("#midsButton")
      //   .on("click", function () {

      //     d3.selectAll(".warDyadicPath").remove()
      //     var temp = values[1].filter(x => x.year == String(count))
      //     drawMIDsDotOnMap(temp)

      //   });





      d3.select("#pills-mids-tab")
        .on("click", function () {
          // console.log("WARBUTTON")


          removeWarsVer3()

          d3.select("#worldMidChartHiHead")
            .style("color", "white")






          // d3.select("#WarMajorOnMap").remove()
          // d3.select("#WarTitleOnMap").remove()
          // d3.select("#WarYearOnMap").remove()


          // d3.select("#worldMidChartHead")
          // .append("br")
          // .attr("id","tempBlank1")

          // d3.select("#worldMidChartHiHead")
          // .text(" ")

          d3.selectAll(".mid").remove()

          var newTitle = "Militarized Interstate Disputes"
          d3.select("#worldMidChartHead")
            .transition()
            .duration(300)
            .on("start", function transitionHeaderIn() {
              var t = d3.active(this)
                .style("opacity", 0)
                .remove();


              d3.select("#worldMidChartHead")
                .style("opacity", 0)
                .text(newTitle)
                .transition(t)
                .style("opacity", 1)
                .transition()
                .delay(100);
            });




          d3.select("#WarMajorOnMap")
            // .attr("absolute","absolute")
            // .attr("top", "70px")
            // .attr("right", "15px")
            // .attr("y", 400)
            .transition()
            .duration(1)
            .style("color", "black")
            .on("start", function transitionHeaderIn() {

              var t = d3.active(this)
                .style("opacity", 0)
                .remove();
              // console.log(t)

              d3.select("#WarMajorOnMap")
                .style("opacity", 0)
                .text("Militarized Conflicts")
                .transition(t)
                .style("opacity", 1)
                .style("color", "black")
                .transition()
                .duration(1);
            });


          d3.select("#WarTitleOnMap")
            // .attr("absolute","absolute")
            // .attr("top", "70px")
            // .attr("right", "15px")
            // .attr("y", 400)
            .transition()
            .duration(1)
            .style("color", "black")
            .on("start", function transitionHeaderIn() {

              var t = d3.active(this)
                .style("opacity", 0)
                .remove();
              // console.log(t)

              d3.select("#WarTitleOnMap")
                .style("opacity", 0)
                .text("from 1816-2010")
                .transition(t)
                .style("opacity", 1)
                .style("color", "black")
                .transition()
                .duration(1);
            });


          d3.select("#WarYearOnMap")
            // .attr("absolute","absolute")
            // .attr("top", "70px")
            // .attr("right", "15px")
            // .attr("y", 400)
            .transition()
            .duration(1)
            .style("color", "black")
            .on("start", function transitionHeaderIn() {

              var t = d3.active(this)
                .style("opacity", 1)
                .remove();
              // console.log(t)

              d3.select("#WarYearOnMap")
                .style("opacity", 0)
                // .text(String(selectedMIDYear))
                // .text("#MIDs: " + MIDSelected[0].countmids)
                .transition(t)
                .style("opacity", 0)
                .style("color", "black")
                .transition()
                .duration(1);
            });



          d3.select("#forthInform")
            // .attr("absolute","absolute")
            // .attr("top", "70px")
            // .attr("right", "15px")
            // .attr("y", 400)
            .transition()
            .duration(1)
            .style("color", "black")
            .on("start", function transitionHeaderIn() {

              var t = d3.active(this)
                .style("opacity", 0)
                .remove();
              // console.log(t)

              d3.select("#forthInform")
              .style("opacity", 0)
                // .text(String(selectedMIDYear))
                // .text("#deaths: "+warSelectedBattDeath[0]['batdths'])
                // .text("#Countries at War Information: " +countryAtWar[0].size)
                // .text("Major war: "+String(charPart)+ yearString)
                .transition(t)
                .style("opacity", 0)
                .style("color", "black")
                .transition()
                .duration(1);
            });






          // var temp = values[2].filter(x => x.year == String(warCount))
          // drawWars(temp)
          // drawWarsVer2(temp, values[3])
        });








      d3.select("#pills-wars-tab")
        .on("click", function () {
          // console.log("WARBUTTON")
          // <br id="tempBlank1">
          // d3.select("#worldMidChartHead")
          // .append("br")
          // .attr("id","tempBlank1");

          removeWarsVer3()
          d3.select("#worldMidChartHiHead")
            .style("color", "white")


          d3.selectAll(".mid").remove()

          var newTitle = "The countries at wars"
          d3.select("#worldMidChartHead")
            .transition()
            .duration(300)
            .on("start", function transitionHeaderIn() {
              var t = d3.active(this)
                .style("opacity", 0)
                .remove();


              d3.select("#worldMidChartHead")
                .style("opacity", 0)
                .text(newTitle)
                .transition(t)
                .style("opacity", 1)
                .transition()
                .delay(100);
            });



          d3.select("#WarMajorOnMap")
            // .attr("absolute","absolute")
            // .attr("top", "70px")
            // .attr("right", "15px")
            // .attr("y", 400)
            .transition()
            .duration(1)
            .style("color", "black")
            .on("start", function transitionHeaderIn() {

              var t = d3.active(this)
                .style("opacity", 0)
                .remove();
              // console.log(t)

              d3.select("#WarMajorOnMap")
                .style("opacity", 0)
                .text("War Information")
                .transition(t)
                .style("opacity", 1)
                .style("color", "black")
                .transition()
                .duration(1);
            });


          d3.select("#WarTitleOnMap")
            // .attr("absolute","absolute")
            // .attr("top", "70px")
            // .attr("right", "15px")
            // .attr("y", 400)
            .transition()
            .duration(1)
            .style("color", "black")
            .on("start", function transitionHeaderIn() {

              var t = d3.active(this)
                .style("opacity", 0)
                .remove();
              // console.log(t)

              d3.select("#WarTitleOnMap")
                .style("opacity", 0)
                .text("from 1823-2003")
                .transition(t)
                .style("opacity", 1)
                .style("color", "black")
                .transition()
                .duration(1);
            });


          d3.select("#WarYearOnMap")
            // .attr("absolute","absolute")
            // .attr("top", "70px")
            // .attr("right", "15px")
            // .attr("y", 400)
            .transition()
            .duration(1)
            .style("color", "black")
            .on("start", function transitionHeaderIn() {

              var t = d3.active(this)
                .style("opacity", 1)
                .remove();
              // console.log(t)

              d3.select("#WarYearOnMap")
              .style("opacity", 0)
                // .text(String(selectedMIDYear))
                // .text("#MIDs: " + MIDSelected[0].countmids)
                .transition(t)
                .style("opacity", 0)
                .style("color", "black")
                .transition()
                .duration(1);
            });



          d3.select("#forthInform")
            // .attr("absolute","absolute")
            // .attr("top", "70px")
            // .attr("right", "15px")
            // .attr("y", 400)
            .transition()
            .duration(1)
            .style("color", "black")
            .on("start", function transitionHeaderIn() {

              var t = d3.active(this)
                .style("opacity", 0)
                .remove();
              // console.log(t)

              d3.select("#forthInform")
              .style("opacity", 0)
                // .text(String(selectedMIDYear))
                // .text("#deaths: "+warSelectedBattDeath[0]['batdths'])
                // .text("#Countries at War Information: " +countryAtWar[0].size)
                // .text("Major war: "+String(charPart)+ yearString)
                .transition(t)
                .style("opacity", 0)
                .style("color", "black")
                .transition()
                .duration(1);
            });







          // var temp = values[2].filter(x => x.year == String(warCount))
          // drawWars(temp)
          // drawWarsVer2(temp, values[3])
        });










      d3.select("#pills-trade-tab")
        .on("click", function () {
          // console.log("TRde")

          removeWarsVer3()

          d3.select("#worldMidChartHiHead")
            .style("color", "white")

          d3.selectAll(".mid").remove()

          var newTitle = "International Trade "
          var sub  = "in US millions of current dollars"
          d3.select("#worldMidChartHead")
            .transition()
            .duration(300)
            .on("start", function transitionHeaderIn() {
              var t = d3.active(this)
                .style("opacity", 0)
                .remove();


              d3.select("#worldMidChartHead")
                .style("opacity", 0)
                .text(newTitle)
                .transition(t)
                .style("opacity", 1)
                .transition()
                .delay(100);
            });



          d3.select("#WarMajorOnMap")
            // .attr("absolute","absolute")
            // .attr("top", "70px")
            // .attr("right", "15px")
            // .attr("y", 400)
            .transition()
            .duration(1)
            .style("color", "black")
            .on("start", function transitionHeaderIn() {

              var t = d3.active(this)
                .style("opacity", 0)
                .remove();
              // console.log(t)

              d3.select("#WarMajorOnMap")
                .style("opacity", 0)
                .text("International Trade")
                .transition(t)
                .style("opacity", 1)
                .style("color", "black")
                .transition()
                .duration(1);
            });


          d3.select("#WarTitleOnMap")
            // .attr("absolute","absolute")
            // .attr("top", "70px")
            // .attr("right", "15px")
            // .attr("y", 400)
            .transition()
            .duration(1)
            .style("color", "black")
            .on("start", function transitionHeaderIn() {

              var t = d3.active(this)
                .style("opacity", 0)
                .remove();
              // console.log(t)

              d3.select("#WarTitleOnMap")
                .style("opacity", 0)
                .text("from 1870-2014")
                .transition(t)
                .style("opacity", 1)
                .style("color", "black")
                .transition()
                .duration(1);
            });


          d3.select("#WarYearOnMap")
            // .attr("absolute","absolute")
            // .attr("top", "70px")
            // .attr("right", "15px")
            // .attr("y", 400)
            .transition()
            .duration(1)
            .style("color", "black")
            .on("start", function transitionHeaderIn() {

              var t = d3.active(this)
                .style("opacity", 1)
                .remove();
              // console.log(t)

              d3.select("#WarYearOnMap")
              .style("opacity", 0)
                // .text(String(selectedMIDYear))
                // .text("#MIDs: " + MIDSelected[0].countmids)
                .transition(t)
                .style("opacity", 0)
                .style("color", "black")
                .transition()
                .duration(1);
            });



          d3.select("#forthInform")
            // .attr("absolute","absolute")
            // .attr("top", "70px")
            // .attr("right", "15px")
            // .attr("y", 400)
            .transition()
            .duration(1)
            .style("color", "black")
            .on("start", function transitionHeaderIn() {

              var t = d3.active(this)
                .style("opacity", 0)
                .remove();
              // console.log(t)

              d3.select("#forthInform")
              .style("opacity", 0)
                // .text(String(selectedMIDYear))
                // .text("#deaths: "+warSelectedBattDeath[0]['batdths'])
                // .text("#Countries at War Information: " +countryAtWar[0].size)
                // .text("Major war: "+String(charPart)+ yearString)
                .transition(t)
                .style("opacity", 0)
                .style("color", "black")
                .transition()
                .duration(1);
            });


          // var temp = values[2].filter(x => x.year == String(warCount))
          // drawWars(temp)
          // drawWarsVer2(temp, values[3])
        });







      d3.select("#pills-temp-tab")
        .on("click", function () {
          // console.log("WARBUTTON")
          removeWarsVer3()
          d3.selectAll(".country").remove()
          d3.selectAll(".mid").remove()
          drawMapOrigin(width, height, worldmapPath)
        });


      function drawBasicInforOnMap() {

        svg.append("text")
          .attr("id", "WarMajorOnMap")
          .attr("x", 0)
          .attr("y", 320)
          .attr("font-size", '25px')
          .attr("font-weight", "bold")
        // .text("War Information");


        d3.select("#WarMajorOnMap")
          // .attr("absolute","absolute")
          // .attr("top", "70px")
          // .attr("right", "15px")
          // .attr("y", 400)
          .transition()
          .duration(1)
          .style("color", "black")
          .on("start", function transitionHeaderIn() {

            var t = d3.active(this)
              .style("opacity", 0)
              .remove();
            // console.log(t)

            d3.select("#WarMajorOnMap")
              .style("opacity", 0)
              .text("Militarized Conflicts")
              .transition(t)
              .style("opacity", 1)
              .style("color", "black")
              .transition()
              .duration(1);
          });


        svg.append("text")
          .attr("id", "WarTitleOnMap")
          .attr("x", 0)
          .attr("y", 360)
          .attr("font-size", '17px')
          .attr("font-weight", "bold")
        // .text(String(warTitleArr[0]));

        svg.append("text")
          .attr("id", "WarYearOnMap")
          .attr("x", 0)
          .attr("y", 390)
          .attr("font-size", '17px')
          .attr("font-weight", "bold");



        svg.append("text")
          .attr("id", "forthInform")
          .attr("x", 0)
          .attr("y", 420)
          .attr("font-size", '17px')
          .attr("font-weight", "bold");


        d3.select("#WarTitleOnMap")
          // .attr("absolute","absolute")
          // .attr("top", "70px")
          // .attr("right", "15px")
          // .attr("y", 400)
          .transition()
          .duration(1)
          .style("color", "black")
          .on("start", function transitionHeaderIn() {

            var t = d3.active(this)
              .style("opacity", 0)
              .remove();
            // console.log(t)

            d3.select("#WarTitleOnMap")
              .style("opacity", 0)
              .text("from 1816-2010")
              .transition(t)
              .style("opacity", 1)
              .style("color", "black")
              .transition()
              .duration(1);
          });



        // d3.select("#WarYearOnMap")
        //   // .attr("absolute","absolute")
        //   // .attr("top", "70px")
        //   // .attr("right", "15px")
        //   // .attr("y", 400)
        //   .transition()
        //   .duration(1)
        //   .style("color", "black")
        //   .on("start", function transitionHeaderIn() {

        //     var t = d3.active(this)
        //       .style("opacity", 0)
        //       .remove();
        //     // console.log(t)

        //     d3.select("#WarYearOnMap")
        //       .style("opacity", 0)
        //       .text(String(sillyString))
        //       .transition(t)
        //       .style("opacity", 1)
        //       .style("color", "black")
        //       .transition()
        //       .duration(1);
        //   });


      }


      function drawMIDSbars(dataset: any) {
        // var margin = { top: 20, left: 50, bottom: 50, right: 50 };
        var margin = { top: 20, left: 50, bottom: 20, right: 140 };
        var widthMIDBar = 1200 - margin.left - margin.right;
        var heightMIDBar = 120- margin.top - margin.bottom;

        var svgmidsBar = d3.select("#barchartMIDs").append("svg").attr("id", "midsBar")
          .attr('width', widthMIDBar + margin.left + margin.right)
          .attr('height', heightMIDBar + margin.top + margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');


        var x = d3.scaleBand();

        var xTe = d3.scaleLinear()
        .domain([1816, 2010])
        .range([0, widthMIDBar]);

        var y = d3.scaleLinear();


        svgmidsBar.append("text")
          .attr("x", widthMIDBar/2)
          .attr("y", heightMIDBar+35)
          .text("Years");

          svgmidsBar.append("text")
          .attr("x", -heightMIDBar/2-30)
          .attr("y", -50)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          .text("# of MIDs");

        // var xAxis;

        // var dataset;

        // var mode = "#ascend";

        // var modeSortMet = "#all";
        // var datasetCop;

        // var titleFirst;
        // var titleSecond = "For Military Expenditure";
        // var titleSort = "Alphabetical Order";

        var maxCountMids;


        // var dataset = values[5];


        maxCountMids = d3.max(dataset, function (d: any) { return +d.countmids; });

        var prvMids = 0;
        var onceClick = 0;

        var selectedMIDYear;
        var testInMIDs = 1;

        x.domain(dataset.map(function (d) { return +d.year; }))
          .range([0, widthMIDBar])
          .paddingInner(0.3);

        y.domain([0, maxCountMids + 5])
          .range([heightMIDBar, 0]);

        // console.log(heightMIDBar)

        svgmidsBar.selectAll(".bar")
          .data(dataset, function(d: any) { return d.year; })
          .enter()
          .append("rect")
          .attr("id", function (d: any) {
            return "midscountbar" + d.year.toString();
          })
          .attr("class", "midscountbar")
          .attr("x", function (d: any) { return x(d.year); })
          .attr("y", function (d: any) { return y(d.countmids); })
          .attr("width", x.bandwidth())
          .attr("height", function (d: any) { return heightMIDBar - y(d.countmids); })
          .attr("fill", "rgb(196, 50, 50)")
          .on('mouseover', function (this: any) {
            // console.log("hello!!!")
            var idString = "#" + this.id.toString();
            var yearString = idString.replace(/\D/g, "");

            // console.log(yearString)

            selectedMIDYear = yearString
            var MIDSelected = values[5].filter(x => x.year == String(selectedMIDYear))
            // console.log(MIDSelected[0])
            var continent;
            // Africa Antarctica Asia Australia Europe North America South America
            if (MIDSelected[0].continent == "1") {
              continent = 'Africa'
            }
            if (MIDSelected[0].continent == "2") {
              continent = 'Antarctica'
            }
            if (MIDSelected[0].continent == "3") {
              continent = 'Asia'
            }
            if (MIDSelected[0].continent == "4") {
              continent = 'Australia'
            }
            if (MIDSelected[0].continent == "5") {
              continent = 'Europe'
            }
            if (MIDSelected[0].continent == "6") {
              continent = 'North America'
            }
            if (MIDSelected[0].continent == "7") {
              continent = 'South America'
            }

            d3.select("#WarMajorOnMap")
              .transition()
              .duration(1)
              .style("color", "black")
              .on("start", function transitionHeaderIn() {

                var t = d3.active(this)
                  .style("opacity", 0)
                  .remove();

                d3.select("#WarMajorOnMap")
                  .style("opacity", 0)
                  .text("Militarized Conflicts")
                  .transition(t)
                  .style("opacity", 1)
                  .style("color", "black")
                  .transition()
                  .duration(1);
              });


            //Year of MIDs
            d3.select("#WarTitleOnMap")
              .transition()
              .duration(1)
              .style("color", "black")
              .on("start", function transitionHeaderIn() {

                var t = d3.active(this)
                  .style("opacity", 0)
                  .remove();

                d3.select("#WarTitleOnMap")
                  .style("opacity", 0)
                  .text("Year: " + String(selectedMIDYear))
                  .transition(t)
                  .style("opacity", 1)
                  .style("color", "black")
                  .transition()
                  .duration(1);
              });


            // #of MIDs
            d3.select("#WarYearOnMap")
              .transition()
              .duration(1)
              .style("color", "black")
              .on("start", function transitionHeaderIn() {

                var t = d3.active(this)
                  .style("opacity", 0)
                  .remove();
                // console.log(t)

                d3.select("#WarYearOnMap")
                  .style("opacity", 0)
                  // .text(String(selectedMIDYear))
                  .text("# of MIDs: " + MIDSelected[0].countmids)
                  .transition(t)
                  .style("opacity", 1)
                  .style("color", "black")
                  .transition()
                  .duration(1);
              });




            // #of MIDs
            d3.select("#forthInform")
              .transition()
              .duration(1)
              .style("color", "black")
              .on("start", function transitionHeaderIn() {

                var t = d3.active(this)
                  .style("opacity", 0)
                  .remove();
                // console.log(t)

                d3.select("#forthInform")
                  .style("opacity", 0)
                  // .text(String(selectedMIDYear))
                  .text("Most disputed areas: " + continent)
                  .transition(t)
                  .style("opacity", 0)
                  .style("color", "black")
                  .transition()
                  .duration(1);
              });


            // Subtitle Year
            d3.select("#worldMidChartHiHead")
              .transition()
              .duration(100)
              .on("start", function transitionHeaderIn() {
                var t = d3.active(this)
                  .style("opacity", 0)
                  .remove();

                d3.select("#worldMidChartHiHead")
                  .style("opacity", 0)
                  .text("In " + yearString.toString())
                  .transition(t)
                  .style("opacity", 1)
                  .style("color", "black")
                  .transition()
                  .delay(50);
              });


            idString = String(idString)
            // console.log(idString)

            d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
            d3.select(idString).attr("fill", "steelblue");

            var temp = values[1].filter(x => x.year == String(yearString))

            // repulse()
            drawMIDsDotOnMap(temp)
            // pulse()

            // repulse()

          })
          .on('mouseout', function (this: any) {
            // repulse()

            var idString = "#" + this.id.toString()
            idString = String(idString)
            d3.select(idString).attr("fill", String(d3.select(idString).attr("fillX")));
            var idString = "#" + this.id.toString();
            var yearString = idString.replace(/\D/g, "");

            idString = String(idString)

          })
          .on('click', function (this: any) {

            prvMids = prvMids + 1

          });

        // .attr("class","midscountbar");


          

        // var xAxis: any = d3.axisBottom(this)
        //   .scale(x)
          // .ticks(5, 'd')
          


          var xAxisSe: any = d3.axisBottom(this)
          .scale(x)
          // .ticks(5, 'd')
          .tickValues(x.domain().filter(function(d,i){ return !(i%10)}));

          

        // var xAxisTe: any = d3.axisBottom(this)
        //   .scale(xTe)
        //   .ticks(10, 'd');

          
        // console.log(xAxis)

        svgmidsBar.append("g")
          .attr("id", "x-axis")
          .attr("class", "axis")
          .attr("transform", "translate(0," + heightMIDBar + ")")
        // .call(xAxis);
        .call(xAxisSe);
        // .call(d3.axisBottom(x)
        // .ticks(2));

        var yAxis: any = d3.axisLeft(this)
          .scale(y)
          .ticks(3, 'd');

        svgmidsBar.append("g")
          .attr("id", "y-axis")
          .attr("class", "axis")
        .call(yAxis);

        svgmidsBar.append("text")
          .attr("x", - heightMIDBar / 2 + 800)
          .attr("y", - margin.left + 30)

          .attr("transform", "rotate(-90)")
          .attr('class', 'ylabel')
          .append("tspan").text("Expenditure(% of GDP)")
          // .append("tspan").text("-2")
          .style("baseline-shift", "super")
          .style("font-size", "0.5em");


        //resize()
      }

      function drawWARSbars(datasetWar: any) {

        // var margin = { top: 20, left: 80, bottom: 50, right: 10 };


        var margin = { top: 20, left: 50, bottom: 20, right: 140 };
        var widthMIDBar = 1200 - margin.left - margin.right;
        var heightMIDBar = 120 - margin.top - margin.bottom;

        var svgWarBar = d3.select("#barchartWars").append("svg").attr("id", "midsBar")
          .attr('width', widthMIDBar + margin.left + margin.right)
          .attr('height', heightMIDBar + margin.top + margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');


        var x = d3.scaleBand();
        var y = d3.scaleLinear();

        var xAxis;



        svgWarBar.append("text")
          .attr("x", widthMIDBar/2)
          .attr("y", heightMIDBar+35)
          .text("Years");

          svgWarBar.append("text")
          .attr("x", -heightMIDBar/2-60)
          .attr("y", -50)
          .attr("dy", ".75em")
          .attr("transform", "rotate(-90)")
          // .text("# of countries at wars");
          .text("# of countries at wars")
          .style('font-size', '0.7em');

        // var mode = "#ascend";
        // var modeSortMet = "#all";
        // var datasetCop;
        // var titleFirst;
        // var titleSecond = "For Military Expenditure";
        // var titleSort = "Alphabetical Order";

        var maxCountWars;


        // var datasetWar = values[6];
        maxCountWars = d3.max(datasetWar, function (d: any) { return +d.countCouWars; });

        // setMode("#alpha");
        // setNumCouMode("#res");


        // drawBars();
        var selectedWarYear;

        var testIn = 1;

        x.domain(datasetWar.map(function (d) { return d.year; }))
          .range([0, widthMIDBar])
          .paddingInner(0.3);

        y.domain([0, maxCountWars + 5])
          .range([heightMIDBar, 0]);

        // console.log(heightMIDBar)

        svgWarBar.selectAll(".bar")
          .data(datasetWar, function (d: any) { return d.year; })
          .enter()
          .append("rect")
          .attr("id", function (d: any) {
            // console.log(d)
            return "warscountbar" + d.year.toString();
          })
          .attr("class", "warscountbar")
          .attr("x", function (d: any) { return x(d.year); })
          .attr("y", function (d: any) { return y(d.countCouWars); })
          // .attr("")
          .attr("width", x.bandwidth())
          .attr("height", function (d: any) { return heightMIDBar - y(d.countCouWars); })
          .attr("fill", "rgb(196, 50, 50)")
          .on('mouseover', function (this: any, d: any) {
            // console.log("war")
            // console.log(d)
            var idString = "#" + this.id.toString();
            var yearString = idString.replace(/\D/g, "");

            selectedWarYear = yearString
            var warSelected = values[2].filter(x => x.year == String(selectedWarYear))

            // console.log(warSelected)
            var warTitleAndCountry = describeMajorWarInfForEachWar(warSelected, values[8])
            var warTitleAndCountryTest = describeAllWarInfForEachWar(warSelected, values[8])
            var warTitleAndCountryAdd = describeAdditioanlInf(warTitleAndCountryTest)
            // console.log(warTitleCounList)

            var warTitleAndCountryAll = describeWarInf(warSelected, values[8])
            // console.log(warTitleAndCountry[0])
            var warTitleArr = warTitleAndCountry[0];
            // console.log(warTitleAndCountry[0])

            var countryAtWar = warTitleAndCountry[1];

            // console.log("warTitleAndCountry")
            // console.log(warTitleAndCountry)

            var warTitleArrAll = Array.from(warTitleAndCountryAll[0]);
            // console.log(warTitleArr)
            var countryAtWarAll = Array.from(warTitleAndCountryAll[1]);
            // console.log("countryAtWar.length")
            // console.log(countryAtWar[0].length)
            // console.log(countryAtWar[0].size)
            // var iterator1 = warTitle.values();
            // console.log("values[8]")
            // console.log(values[6])
            var warSelectedBattDeath = values[6].filter(x => x.year == String(selectedWarYear))
            // var bettdeath=warSelected.
            // console.log(warSelectedBattDeath)

            d3.select('#card-desc-war').html(String(warTitleArrAll) + "<br>" + "Countries at Wars" + ":" + String(countryAtWarAll))
            // values[2]





            var st;
            // for (st=1)
            // for (st = 0; st < warTitleArr.length; st++) {
            // for (st = 0; st < warTitleArr.length; st++) {
            for (st = 0; st < 1; st++) {
              // var charPart = warTitleArr[st].replace(/\d/g, "");
              var charPart = warTitleArr.replace(/\d/g, "");
              var charPart = charPart.replace(/\-/g, ' ');
              // console.log(charPart)
              // var yearPart = warTitleArr[st].replace(/[^\d.-]/g, "");
              var yearPart = warTitleArr.replace(/[^\d.-]/g, "");

              if (yearPart[0] == '-') {
                // yearPart.shift(); 
                // yearPart.splice(0, 1);
                var sillyString = yearPart.substr(1);
              }

              if (yearPart[0] != '-') {
                // yearPart.shift(); 
                // yearPart.splice(0, 1);
                var sillyString = yearPart;
              }

              //   var tempStr=charPart.split( " " )
              //   for (st = tempStr.length-1; st >=0; st--) {
              //   // console.log(charPart.split( " " ))
              //     if(tempStr[st]=="" || tempStr[st]=="of"){
              //       console.log("Inside")
              //       console.log(tempStr[st])
              //     }
              // }

              // console.log(charPart.length)
              // console.log(sillyString)


              // console.log("ts")


              if (testIn == 1) {



                // Test redCircle
                // svg.append("circle")
                //   .attr("id", "TestCir")
                //   .attr("cx", 50)
                //   .attr("cy", 30)
                //   .attr("r", 20)
                //   .attr("fill", "red")
                // // .attr("font-size", '25px')
                // // .attr("font-weight", "bold")
                // // .text("War Information");


                // d3.select("#TestCir")
                //   // .attr("absolute","absolute")
                //   // .attr("top", "70px")
                //   // .attr("right", "15px")
                //   // .attr("y", 400)
                //   .transition()
                //   .duration(1)
                //   .style("fill", "red")
                //   .on("start", function transitionHeaderIn() {

                //     var t = d3.active(this)
                //       .style("opacity", 0)
                //       .remove();
                //     // console.log(t)

                //     d3.select("#TestCir")
                //       .style("opacity", 0)
                //       // .text("War Information")
                //       .transition(t)
                //       .style("opacity", 1)
                //       .attr("fill", "red")
                //       .transition()
                //       .duration(1);
                //   });





                // svg.append("text")
                //   .attr("id", "WarMajorOnMap")
                //   .attr("x", 0)
                //   .attr("y", 330)
                //   .attr("font-size", '25px')
                //   .attr("font-weight", "bold")
                // .text("War Information");


                d3.select("#WarMajorOnMap")
                  // .attr("absolute","absolute")
                  // .attr("top", "70px")
                  // .attr("right", "15px")
                  // .attr("y", 400)
                  .transition()
                  .duration(1)
                  .style("color", "black")
                  .on("start", function transitionHeaderIn() {

                    var t = d3.active(this)
                      .style("opacity", 0)
                      .remove();
                    // console.log(t)

                    d3.select("#WarMajorOnMap")
                      .style("opacity", 0)
                      .text("War Information")
                      .transition(t)
                      .style("opacity", 1)
                      .style("color", "black")
                      .transition()
                      .duration(1);
                  });

                testIn = testIn + 1

              }



              if (st == 0) {
                d3.select("#WarTitleOnMap")
                  // .attr("absolute","absolute")
                  // .attr("top", "70px")
                  // .attr("right", "15px")
                  // .attr("y", 400)
                  .transition()
                  .duration(1)
                  .style("color", "black")
                  .on("start", function transitionHeaderIn() {

                    var t = d3.active(this)
                      .style("opacity", 0)
                      .remove();
                    // console.log(t)

                    d3.select("#WarTitleOnMap")
                      .style("opacity", 0)
                      // .text(String(charPart))
                      // warTitleAndCountryAdd
                      .text("The number of Wars: " + String(warTitleAndCountryAdd[0]))
                      .transition(t)
                      .style("opacity", 1)
                      .style("color", "black")
                      .transition()
                      .duration(1);
                  });



                d3.select("#WarYearOnMap")
                  // .attr("absolute","absolute")
                  // .attr("top", "70px")
                  // .attr("right", "15px")
                  // .attr("y", 400)
                  .transition()
                  .duration(1)
                  .style("color", "black")
                  .on("start", function transitionHeaderIn() {

                    var t = d3.active(this)
                      .style("opacity", 0)
                      .remove();
                    // console.log(t)

                    d3.select("#WarYearOnMap")
                      .style("opacity", 0)
                      // .text(String(sillyString))
                      .text("The number of Countries at Wars: " + String(warTitleAndCountryAdd[1]))
                      .transition(t)
                      .style("opacity", 1)
                      .style("color", "black")
                      .transition()
                      .duration(1);
                  });


                d3.select("#WarMajorOnMap")
                  // .attr("absolute","absolute")
                  // .attr("top", "70px")
                  // .attr("right", "15px")
                  // .attr("y", 400)
                  .transition()
                  .duration(1)
                  .style("color", "black")
                  .on("start", function transitionHeaderIn() {

                    var t = d3.active(this)
                      .style("opacity", 0)
                      .remove();
                    // console.log(t)

                    d3.select("#WarMajorOnMap")
                      .style("opacity", 0)
                      .text("War Information")
                      .transition(t)
                      .style("opacity", 1)
                      .style("color", "black")
                      .transition()
                      .duration(1);
                  });


                d3.select("#forthInform")
                  // .attr("absolute","absolute")
                  // .attr("top", "70px")
                  // .attr("right", "15px")
                  // .attr("y", 400)
                  .transition()
                  .duration(1)
                  .style("color", "black")
                  .on("start", function transitionHeaderIn() {

                    var t = d3.active(this)
                      .style("opacity", 0)
                      .remove();
                    // console.log(t)

                    d3.select("#forthInform")
                      .style("opacity", 0)
                      // .text(String(selectedMIDYear))
                      // .text("#deaths: "+warSelectedBattDeath[0]['batdths'])
                      // .text("#Countries at War Information: " +countryAtWar[0].size)
                      .text("Major war: " + String(charPart) + yearString)
                      .transition(t)
                      .style("opacity", 1)
                      .style("color", "black")
                      .transition()
                      .duration(1);
                  });


              }



              if (st == 1) {
                d3.select("#WarTitle2OnMap")
                  // .attr("absolute","absolute")
                  // .attr("top", "70px")
                  // .attr("right", "15px")
                  // .attr("y", 400)
                  .transition()
                  .duration(1)
                  .style("color", "black")
                  .on("start", function transitionHeaderIn() {

                    var t = d3.active(this)
                      .style("opacity", 0)
                      .remove();
                    // console.log(t)

                    d3.select("#WarTitle2OnMap")
                      .style("opacity", 0)
                      .text(String(charPart))
                      .transition(t)
                      .style("opacity", 1)
                      .style("color", "black")
                      .transition()
                      .duration(1);
                  });
              }




            }


            d3.select("#worldMidChartHiHead")
              .transition()
              .duration(100)
              .style("color", "black")
              .on("start", function transitionHeaderIn() {
                var t = d3.active(this)
                  .style("opacity", 0)
                  .remove();

                d3.select("#worldMidChartHiHead")
                  .style("opacity", 0)
                  .text("In " + yearString.toString())
                  .transition(t)
                  .style("opacity", 1)
                  .style("color", "black")
                  .transition()
                  .delay(50);
              });

            idString = String(idString)
            // console.log(idString)



            d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
            d3.select(idString).attr("fill", "steelblue");


            var temp = values[2].filter(x => x.year == String(yearString))
            // console.log(temp)
            // drawMIDsDotOnMap(temp)

            if (refixcoID.length != 0) {
              var i;
              // console.log("sdgdagsdg")
              // console.log(d3.select(refixcoID[0]).attr("fillX"))
              // d3.select(String(refixcoID[0])).attr("fill",'red')
              // console.log(String(String(d3.select(refixcoID[0]).attr("fillX"))
              for (i = 0; i < refixcoID.length; i++) {

                //   if(d3.select(refixcoID[i]).attr("fillX")!=null)
                //   {
                //  console.log(refixcoID[i]) 
                d3.select(String(refixcoID[i])).attr("fill", "#bdbdbd");

                if (String(refixcoID[i]) == "#AUH") {
                  console.log(refixcoID[i])
                  d3.select("#AUS").attr("fill", "#bdbdbd");
                  d3.select("#HUN").attr("fill", "#bdbdbd");
                }

                if (String(refixcoID[i]) == '#YUG') {
                  console.log(refixcoID[i])
                  d3.select("#AUS").attr("fill", "#bdbdbd");
                  // HUN
                  d3.select("#HUN").attr("fill", "#bdbdbd");
                }
                //   }
              }
            }




            // console.log("still")
            refixcoID = []
            // console.log(temp)
            drawWarsVer2(temp)


          })
          .on('mouseout', function (this: any, d: any) {
            // d3.select('#tooltip-mid').classed('hidden', true);




            var idString = "#" + this.id.toString()
            idString = String(idString)

            // console.log("mouseout")
            // console.log(idString)
            d3.select(idString).attr("fill", String(d3.select(idString).attr("fillX")));

            // if (idString=="#AUH")
            // {
            //   d3.select("#AUS").attr("fill", "#bdbdbd");
            //   d3.select("#HUN").attr("fill", "#bdbdbd");
            // }

            var idString = "#" + this.id.toString();
            var yearString = idString.replace(/\D/g, "");

            var temp = values[2].filter(x => x.year == String(yearString))

            var idString = "#" + this.id.toString()
            // console.log(idString)

            // var i;
            // // console.log("sdgdagsdg")
            // console.log(d3.select(refixcoID[0]).attr("fillX"))
            // // d3.select(String(refixcoID[0])).attr("fill",'red')
            // // console.log(String(String(d3.select(refixcoID[0]).attr("fillX"))
            // for (i = 0; i < refixcoID.length; i++) 
            // {

            // //   if(d3.select(refixcoID[i]).attr("fillX")!=null)
            // //   {
            //     d3.select(String(refixcoID[i])).attr("fill", "#bdbdbd");
            // //   }
            // }

            // removeWarsVer2(temp,idString)

            // // d3.select('#card-name-bub1').html('Country Information');
            // // d3.select('#card-desc-bub1').html('Mouse over bars for quick facts.<br/><br/><br/>');
          });
        // .attr("class","midscountbar");




        // var xAxis: any = d3.axisBottom(this)
        //   .scale(x)
        //   .ticks(5, 'd');


          var xAxisSe: any = d3.axisBottom(this)
          .scale(x)
          // .ticks(5, 'd')
          .tickValues(x.domain().filter(function(d,i){ return !(i%10)}));


        svgWarBar.append("g")
          .attr("id", "x-axis")
          .attr("class", "axis")
          .attr("transform", "translate(0," + heightMIDBar + ")")
        .call(xAxisSe);

        var yAxis: any = d3.axisLeft(this)
          .scale(y)
        .ticks(3, 'd');

        svgWarBar.append("g")
          .attr("id", "y-axis")
          .attr("class", "axis")
        .call(yAxis);

        svgWarBar.append("text")
          .attr("x", - heightMIDBar / 2 + 800)
          .attr("y", - margin.left + 30)

          .attr("transform", "rotate(-90)")
          .attr('class', 'ylabel')
          .append("tspan").text("Expenditure(% of GDP)")
          // .append("tspan").text("-2")
          .style("baseline-shift", "super")
          .style("font-size", "0.5em");
      }


      function drawTRADEbars(datasetTrade: any) {
        var margin = { top: 20, left: 50, bottom: 20, right: 140 };
        var widthMIDBar = 1200 - margin.left - margin.right;
        var heightMIDBar = 120 - margin.top - margin.bottom;

        var svgTradeBar = d3.select("#barchartTrades").append("svg").attr("id", "midsBar")
          .attr('width', widthMIDBar + margin.left + margin.right)
          .attr('height', heightMIDBar + margin.top + margin.bottom)
          .append('g')
          .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');


        var x = d3.scaleBand();
        var y = d3.scaleLinear();

        var xAxis;


        

        // var mode = "#ascend";
        // var modeSortMet = "#all";
        // var datasetCop;
        // var titleFirst;
        // var titleSecond = "For Military Expenditure";
        // var titleSort = "Alphabetical Order";

        svgTradeBar.append("text")
        .attr("x", widthMIDBar/2)
        .attr("y", heightMIDBar+35)
        .text("Years");

        svgTradeBar.append("text")
        .attr("x", -heightMIDBar/2-60)
        .attr("y", -50)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        // .text("# of countries at trade");
        .text("# of countries at trade")
        .style('font-size', '0.7em')



        svgTradeBar.append("text")
        .attr("x", -heightMIDBar/2-60)
        .attr("y", -35)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
   
        .text("in current US millions $")
        .style('font-size', '0.6em')
        // .text("font-size",'10px')

        var maxCountWars;


        // var datasetTrade = values[7];
        maxCountWars = d3.max(datasetTrade, function (d: any) { return +d.numCountry; });

        // setMode("#alpha");
        // setNumCouMode("#res");


        // drawBars();

        x.domain(datasetTrade.map(function (d) { return d.year; }))
          .range([0, widthMIDBar])
          .paddingInner(0.3);

        y.domain([0, +maxCountWars + 5])
          .range([heightMIDBar, 0]);

        // console.log(heightMIDBar)

        svgTradeBar.selectAll(".bar")
          .data(datasetTrade, function (d: any) { return d.year; })
          .enter()
          .append("rect")
          .attr("id", function (d: any) {
            // console.log(+d.year)
            return "tradescountbar" + (+d.year).toString();

          })
          .attr("class", "tradescountbar")
          .attr("x", function (d: any) { return x(d.year); })
          .attr("y", function (d: any) { return y(d.numCountry); })
          .attr("width", x.bandwidth())
          .attr("height", function (d: any) { return heightMIDBar - y(d.numCountry); })
          .attr("fill", "steelblue")
          .on('mouseover', function (this: any) {
            // console.log("hello!!!")
            var idString = "#" + this.id.toString();

            // console.log(idString)
            var yearString = idString.replace(/\D/g, "");

            // console.log(allCCodeOnmap)
            if (removeCoun.length != 0) {
              // console.log(removeCoun)

              var rm;
              for (rm = 0; rm < removeCoun.length; rm++) {
                var tempId = removeCoun[rm];
                d3.select(tempId).attr("fill", "#bdbdbd");
                // console.log(tempId)
                if (tempId == "#CRO") {
                  // console.log("CRO!!!!!!!!")
                }

              }
            }
            removeCoun = []

            d3.select("#worldMidChartHiHead")
              .transition()
              .duration(100)
              .style("color", "black")
              .on("start", function transitionHeaderIn() {
                var t = d3.active(this)
                  .style("opacity", 0)
                  .remove();

                d3.select("#worldMidChartHiHead")
                  .style("opacity", 0)
                  .text("In " + yearString.toString())
                  .transition(t)
                  .style("opacity", 1)
                  .style("color", "black")
                  .transition()
                  .delay(50);
              });



            idString = String(idString)
            // console.log(idString)



            d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
            d3.select(idString).attr("fill", "rgb(196, 50, 50)");

            // console.log( yearString)
            var temp = values[7].filter(x => x.year == yearString)
            // console.log(temp[0]["countryset"])

            var tempSen = temp[0]["countryset"]

            // var tempSenT = tempSen.replace(/\D/g, ",");

            // // var tempSenT = parseInt(tempSen.replace(/[^0-9]/g, ''));

            // console.log(tempSen)
            tempSen = tempSen.replace(/[{}]/g, "");
            var tempSenT = tempSen.split(/\s*,\s*/).map(Number);
            // console.log(tempSenT)
            // var tempSenT = tempSen.replace(/, +/g, ",").split(",").map(Number);  
            // console.log(tempSenT)
            var newArray = tempSenT.filter(value => !Number.isNaN(value));
            // console.log(newArray.length)

            // console.log(newArray)
            // console.log(values[3])

            // // var elementPos = values[3].map(function(x) {return x.id; }).indexOf(idYourAreLookingFor);
            // // var objectFound = array[elementPos];

            // var maxSumTrade: any = d3.max(values[9], function (d: any) {
            //   // console.log(d)  
            //   var sumT = +d['imports'] +	+d['exports']

            //   return sumT;

            // });

            var colFleg = d3.scaleSequential(d3.interpolateBlues);
            var tempI;
            // console.log(newArray)
            for (tempI = 0; tempI < newArray.length; tempI++) {
              // console.log("loop")
              var tempK = values[3].filter(x => x.CCode == String(newArray[tempI]))
              // console.log(tempK[0].StateAbb)
              // var idStringTemp = "#" + tempK[0].StateAbb.toString();
              var yes = allCCodeOnmap.indexOf(tempK[0].StateAbb.toString())
              // console.log(yes)

              if (yes != -1) {
                // console.log("inside")
                var idStringTemp = "#" + tempK[0].StateAbb.toString();

                if (idStringTemp == "#CRO") {
                  // console.log("CRO!!!!!!!!")
                  d3.select(idStringTemp).attr("fill", "green");
                }

                removeCoun.push(idStringTemp)
                // d3.select(idStringTemp).attr("fillX", String(d3.select(idStringTemp).attr("fill")));
                d3.select(idStringTemp).attr("fill", "rgb(196, 50, 50)");

                // console.log("Innner")
                // console.log(tempK[0].StateAbb.toString())
                // var counTradeAmo = values[9].filter(x => x.stateabb == tempK[0].StateAbb.toString())
                // var counTradeAmoRe=[]
                // counTradeAmoRe = counTradeAmo.filter(x => x.year == yearString)
                // console.log(counTradeAmoRe.length)

                // if (counTradeAmoRe.length!=0)
                // {

                //   // var colFleg = d3.scaleDiverging(d3.interpolateRdBu);


                //   var Tamout= (+counTradeAmoRe[0]["exports"]+ +counTradeAmoRe[0]["imports"])/maxSumTrade
                //   // imports
                //   // console.log(Tamout)
                //   var ID="#" +tempK[0].StateAbb.toString()
                //   var c = colFleg(Tamout)
                //   svg.select(ID)
                //     .style("fill", c);
                // }

                // drawChoroTrade()
                // }
              }
              // StateAbb: "NOR"
            }
            // drawMIDsDotOnMap(temp)  

            // console.log(removeCoun)


            d3.select("#WarMajorOnMap")
              // .attr("absolute","absolute")
              // .attr("top", "70px")
              // .attr("right", "15px")
              // .attr("y", 400)
              .transition()
              .duration(1)
              .style("color", "black")
              .on("start", function transitionHeaderIn() {

                var t = d3.active(this)
                  .style("opacity", 0)
                  .remove();
                // console.log(t)

                d3.select("#WarMajorOnMap")
                  .style("opacity", 0)
                  .text("Trade Information")
                  .transition(t)
                  .style("opacity", 1)
                  .style("color", "black")
                  .transition()
                  .duration(1);
              });





            d3.select("#WarTitleOnMap")
              // .attr("absolute","absolute")
              // .attr("top", "70px")
              // .attr("right", "15px")
              // .attr("y", 400)
              .transition()
              .duration(1)
              .style("color", "black")
              .on("start", function transitionHeaderIn() {

                var t = d3.active(this)
                  .style("opacity", 0)
                  .remove();
                // console.log(t)

                d3.select("#WarTitleOnMap")
                  .style("opacity", 0)
                  // .text(String(charPart))
                  // warTitleAndCountryAdd
                  .text("Number of Countries: " + String(temp[0]["numCountry"]))
                  // .text("The number of relations: "+String(temp[0]["CountTradeRela"]))
                  .transition(t)
                  .style("opacity", 1)
                  .style("color", "black")
                  .transition()
                  .duration(1);
              });



            d3.select("#WarYearOnMap")
              // .attr("absolute","absolute")
              // .attr("top", "70px")
              // .attr("right", "15px")
              // .attr("y", 400)
              .transition()
              .duration(1)
              .style("color", "black")
              .on("start", function transitionHeaderIn() {

                var t = d3.active(this)
                  .style("opacity", 0)
                  .remove();
                // console.log(t)

                d3.select("#WarYearOnMap")
                  .style("opacity", 0)
                  // .text(String(sillyString))
                  .text("The number of relations: " + String(temp[0]["CountTradeRela"]))
                  // .text("The amount of total trade: "+String(temp[0]["SumTrade"]))
                  .transition(t)
                  .style("opacity", 1)
                  .style("color", "black")
                  .transition()
                  .duration(1);
              });





            d3.select("#forthInform")
              // .attr("absolute","absolute")
              // .attr("top", "70px")
              // .attr("right", "15px")
              // .attr("y", 400)
              .transition()
              .duration(1)
              .style("color", "black")
              .on("start", function transitionHeaderIn() {

                var t = d3.active(this)
                  .style("opacity", 0)
                  .remove();
                // console.log(t)

                d3.select("#forthInform")
                  .style("opacity", 0)
                  // .text(String(selectedMIDYear))
                  // .text("#deaths: "+warSelectedBattDeath[0]['batdths'])
                  // .text("#Countries at War Information: " +countryAtWar[0].size)
                  // .text("Number of Countries: "+String(temp[0]["numCountry"])+ yearString)
                  // .text("Number of Countries: "+String(temp[0]["numCountry"]))
                  // .text("The number of relations: "+String(temp[0]["CountTradeRela"]))
                  .text("The amount of total trade: " + String(temp[0]["SumTrade"]))
                  .transition(t)
                  .style("opacity", 1)
                  .style("color", "black")
                  .transition()
                  .duration(1);
              });














            if (refixcoID.length != 0) {
              var i;
              // console.log("sdgdagsdg")
              // console.log(d3.select(refixcoID[0]).attr("fillX"))
              // d3.select(String(refixcoID[0])).attr("fill",'red')
              // console.log(String(String(d3.select(refixcoID[0]).attr("fillX"))
              for (i = 0; i < refixcoID.length; i++) {

                //   if(d3.select(refixcoID[i]).attr("fillX")!=null)
                //   {
                d3.select(String(refixcoID[i])).attr("fill", "#bdbdbd");
                //   }
              }
            }




            // console.log("still")
            refixcoID = []

            // refixcoID = []
            // drawWarsVer2(temp)
            // drawWarsVer2withTrade(temp)


          })
          .on('mouseout', function (this: any, d: any) {
            // d3.select('#tooltip-mid').classed('hidden', true);




            var idString = "#" + this.id.toString()
            idString = String(idString)
            d3.select(idString).attr("fill", String(d3.select(idString).attr("fillX")));

            var idString = "#" + this.id.toString();
            var yearString = idString.replace(/\D/g, "");

            // var temp = values[2].filter(x => x.year == String(yearString))


            // removeCoun.push(idStringTemp)




            // d3.select("#country").attr("fill", "white");

            // removeWarsVer2(temp)

            // // d3.select('#card-name-bub1').html('Country Information');
            // // d3.select('#card-desc-bub1').html('Mouse over bars for quick facts.<br/><br/><br/>');
          });
        // .attr("class","midscountbar");




        // var xAxis: any = d3.axisBottom(this)
        //   .scale(x)
        //   .ticks(10, 'd');
        
          var xAxisSe: any = d3.axisBottom(this)
          .scale(x)
          // .ticks(5, 'd')
          .tickValues(x.domain().filter(function(d,i){ return !(i%10)}));

        svgTradeBar.append("g")
          .attr("id", "x-axis")
          .attr("class", "axis")
          .attr("transform", "translate(0," + heightMIDBar + ")")
        .call(xAxisSe);

        var yAxis: any = d3.axisLeft(this)
          .scale(y)
        .ticks(3, 'd');

        svgTradeBar.append("g")
          .attr("id", "y-axis")
          .attr("class", "axis")
        .call(yAxis);

        svgTradeBar.append("text")
          .attr("x", - heightMIDBar / 2 + 800)
          .attr("y", - margin.left + 30)

          .attr("transform", "rotate(-90)")
          .attr('class', 'ylabel')
          .append("tspan").text("Expenditure(% of GDP)")
          // .append("tspan").text("-2")
          .style("baseline-shift", "super")
          .style("font-size", "0.5em");







      }

      //Orin
      function drawMIDsDotOnMap(data: any) {
        // function drawMIDsDotOnMapWithTranTran(data: any) {

        // DATA JOIN
        var mids = svg.selectAll(".mid")
          .data(data);
        var delay = function (d, i) {
          return i * 50;
        }
        // UPDATAE.
        mids.transition()
          .duration(750)
          .delay(delay)
        mids.attr("cx", function (d: any) {
          // console.log(+d.midloc2_xlongitude)
          var marker = projection([+d["midloc2_xlongitude"], +d["midloc2_ylatitude"]])
          return marker[0]
        })
        .attr("cy", function (d: any) {
          var marker = projection([+d["midloc2_xlongitude"], +d["midloc2_ylatitude"]])
          return marker[1]
        })
        .attr("id", function (d: any) {
          var tempId = "conflict" + String(d.dispnum)
          return String(tempId);
        })
        .attr("r", 5)
        .attr("fill", "rgb(196, 50, 50)")
        // .style("opacity", 0)
        .attr("class", "mid")



        // ENTER.
        mids.enter()
          .append("circle")
          .attr("cx", function (d: any) {
            var marker = projection([+d["midloc2_xlongitude"], +d["midloc2_ylatitude"]])
            return marker[0]
          })
          .attr("cy", function (d: any) {
            var marker = projection([+d["midloc2_xlongitude"], +d["midloc2_ylatitude"]])
            return marker[1]
          })
          .attr("id", function (d: any) {
            var tempId = "conflict" + String(d.dispnum)
            return String(tempId);
          })
          .attr("r", 5)
          .attr("fill", "rgb(196, 50, 50)")
          // .style("opacity", 0)
          // .attr("fill", "white")
          .attr("class", "mid")
          .on('mouseover', function (this: any, d: any) {
            var idString = "#" + this.id.toString();
            idString = String(idString)
            d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
            d3.select(idString).attr("fill", "steelblue")

            d3.select(idString).attr("rX", String(d3.select(idString).attr("r")));
            d3.select(idString).attr("r", "5")
          
            var idString = "#" + this.id.toString()
          
            dothandleMouseOver(idString, d)

          })
          .on('mouseout', function (this: any) {
            // console.log(this);
            var idString = "#" + this.id.toString()
            idString = String(idString)
            d3.select(idString).attr("fill", String(d3.select(idString).attr("fillX")));
            d3.select(idString).attr("r", String(d3.select(idString).attr("rX")));

            var idString = "#" + this.id.toString()
            // console.log(idString)
            dothandleMouseOut(idString)
          });


        // EXIT.
        mids.exit()

          .style("opacity", 0)
          .remove();

        // pulse()

        // repulse()

        // }
        // console.log(this.id)
        // changeElementColor(d3.selectAll(".mid"));

      }

      function drawMIDsDotOnMapFirsts(data: any) {
        // function drawMIDsDotOnMap(data: any) {







        // DATA JOIN
        var mids = svg.selectAll(".mid")
          .data(data)
          .enter()
          .append("circle")
          .attr("cx", function (d: any) {
            // console.log("Enter")
            // console.log(+d["midloc2_xlongitude"])
            var marker = projection([+d["midloc2_xlongitude"], +d["midloc2_ylatitude"]])
            return marker[0]
          })
          .attr("cy", function (d: any) {
            var marker = projection([+d["midloc2_xlongitude"], +d["midloc2_ylatitude"]])
            return marker[1]
          })


          .attr("id", function (d: any) {
            var tempId = "conflict" + String(d.dispnum)
            return String(tempId);
          })
          .attr("r", 5)
          .attr("fill", "rgb(196, 50, 50)")
          // .attr("fill", "white")
          .attr("class", "mid")
          .on('mouseover', function (this: any, d: any) {
            // console.log("I am on the text!!!!");
            // console.log(this);
            var idString = "#" + this.id.toString();

            idString = String(idString)
            d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
            d3.select(idString).attr("fill", "steelblue")

            d3.select(idString).attr("rX", String(d3.select(idString).attr("r")));
            d3.select(idString).attr("r", "5")
            // console.log("MIDs Information")
            // console.log(d)
            var idString = "#" + this.id.toString()
            // console.log(idString)
            dothandleMouseOver(idString, d)

          })
          .on('mouseout', function (this: any) {
            // console.log(this);
            var idString = "#" + this.id.toString()
            idString = String(idString)
            d3.select(idString).attr("fill", String(d3.select(idString).attr("fillX")));
            d3.select(idString).attr("r", String(d3.select(idString).attr("rX")));

            var idString = "#" + this.id.toString()
            // console.log(idString)
            dothandleMouseOut(idString)
          });

        // changeElementColor(d3.select("#conflict4489"));


      }

      //Not orign
      function drawMIDsDotOnMapWithTran(data: any) {
        // function drawMIDsDotOnMap(data: any) {







        // DATA JOIN
        var mids = svg.selectAll(".mid")
          .data(data);

        // console.log(mids)

        var delay = function (d, i) {
          return i * 50;
        }

        // UPDATAE.
        mids.transition()
          .duration(750)
          .delay(delay)
        mids.attr("cx", function (d: any) {
          // console.log(+d.midloc2_xlongitude)
          var marker = projection([+d["midloc2_xlongitude"], +d["midloc2_ylatitude"]])
          return marker[0]
        })
          // .transition()
          //   .duration(750)
          // .delay(delay)
          .attr("cy", function (d: any) {
            var marker = projection([+d["midloc2_xlongitude"], +d["midloc2_ylatitude"]])
            return marker[1]
          })
          .attr("id", function (d: any) {
            var tempId = "conflict" + String(d.dispnum)
            return String(tempId);
          })
          .attr("r", 5)
          .attr("fill", "rgb(196, 50, 50)")

          .attr("class", "mid")
          .transition()
          .duration(1)
          .style("fill", "red")
          .on("start", function transitionHeaderIn() {

            var t = d3.active(this)
              .style("opacity", 0)
              .remove();
            // console.log(t)

            d3.select(".mid")
              .style("opacity", 0)
              // .text("War Information")
              .transition(t)
              .style("opacity", 1)
              .attr("fill", "red")
              .transition()
              .duration(1);
          })






        // ENTER.
        mids.enter().append("circle")
          .attr("cx", function (d: any) {
            // console.log("Enter")
            // console.log(+d["midloc2_xlongitude"])
            var marker = projection([+d["midloc2_xlongitude"], +d["midloc2_ylatitude"]])
            return marker[0]
          })
          .attr("cy", function (d: any) {
            var marker = projection([+d["midloc2_xlongitude"], +d["midloc2_ylatitude"]])
            return marker[1]
          })
          .transition()
          .duration(1)

          .attr("id", function (d: any) {
            var tempId = "conflict" + String(d.dispnum)
            return String(tempId);
          })
          .attr("r", 5)
          .attr("fill", "rgb(196, 50, 50)")
          // .attr("fill", "white")
          .attr("class", "mid")
          .transition()
          .duration(1)
          .style("fill", "red")
          .on("start", function transitionHeaderIn() {

            var t = d3.active(this)
              .style("opacity", 0)
              .remove();
            // console.log(t)

            d3.select(".mid")
              .style("opacity", 0)
              // .text("War Information")
              .transition(t)
              .style("opacity", 1)
              .attr("fill", "red")
              .transition()
              .duration(1);
          })





          // .transition()
          // .duration(1)
          // .style("fill", "red")
          // .on("start", function transitionHeaderIn() {

          //   var t = d3.active(this)
          //     .style("opacity", 0)
          //     .remove();
          //   // console.log(t)

          //   d3.select(".mid")
          //     .style("opacity", 0)
          //     // .text("War Information")
          //     .transition(t)
          //     .style("opacity", 1)
          //     .attr("fill", "red")
          //     .transition()
          //     .duration(1);
          // })












          .on('mouseover', function (this: any, d: any) {
            // console.log("I am on the text!!!!");
            // console.log(this);
            var idString = "#" + this.id.toString();

            idString = String(idString)
            d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
            d3.select(idString).attr("fill", "steelblue")

            d3.select(idString).attr("rX", String(d3.select(idString).attr("r")));
            d3.select(idString).attr("r", "5")
            // console.log("MIDs Information")
            // console.log(d)
            var idString = "#" + this.id.toString()
            // console.log(idString)
            dothandleMouseOver(idString, d)

          })
          .on('mouseout', function (this: any) {
            // console.log(this);
            var idString = "#" + this.id.toString()
            idString = String(idString)
            d3.select(idString).attr("fill", String(d3.select(idString).attr("fillX")));
            d3.select(idString).attr("r", String(d3.select(idString).attr("rX")));

            var idString = "#" + this.id.toString()
            // console.log(idString)
            dothandleMouseOut(idString)
          });









        // EXIT.
        mids.exit()
          .transition()
          .duration(300)

          // .transition()
          // .duration(1)



          .style("opacity", 0)
          .remove();









        // d3.select(".mid")
        // // .attr("absolute","absolute")
        // // .attr("top", "70px")
        // // .attr("right", "15px")
        // // .attr("y", 400)
        // .transition()
        // .duration(1)
        // .style("fill", "red")
        // .on("start", function transitionHeaderIn() {

        //   var t = d3.active(this)
        //     .style("opacity", 0)
        //     .remove();
        //   // console.log(t)

        //   d3.select(".mid")
        //     .style("opacity", 0)
        //     // .text("War Information")
        //     .transition(t)
        //     .style("opacity", 1)
        //     .attr("fill", "red")
        //     .transition()
        //     .duration(1);
        // })




      }


      function drawWarsVer2(data: any) {

        // console.log(data)
        var cirId = 1;
        var couNaId = 1;
        var areaId = 1;
        // console.log(data)
        // war Curve
        refixcoID = []
        // console.log("draw color coutriy!!@#")
        // console.log(data)

        // d3.select("#USA").attr("fill", "steelblue");
        var wars = svg.selectAll(".warDyadicEach")
          .data(data)

        wars.attr("class", "warDyadicEach")
          .attr("fill", function (d: any) {

            // console.log("hello!")
            // var te=data.statea.toString()
            // console.log("hELLO")
            // console.log("inside")
            // console.log(d)
            var coun = '#' + d.stateAbbA.toString()


            refixcoID.push(coun)

            // console.log(refixcoID)


            d3.select(coun).attr("fill", "steelblue");
            // var idString = "#" + this.id.toString();  
            // idString = String(idString)
            // d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
            // d3.select(idString).attr("fill", "steelblue");
            return "steelblue"

          })

        // console.log("refix")
        // console.log(refixcoID)

        wars.enter()
          .append("path")
          .attr("class", "warDyadicPath")
          .attr("fill", function (this: any, d: any) {


            var coun = '#' + d.stateAbbA.toString()
            if (coun == '#AUH') {

              // console.log("here")
              d3.select("#AUS").attr("fill", "rgb(196, 50, 50)");
              // HUN
              d3.select("#HUN").attr("fill", "rgb(196, 50, 50)");
            }

            if (coun == '#YUG') {
              // console.log("here")
              d3.select("#AUS").attr("fill","rgb(196, 50, 50)");
              // HUN
              d3.select("#HUN").attr("fill", "rgb(196, 50, 50)");
            }

            d3.select(coun).attr("fill", "rgb(196, 50, 50)");

            refixcoID.push(coun)

            return "rgb(196, 50, 50)"

          });
        // .on('mouseover', function (this: any, d: any) {
        //   // console.log("I am on the text!!!!");
        //   // console.log(this);
        //   var idString = "#" + this.id.toString();
        //   console.log("Here")
        //   console.log(idString)

        //   idString = String(idString)
        //   d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
        //   d3.select(idString).attr("fill", "steelblue")

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



        // EXIT.
        wars.exit()
          // .transition()
          // .duration(750)
          .style("opacity", 0)
          .remove();













      }

      function removeWarsVer2(data: any, id: any) {

        // console.log(data)
        var cirId = 1;
        var couNaId = 1;
        var areaId = 1;
        // console.log(data)
        // war Curve


        // d3.select("#USA").attr("fill", "steelblue");
        var wars = svg.selectAll(".warDyadicEach")
          .data(data)

        wars.attr("class", "warDyadicEach")
          .attr("fill", function (d: any) {

            // console.log("hello!")
            // var te=data.statea.toString()
            // console.log(te)
            var coun = '#' + d.stateAbbA.toString()
            d3.select(coun).attr("fill", "#bdbdbd");
            // var idString = "#" + this.id.toString();
            // idString = String(idString)
            // d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
            // d3.select(idString).attr("fill", "steelblue");
            return "#bdbdbd"

          })



        wars.enter()
          .append("path")
          .attr("class", "warDyadicPath")
          .attr("fill", function (this: any, d: any) {

            // var te=dataS.statea.toString()
            // console.log("dataS")
            // console.log(d.stateAbbA)
            // console.log("hello!")
            var coun = '#' + d.stateAbbA.toString()
            d3.select(coun).attr("fill", "#bdbdbd");
            // console.log(d)
            // var idString = "#" + this.id.toString();
            // idString = String(idString)
            // d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
            // d3.select(idString).attr("fill", "steelblue");
            return "#bdbdbd"

          });
        // .on('click', function (this: any, d: any) {
        // console.log("I am on the text!!!!");
        // // console.log(this);
        // var idString = "#" + this.id.toString();
        // // console.log("Here")
        // console.log(idString)

        // idString = String(idString)
        // d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
        // d3.select(idString).attr("fill", "steelblue")

        // d3.select(idString).attr("rX", String(d3.select(idString).attr("r")));
        // d3.select(idString).attr("r", "5")
        // })
        // .on('mouseout', function (this: any) {
        //   // console.log(this);
        //   var idString = "#" + this.id.toString()
        //   idString = String(idString)
        //   d3.select(idString).attr("fill", String(d3.select(idString).attr("fillX")));
        //   d3.select(idString).attr("r", String(d3.select(idString).attr("rX")));

        // });



        // EXIT.
        wars.exit()
          // .transition()
          // .duration(750)
          .style("opacity", 0)
          .remove();



      }


      function removeWarsVer3() {

        svg.selectAll(".country")
          .attr("fill", "#bdbdbd")


      }


      function dothandleMouseOver(st: string, d: any) {
        // console.log(this.id);
        // var idString = "#" + this.id.toString()
        var idString = st
        var yearString = st.replace(/\D/g, "");
        // console.log("hello!")
        console.log(d)
        idString = String(idString)

        console.log(String(d3.select(idString).attr("fill")));

        d3.select(idString)
          .attr("fillX", String(d3.select(idString).attr("fill")));


        d3.select(idString)

          .attr("fill", function (data) {
            return "steelblue";
          })
          .attr("r", 10);

        var tooltipSpan = document.getElementById('tooltip-midInfor');

        window.onmousemove = function (e) {
          var x = e.clientX,
            y = e.clientY;
          // console.log(x)
          // console.log(y)
          tooltipSpan.style.top = (y - 20) + 'px';
          tooltipSpan.style.left = (x - 300) + 'px';
        };


        console.log(d)

        
        d3.select('#tooltip-midInfor')
          // .style('left', xPosition + 'px')
          // .style('top', yPosition + 'px')
          .select('#info-mid')
          // .html('<h4>' + "Location: " + d["midloc2_location"] + '</h4>' + 'Year: ' + d.year + '<br/>' + '</h4>' + '#Dispute: ' + d.dispnum + '<br/>');
          .html('<h4>' + "Location: " + d["midloc2_location"] + '</h4>' + 'Year: ' + d.year + '<br/>' + '</h4>');

        // d3.select('#tooltip-midInfor')
        //   .style('left', xPosition + 'px')
        //   .style('top', yPosition + 'px')
        //   .select('#info-mid')
        //   .html('<h4>' + "Location: " + d["midloc2_location"] + '</h4>' + 'Year: ' + d.year+'<br/>'+'</h4>' + '#Dispute: ' + d.dispnum+'<br/>');
        // .html('<h4>' + "Country: " + "South Korea" + '</h4>' + 'Expenditure: ' + "100000"+' % of GDP<br/>');

        d3.select('#tooltip-midInfor').classed('hidden', false);








        // var tooltipSpan = document.getElementById('tooltip-mid');

        //   window.onmousemove = function (e) {
        //     var x = e.clientX,
        //       y = e.clientY;
        //     // (x)
        //     // console.log(y)
        //     tooltipSpan.style.top = (y - 20) + 'px';
        //     tooltipSpan.style.left = (x - 55) + 'px';
        //   };

        //   d3.select('#tooltip-mid')
        //     // .style('left', xPosition + 'px')
        //     // .style('top', yPosition + 'px')
        //     .select('#country-info-mid')
        //   .html('<h4>' + d.properties.A3 + '</h4>');

        // d3.select('#tooltip-mid').classed('hidden', false);

        // var idString = "#" + this.id.toString();
        // idString = String(idString)

        // console.log(this.id.toString())

        // d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
        // d3.select(idString).attr("fill", "steelblue");







        // d3.select('#card-name-line1').html('country: ' + d3.select(this.parentNode).attr("country"));
        // d3.select('#card-desc-line1').html('Expenditure: ' + d3.select(idString).attr("expend"));








      }

      function dothandleMouseOut(st: any) {

        // var idString = "#" + this.id.toString()
        var idString = st
        idString = String(idString)
        // console.log(idString);
        // console(this);
        d3.select(idString)

          .attr("r", 5);

        // document.getElementById(this.id.toString()).removeAttribute("fill");
        d3.select(idString)
          .attr("fill", "rgb(196, 50, 50)");

        d3.select('#tooltip-midInfor').classed('hidden', true);
        // d3.select('#info-mid').classed('hidden', true);
        // d3.select('#card-name-line1').html('Country Information');
        // d3.select('#card-desc-line1').html('Mouse over bars for quick facts.<br/><br/><br/>');


      }

      function describeWarInf(warInf: any, warList: any) {
        console.log("warInf")
        console.log(warInf)

        var warTitle = [];
        var countryWar = []
        var i;
        for (i = 0; i < warInf.length; i++) {

          var warNum = warInf[i].warnum
          countryWar.push(warInf[i].stateNameA)
          countryWar.push(warInf[i].stateNameB)

          // console.log("hello!!!")
          // console.log(warList)
          // console.log(warNum)

          var tempWarList = warList.filter(x => String(x["War#"]) == String(warNum))
          // console.log("tempWarList")
          // console.log(tempWarList)

          var j;
          for (j = 0; j < tempWarList.length; j++) {
            warTitle.push(tempWarList[j]["Name"])
          }


          // warTitle.push(tempWarList["Name"])

        }
        // console.log("warTitle")
        var warTitleset = new Set(warTitle);
        var counset = new Set(countryWar)
        // var numCountryAtwar = countryWar

        // console.log(countryWar)

        var inform = [warTitleset, counset];

        // console.log(inform)


        // console.log(set)
        return inform;
      }


      function describeAllWarInfForEachWar(warInf: any, warList: any) {
        // console.log("describeAllWarInfForEachWar")
        // console.log(warInf)

        var warTitle = [];
        var countryWar = []
        var i;
        var tj;

        var testallWarNum = []
        var len = 0;

        var curnumC;

        var totalInf = []

        for (i = 0; i < warInf.length; i++) {

          var warNum = warInf[i].warnum
          testallWarNum.push(warNum)

        }

        // console.log("allWarNum")
        // console.log(testallWarNum)

        // console.log(typeof(allWarNum))
        var allWarNumset = new Set(testallWarNum);
        var temp = allWarNumset.values();
        var allWarNum = Array.from(temp)

        // const values = set.values();
        // const array = Array.from(values);
        // console.log(allWarNum)

        for (i = 0; i < allWarNum.length; i++) {

          countryWar = []

          for (tj = 0; tj < warInf.length; tj++) {

            var warNum = warInf[tj].warnum
            if (allWarNum[i] == warNum) {
              countryWar.push(warInf[tj].stateNameA)
              countryWar.push(warInf[tj].stateNameB)
            }


          }
          var countryWarSet = new Set(countryWar)
          var countryWarArray = new Array(countryWarSet)

          var tempWarList = warList.filter(x => String(x["War#"]) == String(allWarNum[i]))

          var WarTitleAndConList = new Array(tempWarList[0].Name, countryWarArray)
          totalInf.push(WarTitleAndConList)

          curnumC = countryWarArray[0].size



          if (len < curnumC) {
            len = countryWarArray[0].size
            var majorWarNum = allWarNum[i]

          }

        }

        var tempWarList = warList.filter(x => String(x["War#"]) == String(majorWarNum))


        var WarTitleAndConList = new Array(tempWarList[0].Name, countryWarArray)

        console.log("totalInf")
        console.log(totalInf)
        return totalInf
      }


      function describeAdditioanlInf(eachwarInf: any) {
        // console.log("describeAdditioanlInf")
        // console.log(eachwarInf)
        // console.log(eachwarInf.length)

        var numberofWars = eachwarInf.length
        var totalCountryAtwar = 0;
        var total = []

        var i;
        for (i = 0; i < eachwarInf.length; i++) {
          // console.log("Hello!!!")
          // console.log(eachwarInf[i][1][0].size)
          totalCountryAtwar = totalCountryAtwar + eachwarInf[i][1][0].size

        }
        // console.log(totalCountryAtwar)
        // #wars, #countries at war
        total = [numberofWars, totalCountryAtwar]
        // console.log(total)
        return total
      }

      function describeMajorWarInfForEachWar(warInf: any, warList: any) {
        // console.log("describeWarInfForEachWar")
        // console.log(warInf)

        var warTitle = [];
        var countryWar = []
        var i;
        var tj;

        var allWarNum = []
        var len = 0;

        var curnumC;

        for (i = 0; i < warInf.length; i++) {

          var warNum = warInf[i].warnum
          allWarNum.push(warNum)

        }

        // console.log("allWarNum")
        // console.log(allWarNum)

        for (i = 0; i < allWarNum.length; i++) {

          // var warNum = allWarNum[i]

          countryWar = []

          for (tj = 0; tj < warInf.length; tj++) {

            var warNum = warInf[tj].warnum
            if (allWarNum[i] == warNum) {
              countryWar.push(warInf[tj].stateNameA)
              countryWar.push(warInf[tj].stateNameB)

              // new Set(countryWar)


            }


          }
          var countryWarSet = new Set(countryWar)
          var countryWarArray = new Array(countryWarSet)
          curnumC = countryWarArray[0].size
          // console.log("warleng")
          // console.log(allWarNum[i])
          // console.log(countryWarArray[0].size)
          if (len < curnumC) {
            len = countryWarArray[0].size
            var majorWarNum = allWarNum[i]
            // console.log(majorWarNum)
            // console.log(countryWarArray.length)

          }

        }

        // console.log("majorWarNum")
        // console.log(majorWarNum)
        var tempWarList = warList.filter(x => String(x["War#"]) == String(majorWarNum))
        // console.log("tempWarList")
        // console.log(tempWarList[0].Name)

        // var j;
        // for (j = 0; j < tempWarList.length; j++) {
        //   warTitle.push(tempWarList[j]["Name"])
        // }

        // console.log(majorWarNum)
        // console.log(countryWarArray)

        var WarTitleAndConList = new Array(tempWarList[0].Name, countryWarArray)

        // console.log(WarTitleAndConList)

        return WarTitleAndConList
      }






      function drawMap(worldmap: any, countryNamCh: any) {

        var t;
        var spe;
        // console.log(worldmap)

        // console.log(countryNamCh)

        d3.selectAll(".mid").remove()
        d3.selectAll(".country").remove()

        for (t = 0; t < worldmap.features.length; t++) {
          // console.log("R")
          if (worldmap.features[t].properties.A3.toString() == countryNamCh) {
            // console.log("ROK")
            // var l = worldmap.features.length + 1
            var ROKmap = worldmap.features[t]
            spe = t
            // ROKmap=worldmap.features[t]
            // console.log(t)



            // delete worldmap.features[t]
          }
        }


        d3.selectAll(".country").remove()
        var selectCouMap = worldmap.features[spe]

        projection = d3.geoMercator().fitSize([width, height], selectCouMap);

        // var projection = d3.geoMercator().fitSize([width, height], worldmap);
        // var projection2 = d3.geoAlbersUsa().fitSize([width, height], popuUS);

        var path = d3.geoPath().projection(projection);

        // console.log(expMilCountries)
        var count = 1820;
        var warCount = 1828;

        svg.selectAll(".states")
          .data(worldmap.features)
          // .data(worldmap.features,function(d:any){
          //   // console.log(d)
          //   if (d.properties.A3=="ROK")
          //   {
          //     console.log("ROK")
          //     console.log(d.properties)
          //     var data=d
          //   }
          //   return data
          // })
          .enter()
          .append("path")
          // .attr("fill", "#bdbdbd")
          .attr("fill", "#bdbdbd")
          .attr("id", function (d: any) {
            // console.log(d);
            //country name
            return d.properties.A3
          })
          .attr("class", "country")
          .attr("stroke", "white")
          .attr("stroke-width", "0.2px")
          .attr("d", path)

          .on('mouseover', function (this: any, d: any) {
            // var centr = path.centroid(d)


            var tooltipSpan = document.getElementById('tooltip-mid');

            window.onmousemove = function (e) {
              var x = e.clientX,
                y = e.clientY;
              // (x)
              // console.log(y)
              tooltipSpan.style.top = (y - 20) + 'px';
              tooltipSpan.style.left = (x - 55) + 'px';
            };


            d3.select('#tooltip-mid')
              // .style('left', xPosition + 'px')
              // .style('top', yPosition + 'px')
              .select('#country-info-mid')
              .html('<h4>' + d.properties.A3 + '</h4>');

            d3.select('#tooltip-mid').classed('hidden', false);

            var idString = "#" + this.id.toString();
            idString = String(idString)

            // console.log(this.id.toString())

            d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
            d3.select(idString).attr("fill", "steelblue");

          })
          .on('mouseout', function (this: any) {

            d3.select('#tooltip-mid').classed('hidden', true);
            d3.select('#tooltip-midInfor').classed('hidden', true);

            var idString = "#" + this.id.toString()
            idString = String(idString)
            d3.select(idString).attr("fill", String(d3.select(idString).attr("fillX")));
            // d3.select('#card-name-bub1').html('Country Information');
            // d3.select('#card-desc-bub1').html('Mouse over bars for quick facts.<br/><br/><br/>');
          })
          .on('click', function (this: any, d: any) {
            // console.log("I am on the text!!!!");
            // console.log(this);
            // var idString = "#" + this.id.toString();
            d3.selectAll(".mid").remove()
            var countryNamCh = this.id.toString();
            // console.log("Here")
            // console.log(countryNamCh);
            drawMap(worldmapPath, countryNamCh)
            // console.log("!!!!!!")
          });



      }

      function drawMapOrigin(width: any, height: any, worldmapPath: any) {


        d3.select('#tooltip-mid').classed('hidden', true);
        d3.select('#tooltip-midInfor').classed('hidden', true);

        var projection = d3.geoMercator().fitSize([width, height], worldmapPath);

        var path = d3.geoPath().projection(projection);

        //MAP part
        svg.selectAll(".states")
          .data(worldmapPath.features)

          .enter()
          .append("path")
          // .attr("fill", "#bdbdbd")
          .attr("fill", "#bdbdbd")
          .attr("id", function (d: any) {
            // console.log(d);
            //country name
            allCCodeOnmap.push(d.properties.A3)
            return d.properties.A3
          })
          .attr("class", "country")
          .attr("stroke", "white")
          .attr("stroke-width", "0.5px")
          .attr("d", path)

          .on('mouseover', function (this: any, d: any) {
            // var centr = path.centroid(d)


            var tooltipSpan = document.getElementById('tooltip-mid');

            window.onmousemove = function (e) {
              var x = e.clientX,
                y = e.clientY;
              // (x)
              // console.log(y)
              tooltipSpan.style.top = (y - 20) + 'px';
              tooltipSpan.style.left = (x - 55) + 'px';
            };


            d3.select('#tooltip-mid')

              .select('#country-info-mid')
              .html('<h4>' + d.properties.A3 + '</h4>');

            d3.select('#tooltip-mid').classed('hidden', false);

            var idString = "#" + this.id.toString();
            idString = String(idString)

            console.log(idString)

            d3.select(idString).attr("fillX", String(d3.select(idString).attr("fill")));
            d3.select(idString).attr("fill", "steelblue");

          })
          .on('mouseout', function (this: any) {

            d3.select('#tooltip-mid').classed('hidden', true);
            d3.select('#tooltip-midInfor').classed('hidden', true);

            var idString = "#" + this.id.toString()
            idString = String(idString)
            d3.select(idString).attr("fill", String(d3.select(idString).attr("fillX")));
          })
          .on('click', function (this: any, d: any) {

            var countryNamCh = this.id.toString();


          });

      }






      // function removedrawMIDs(data: any) {





      // Modify to present trade flow
      // It can be used for graph.
      // Never delete this function.
      function drawWarsDydapath(data: any) {

        var cirId = 1;
        var couNaId = 1;
        var areaId = 1;
        // console.log(data)
        // war Curve
        var wars = svg.selectAll(".warDyadicPath")
          .data(data)

        wars.attr("class", "warDyadicPath")
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
          .attr("stroke", function (d: any) {
            return "blue";

          })
          .attr("stroke-width", "1");


        wars.enter()
          .append("path")
          .attr("class", "warDyadicPath")
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
            // if (d.statea == 2) {
            //   return "blue";
            // }

            // if (d.statea == 230) {
            //   return "red";
            // }

            // else {
            //   return "none"
            // }


            return "blue";

          })
          .attr("stroke-width", "1");

        // EXIT.
        wars.exit()
          // .transition()
          // .duration(750)
          .style("opacity", 0)
          .remove();



      }



      function pulse(this: any) {
        // svg.append("circle")
        // .attr("class","apple")
        // .attr("cx",50)
        // .attr("cy",50)
        // .attr("r",30)
        // .attr("fill","steelblue")

        d3.selectAll(".mid")
          .transition() // First fade to green.
          .delay(5)
          // .style("fill", "green")
          .style("opacity", 0)
          // .style("r", 3)

          // .transition() // Then red.
          // // .style("fill", "red")
          // // .style("r", 10)
          // .style("opacity", 0.5)

          .transition() // Wait one second. Then brown, and remove.
          .delay(5)
          .style("opacity", 1)
        // .style("fill", "brown")
        // .style("r", 50)

        // .remove();
      }


      function repulse(this: any) {
        // svg.append("circle")
        // .attr("class","apple")
        // .attr("cx",50)
        // .attr("cy",50)
        // .attr("r",30)
        // .attr("fill","steelblue")

        d3.selectAll(".mid")
          .transition() // First fade to green.
          .delay(10)
          // .style("fill", "green")
          .style("opacity", 1)
          // .style("r", 3)

          // .transition() // Then red.
          // // .style("fill", "red")
          // // .style("r", 10)
          // .style("opacity", 0.5)

          .transition() // Wait one second. Then brown, and remove.
          .delay(10)
          .style("opacity", 0)
          // .style("fill", "brown")
          // .style("r", 50)

          .remove();
      }

    });





  }

}
