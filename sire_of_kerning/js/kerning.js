
function kernMe(value, position) {
  $("#kern_me span:nth-child("+(position+1)+")").css('letter-spacing', value + "px");
}

function addSliders(selector) {
  $(selector + ' span').each(function(i) {
    $('#sliders').append("<p><input type='range' min='-50' max='50' value='0' step='1' onChange='kernMe(this.value,"+i+")'/></p>");
  }); 
}

function resetSliders() {
  $("#kern_me span").css('letter-spacing', "0px");
  $("input[type=slider]").attr('value',0); 
}

$(document).ready(function() {
  $("#kern_me").lettering();
  addSliders('#kern_me');
  $('#reset').click(function(x) {
    resetSliders();
  });
});