const svg = d3.select(DOM.svg(width, height))
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("font-size", 10)
    .attr("font-family", "sans-serif")
    .style("width", "100%")
    .style("height", "auto");


const chords = chord(data.matrix);

const group = svg.append("g")
    .selectAll("g")
    .data(chords.groups)
    .enter().append("g");

group.append("path")
    .attr("fill", d => color(d.index))
    .attr("stroke", d => color(d.index))
    .attr("d", arc);

group.append("text")
    .each(d => { d.angle = (d.startAngle + d.endAngle) / 2; })
    .attr("dy", ".35em")
    .attr("transform", d => `
            rotate(${(d.angle * 180 / Math.PI - 90)})
            translate(${innerRadius + 26})
            ${d.angle > Math.PI ? "rotate(180)" : ""}
          `)
    .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
    .text(d => data.nameByIndex.get(d.index));

svg.append("g")
    .attr("fill-opacity", 0.67)
    .selectAll("path")
    .data(chords)
    .enter().append("path")
    .attr("stroke", d => d3.rgb(color(d.source.index)).darker())
    .attr("fill", d => color(d.source.index))
    .attr("d", ribbon);