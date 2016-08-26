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

// (function() {
//     var $win = $(window);
//
//     function checkScroll() {
//         if ($win.scrollTop() > 500) {
//             $win.off('scroll', checkScroll);
//             $('#bottomMenu').fadeIn(3000);
//         }
//     }
//
//     $win.scroll(checkScroll);
// })();


// make navbar appear/disappear, not yet working

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
    $('.flip-image1').fadeIn();
    $('.flip-image1').addClass('flipper');
    $('.flip-image2').fadeIn();
    $('.flip-image2').addClass('flipper');
  } else {
    $('.flip-image1').fadeOut();
    $('.flip-image1').remove('flipper');
    $('.flip-image2').fadeOut();
    $('.flip-image2').remove('flipper');
  }

  if ($(this).scrollTop() > 800) {
    $('.home-footer').fadeIn();
    $('.home-footer').addClass('flipper');
  } else {
    $('.home-footer').fadeOut();
    $('.home-footer').remove('flipper');
  }

}

// control carousel speed
$(document).ready(function(){

   $("#myCarousel").carousel({
       interval : 5000,
       pause: false
   });

   $('.flip-image1').hide();
   $('.flip-image2').hide();
   $('.home-footer').hide();

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
