function swap(newDrop, oldDrop) {
  var newType = $(newDrop).attr('type')
  var newNumber = $(newDrop).attr('number')
  var oldType =   $(oldDrop).attr('type');
  var oldNumber = $(oldDrop).attr('number');

  $(newDrop).attr("type",oldType).attr("number",oldNumber);
  $(oldDrop).attr("type",newType).attr("number",newNumber);
  console.log(`swapping ${newType}:${newNumber} and ${oldType}:${oldNumber}`)

  var fruitA = $(`.fruits li[data-type="${newType}"][data-number="${newNumber}"]`)
  var fruitB = $(`.fruits li[data-type="${oldType}"][data-number="${oldNumber}"]`)
  fruitA.position({of: $(oldDrop), my: 'left top', at: 'left top'})
  fruitB.position({of: $(newDrop), my: 'left top', at: 'left top'})
  var a=2;
}

function removeFromMeetups(type, number) {
  var selector = `.meetups li[type="${type}"][number="${number}"]`;
  console.log(selector );
  $(selector).attr('type', null).attr('number', null);
}

function handleDrop(event, ui) {
  var draggable = ui.draggable;
  var droppable = $(this);
  var newNumber = $(draggable).data('number')
  var newType = $(draggable).data('type')
  var oldNumber = $(this).attr('number');
  var oldType =   $(this).attr('type');

  //ui.draggable.draggable( 'option', 'revert', false );
  ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );

  if(oldNumber == null) {
    removeFromMeetups(newType,newNumber);
    console.log("fresh drop " + droppable);
    droppable.attr("type",newType).attr("number",newNumber);

  } else {
    var swapTo = $(`.meetups li[type="${newType}"][number="${newNumber}"]`)
    swap(droppable, swapTo)
    console.log(`old swap ${oldType} ${oldNumber}`);
  }
  checkRules();
  return true;
  //ui.draggable.draggable( 'option', 'revert', true );

  //console.log( 'dropped '  + t + ' ' + n +' on ' + mnr);
}

function handleDropStage(event, ui) {
  var draggable = ui.draggable;
  var n = $(draggable).data('number')
  var t = $(draggable).data('type')
  console.log( 'stage '  + t + ' ' + n);
  removeFromMeetups(t,n);
  checkRules();
}

$(function() {
  meetups = {1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null, 9: null}
  $('.fruits li').draggable({
    cursor: 'move',
    revert: 'invalid'
  });
  $('.meetups li').droppable({
    drop: handleDrop,
  });

  $('.stage').droppable({
    drop: handleDropStage,
  });
  checkRules();
});

function checkRules() {
  var rules =
  [["rule1", allMeetups],
   ["rule2", notSameMeetup],
   ["rule3", notConsecutive]];
  $.each(rules, function(x,i) {
    var rule = i[0];
    var ruleFunc = i[1];
    if(ruleFunc() == true) {
      $(`.rules .${rule} span.pass`).show();
      $(`.rules .${rule} span.fail`).hide();
      $(`p.${rule}`).removeClass('rule-fail')
    } else {
      $(`.rules .${rule} span.pass`).hide();
      $(`.rules .${rule} span.fail`).show();
      $(`p.${rule}`).addClass('rule-fail')
    }
  })
}

function allMeetups() {
  return $('.meetups li').filter(function() {return(!$(this).attr('number')) }).length == 0
}

function getFruitAt(m) {
  if(m.attr('type') != null) {
    return {type: m.attr('type'), number: m.attr('number') }
  } else {
    return null;
  }
}

function notSameMeetup() {
  var m = $('.meetups li');
  for(var i=0 ; i < m.length; i+=2) {
    var x = getFruitAt($(m[i]))
    var y = getFruitAt($(m[i+1]))
    if(x && y) {
      if(x.type == y.type) {
        return false;
      }
    }
  }
  return true;
}

function notConsecutive() {
  var ms = []
  var m = $('.meetups li');
  for(var i=0 ; i < m.length; i++) {
    var x = getFruitAt($(m[i]))
    if(x) {
      ms.push(x.type);
    } else {
      ms.push("_");
    }
  }
  if(ms.join("").match("([A-Z]+).{0,2}\\1")) {
    return false;
  } else {
    return true;
  }

}
