function Scatterplot(data, min, max){

    //remove existing scatterplot if there is one
    d3.select("svg").remove();

    var margin = {top: 20, right: 30, bottom: 20, left: 30};
    var width = parseInt(d3.select('#scatterplot-container').style('width'), 10)
        width = width - margin.left - margin.right
    var height = 50 - margin.top - margin.bottom;
    
    //scale graph based on min and max
    var x = d3.scaleLinear()
              .domain([min, max])
              .range([ 0, width ]);
      
    var chart = d3.select('#scatterplot-container')
    .append('svg:svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)

    var main = chart.append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
    .attr('width', width)
    .attr('height', height)

    //draw the x axis
    var xAxis = d3.axisBottom().scale(x);
    main.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(xAxis);

    //draw the points
    var g = main.append("svg:g"); 
    g.selectAll("scatter-dots")
    .data(data)
    .enter().append("svg:circle")
    .attr("cx", function (d,i) { return x(d); } )
    .attr("r", 2);
}
