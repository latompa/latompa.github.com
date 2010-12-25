
var board = {};
var emptyX = 3;
var emptyY = 3;
var numRows = 4;
var numCols = 4;
var width = 100;
var height = 100;
var border = 2;

function tileClick(event) {
  // is tile near the empty slot?
  clickedTileId = event.target.id;
  if(Math.abs(board[clickedTileId].x - emptyX) <= 1 &&
     Math.abs(board[clickedTileId].y - emptyY) <= 1 ) {

    moveX = emptyX*width; moveY = emptyY*height;
    newX = emptyX; newY = emptyY;

    emptyX = board[clickedTileId].x; emptyY = board[clickedTileId].y; 
    board[clickedTileId].x = newX; board[clickedTileId].y = newY;       

    $(event.target).animate({"left": moveX+"px"}, "fast");
    $(event.target).animate({"top":  moveY+"px"}, "fast");
  }
}

function createBoard() {
  for(var i=0; i<numRows; i++) {
    for(var j=0; j<numCols; j++) {
      var tileId = "tile_" + j + "_" + i;
      // no tile in last slot
      if(i == numCols-1 && j == numRows-1) {continue;}
      
      var css ={'left':j*width, 'top':i*height, 
        'background-position':'-'+j*width+'px -'+i*height + 'px',
        'width' : (width-border*2) +'px',
        'height' : (height-border*2) + 'px'};
      var div = $('<div class="tile" id="'+tileId+'"></div>').css(css);
      board[tileId]={x: j, y : i};
      $('#board').append(div);
    }
  }
  $('.tile').click(tileClick);
}

$(document).ready(function(){createBoard()});



















