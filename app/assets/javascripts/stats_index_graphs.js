$(document).ready(function(){

  var weight_data = gon.weight_data;
  var steps_data = gon.steps_data;
  var loss_rate = gon.loss_rate;

  var theoretical_weight = function(weight_data){
    var output = [parseInt(weight_data[0]["value"])];
    for (var i=1; i<weight_data.length; i++){
      output.push(output[output.length-1] - (loss_rate / 7));
    }
    return output
  }

  if (weight_data) {

    var weightArr = [];
    var dateArr = [];
    var stepsArr = [];
    var data_array = function(source, data_type, arr){
      source.map(function(obj){
        arr.push(obj[data_type]);
        return arr;
      })
      return arr
    }

    // var date_data = [1,1,1,1,1,1,1,1,1,1]
    // var weight_data = [14,14,13,13,12,12,11,11,10,10]

    var data = {
    	labels : data_array(weight_data, 'dateTime',dateArr),
    	datasets : [
    		{
          label : "Weight",
          cubicInterpolationMode : "monotone",
          borderColor : "rgba(109,204,204,1)",
          spanGaps : true,
          backgroundColor: 'rgba(109,204,204,0.2)',
    			data : data_array(weight_data, 'value', weightArr)
    		},
    		{
          label : "Projected Weight",
          cubicInterpolationMode : "monotone",
          borderColor : "rgba(220, 220, 220, 1)",
          spanGaps : true,
          backgroundColor: 'rgba(220, 220, 220, 0.2)',
    			data : theoretical_weight(weight_data)
    		}
    	]
    }

    var ctx = document.getElementById('stats_charts').getContext('2d');
    var myNewChart = new Chart(ctx , {
        type: "line",
        data: data,
        options: {
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                fontSize: 30,
                labelString: 'Weight'
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                fontSize: 30,

                labelString: 'Date'
              }
            }]
          }
        }
    });

    var stepsData = {
      labels : dateArr,
      datasets : [
        {
          label : "Steps",
          cubicInterpolationMode : "monotone",
          borderColor : "rgba(109,204,204,1)",
          spanGaps : true,
          backgroundColor: 'rgba(109,204,204,0.2)',
          data : data_array(steps_data, 'value', stepsArr)
        }
      ]
    }

    var stepsChart = document.getElementById('steps_chart').getContext('2d');
    var myStepChart = new Chart(stepsChart , {
        type: "line",
        data: stepsData,
        options: {
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                fontSize: 30,
                labelString: 'Steps'
              }
            }],
            xAxes: [{
              scaleLabel: {
                display: true,
                fontSize: 30,

                labelString: 'Date'
              }
            }]
          }
        }
    });




  }
})
