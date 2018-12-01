
d3.json("slopegraph-data.json").then(function (data) {

    // console.log(data);

    var margin = { top: 70, right: 0, bottom: 40, left: 0 },
        width = 740 - margin.left - margin.right,
        height = 1000 - margin.top - margin.bottom,
  
        
        y_dom  = d3.extent( data, d => d.value).reverse()
        x_dom  = d3.extent( data, d => d.year)

        
  
        y = d3.scaleLinear()
            .domain( y_dom )
            .range([ 0, height ]),
        x = d3.scaleLinear()
            .domain( x_dom )
            .range([ 390, 570 ]),
  
        layout = d3.slopegraph()( data )
            .j( 'country' ).y( 'value' ).x( 'year' )
            .textHeight( (y_dom[0] - y_dom[1]) / height * 14 ),
  
        textAlign = m => {
          return (d, i) => i ? 'start' : 'end';
        },
        textMargin = m => {
          return (d, i) => i ? m * 1 : m * -1;
        };
  
    var svg = d3.select('#svg_slopegraph').append('svg')
        .attr( 'width', width + margin.left + margin.right )
        .attr( 'height', height + margin.top + margin.bottom )
      .append( 'g' )
        .attr( 'transform', `translate(${margin.left},${margin.top})` );
  
    svg.append( 'g' )
        .attr( 'class', 'years' )
        .selectAll( 'text' ).data( x_dom ).enter()
        
      .append( 'text' )
      .attr( 'font-weight', "bold")
        .attr( 'x', x )
        .attr( 'dx', textMargin( 0 ) )
        // .attr( 'dx', (d, i) => i ? 10 : -10 )
        .attr( 'y', -40 )
        .style( 'text-anchor', textAlign() )
        .text( String );
  
    var line = d3.line()
        .x( d => x( d.year ) )
        .y( d => y( d.y ) );
  
    var pairs = svg.append( 'g' )
        .attr( 'class', 'lines' )
        .selectAll( 'g' )
        .data( layout.pairs() ).enter()
      .append( 'g' );
  
    pairs.append( 'path' )
        .attr( 'd', line );
  
    pairs.selectAll( '.country' )
        .data( d => d ).enter()
        .append( 'text' )
        .attr( 'class', 'country' )
        .attr( 'id', d => d.country)
        .attr( 'x', d => x( d.year ) )
        .attr( 'dx', textMargin( 48 ) )
        .attr( 'dy', '.32em' )
        .attr( 'y', d => y( d.y) )
        .style( 'text-anchor', textAlign() )
        .text( d => d.country );
  
    pairs.selectAll( '.value' )
        .data( d => d ).enter()
        .append( 'text' )
        // .attr( 'class', d => d.value)
        .attr( 'class', 'value' )
        .attr( 'class', d => d.country)
        .attr( 'x', d => x( d.year ) )
        .attr( 'dy', '.32em' )
        .attr( 'dx', textMargin( 0 ) )
        .attr( 'y', d => y( d.y ) )
        .style( 'text-anchor', textAlign() )
        .text( d => d.value );


  
    svg.append( 'g' )
        .attr( 'class', 'desc' )
        .selectAll( 'text' )
        .data([ 'Military expenditures (% of GDP)'
              , 'GNI per Capita, 2007 and 2016'
              ]).enter()
      .append( 'text' )
        .attr( 'y', (d,i) => i * 20 )
        .attr( 'dy', '-.32em' )
        .attr( 'x', 13 )
        .attr( 'font-weight', "bold")
        .text( String );

});



