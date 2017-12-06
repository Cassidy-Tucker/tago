var margin = {
    top: 50,
    right: 40,
    bottom: 130,
    left: 60
  },
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var graphElems = {
  colors: [
    "cadetblue",
    "darkslateblue",
    "dimgray",
    "dodgerblue",
    "indigo",
    "black"
  ],
  intervals: [],
  maxActivity: 0
}

var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);
var y1 = d3.scaleLinear().range([height, 0]);
var legendRectSize = 18;
var legendSpacing = 4;

var svg = d3.select("#graph-container").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).style("background-color", "white").append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
    // .style("z-index", 1000000);

$.getJSON("./data/sample.json", function(data, error) {

  var max = 0;
  for (var i = 0; i < data.length; i++) {
    var rhett = data[i].intervals.map(function(v, i) {
      return Number(v.activity);
    }).reduce(function(a, b) {
      return Math.max(a, b);
    });
    //if the value that we get out of rhett is greater than the value we get out of max we want to set value to max
    if (rhett > graphElems.maxActivity) {
      graphElems.maxActivity = rhett;
    }
  }
  graphElems.maxActivity = Math.round(graphElems.maxActivity);
});

$.getJSON("./data/sample.json", function(data, error) {
  //var colors = ["cadetblue", "darkslateblue", "dimgray", "dodgerblue", "indigo", "black"];

  for (var i = 0; i < data.length; i++) {
    var intervals = data[i].intervals;
    intervals.map(function(d) {
      d.date = +d.dateCreated;
      d.activity = +d.activity;
      var dc = new Date(d.dateCreated);
      d.dateCreated = dc;
    });

    x.domain(d3.extent(intervals, function(d) { return d.date; }));
    y.domain([0, graphElems.maxActivity]);

    var valueline = d3.line()
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.activity); });

    console.log([intervals]);

    svg.append("path")
        .data([intervals])
        .attr("class", "line")
        .attr("fill", "none")
        .style("stroke", graphElems.colors[i])
        .style("stroke-width", 2.5)
        .attr("d", valueline);

    console.log(valueline);

     // var legend = svg.selectAll('.legend')
     //   .data([data[i]])
     //   .enter()
     //   .append("g")
     //   .attr("class", "legend")
     //   .attr("transform", function(d, i) {
     //     var height = legendRectSize + legendSpacing;
     //     var offset = height * graphElems.colors[i].length / 2;
     //     var horz = -2 * legendRectSize;
     //     var vert = i * height - offset;
     //     return "translate(" + horz + ", " + vert + ")";
     //   });
     //
     // legend.append("rect")
     //   .attr("width", legendRectSize)
     //   .attr("height", legendRectSize)
     //   .style("fill", colors)
     //   .style("stroke", colors);
     //
     // legend.append("text")
     //   .attr("x", legendRectSize + legendSpacing)
     //   .attr("y", legendRectSize - legendSpacing)
     //   .text(function(d) {return d; });


     svg.selectAll("dot")
      .data(intervals)
      .enter().append("circle")
         .style("fill", graphElems.colors[i])
          .attr("r", 4)
          .attr("cx", function(d) { return x(d.date); })
          .attr("cy", function(d) { return y(d.activity); })
          .on("mouseover", function(d) {
            div.transition()
              .duration(200)
              .style("opacity", .9);
            div.html(Math.round(d.activity))
              .style("left", (d3.event.pageX) + "px")
              .style("top", (d3.event.pageY - 28) + "px");
              console.log("mouseover");
          })
          .on("mouseout", function(d) {
            div.transition()
              .duration(500)
              .style("opacity", 0);
              console.log("mouseout");
              console.log(div);
          });
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
                       (height + margin.top + 40) + ")")
      .attr("font-size", "20px")
      .style("text-anchor", "middle")
      .text("Time");

  svg.append("g")
      .attr("class", "axisSteelBlue")
      .call(d3.axisLeft(y));

  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("font-size", "20px")
      .style("text-anchor", "middle")
      .text("Activity");

  svg.append("text")
      .attr("x", (width / 2))
      .attr("y", 10)
      .attr("text-anchor", "middle")
      .style("font-size", "24px")
      .style("text-decoration", "underline")
      .text("Activity vs. Time Graph");
}).fail(function(d, textStatus, error){
  console.error("getJSON failed status: " + textStatus + " , error: " + error);
});
