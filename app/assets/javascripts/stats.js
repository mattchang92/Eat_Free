$(document).ready(function(){

  $('#age-input').val("20");
  $('#height-input').val("100");
  $('#weight-input').val("30");
  $('#weight-loss-input').val("0.5");
  $('.stats-text-field').css('margin-left',$('.colored-slide').css('margin-left'));

  var checkAgeSliderLength = function(){
    var maxWidth = parseInt($('input.slide').css('width'));
    var min = parseFloat($('#ageSlider').attr('min'));
    var max = parseFloat($('#ageSlider').attr('max'));
    var width = maxWidth * ((parseFloat($('#ageSlider').val())-min)) /
    (max-min)*0.99;
    return width + 'px';
  }


  var checkWeightSliderLength = function(){
    var maxWidth = parseInt($('input.slide').css('width'));
    var min = parseFloat($('#weightSlider').attr('min'));
    var max = parseFloat($('#weightSlider').attr('max'));
    var width = maxWidth * ((parseFloat($('#weightSlider').val())-min)) /
    (max-min)*0.99;
    return width + 'px';
  }


  var checkHeightSliderLength = function(){
    var maxWidth = parseInt($('input.slide').css('width'));
    var min = parseFloat($('#heightSlider').attr('min'));
    var max = parseFloat($('#heightSlider').attr('max'));
    var width = maxWidth * ((parseFloat($('#heightSlider').val())-min)) /
    (max-min)*0.99;
    return width + 'px';
  }



  var checkLossSliderLength = function(){
    var maxWidth = parseInt($('input.slide').css('width'));
    var min = parseFloat($('#weightLossSlider').attr('min'));
    var max = parseFloat($('#weightLossSlider').attr('max'));
    var width = maxWidth * ((parseFloat($('#weightLossSlider').val())-min)) /
    (max-min)*0.99;
    return width + 'px';
  }

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


  // Updates 'fake' slider (width + color) and thumb position when 'real' slider is moved
  var updateAgeSlider = function(){
    var $element = $('#ageSlider');
    $('#age-colored-slide').css('background-color', "rgb(" + getColorRed($element) + "," + getColorGreen($element) + ",255)");
    $('#age-colored-slide').css('width',parseInt(checkAgeSliderLength())+4+'px');
    $('#age-slider-thumb').css('left',checkAgeSliderLength());
  };

  var updateWeightSlider = function(){
    var $element = $('#weightSlider');
    $('#weight-colored-slide').css('background-color', "rgb(" + getColorRed($element) + "," + getColorGreen($element) + ",255)");
    $('#weight-colored-slide').css('width',parseInt(checkWeightSliderLength())+4+'px');
    $('#weight-slider-thumb').css('left',checkWeightSliderLength());
  };

  var updateHeightSlider = function(){
    var $element = $('#heightSlider');
    $('#height-colored-slide').css('background-color', "rgb(" + getColorRed($element) + "," + getColorGreen($element) + ",255)");
    $('#height-colored-slide').css('width',parseInt(checkHeightSliderLength())+4+'px');
    $('#height-slider-thumb').css('left',checkHeightSliderLength());
  }

  var updateLossSlider = function(){
    var $element = $('#weightLossSlider');
    $('#loss-colored-slide').css('background-color', "rgb(" + getColorRed($element) + "," + getColorGreen($element) + ",255)");
    $('#loss-colored-slide').css('width',parseInt(checkLossSliderLength())+4+'px');
    $('#loss-slider-thumb').css('left',checkLossSliderLength());
  }


  $('#ageSlider').on('input change mousemove',function(){
    updateAgeSlider();
  });
  $('#weightSlider').on("input mousemove",function(){
    updateWeightSlider();
  });
  $('#heightSlider').on("input mousemove",function(){
    updateHeightSlider();
  });
  $('#weightLossSlider').on("input mousemove",function(){
    updateLossSlider();
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
  $('#units-selection-box').click(function(){

    $('#units-btn').toggleClass('units-btn-moved');

    if ($('#units-select').val() == 'metric') {
      $('#units-select').val('imperial');
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
    } else {
      $('#units-select').val('metric');
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
    }
    $('#age-input').val(parseInt($('#ageSlider').val()));
    $('#weight-input').val($('#weightSlider').val());
    $('#height-input').val($('#heightSlider').val());
    $('#weight-loss-input').val($('#weightLossSlider').val());
    updateHeightSlider();
    updateWeightSlider();
    updateLossSlider();

    if ($('#units-select').val() == 'imperial') {
      var feet = Math.floor($('#heightSlider').val()/12);
      var inches = $('#heightSlider').val() % 12;
      $('#height-input').val(feet + "'" + inches + '"');
    }

  })


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

})
