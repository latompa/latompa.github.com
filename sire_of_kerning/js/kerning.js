fonts = [ "Allerta", "Luckiest Guy", "Oswald", "Candal", "Radley", "Droid Serif", "Chewy" ];
clickedX = 0;
clickedY = 0;
mouseDown = false;
selectedLetterIndex=0;

function kernMe(value, position) {
  $("#kern_me span:nth-child("+(position)+")").css('letter-spacing', value + "px");
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
    $('head').append('<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family='+fonts[i]+'"></link>');  
  });
}

function addFontSelector() {
  $(fonts).each(function(i) {
    $('#font_selector').append(new Option(fonts[i], fonts[i], false, false))
  });
}

function enableHover() {
  $('#kern_me span').hover(
    function() {
      $(this).addClass('hovered');
      $(this).css('cursor','move');
    },
    function(e) {
      $(this).removeClass('hovered');
    });
}

function disableHover() {
  $('#kern_me span').unbind("mouseenter mouseleave");
}

function disableClickAndDrag() {
  $('#kern_me').unbind("mousedown mouseup mousemove");
}

function enableClickAndDrag() {
  $('#kern_me').mousedown(function (e){
    mouseDown = true;
    clickedX = e.pageX;
    selectedLetterIndex = $('span').index($(e.target));
  });
  $('#kern_me').mouseup(function (){
    mouseDown = false;
  });
  $('#kern_me').mousemove(function (e){
    if(mouseDown == true) {
      letterSpacing = e.pageX - clickedX;
      kernMe(letterSpacing, selectedLetterIndex-1);
    }
  });
}

function disableEdit() {
  $('#kern_me').attr('contenteditable','false');
}
function enableEdit() {
  $('#kern_me').attr('contenteditable','true');
}

$(document).ready(function() {
  addFontLinks();
  addFontSelector();
  
  $("#kern_me").lettering();
  //addSliders('#kern_me');
  
  $('#edit').click(function() {
    disableHover();
    disableClickAndDrag();
    enableEdit();
    $('body').enableSelection();
  });
  $('#kern').click(function() {
    $("#kern_me").lettering();
    enableHover();
    enableClickAndDrag();
    disableEdit();
    $('body').disableSelection();
  });
  $('#font_selector').change(function(x) {
    selectFont(this.value);
    resetSliders();
  });
  selectFont($('#font_selector option:selected').val());
  
  enableHover();
  enableClickAndDrag();
  $('body').disableSelection();
  
});