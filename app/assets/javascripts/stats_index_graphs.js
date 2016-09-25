$(document).ready(function(){

  if ($('#stats_charts').attr('id') === 'stats_charts') {

  var weight_data = gon.weight_data;
  var steps_data = gon.steps_data;
  var distance_data = gon.distance_data;
  var heart_data = gon.heart_data;
  var loss_rate = gon.loss_rate;

  var theoretical_weight = function(weight_data){
    var output = [parseInt(weight_data[0]["value"])];
    for (var i=1; i<weight_data.length; i++){
      output.push(Math.round( 100 * (output[output.length-1] - loss_rate/7 ))/100);
    }
    return output
  }
    // var fakeData = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    // var fakeDate = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

    var weightArr = [];
    var dateArr = [];
    var stepsArr = [];
    var distanceArr = [];
    var heartArr = [];

    var data_array = function(source, data_type, arr){
      source.map(function(obj){
        arr.push(obj[data_type]);
        return arr;
      })
      return arr
    }

    var data = {
    	// labels : fakeDate,
    	labels : data_array(weight_data, 'dateTime',dateArr),
    	datasets : [
    		{
          label : "Weight",
          cubicInterpolationMode : "monotone",
          borderColor : "rgba(109,204,204,1)",
          spanGaps : true,
          backgroundColor: 'rgba(109,204,204,0.2)',
    			// data : fakeData.reverse()
    			data : data_array(weight_data, 'value', weightArr)
    		},
    		{
          label : "Projected Weight",
          cubicInterpolationMode : "monotone",
          borderColor : "rgba(220, 220, 220, 1)",
          spanGaps : true,
          backgroundColor: 'rgba(220, 220, 220, 0.2)',
    			// data : fakeData
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
                labelString: 'Weight (kg)'
              }
            }]
          }
        }
    });

    var stepsData = {
      // labels : fakeDate,
      labels : dateArr,
      datasets : [
        {
          label : "Steps",
          cubicInterpolationMode : "monotone",
          borderColor : "rgba(93,165,218,1)",
          spanGaps : true,
          backgroundColor: 'rgba(93,165,218,0.2)',
          // data : fakeData
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
            }]
          }
        }
    });

    var distanceData = {
      // labels : fakeDate,
      labels : dateArr,
      datasets : [
        {
          label : "Distance Walked",
          cubicInterpolationMode : "monotone",
          borderColor : "rgba(96,189,104,1)",
          spanGaps : true,
          backgroundColor: 'rgba(96,189,104,0.2)',
          // data : fakeData
          data : data_array(distance_data, 'value', distanceArr)
        }
      ]
    }

    var distanceChart = document.getElementById('distance_chart').getContext('2d');
    var myDistanceChart = new Chart(distanceChart , {
        type: "line",
        data: distanceData,
        options: {
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                fontSize: 30,
                labelString: 'Distance(km)'
              }
            }]
          }
        }
    });

    var heart_array = function(source, data_type1, data_type2, arr){
      source.map(function(obj){
        arr.push(obj[data_type1][data_type2]);
        return arr;
      })
      return arr
    }

    var heartData = {
      // labels : fakeDate,
      labels : dateArr,
      datasets : [
        {
          label : "Average Resting HR",
          cubicInterpolationMode : "monotone",
          borderColor : "rgba(241,88,84,1)",
          spanGaps : true,
          backgroundColor: 'rgba(241,88,84,0.2)',
          // data : fakeData
          data : heart_array(heart_data, 'value', 'restingHeartRate', heartArr)
        }
      ]
    }

    var heartChart = document.getElementById('heart_chart').getContext('2d');
    var myHeartChart = new Chart(heartChart , {
        type: "line",
        data: heartData,
        options: {
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                fontSize: 30,
                labelString: 'Heart Rate (bpm)'
              }
            }]
          }
        }
    });




  }
})
