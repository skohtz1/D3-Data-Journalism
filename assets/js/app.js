// D3 Scatterplot Assignment

// Students:
// =========
// Follow your written instructions and create a scatter plot with D3.js.
var svgWidth = 900;
var svgHeight = 700;

var margin = {
    top: 60,
    right: 40,
    bottom: 100,
    left: 100
};

var chartWidth = svgWidth - margin.left - margin.right;

var chartHeight = svgHeight - margin.top - margin.bottom;

var svg = d3.select(".chart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var chart = svg.append("g")

d3.select(".chart")
    .append("div")
    .attr("class", "tooltip")
    .style("opactiy",.5)

d3.csv("../../data/hairData.csv", function(error,dumbData){
    if (error) console.log(error);

    dumbData.forEach(function(data){
        data.Births_past_12months = +data.Births_past_12months;
        data.Population = + data.Population;

    });

    var xLinearScale = d3.scaleLinear().range([0,chartWidth]);

    var yLinearScale = d3.scaleLinear().range([chartHeight,0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    xLinearScale.domain([0,d3.max(dumbData, function(data){
        return +data.Births_past_12months;
    })]);

    yLinearScale.domain([0, d3.max(dumbData,function(data){
        return +data.Population;
    })]);

    var tooltip = d3.tip()
        .attr("class", "toolTip")
        .offset([80,-60])
        .html(function(data){
            var state = data.State;
            var birthRate = +data.Births_past_12months;
            var population = +data.Population;
            return (state + "<br> Birth Rate: " + birthRate + "<br> Population: " +population)

        });

    chart.call(tooltip);

    chart.selectAll("circle")
    .data(dumbData)
    .enter()
    .append("circle")
    .attr("cx", function(data,index){
        console.log(data.Births_past_12months);
        return xLinearScale(data.Births_past_12months);
    })
    .attr("cy", function(data,index){
        console.log(data.Population);
        return yLinearScale(data.Population);

    })
    .attr("r",10)
    .attr("fill", "red")
    .style("opacity", 0.5)
    .on("click", function(data){
        tooltip.show(data)

    })
    .on("mouseout", function(data, index){
        tooltip.hide(data);
    });

    chart.append("g")
        .attr("transform", `translate(0,${chartHeight})`)
        .call(bottomAxis);
    
    chart.append("g")
    .call(leftAxis);

    chart.append("text")
    .attr("transform", "rotate(-90")
    .attr("y", 0 - margin.left + 50)
    .attr("x", 0 - chartHeight)
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("birth");

    chart.append("text")
    .attr("transform", "translate(" + (chartWidth/3) + "," + (chartHeight + margin.top + 30) + ")") 
    .attr("class", "axisText")
    .text("Population");
    
    
});


