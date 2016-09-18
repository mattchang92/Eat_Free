// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require_tree .




// control  speed
$(document).ready(function(){
  console.log("hi");

  $('#myCarousel').height($(window).height());


   $("#myCarousel").carousel({
       interval : 5000,
       pause: false
   });



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

    $('.box').hover(function(){
      var widthDiff = 0.5 * (parseInt($('.box').css('width'))-parseInt($('#tooltiptext1').css('width')));
      $('.tooltiptext').css('left', widthDiff + "px");
    })

});
