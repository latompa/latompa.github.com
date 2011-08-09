var NineNinja =  {

  getNines: function(value) {
    var nines = "";
    for(var i=0;i<value;i++) {
      nines = nines + "9";
    }
    return nines;
  },
  
  calculateDownTime: function(nines) {
    var sec = parseInt(parseFloat(31536000) * (1-parseFloat("0.99" + nines)));
    if(sec < 1) {
      return " < 1 second";
    }
    else if(sec < 100) {
      return parseInt(sec) + " seconds";
    }
    else if(sec < 10000) {
      return parseInt(sec/60) + " minutes";
    } else {
      return parseInt(sec/3690) + " hours";
    }
  },
  
  updateDownTime: function(slider) {
    var val = $(slider).val();
    var nines = NineNinja.getNines(val);
    var downTime = NineNinja.calculateDownTime(nines);
    $('#decimals').html(nines);
    $('#downtime').html(downTime);
    NineNinja.resizeText('#percentage');
    //NineNinja.resizeText('#howlong');
  },

  resizeText: function(targetSelector) {
     var targetWidth=$('#callout').textWidth();
     var target = $(targetSelector)
     var currentWidth = target.textWidth();
     var currentSize = parseInt(target.css('font-size'));
     var direction = (targetWidth >= currentWidth) ? +1 : -1;
     while(true) {
       currentSize = currentSize + direction;
       target.css('font-size', currentSize + "px");
       newWidth = target.textWidth();
       if(Math.abs(newWidth - targetWidth) < 20) {
         break;
       }
     }

   },
};

$.fn.textWidth = function(){
  var html_org = $(this).html();
  var html_calc = '<span>' + html_org + '</span>'
  $(this).html(html_calc);
  var width = $(this).find('span:first').width();
  $(this).html(html_org);
  return width;
};

$(function() {
  
  $('#slider').change(function() {
    NineNinja.updateDownTime('#slider');
  });
  
  NineNinja.updateDownTime('#slider')
  
});