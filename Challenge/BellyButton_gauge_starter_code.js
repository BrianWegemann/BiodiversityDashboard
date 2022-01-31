// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    console.log(data);

    // Create a variable that holds the samples array. 
    var samples = data.samples;
    // Create a variable that filters the samples for the object with the desired sample number.
    var samplesArray =  samples.filter(sampleObj => sampleObj.id == sample);
    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    // Create a variable that holds the first sample in the array.
    var result = samplesArray[0];

    // 2. Create a variable that holds the first sample in the metadata array.
    var metaresult = resultArray[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids
    var otu_labels = result.otu_labels
    var sample_values = result.sample_values

    // 3. Create a variable that holds the washing frequency.
    var washfreq = metaresult.wfreq
    // Create the yticks for the bar chart.
    var sortedOTU = sample_values.sort((a,b) => a.otu_ids - b.otu_ids);
    var topTenOTU = sortedOTU.slice(0,10).reverse();

    var topTenOTUsorted = topTenOTU.map(topTenOTU => parseInt(topTenOTU));

    var yticks = otu_ids.map(sampleObj => "OTU " + sampleObj).slice(0,10).reverse();
    console.log(yticks)

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot("plot", barData, barLayout);
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot('bubble', bubbleData, bubbleLayout);
   
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [
      {
        type: 'indicator',
        mode: 'gauge+number',
        title: { text: "Belly ButtoN Washing Frequency", font: { size: 24 } },
        value: washfreq,
      }
    ];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      margin: { t: 25, r: 25, l: 25, b: 25 },
      paper_bgcolor: "lavender",
      font: { color: "darkblue", family: "Arial" }
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot('gauge', gaugeData, gaugeLayout);
  });
}
