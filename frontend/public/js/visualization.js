var margin = {top: 50, right: 40, bottom: 170, left: 50},
    width = 600 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
var y1 = d3.scaleLinear().range([height, 0]);

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

$.getJSON("./data/sample.json", function(data, error) {

  var colors = ["cadetblue", "darkslateblue", "dimgray", "dodgerblue", "indigo", "black"];

  // var maxActivity = 0;
  //       data.forEach(function(set) {
  //           set.forEach(function(d){
  //               console.log(d.activity);
  //               if(d.activity > maxActivity)
  //                 maxActivity = d.activity;
  //
  //               set.date = +d.dateCreated;
  //           })
  //       });

  for (var i = 0; i < data.length; i++) {

    data[i] = data[i].intervals;
    console.log(data[i]);
    data[i].map(function(d) {
      var dc = new Date(d.dateCreated);

      d.dateCreated=dc;
    })

    data[i].forEach(function(d) {
        d.date = +d.dateCreated;
        d.activity = +d.activity;
    });

    x.domain(d3.extent(data[i], function(d) { return d.date; }));
    y.domain([0, d3.max(data[i], function(d) { return Math.max(d.activity); })]);
    y1.domain([0, d3.max(data[i], function(d) { return Math.max(d.activity); })]);

    // x.domain(d3.extent(data, function(d) { return d.date; }));
    // y.domain([0, maxActivity]);
    // y1.domain([0, d3.max(data, function(d) { return Math.max(d.activity); })]);

    var valueline = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.activity); });

    console.log(data[i]);

    svg.append("path")
        .data([data[i]])
        .attr("class", "line")
        .attr("fill", "none")
        .style("stroke", colors[i])
        .style("stroke-width", 2.5)
        .attr("d", valueline);

    svg.selectAll("dot")
     .data(data[i])
     .enter().append("circle")
        .style("fill", colors[i])
         .attr("r", 4)
         .attr("cx", function(d) { return x(d.date); })
         .attr("cy", function(d) { return y(d.activity); });
  }

  svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x)
              .tickFormat(d3.timeFormat("%X")))
      .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

  svg.append("text")
  .attr("transform",
        "translate(" + (width/2) + " ," +
                       (height + margin.top + 35) + ")")
      .attr("font-size", "20px")
      .style("text-anchor", "middle")
      .text("Time");

  svg.append("g")
      .attr("class", "axisSteelBlue")
      .call(d3.axisLeft(y));

  svg.append("g")
      .attr("class", "axisSteelBlue")
      .attr("transform", "translate( " + width + ", 0 )")
      .call(d3.axisRight(y1));

  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("font-size", "20px")
      .style("text-anchor", "middle")
      .text("Activity");

  svg.append("text")
      .attr("x", width / 2)
      .attr("y", 1)
      .attr("text-anchor", "middle")
      .style("font-size", "24px")
      .style("text-decoration", "underline")
      .attr("class", "shadow")
      .text("Activity vs. Time Graph");

  svg.append("text")
      .attr("x", (width / 2))
      .attr("y", 1)
      .attr("text-anchor", "middle")
      .style("font-size", "24px")
      .style("text-decoration", "underline")
      .text("Activity vs. Time Graph");
}).fail(function(d, textStatus, error){
  console.error("getJSON failed status: " + textStatus + " , error: " + error);
});
