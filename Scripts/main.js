$(document).ready(function() {
	var dataset = [];	
	
	function bind() {
		var data = [];
		
		for (var i = 0; i < dataset.length; i++) {
			data[i] = dataset[i];
		}
		
		// add an extra 0 value bar to animate from when we add a new node...
		data.push({value: 0, index: dataset.length});
	
		var max = 100;
		var seriesWidth = 100 / dataset.length;
		
		var margin = seriesWidth/(dataset.length*2)

		// bind data
		var context = d3.select("#bars")
						.selectAll("div")
						.data(data);
			
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
		
		// get a new context to separate enter from update animations...
		var context = d3.select("#bars")
						.selectAll("div")
						.data(dataset);
		
		// update new and old...
		context.attr("class", function(d) {
				var output = 'databar';
				
				if (d.value < 30) {   //Threshold of 15
					output += ' databar-error';
				}
				
				return output;
			})
			.style("width", function(d) {
				// margin is added to each side of the bar for prettiness...
				return (seriesWidth - 2 * margin) + '%';
			})
			.style("left", function(d) {
				// the elements are always linked to the item at the same index in the array
				// keeping track of the index ourselves allows us to do the side to side animation...
				return (seriesWidth * d.index + margin) + '%';
			})
			.style("height", function(d) {
				return (d.value*100)/max + '%';
			})
			.text(function(d) {
				return d.id;
			});
	}

	function add() {
		var next = Math.round(Math.random()*100);
		dataset.push({ value: next, index: dataset.length});
	};
	
	add();	
	add();	
	add();	
	add();	
	add();	
	bind();
	
	$('[data-action="move"]').on('click', function() {
		
		// swapping the index makes the bars move sideways as we use the index to render position...
		for (var i = 2; i < dataset.length; i+=2) {
			var swap = dataset[i].index;
			dataset[i].index = dataset[i-2].index;
			dataset[i-2].index = swap;
		}
		
		bind();
	});
	
	$('[data-action="swap"]').on('click', function() {
		// swapping the values makes the bar height and style change but not its position...
		for (var i = 2; i < dataset.length; i+=2) {
			var swap = dataset[i].value;
			dataset[i].value = dataset[i-2].value;
			dataset[i-2].value = swap;
		}
		
		bind();
	});
	
	$('[data-action="add"]').on('click', function() {
		add();		
		bind();
	});
});
	