$(document).ready(function(){

  var updateMacros = function(){
    var fats = parseFloat($('#fats-display').html());
    var carbs = parseFloat($('#carbs-display').html());
    var proteins = parseFloat($('#proteins-display').html());
    var macros = [fats, carbs, proteins];
    return macros;
  }

  if ($('#macros_chart').attr('id') === 'macros_chart') {
    var context = document.getElementById("macros_chart").getContext('2d');
    var myChart = new Chart(context, {
      type: 'doughnut',
      data: {
        labels: ["Fats", "Carbs", "Protein"],
        datasets: [{
          backgroundColor: [
            "#f1c40f",
            "#3498db",
            "#e74c3c"
          ],
          data: updateMacros()
        }]
      },
      options: {
        legend: {
          display: false
        },
      }
    });

    setInterval(function(){
      for (var i=0; i<3; i++) {
        myChart.config.data.datasets[0].data[i] = updateMacros()[i];
      }
      myChart.update();
    }, 1000)

  }



})
