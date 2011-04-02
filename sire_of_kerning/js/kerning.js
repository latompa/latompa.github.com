fonts = [ "Allerta", "Luckiest Guy", "Oswald", "Candal", "Radley", "Droid Serif", "Chewy" ];

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
  $("input[type=range]").attr('value',0); 
}

function selectFont(fontName) {
  $("#kern_me").css('font-family', fontName);
}

function addFontLinks() {
  $(fonts).each(function(i) {
    $('head').append('<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family='+fonts[i]+'">');  
  });
}

function addFontSelector() {
  $(fonts).each(function(i) {
    $('#font_selector').append(new Option(fonts[i], fonts[i], false, false))
  });
}

$(document).ready(function() {
  addFontLinks();
  addFontSelector();
  
  $("#kern_me").lettering();
  addSliders('#kern_me');
  
  $('#reset').click(function() {
    resetSliders();
  });
  $('#font_selector').change(function(x) {
    selectFont(this.value);
    resetSliders();
  });
  selectFont($('#font_selector option:selected').val());
});