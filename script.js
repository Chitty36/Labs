// Set the dimensions and margins of the graph
var width = 600;
var height = 300;
var margin = { top: 20, right: 30, bottom: 40, left: 40 };

// Append the svg object to the body of the page
var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Load data from the CSV file
d3.csv("./subfolder/data.csv").then(function(data) {

    // Convert the data from strings to numbers
    data.forEach(function(d) {
        d.wombats = +d.wombats; // Convert to number
    });

    // Check data in console
    console.log(data);

    // Define the scales
    var x = d3.scaleBand()
        .domain(data.map(function(d, i) { return i; })) // Index as the domain
        .range([margin.left, width - margin.right])
        .padding(0.1);

    var y = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.wombats; })])
        .nice()
        .range([height - margin.bottom, margin.top]);

    // Append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d, i) { return x(i); }) // Use index for the x-position
        .attr("y", function(d) { return y(d.wombats); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - margin.bottom - y(d.wombats); })
        .attr("fill", "steelblue"); // Changed to steelblue for better visibility

    // Add the x-axis
    svg.append("g")
        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(d3.axisBottom(x).tickFormat(function(d, i) { return i + 1; })) // Use index for labels
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

    // Add the y-axis
    svg.append("g")
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(d3.axisLeft(y));
    
}).catch(function(error) {
    console.error('Error loading or parsing data.', error);
});
