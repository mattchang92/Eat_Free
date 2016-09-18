$(document).ready(function(){

  $('.daily-progress').css('width',$(this).width() + "px");

  var updateProgress = setInterval(function(){
    var calorie_bar = parseInt($('#calorie-bar').css('width'));
    var fats_bar = parseInt($('#fats-bar').css('width'));
    var carbs_bar = parseInt($('#carbs-bar').css('width'));
    var proteins_bar = parseInt($('#proteins-bar').css('width'));
    var max_width = parseInt($('div.progress').css('width'));
    var calorie_limit = parseInt($('#calorie-limit').html());
    $('#calorie-bar').html(Math.round(100 * calorie_bar / max_width) + '%');

  },100)


})
