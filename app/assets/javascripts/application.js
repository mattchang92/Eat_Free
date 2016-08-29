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

  $('#age-input').val($('#ageSlider').val());
  $('#height-input').val($('#heightSlider').val());
  $('#weight-input').val($('#weightSlider').val());
  $('#weight-loss-input').val($('#weightLossSlider').val());

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


    // Updates text fields with slider value
    $('.slide').mouseenter(function(){
      var checkSliderInput = setInterval(function(){
        $('#age-input').val($('#ageSlider').val());
        $('#height-input').val($('#heightSlider').val());
        $('#weight-input').val($('#weightSlider').val());
        $('#weight-loss-input').val($('#weightLossSlider').val());
      },50);

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
      $('#activity-level-input').val(1.2);
      $(this).addClass('option-selected');
    })

    $('#lightly-active').click(function(){
      $('.activity').removeClass('option-selected');
      $('#activity-level-input').val(1.433);
      $(this).addClass('option-selected');
    })

    $('#active').click(function(){
      $('.activity').removeClass('option-selected');
      $('#activity-level-input').val(1.666);
      $(this).addClass('option-selected');
    })

    $('#very-active').click(function(){
      $('.activity').removeClass('option-selected');
      $('#activity-level-input').val(1.9);
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
