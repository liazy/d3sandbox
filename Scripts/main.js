$(document).ready(function() {
	var dataset = [];

	
	
	function bind() {
		var max = 100;
		var seriesWidth = 100 / dataset.length;

		// bind data
		var context = d3.select("#bars")
						.selectAll("div")
						.data(dataset);
			
		 // add things that aren't there
		 context.enter()	
			.append("div")			
			// set default class...
			.attr("class", function(d) {
				return 'databar';
			});
		
		// remove things that shouldn't be there
		context.exit()	
			   .remove();
		
		// update new and old...
		context.attr("class", function(d) {
				var output = 'databar';
				
				if (d.value < 30) {   //Threshold of 15
					output += ' databar-error';
				}
				
				return output;
			})
			.style("width", function(d) {
				return seriesWidth + '%';
			})
			.style("left", function(d, index) {
				return seriesWidth*index + '%';
			})
			.style("height", function(d) {
				return (d.value*100)/max + '%';
			});
	}

	function add() {
		var next = Math.round(Math.random()*100);
		dataset.push({ value: next});
	};
	
	add();	
	add();	
	add();	
	add();	
	add();	
	bind();
	
	$('[data-action="swap"]').on('click', function() {
		for (var i = 2; i < dataset.length; i++) {
			var swap = dataset[i];
			dataset[i] = dataset[i-2];
			dataset[i-2] = swap;
		}
		
		bind();
	});
	
	$('[data-action="add"]').on('click', function() {
		add();		
		bind();
	});
});
	