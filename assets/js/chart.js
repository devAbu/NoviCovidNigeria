$.get("https://devabu.github.io/NoviCovidNigeria/php/getCities.php", function (data) {
  var juhu = data.replace("\n", "");
  var juhu = data.split("\n");

  array2 = juhu.filter(function (str) {
    return /\S/.test(str);
  });

  array2.splice(0, 5);
  array2.splice(140, 5);
  array2.splice(-1, 5);

  for (var i = 0; i < array2.length; i++) {
    array2[i] = array2[i].trim()
  }


  anychart.onDocumentReady(function () {

    blue = "#faff00"
    //Narandzasta=<50
    yellow = "#fbba09";
    //Ljubicasta =<100
    purple = "#fc7512";
    //crvena <=500
    red = "#fd1d1d";

    var dataArray2 = []

    for (var i = 0; i < array2.length - 5; i++) {
      if (array2[i + 1] < 10) {
        dataArray2.push([array2[i], array2[i + 1], 1, blue, "#009933", null, {
          enabled: true
        }])
      } else if (array2[i + 1] < 50) {
        dataArray2.push([array2[i], array2[i + 1], 1, yellow, "#009933", null, {
          enabled: true
        }])
      } else if (array2[i + 1] < 100) {
        dataArray2.push([array2[i], array2[i + 1], 1, purple, "#009933", null, {
          enabled: true
        }])
      } else {
        dataArray2.push([array2[i], array2[i + 1], 1, red, "#009933", null, {
          enabled: true
        }])

      }


      i += 4;
    }


    // create a data set
    var data = anychart.data.set(dataArray2);

    var seriesData_1 = data.mapAs({
      x: 0,
      value: 1,
      fill: 3,
      stroke: 0,
      label: 20
    });

    // create a chart
    var chart = anychart.column();

    // create a bar series and set the data
    //    var series = chart.column(data);

    // create the first series, set the data and name
    var series1 = chart.column(seriesData_1);
    series1.name("Broj zaraženih");
    series1.labels(true);
    labels = series1.labels();
    labels.position("center-top");
    labels.anchor("left");
    /*     series1.name("Broj zaraženih");
     */

    // set the chart title
    chart.title("Nigeria - City's");

    // set the titles of the axes
    chart.xAxis().title("Number of infected");

    /* chart.xAxis().labels().rotation(-90) */
    var xAxis = chart.xAxis();
    var yAxis = chart.yAxis();
    yAxis.title("Number of infected");

    chart.xAxis().labels().rotation(-90)
    xAxis.overlapMode("allowOverlap");

    // set the container id
    chart.container("chartContainer");

    // initiate drawing the chart
    chart.draw();
  });

});