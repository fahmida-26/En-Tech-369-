const sourceData = "https://entech369.ektukhanirobotics.com/wp-content/uploads/2020/10/co2_mm_mlo.txt";
const reg = /(\d+)\s+(\d+)\s+(?:-{0,1}\d+.{0,1}\d*\s+){3}(-{0,1}\d+.{0,1}\d*)\s+-*\d+/g;
const xAxisLabel = "Year";
const yAxisLabel = "CO2 (Parts per million)";
const sourceLabel = "Source: climate.nasa.gov";
var data = [];

am4core.ready(function() {
  // Themes begin
  am4core.useTheme(am4themes_animated);
  // Themes end

  var chart = am4core.create("chartdiv-co2", am4charts.XYChart);

  fetch(sourceData)
    .then( r => r.text() )
    .then( t => {
      var match;

      while (match = reg.exec(t)) {
        var date = new Date();
        date.setHours(0,0,0,0);
        date.setMonth(parseInt(match[2]) - 1);
        date.setFullYear(parseInt(match[1]));
        data.push({date: date, value: parseFloat(match[3])});
      }

      showChart(chart);
    } )
}); // end am4core.ready()

function showChart(chart) {
  chart.data = data;

  // Create axes
  var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.minGridDistance = 60;
  dateAxis.title.text = xAxisLabel;
  dateAxis.title.fontWeight = "bold";

  var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.title.text = yAxisLabel;
  valueAxis.title.fontWeight = "bold";

  // Create series
  var series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "value";
  series.dataFields.dateX = "date";
  series.tooltipText = "{value}"

  series.tooltip.pointerOrientation = "vertical";

  chart.cursor = new am4charts.XYCursor();
  chart.cursor.snapToSeries = series;
  chart.cursor.xAxis = dateAxis;

  //chart.scrollbarY = new am4core.Scrollbar();
  chart.scrollbarX = new am4core.Scrollbar();
  
  // Create bottom label
  var bottomLabel = chart.chartContainer.createChild(am4core.Label);
  bottomLabel.text = sourceLabel;
}