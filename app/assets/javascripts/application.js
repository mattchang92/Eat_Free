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




// control carousel speed
$(document).ready(function(){



  $('#age-input').val("20");
  $('#height-input').val("100");
  $('#weight-input').val("30");
  $('#weight-loss-input').val("0.5");


   $("#myCarousel").carousel({
       interval : 5000,
       pause: false
   });

  var didScroll;

  $(window).scroll(function(event){
      didScroll = true;
  });

  setInterval(function() {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
  }, 250);

  function hasScrolled() {

    // my Code
    if ($(this).scrollTop() > 200) {
      $('.test-header').addClass('nav-down');
    } else {
      $('.test-header').removeClass('nav-down').addClass('nav-up');
    }

    if ($(this).scrollTop() > 500) {
      $('.flip-image1').show();
      $('.flip-image1').addClass('flipper');
      $('.flip-image2').show();
      $('.flip-image2').addClass('flipper');
    } else {
      $('.flip-image1').hide();
      $('.flip-image1').removeClass('flipper');
      $('.flip-image2').hide();
      $('.flip-image2').removeClass('flipper');
    }

    // if ($(this).scrollTop() > 800) {
    //   $('.home-footer').fadeIn();
    //   $('.home-footer').addClass('flipper');
    // } else {
    //   $('.home-footer').fadeOut();
    //   $('.home-footer').remove('flipper');
    // }
  }

    // Autoscrolls the recipe banner
    var recipeScroll = setInterval(function(){
      $('#photo-container').scrollLeft($('#photo-container').scrollLeft()+1);
    },15);

    var checkAgeSliderLength = function(){
      var maxWidth = parseInt($('input.slide').css('width'));
      var width = maxWidth * ((parseFloat($('#ageSlider').val())-20) /
      80.3);
      return width + 2 + 'px';
    }

    var checkAgeThumbSliderLength = function(){
      var maxWidth = parseInt($('input.slide').css('width'));
      var width = maxWidth * ((parseFloat($('#ageSlider').val())-20) /
      80.3);
      return width + 15 + 'px';
    }

    var checkWeightSliderLength = function(){
      var maxWidth = parseInt($('input.slide').css('width'));
      var width = maxWidth * ((parseFloat($('#weightSlider').val())-30) /
      171);
      return width + 2 + 'px';
    }

    var checkWeightThumbSliderLength = function(){
      var maxWidth = parseInt($('input.slide').css('width'));
      var width = maxWidth * ((parseFloat($('#weightSlider').val())-30) /
      171);
      return width + 15 + 'px';
    }

    var checkHeightSliderLength = function(){
      var maxWidth = parseInt($('input.slide').css('width'));
      var width = maxWidth * ((parseFloat($('#heightSlider').val())-100) /
      151);
      return width + 2 + 'px';
    }

    var checkHeightThumbSliderLength = function(){
      var maxWidth = parseInt($('input.slide').css('width'));
      var width = maxWidth * ((parseFloat($('#heightSlider').val())-100) /
      151);
      return width + 15 + 'px';
    }

    var checkLossSliderLength = function(){
      var maxWidth = parseInt($('input.slide').css('width'));
      var width = maxWidth * ((parseFloat($('#weightLossSlider').val())-0.5) /
      2.5);
      return width + 2 + 'px';
    }

    var checkLossThumbSliderLength = function(){
      var maxWidth = parseInt($('input.slide').css('width'));
      var width = maxWidth * ((parseFloat($('#weightLossSlider').val())-0.5) /
      2.5);
      return width + 15 + 'px';
    }


    $('#ageSlider').on('input change mousemove',function(){
      var $element = $('#ageSlider');
      $('#age-colored-slide').css('background-color', "rgb(" + getColor($element)*0.75 + "," + getColor($element)*0.75 + ",255)");
      $('#age-slider-thumb').css('left',checkAgeThumbSliderLength());
      $('#age-colored-slide').css('width',checkAgeSliderLength());
    });

    $('#weightSlider').on("input mousemove",function(){
      var $element = $('#weightSlider');
      $('#weight-colored-slide').css('background-color', "rgb(" + getColor($element)*0.75 + "," + getColor($element)*0.75 + ",255)");
      $('#weight-colored-slide').css('width',checkWeightSliderLength());
      $('#weight-slider-thumb').css('left',checkWeightThumbSliderLength());
    });


    $('#heightSlider').on("input mousemove",function(){
      var $element = $('#heightSlider');
      $('#height-colored-slide').css('background-color', "rgb(" + getColor($element)*0.75 + "," + getColor($element)*0.75 + ",255)");
      $('#height-colored-slide').css('width',checkHeightSliderLength());
      $('#height-slider-thumb').css('left',checkHeightThumbSliderLength());
    });

    $('#weightLossSlider').on("input mousemove",function(){
      var $element = $('#weightLossSlider');
      $('#loss-colored-slide').css('background-color', "rgb(" + getColor($element)*0.75 + "," + getColor($element)*0.75 + ",255)");
      $('#loss-colored-slide').css('width',checkLossSliderLength());
      $('#loss-slider-thumb').css('left',checkLossThumbSliderLength());
    });


    var getColor = function(element){
      var max = parseFloat(element.attr('max')-element.attr('min'));
      var current = parseFloat(element.val()-element.attr('min'));
      return parseInt(255 - (160 * (current/max)));
    };


    // Updates text fields with slider value
    $('.slide').mouseenter(function(){
      var checkSliderInput = setInterval(function(){
        $('#age-input').val(parseInt($('#ageSlider').val()));
        $('#height-input').val($('#heightSlider').val());
        $('#weight-input').val($('#weightSlider').val());
        $('#weight-loss-input').val($('#weightLossSlider').val());


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
      $('#activity-input').val(1.433);
      $(this).addClass('option-selected');
    })

    $('#active').click(function(){
      $('.activity').removeClass('option-selected');
      $('#activity-input').val(1.666);
      $(this).addClass('option-selected');
    })

    $('#very-active').click(function(){
      $('.activity').removeClass('option-selected');
      $('#activity-input').val(1.9);
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


    // var checkWeight = setInterval(function(){
    //   if ($('#weightLossSlider').val() > 2) {
    //     confirm("Hello there");
    //     clearInterval(checkWeight);
    //   }
    // }, 300)

    var calculateCalories = function(){
      var $age = parseInt($('#age-input').val());
      var $weight = parseFloat($('#weight-input').val());
      var $height = parseFloat($('#height-input').val());
      var $activity = parseFloat($('#activity-input').val());

      if ($('#sex-input').val() === 'male') {
        return parseInt((66 + (13.7 * $weight) + (5 * $height) - (6.8 * $age)) * $activity);
      } else if ($('#sex-input').val() === "female"){
        return parseInt((655 + (9.6 * $weight) + (1.8 * $height) - (4.7 * $age)) * $activity);
      }

    }

    var calculateDeficit = function(){
      var $desired = parseFloat($('#weight-loss-input').val());
      return ($desired * 500);
    }

    $('#stats-submit-btn').hover(function(){
      // var a = calculateCalories;
      // var b =  calculateDeficit;
      // var result = a - b;
      $('#calorie-result').html(calculateCalories() - calculateDeficit());

      $('#daily-result').html(calculateCalories());
    });

    // $('#age-colored-slide').css('width',checkSliderLength());

    $('.box').hover(function(){
      var widthDiff = 0.5 * (parseInt($('.box').css('width'))-parseInt($('#tooltiptext1').css('width')));
      $('.tooltiptext').css('left', widthDiff + "px");
    })



});



// Allow droppable elements
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
