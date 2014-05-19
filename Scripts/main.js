var dataset = [ 5, 10, 15, 20, 25 ];
var total = 75;

var context = d3.select("#bars")
	.selectAll("div")
	// bind data
    .data(dataset);
	
 // add things that aren't there
 context.enter()	
    .append("div")
	.attr("class", function(d) {
		var output = 'databar';
		
		if (d > 15) {   //Threshold of 15
			output += ' databar-error';
		}
		
		return output;
	})
	.style("width", function(d) {
		return (d*100)/75 + '%';
	});