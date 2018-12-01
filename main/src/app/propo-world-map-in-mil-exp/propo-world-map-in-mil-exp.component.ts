import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-propo-world-map-in-mil-exp',
    templateUrl: './propo-world-map-in-mil-exp.component.html',
    styleUrls: ['./propo-world-map-in-mil-exp.component.css']
})
export class PropoWorldMapInMilExpComponent implements OnInit {

    constructor() { }

    ngOnInit() {

        var svg = d3.select("#worldProp"),
            width = +svg.attr("width"),
            height = +svg.attr("height");



        // var files = ["us.json", "us-state-centroids.json"];
        var files = ["map.geojson", "MilRealExpend(a9)2017.json"];

        var promises = [];


        var radius = d3.scaleSqrt()
            .domain([0.023, 0.35])
            .range([2.3, 35]);

        var legend = svg.append("g")
            .attr("class", "legend")
            .attr("transform", "translate(" + (50) + "," + (100) + ")")
            .selectAll("g")
            .data([0.023, 0.13, 0.35])
            .enter().append("g");

        legend.append("circle")
            .attr("cx", 850)
            .attr("cy", function (d) { return -radius(d) - 5; })
            .attr("r", radius)
            .attr("fill", "none")
            // .attr("stroke", "#ccc");
            .attr("stroke", "black");

        legend.append("text")
            .attr("x", 850)
            .attr("y", function (d) { return -2 * radius(d) - 2 - 5; })
            // .attr("fill","#777")
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .attr("font-size", "10px")
            .attr("dy", "0.1em")
            .text(d3.format(".0%"));

        svg.append("text")
            .attr("x", 800)
            .attr("y", 13)
            .attr("font-size", '10px')
            .text("The share of world military expenditure (%)");




        files.forEach(function (url) {
            promises.push(d3.json(url))
        });

        Promise.all(promises).then(function (values) {

            // console.log(values[0]);

            //U.S.A location data
            var locCountry = values[0]

            //State population data in U.S.A 
            var expMilCountries = values[1]

            // console.log(popuUS)



            // console.log(popuUS.features.geometry.coordinates)

            var projection = d3.geoMercator().fitSize([width, height], locCountry);
            // var projection2 = d3.geoAlbersUsa().fitSize([width, height], popuUS);

            var path = d3.geoPath().projection(projection);
            // var path2 = d3.geoPath().projection(projection2);


            svg.selectAll(".states")
                .data(locCountry.features)
                .enter()
                .append("path")
                .attr("fill", function (d) {
                    // console.log(d);
                    // return (d.id == "06" ? "#452394" : "white"); 
                    // console.log(d.properties.A3);
                    return "white";
                })
                .attr("id", function (d: any) {
                    // console.log(d.properties.A3);
                    //country name
                    return d.properties.A3
                })
                .attr("stroke", "gray")
                .attr("d", path);


  
            var i;
            for (i = 0; i < expMilCountries.length; i++) {

                var rd = 10;
                var testCoord:any=[-82.4849,28.6407]

                var coord: any = [expMilCountries[i].coordinates[1], expMilCountries[i].coordinates[0]];
                var marker = projection(coord);
                var marker = projection(testCoord);
                // console
                svg.append("circle")
                    .attr("cx", marker[0])
                    .attr("cy", marker[1])
                    .attr("r", expMilCountries[i].expend)
                    .attr("fill", "#ff2329")
                    .attr("class", "bubble")


                console.log(expMilCountries[i].country)
                console.log(marker[0])

                if (marker[0] < 600) {
                    svg.append("line")
                        // .attr("x1", marker[0]+(1.414/2)*expMilCountries[i].expend)
                        // .attr("y1", marker[1]+(1.414/2)*expMilCountries[i].expend)
                        .attr("x1", marker[0] - expMilCountries[i].expend)
                        .attr("y1", marker[1])
                        .attr("x2", marker[0] - 70)
                        .attr("y2", marker[1])
                        // .attr("fill", "none")
                        .attr("stroke", "black")
                        .attr("stroke-width", 1);


                    svg.append("text")
                        // .attr("x1", marker[0]+(1.414/2)*expMilCountries[i].expend)
                        // .attr("y1", marker[1]+(1.414/2)*expMilCountries[i].expend)
                        // .attr("x", marker[0])
                        // .attr("y", marker[1] - expMilCountries[i].expend)
                        .attr("x", marker[0] - 95)
                        .attr("y", marker[1] + 3)
                        .attr("font-size", '10px')
                        // .attr("fill", "none")
                        .attr("dy", "0.1em")
                        .text(expMilCountries[i].country);
                }


                if (600 <= marker[0] && marker[0] < 700) {
                    svg.append("line")
                        // .attr("x1", marker[0]+(1.414/2)*expMilCountries[i].expend)
                        // .attr("y1", marker[1]+(1.414/2)*expMilCountries[i].expend)
                        .attr("x1", marker[0])
                        .attr("y1", marker[1] + expMilCountries[i].expend)
                        .attr("x2", marker[0] + 10)
                        .attr("y2", marker[1] + 50)
                        // .attr("fill", "none")
                        .attr("stroke", "black")
                        .attr("stroke-width", 1);


                    svg.append("text")
                        // .attr("x1", marker[0]+(1.414/2)*expMilCountries[i].expend)
                        // .attr("y1", marker[1]+(1.414/2)*expMilCountries[i].expend)
                        // .attr("x", marker[0])
                        // .attr("y", marker[1] - expMilCountries[i].expend)
                        .attr("x", marker[0] + 12)
                        .attr("y", marker[1] + 55)
                        .attr("font-size", '10px')
                        // .attr("fill", "none")
                        .attr("dy", "0.1em")
                        .text(expMilCountries[i].country);



                }



                if (700 <= marker[0] && marker[0] < 800) {
                    svg.append("line")
                        // .attr("x1", marker[0]+(1.414/2)*expMilCountries[i].expend)
                        // .attr("y1", marker[1]+(1.414/2)*expMilCountries[i].expend)
                        .attr("x1", marker[0] - expMilCountries[i].expend)
                        .attr("y1", marker[1])
                        .attr("x2", marker[0] - 20)
                        .attr("y2", marker[1])
                        // .attr("fill", "none")
                        .attr("stroke", "black")
                        .attr("stroke-width", 1);


                    svg.append("text")
                        // .attr("x1", marker[0]+(1.414/2)*expMilCountries[i].expend)
                        // .attr("y1", marker[1]+(1.414/2)*expMilCountries[i].expend)
                        // .attr("x", marker[0])
                        // .attr("y", marker[1] - expMilCountries[i].expend)
                        .attr("x", marker[0] - 45)
                        .attr("y", marker[1] + 4)
                        .attr("font-size", '10px')
                        // .attr("fill", "none")
                        .attr("dy", "0.1em")
                        .text(expMilCountries[i].country);



                }

                if (800 < marker[0]) {


                    svg.append("line")
                        // .attr("x1", marker[0]+(1.414/2)*expMilCountries[i].expend)
                        // .attr("y1", marker[1]+(1.414/2)*expMilCountries[i].expend)
                        .attr("x1", marker[0])
                        .attr("y1", marker[1] + expMilCountries[i].expend)
                        .attr("x2", marker[0] + 10)
                        .attr("y2", marker[1] + 50)
                        // .attr("fill", "none")
                        .attr("stroke", "black")
                        .attr("stroke-width", 1);


                    svg.append("text")
                        // .attr("x1", marker[0]+(1.414/2)*expMilCountries[i].expend)
                        // .attr("y1", marker[1]+(1.414/2)*expMilCountries[i].expend)
                        // .attr("x", marker[0])
                        // .attr("y", marker[1] - expMilCountries[i].expend)
                        .attr("x", marker[0] + 12)
                        .attr("y", marker[1] + 55)
                        .attr("font-size", '10px')
                        // .attr("fill", "none")
                        .attr("dy", "0.1em")
                        .text(expMilCountries[i].country);



                }



            }

        });



    }

}
