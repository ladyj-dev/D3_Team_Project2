datasetTotal = [
        { label: "Pinot Noir (RED)", value: 30 },
        { label: "Bordeaux-style Red Blend (RED)", value: 23 },
        { label: "Cabernet Sauvignon (RED)", value: 36 },
        { label: "Merlot (RED)", value: 7 },
        { label: "Bordeaux-style White Blend (WHITE)", value: 3 },
        { label: "Chardonnay (WHITE)", value: 16 },
        { label: "Pinot Gris (WHITE)", value: 1 },
        { label: "Riesling (WHITE)", value: 6 }
];

datasetOption1 = [
        { label: "Pinot Noir (RED)", value: 639 },
        { label: "Bordeaux-style Red Blend (RED)", value: 1100 },
        { label: "Cabernet Sauvignon (RED)", value: 625 },
        { label: "Merlot (RED)", value: 550 },
        { label: "Bordeaux-style White Blend (WHITE)", value: 698 },
        { label: "Chardonnay (WHITE)", value: 574 },
        { label: "Pinot Gris (WHITE)", value: 269 },
        { label: "Riesling (WHITE)", value: 612 }
];

datasetOption2 = [
        { label: "Pinot Noir (RED)", value: 50 },
        { label: "Bordeaux-style Red Blend (RED)", value: 90 },
        { label: "Cabernet Sauvignon (RED)", value: 50 },
        { label: "Merlot (RED)", value: 100 },
        { label: "Bordeaux-style White Blend (WHITE)", value: 90 },
        { label: "Chardonnay (WHITE)", value: 42 },
        { label: "Pinot Gris (WHITE)", value: 269 },
        { label: "Riesling (WHITE)", value: 245 }
];


d3.selectAll("input").on("change", selectDataset);

function selectDataset() {
        var value = this.value;
        if (value == "total") {
                change(datasetTotal);
        }
        else if (value == "option1") {
                change(datasetOption1);
        }
        else if (value == "option2") {
                change(datasetOption2);
        }
}

var margin = { top: (parseInt(d3.select('body').style('height'), 10) / 20), right: (parseInt(d3.select('body').style('width'), 10) / 20), bottom: (parseInt(d3.select('body').style('height'), 10) / 20), left: (parseInt(d3.select('body').style('width'), 10) / 5) },
        width = parseInt(d3.select('body').style('width'), 10) - margin.left - margin.right,
        height = parseInt(d3.select('body').style('height'), 10) - margin.top - margin.bottom;

var div = d3.select("body").append("div").attr("class", "toolTip");

var formatPercent = d3.format("");

var y = d3.scale.ordinal()
        .rangeRoundBands([height, 0], .2, 0.5);

var x = d3.scale.linear()
        .range([0, width]);

var xAxis = d3.svg.axis()
        .scale(x)
        .tickSize(-height)
        .orient("bottom");

var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");
//.tickFormat(formatPercent);

var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

d3.select("input[value=\"total\"]").property("checked", true);
change(datasetTotal);

function change(dataset) {

        y.domain(dataset.map(function (d) { return d.label; }));
        x.domain([0, d3.max(dataset, function (d) { return d.value; })]);

        svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

        svg.select(".y.axis").remove();
        svg.select(".x.axis").remove();

        svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(0)")
                .attr("x", 50)
                .attr("dx", ".1em")
                .style("text-anchor", "end");
        //     .text("Option %");


        var bar = svg.selectAll(".bar")
                .data(dataset, function (d) { return d.label; });
        // new data:
        bar.enter().append("rect")
                .attr("class", "bar")
                .attr("x", function (d) { return x(d.value); })
                .attr("y", function (d) { return y(d.label); })
                .attr("width", function (d) { return width - x(d.value); })
                .attr("height", y.rangeBand());

        bar
                .on("mousemove", function (d) {
                        div.style("left", d3.event.pageX + 10 + "px");
                        div.style("top", d3.event.pageY - 25 + "px");
                        div.style("display", "inline-block");
                        div.html((d.label) + "<br>" + (d.value));
                });
        bar
                .on("mouseout", function (d) {
                        div.style("display", "none");
                });


        // removed data:
        bar.exit().remove();

        // updated data:
        bar.transition()
                .duration(750)
                .attr("x", function (d) { return 0; })
                .attr("y", function (d) { return y(d.label); })
                .attr("width", function (d) { return x(d.value); })
                .attr("height", y.rangeBand());

};

