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
      if ($(this).scrollTop() > $(this).height() * 0.025 ){
        $('.daily-progress').css('top',$(window).height() - $('.daily-progress').height());
      } else {
        $('.daily-progress').css('top',$(window).height());
      }
    })

  }, 250);



})
