// var files = ["WarAndTrade_From1870.csv"];

    // var promises = [];

    // files.forEach(function (url) {
    //   var partsOfurl = url.split('.');

    //   if (partsOfurl[partsOfurl.length - 1] == "geojson" || partsOfurl[partsOfurl.length - 1] == "json") { promises.push(d3.json(url)) }
    //   if (partsOfurl[partsOfurl.length - 1] == "csv") { promises.push(d3.csv(url)) }

    // });

    // console.log(promises)

    var marginExX = 15;
    var marginEx = 60;
    var width = 1150 - 2 * marginEx;
    var height = 800 - 2 * marginEx + 100;

    var svg = d3.select('#chartSc');
    var chart = svg.attr('transform', `translate(${marginExX}, ${marginEx})`).append('g').attr('transform', `translate(${marginExX}, ${marginEx})`);
    var yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 100]);

    chart.append('g')
      .call(d3.axisLeft(yScale).tickFormat(d3.format("-")));

    var xScale = d3.scaleLinear()
      .range([0, width])
      .domain([0, 100])
    // .domain()
    // .padding(0)

    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      // attr('transform', `translate(${width}, 0)`)
      .call(d3.axisBottom(xScale));


    chart.append("text")
      .attr("transform",
        "translate(" + (width / 2) + " ," +
        (815) + ")")
      .style("text-anchor", "middle")
      .attr('font-size', '14px')
      .text("Average(%) of Percentage between 1970s and 1980s");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - (30))
      .attr("x", 0 - (height / 2 + 50))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .attr('font-size', '14px')
      .text("Average(%) of Percentage between 1990s and 2000s ");










    // var margin = { top: 20, left: 10, bottom: 50, right: 10 };
    // var widthMIDBar = 1100 - margin.left - margin.right;
    // var heightMIDBar = 200 - margin.top - margin.bottom;

    // var svgmidsBar = d3.select("#chartSc").append("svg").attr("id", "midsBar")
    //   .attr('width', widthMIDBar + margin.left + margin.right)
    //   .attr('height', heightMIDBar + margin.top + margin.bottom)
    //   .append('g')
    //   .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');






    var margin = { top: 20, left: 80, bottom: 50, right: 10 };
    var width = 800 - margin.left - margin.right;
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


    var xAxis;

    // var dataset;

    // var mode = "#ascend";

    // var modeSortMet = "#all";
    // var datasetCop;

    // var titleFirst;
    // var titleSecond = "For Military Expenditure";
    // var titleSort = "Alphabetical Order";

    // var maxSumTrade;


    var dataset:any= d3.csv("WarAndTrade_From1870.csv")

    console.log(dataset)
    // console.log(dataset["__zone_symbol__value"])
    // console.log
    // var maxSumTrade = d3.max(dataset, function (d: any) { 
    //   console.log("hello")  
    //   return d["SumTrade"]; 
    
    // });

    // console.log(maxSumTrade)
    // var prvMids = 0;
    // var onceClick = 0;

    // var selectedMIDYear;
    // var testInMIDs = 1;

    // x.domain(dataset.map(function (d) 
    // { 
    //   console.log(d)
    //   return +d["SumTrade"] ; 
    // }))
    //   .range([0, width])
      // .paddingInner(0.15);

    x.domain([0, maxSumTrade])
      .range([width, 0]);

    y.domain([0, maxSumTrade])
      .range([height, 0]);










    

    dataset.then(function (data) {

      // console.log(data)
      svg.selectAll("circle")
        .data(data)
        .enter()

        .append("circle")


        .attr('cx', function (data) {

          return (+data["SumTrade"] * width) / 100 + marginEx;
        })
        .attr('cy', function (data) {
          // return 780 - 7.8 * data[key];
          // console.log(data["countCouWars"]);
          return height - (+data["countCouWars"] * height) / 100 + marginEx;
        })
        .attr('r', function () {
          return 8;
        })
        .style("fill", function (data) {
          return data["cColor"]
        })

      // what color each country has
      svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr('x', function (data) {
          // console.log(data);
          // return 51;
          return +data["sccX"] + 50;
        })
        .attr('y', function (data) {
          // return 780 - 80;
          return +data["sccY"] + 75;
        })
        .attr('width', function (d) { return 16; })
        // .attr('height', function (d) { return 5 * d.Average; })
        .attr('height', function (d) { return 16; })

        .style('fill', function (data) {
          return data["cColor"];
        })

      svg.selectAll("th")
        .data(data)
        .enter()
        .append("text")

        .attr('x', function (data) {
          return +data["sccX"] + 66
        })
        .attr('y', function (data) {
          return +data["sccY"] + 85
        })
        .attr('fill', 'black')
        .text(function (data) {

          return data["abbR"];
        })

    });