$(document).ready(function(){

  clearInterval(recipeScroll);

  $('.daily-progress').css('top',$(window).height());
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

  $(document).delegate("#modal-submit-btn", 'click',function(e){
    $('#foodLogModal').modal('hide');
  })

  setInterval(function() {

    $(window).scroll(function(){
      if ($(this).scrollTop() > 50 ){
        $('.daily-progress').css('top',$(window).height() - $('.daily-progress').height());
      } else {
        $('.daily-progress').css('top',$(window).height());
      }
    })

    // if (parseInt($('#photo-container').scrollLeft()) > 2800) {
    //   $('#photo-container').scrollLeft("0px");
    // }


  }, 250);

  $('.box').hover(function(){
    var widthDiff = 0.5 * (parseInt($('.box').css('width'))-parseInt($('#tooltiptext1').css('width')));
    $('.tooltiptext').css('left', widthDiff + "px");
  })

})
