// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require bootstrap-sprockets
//= require jquery_ujs
//= require turbolinks
//= require_tree .




// control  speed
$(document).ready(function(){

  $('#myCarousel').height($(window).height());

  $('#age-input').val("20");
  $('#height-input').val("100");
  $('#weight-input').val("30");
  $('#weight-loss-input').val("0.5");


   $("#myCarousel").carousel({
       interval : 5000,
       pause: false
   });


   // Autoscrolls the recipe banner
   var recipeScroll = setInterval(function(){
     $('.scrolling').scrollLeft($('.scrolling').scrollLeft()+1);
   },30);

   $('#photo-container').on('mouseenter',function(){
     $(this).removeClass('scrolling');
   })

   $('#photo-container').on('mouseleave',function(){
     $(this).addClass('scrolling');
   })

  setInterval(function() {
    // my Code
    if ($(this).scrollTop() > 200) {
      $('.test-header').addClass('nav-down');
    } else {
      $('.test-header').removeClass('nav-down').addClass('nav-up');
    }

    if ($(this).scrollTop() > $(window).height()/2) {
      $('.flip-image1').css('visibility','visible');
      $('.flip-image1').show();
      $('.flip-image1').addClass('flipper');
      $('.flip-image2').css('visibility','visible');
      $('.flip-image2').show();
      $('.flip-image2').addClass('flipper');
    } else {
      $('.flip-image1').fadeOut('slow');
      $('.flip-image1').removeClass('flipper');
      $('.flip-image2').fadeOut('slow');
      $('.flip-image2').removeClass('flipper');
    }
  }, 250);







    var checkAgeSliderLength = function(){
      var maxWidth = parseInt($('input.slide').css('width'));
      var min = parseFloat($('#ageSlider').attr('min'));
      var max = parseFloat($('#ageSlider').attr('max'));
      var width = maxWidth * ((parseFloat($('#ageSlider').val())-min)) /
      (max-min)*0.99;
      return width + 'px';
    }

    // var checkAgeThumbSliderLength = function(){
    //   var maxWidth = parseInt($('input.slide').css('width'));
    //   var width = maxWidth * ((parseFloat($('#ageSlider').val())-20) /
    //   80.8);
    //   return width  + 'px';
    // }

    var checkWeightSliderLength = function(){
      var maxWidth = parseInt($('input.slide').css('width'));
      var min = parseFloat($('#weightSlider').attr('min'));
      var max = parseFloat($('#weightSlider').attr('max'));
      var width = maxWidth * ((parseFloat($('#weightSlider').val())-min)) /
      (max-min)*0.99;
      return width + 'px';
    }



    // var checkWeightThumbSliderLength = function(){
    //   var maxWidth = parseInt($('input.slide').css('width'));
    //   var width = maxWidth * ((parseFloat($('#weightSlider').val())-30) /
    //   171.5);
    //   return width + 'px';
    // }

    var checkHeightSliderLength = function(){
      var maxWidth = parseInt($('input.slide').css('width'));
      var min = parseFloat($('#heightSlider').attr('min'));
      var max = parseFloat($('#heightSlider').attr('max'));
      var width = maxWidth * ((parseFloat($('#heightSlider').val())-min)) /
      (max-min)*0.99;
      return width + 'px';
    }

    // var checkHeightThumbSliderLength = function(){
    //   var maxWidth = parseInt($('input.slide').css('width'));
    //   var width = maxWidth * ((parseFloat($('#heightSlider').val())-100) /
    //   151.5);
    //   return width + 'px';
    // }



    var checkLossSliderLength = function(){
      var maxWidth = parseInt($('input.slide').css('width'));
      var min = parseFloat($('#weightLossSlider').attr('min'));
      var max = parseFloat($('#weightLossSlider').attr('max'));
      var width = maxWidth * ((parseFloat($('#weightLossSlider').val())-min)) /
      (max-min)*0.99;
      return width + 'px';
    }
    //
    // var checkLossThumbSliderLength = function(){
    //   var maxWidth = parseInt($('input.slide').css('width'));
    //   var width = maxWidth * ((parseFloat($('#weightLossSlider').val())-0.5) /
    //   2.525);
    //   return width + 'px';
    // }


    // Fetches red and green values according to current position of slider thumb
    var getColorRed = function(element){
      var max = parseFloat(element.attr('max')-element.attr('min'));
      var current = parseFloat(element.val()-element.attr('min'));
      return parseInt(155 - (151 * (current/max)));
    };

    var getColorGreen = function(element){
      var max = parseFloat(element.attr('max')-element.attr('min'));
      var current = parseFloat(element.val()-element.attr('min'));
      return parseInt(205 - (50 * (current/max)));
    };

    // var getColor = function(element){
    //   var max = parseFloat(element.attr('max')-element.attr('min'));
    //   var current = parseFloat(element.val()-element.attr('min'));
    //   return parseInt(255 - (160 * (current/max)));
    // };

    // Updates 'fake' slider (width + color) and thumb position when 'real' slider is moved
    $('#ageSlider').on('input change mousemove',function(){
      var $element = $('#ageSlider');
      $('#age-colored-slide').css('background-color', "rgb(" + getColorRed($element) + "," + getColorGreen($element) + ",255)");
      $('#age-colored-slide').css('width',parseInt(checkAgeSliderLength())+4+'px');
      $('#age-slider-thumb').css('left',checkAgeSliderLength());
    });

    $('#weightSlider').on("input mousemove",function(){
      var $element = $('#weightSlider');
      $('#weight-colored-slide').css('background-color', "rgb(" + getColorRed($element) + "," + getColorGreen($element) + ",255)");
      $('#weight-colored-slide').css('width',parseInt(checkWeightSliderLength())+4+'px');
      $('#weight-slider-thumb').css('left',checkWeightSliderLength());
    });


    $('#heightSlider').on("input mousemove",function(){
      var $element = $('#heightSlider');
      $('#height-colored-slide').css('background-color', "rgb(" + getColorRed($element) + "," + getColorGreen($element) + ",255)");
      $('#height-colored-slide').css('width',parseInt(checkHeightSliderLength())+4+'px');
      $('#height-slider-thumb').css('left',checkHeightSliderLength());
    });

    $('#weightLossSlider').on("input mousemove",function(){
      var $element = $('#weightLossSlider');
      $('#loss-colored-slide').css('background-color', "rgb(" + getColorRed($element) + "," + getColorGreen($element) + ",255)");
      $('#loss-colored-slide').css('width',parseInt(checkLossSliderLength())+4+'px');
      $('#loss-slider-thumb').css('left',checkLossSliderLength());
    });

    // Updates slider and position of thumb on page resize
    $(window).resize(function(){
      $('#age-slider-thumb').css('left',checkAgeSliderLength());
      $('#age-colored-slide').css('width',checkAgeSliderLength());

      $('#weight-colored-slide').css('width',checkWeightSliderLength());
      $('#weight-slider-thumb').css('left',checkWeightSliderLength());

      $('#height-colored-slide').css('width',checkHeightSliderLength());
      $('#height-slider-thumb').css('left',checkHeightSliderLength());

      $('#loss-colored-slide').css('width',checkLossSliderLength());
      $('#loss-slider-thumb').css('left',checkLossSliderLength());
    })

    $(window).click(function(){
      $('#calorie-result').html(calculateCalories() - calculateDeficit());
      $('#daily-result').html(calculateCalories());
      $('#calories-input').val(calculateCalories() - calculateDeficit());
    })

    // Updates text fields with slider value
    $('.slide').mouseenter(function(){
      var checkSliderInput = setInterval(function(){
        $('#age-input').val(parseInt($('#ageSlider').val()));
        $('#weight-input').val($('#weightSlider').val());
        $('#weight-loss-input').val($('#weightLossSlider').val());

        if ($('#units-select').val() == 'metric') {
          $('#height-input').val($('#heightSlider').val());
        } else {
          var feet = Math.floor($('#heightSlider').val()/12);
          var inches = $('#heightSlider').val() % 12;
          $('#height-input').val(feet + "'" + inches + '"');
        }


      },20);

      $('.slide').mouseleave(function(){
        clearInterval(checkSliderInput)
      })
    });

    // Updates slider value with text field input
    $('.stats-text-field').mouseenter(function(){
      var checkTextInput = setInterval(function(){
        $('#ageSlider').val($('#age-input').val());
        $('#heightSlider').val($('#height-input').val());
        $('#weightSlider').val($('#weight-input').val());
        $('#weightLossSlider').val($('#weight-loss-input').val());
      },100);

      $('.stats-text-field').mouseleave(function(){
        clearInterval(checkTextInput)
      })
    });

    // Button selection functionality for activity level
    $('#sedentary').click(function(){
      $('.activity').removeClass('option-selected');
      $('#activity-input').val(1.2);
      $(this).addClass('option-selected');
    })

    $('#lightly-active').click(function(){
      $('.activity').removeClass('option-selected');
      $('#activity-input').val(1.4);
      $(this).addClass('option-selected');
    })

    $('#active').click(function(){
      $('.activity').removeClass('option-selected');
      $('#activity-input').val(1.6);
      $(this).addClass('option-selected');
    })

    $('#very-active').click(function(){
      $('.activity').removeClass('option-selected');
      $('#activity-input').val(1.8);
      $(this).addClass('option-selected');
    })

    // Button selection functionality for sex
    $('#male').click(function(){
      $('.sex-box').removeClass('option-selected');
      $('#sex-input').val('male');
      $(this).addClass('option-selected');
    })

    $('#female').click(function(){
      $('.sex-box').removeClass('option-selected');
      $('#sex-input').val('female');
      $(this).addClass('option-selected');
    })


    // Units selection
    $('#metric').click(function(){
      $('#imperial').removeClass('units-selected');
      $('#units-select').val('metric');
      $(this).addClass('units-selected');
      $('#weight-label').html("Weight (kg)");
      $('#weightSlider').attr('min',40);
      $('#weightSlider').attr('max',150);
      $('#weightSlider').val(40);
      $('#height-label').html("Height (cm)");
      $('#heightSlider').attr('min',100);
      $('#heightSlider').attr('max',250);
      $('#heightSlider').val(100);
      $('#loss-label').html("Desired Weight Loss Rate (kg/week)");
      $('#weightLossSlider').attr('min',0.2);
      $('#weightLossSlider').attr('max',1.5);
      $('#weightLossSlider').val(0.2);
    })



    $('#imperial').click(function(){
      $('#metric').removeClass('units-selected');
      $('#units-select').val('imperial');
      $(this).addClass('units-selected');
      $('#weight-label').html("Weight (lb)");
      $('#weightSlider').attr('min',90);
      $('#weightSlider').attr('max',300);
      $('#weightSlider').val(90);
      $('#height-label').html("Height (feet/inches)");
      $('#heightSlider').attr('min',48);
      $('#heightSlider').attr('max',84);
      $('#heightSlider').val(48);
      $('#loss-label').html("Desired Weight Loss Rate (lb/week)");
      $('#weightLossSlider').attr('min',0.5);
      $('#weightLossSlider').attr('max',3);
      $('#weightLossSlider').val(0.5);
    })


    // var checkWeight = setInterval(function(){
    //   if ($('#weightLossSlider').val() > 2) {
    //     confirm("Hello there");
    //     clearInterval(checkWeight);
    //   }
    // }, 300)

    var calculateCalories = function(){
      var $age = parseInt($('#age-input').val());
      var $weight = parseFloat($('#weight-input').val());
      var $height = parseFloat($('#heightSlider').val());
      var $activity = parseFloat($('#activity-input').val());

      if ($('#units-select').val() == 'imperial') {
        $weight /= 2.2;
        $height *= 2.54;
      }

      if ($('#sex-input').val() === 'male') {
        return parseInt((66 + (13.7 * $weight) + (5 * $height) - (6.8 * $age)) * $activity);
      } else if ($('#sex-input').val() === "female"){
        return parseInt((655 + (9.6 * $weight) + (1.8 * $height) - (4.7 * $age)) * $activity);
      }

    }

    var calculateDeficit = function(){
      var $desired = parseFloat($('#weight-loss-input').val());
      if ($('#units-select').val() == 'metric') {
        $desired = $desired * 2.2;
        // height
      }

      return ($desired * 500);
    }

    $('#stats-submit-btn').hover(function(){
      $('#calorie-result').html(calculateCalories() - calculateDeficit());
      $('#daily-result').html(calculateCalories());
    });

    // $('#age-colored-slide').css('width',checkSliderLength());

    $('.box').hover(function(){
      var widthDiff = 0.5 * (parseInt($('.box').css('width'))-parseInt($('#tooltiptext1').css('width')));
      $('.tooltiptext').css('left', widthDiff + "px");
    })



});
