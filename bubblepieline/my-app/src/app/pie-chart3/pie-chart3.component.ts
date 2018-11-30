import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

import 'node_modules/bootstrap/dist/css/bootstrap.min.css';

@Component({
  selector: 'app-pie-chart3',
  templateUrl: './pie-chart3.component.html',
  styleUrls: ['./pie-chart3.component.css']
})
export class PieChart3Component implements OnInit {

    header: any;
  title: any;
  content: any;

  constructor() {
    this.header = 'Composite Index of National Capability (CINC) in 1945';
    this.content = 'The pie chart shows the Composite Index of National Capability (CINC) Score of countries in 1945'
  }

  ngOnInit() {
    var tmp_this = this;

    var margin = { top: 50, left: 50, bottom: 50, right: 50 };
    var width = +d3.select('#chart-svg07').attr('width') - margin.left - margin.right;
    var height = +d3.select('#chart-svg07').attr('height') - margin.top - margin.bottom;

    var svg = d3.select('#chart-svg07')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
    var g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    var radius = Math.min(width, height) / 2;
    var pie = d3.pie()
            .sort(null)
            .value(function(d:any) { return d.score; });
    var path:any = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);
    var label = d3.arc()
        .outerRadius(radius - 100)
        .innerRadius(radius - 100);
  var color = d3.scaleSequential(d3.interpolateBlues).domain([4,-1]);

    d3.csv('cincdata1945.csv', function(d) {
      return { country: d.country, score: +d.score };
    }).then(function(data:any) {
      var arc = g.selectAll('.arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc')
        .on('mouseover', function(d:any) {
          d3.select(this)
            .select('path')
            .attr('stroke', '#ADADAD')
            .attr('stroke-width', 5)
          tmp_this.header = d.data.country ;
          tmp_this.content = "Composite Index of National Capability (CINC) Score is " + d.data.score + " in 1945.";
        })
        .on('mouseout', function(d) {
          d3.select(this)
            .select('path')
            .attr('stroke-width', 1);
            tmp_this.header = 'Total Military Personnel Data in 1945';
            tmp_this.content = 'The pie chart shows the Composite Index of National Capability (CINC) Score of countries in 1945.'
        })

      arc.append('path')
          .attr('d', path)
          .attr('fill', function(d:any, i) { return color(i); });

      arc.append('text')
          .attr('transform', function(d:any) { return 'translate(' + label.centroid(d) + ')'; })
          .attr('dy', '0.35em')
          .text(function(d:any) { return d.data.country; })
          .attr('text-anchor', 'middle');
    });

    }

  }
