import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import * as $ from 'jquery'
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var margin = { top: 50, left: 80, bottom: 80, right: 80 };
    var width = parseInt(d3.select('#chart-svg09').style('width')) - margin.left - margin.right;
    var height = parseInt(d3.select('#chart-svg09').style('height')) - margin.top - margin.bottom;

    var svg = d3.select('#chart-svg09')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')

    svg.append('text')
      .text('Line Chart showing Total Trade Value between 1870 and 2014 for the top 10 CINC Score countries')
      .attr('class', 'title')
      .attr('transform', 'translate(' + width/2 + ', -20)')
      .attr('font-size', '2rem')
      .attr('font-family', 'sans-serif')
      .attr('text-anchor', 'middle')

      var tooltip = d3.select('body')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    var x = d3.scalePoint().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    d3.csv('multiline_data.csv').then(function (data) {
      var names = data.columns.slice(1)
      var countries = names.map(function(name) {
        return {
          name: name,
          values: data.map(function(d) {
            return {Year: d.Year, trade: +d[name]};
          })
        };
      });
      x.domain(data.map(function(d) { return d.Year; }))
      y.domain([0, 6000000]);
      color.domain(names);

      var line = d3.line()
          .x(function(d:any) { return x(d.Year); })
          .y(function(d:any) { return y(d.trade); });

      svg.append('g')
        .call(d3.axisBottom(x))
        .attr('class', 'xaxis')
        .attr('transform', 'translate(0,' + height + ')')
        .selectAll('text')
        .attr('text-anchor', 'start')
        .attr('transform', 'rotate(25)');
      svg.append('g')
        .call(d3.axisLeft(y).ticks(5))
        .attr('class', 'yaxis');
      svg.append('text')
        .attr('class', 'xlabel')
        .text('Time Period')
        .attr('x', width/2)
        .attr('y', height + 60)
        .style('baseline-shift', 'nomal')
      svg.append('text')
        .attr('class', 'ylabel')
        .text('Trade Value')
        .attr('x', - height / 2)
        .attr('y', - margin.left * 0.5)
        .attr('transform', 'rotate(-90)')
        .style('baseline-shift', 'nomal')

      var country = svg.selectAll('country')
        .data(countries)
        .enter()
        .append('g')
        .attr('class', 'country');




        country.each(function() {
                  var tmp;
                  d3.select(this).selectAll('circle')
                    .data(function(d:any) { tmp = d.name; return d.values; })
                    .enter()
                    .append('circle')
                    .attr('class', 'point')
                    .attr('id', 'point'+ tmp)
                    .attr('cx', function(d:any) { return x(d.Year); })
                    .attr('cy', function(d:any) { return y(d.trade); })
                    .attr('r', 3)
                    .attr('fill', color(tmp))
                    .on('mouseover', function(d:any) {
                      d3.select(this)
                        .attr('r', 5)
                      var name = tmp;
                      var trade = d.trade
                      tooltip.transition()
                        .duration(200)
                        .style('opacity', 0.9);
                      tooltip.html(name + '<br/>' + trade)
                        .style('left', (d3.event.pageX -5) + 'px')
                        .style('top', (d3.event.pageY + 5) + 'px');
                    })
                    .on('mouseout', function() {
                      d3.select(this)
                        .attr('r', '3');
                      tooltip.transition()
                        .duration(500)
                        .style('opacity', 0);
                    })
                });


                country.append('path')
                .attr('class', 'line')
                .attr('fill', 'none')
                .attr('d', function(d:any) { return line(d.values); })
                .attr('stroke', function(d:any) { return color(d.name); })
                .attr('stroke-width', 2)
                .attr('id', function(d) { return 'path' + d.name; })


                var g = svg.append('g')
                  .selectAll('rect')
                  .data(countries)
                  .enter()
                  .append('g')
                  .on('mouseover', function() {
                    var path_id = '#path' + d3.select(this).text()
                    d3.select(path_id)
                      .attr('stroke-width', 4)
                    d3.selectAll('.point')
                      .attr('r', 0)
                    var point_id = '#point' + d3.select(this).text()
                    d3.selectAll(point_id)
                      .attr('r', 5);
                  })
                  .on('mouseout', function() {
                    var path_id = '#path' + d3.select(this).text()
                    d3.select(path_id)
                      .attr('stroke-width', 2);
                    d3.selectAll('.point')
                      .attr('r', 3)
                  })

                g.append('rect')
                  .attr('x', width * 0.9)
                  .attr('y', function (d, i) { return i * 15; })
                  .attr('width', 8)
                  .attr('height', 5)
                  .attr('fill', function(d:any) { return color(d.name); })
                g.append('text')
                  .attr('x', width * 0.9 + 12)
                  .attr('y', function (d, i) { return i * 15 + 2.5; })
                  .text(function(d) { return d.name})
                  .attr('text-anchor','start')
                  .attr('alignment-baseline', 'middle')

                  function resize() {
                    width = parseInt(d3.select('#chart-svg09').style('width')) - margin.left - margin.right;
                    height = parseInt(d3.select('#chart-svg09').style('height')) - margin.top - margin.bottom;

                    x.range([0, width]);
                    y.range([height, 0]);

                    svg.attr('width', width + margin.left + margin.right)
                      .attr('height', height + margin.top + margin.bottom);

                    svg.select('.title')
                      .attr('transform', 'translate(' + width/2 + ', -20)')
                    svg.select('.xaxis')
                        .attr('transform', 'translate(0,' + height + ')')
                        .call(d3.axisBottom(x));
                    svg.select('.yaxis')
                        .call(d3.axisLeft(y).ticks(5));
                    svg.select('.xlabel')
                      .attr('x', width/2)
                      .attr('y', height + 60);
                    svg.select('.ylabel')
                      .attr('x', - height / 2)
                      .attr('y', - margin.left * 0.5);

                    svg.selectAll('.line')
                        .attr('d', function(d:any) { return line(d.values); });

                    g.selectAll('rect').attr('x', width * 0.9);
                    g.selectAll('text').attr('x', width * 0.9 + 12);

                    svg.selectAll('.point')
                      .attr('cx', function(d:any) { return x(d.Year); })
                      .attr('cy', function(d:any) { return y(d.trade); })

                  }

                  d3.select(window).on('resize', resize);

                  resize();

    });
  }
}
