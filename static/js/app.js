// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    //console.log(data.metadata)

    // Filter the metadata for the object with the desired sample number
    function filterSample(metadatasample) {
      return metadatasample.id==sample;
    }

    let resultedSample = data.metadata.filter(filterSample);

    console.log(resultedSample);

    // Use d3 to select the panel with id of `#sample-metadata`
    let panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Inside a loop, you will need to use d3 to append new
    // tags for each key-value in the filtered metadata.
    for (const [key, value] of Object.entries(resultedSample[0])) {
      
      let row = panel.append("tr");

      row.append("td").text(`${key}: ${value}`);
    }
    

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    console.log(data.samples)

    // Filter the samples for the object with the desired sample number
    function filterSample(samplesample) {
      return samplesample.id==sample;
    }

    let resultedSample = data.samples.filter(filterSample);

    console.log(resultedSample);

    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = resultedSample[0].otu_ids;

    let otu_labels = resultedSample[0].otu_labels;

    let sample_values = resultedSample[0].sample_values;

    // Build a Bubble Chart
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Earth'
      },
      text: otu_labels
    };
    
    var data = [trace1];
    
    var layout = {
      title: 'Bacteria Cultures Per Sample',
      showlegend: false,
      height: 600,
      width: 1200,
      xaxis: {
        title:{
          text: 'OTU ID'
        }
      },
      yaxis: {
        title:{
          text: 'Number of Bacteria'
        }
      }
    };
     
    // Render the Bubble Chart
    Plotly.newPlot('bubble', data, layout);

    // For the Bar Chart, map the otu_ids to a list of strings for your yticks
    // Don't forget to slice and reverse the input data appropriately
    
    let top10otu = otu_ids.slice(0,10).map(function(otu){
      return `OTU ${otu}`
    }).reverse();

    sample_values.sort((a, b) => b - a);
    let top10sv = sample_values.slice(0,10).reverse();
    
    // Build a Bar Chart
    
    var trace2 = {
      x: top10sv,
      y: top10otu,
      type: 'bar',
      orientation: 'h'
    };
    
    var data2 = [trace2];
    
    var layout2 = {
      title: 'Top 10 Bacteria Cultures Found',
      height: 600,
      width: 900,
      xaxis: {
        title:{
          text: 'Number of Bacteria'
        }}
    };
        
    // Render the Bar Chart
    Plotly.newPlot("bar", data2, layout2);

  });
}

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field


    // Use d3 to select the dropdown with id of `#selDataset`


    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.


    // Get the first sample from the list


    // Build charts and metadata panel with the first sample
    buildMetadata(940)
    buildCharts(940)

  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected

}

// Initialize the dashboard
init();
