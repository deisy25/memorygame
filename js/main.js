function redirect(){
  window.location="game.html";
}

$('.instruction').click(function(){
  $('.detail_instruction').fadeIn("slow");
});

$('.getstarted').click(function(event){
  event.stopPropagation();
});

$('.stage_done').click(function(event){
  event.stopPropagation();
});

$('.close').click(function() {
  $('.detail_instruction').fadeOut("slow");
});

$('.detail_clear').click(function(){
  document.getElementById('cards').innerHTML = "";
  $(this).fadeOut("slow");
  newGame();
});

$('.detail_fail').click(function(){
  $(this).fadeOut("slow");
  newGame();
});

function main(){
  window.location="index.html";
}

var seconds;
var currenttimer;
var move;
var bonus;

var timeGame=$(".gameTime");
var labelscore=$(".gameScore");

var ImgSource = ["1.jpg", "1.jpg", "2.jpg", "2.jpg", "3.jpg", "3.jpg", "4.jpg", "4.jpg", "5.jpg", "5.jpg", "6.jpg", "6.jpg"];
var valimage=[];
var tempcard=[];
var output;
var tiles_flipped;
var score;

Array.prototype.shuffleImages = function(){
  var i = this.length, j, temp;
  while(--i > 0){
    j = Math.floor(Math.random() * (i+1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
}

//start game and create cards from deck array
function newGame(){
  timeGame.html("45");
  labelscore.html("0");
  seconds=45;
  score=0;
  move=0;
  tiles_flipped=0;

  timer();

  ImgSource.shuffleImages();

  output = "";
  for(var i = 0; i < ImgSource.length; i++){
    output += '<img id="tile_'+i+'" onclick="FlipTile(this,\''+ImgSource[i]+'\')">'
  }

	document.getElementById('cards').innerHTML=output;
}

//timer for game
function timer() {
		scoreTimeout = setTimeout(function() {

      seconds--;
      if (seconds<0){
        clearTimeout(scoreTimeout);
        $('.result').html(labelscore);
        $('.detail_fail').fadeIn("slow");
        return false;
      }
      currenttimer= seconds > 9 ? seconds : "0" + seconds;

        timeGame.html(currenttimer);
			timer();
		}, 1000);

};

//check images is same blur cards otherwise flip back
function FlipTile(tile,val){
  console.log(tempcard)

  if(tile.innerHTML == "" && valimage.length < 2){
  	tile.style.background = 'url(img/' + val + ') no-repeat';

    move++;
    console.log(move);
		if(valimage.length == 0){
		  valimage.push(val);
			tempcard.push(tile.id);
		}else if(valimage.length == 1){
			valimage.push(val);
			tempcard.push(tile.id);
			if(valimage[0] == valimage[1]){
        score+=15;
				tiles_flipped +=2;
				valimage = [];
				tempcard = [];
				if(tiles_flipped == ImgSource.length){
          bonus=seconds*10;
          $('.result').html(labelscore);
          $('.moves').html(move);
          $('.bonus').html(bonus);
          $('.detail_clear').fadeIn("slow");
          clearTimeout(scoreTimeout);
          return false;
				}
			}else{
				function flip2Back(){
          var tile_1 = document.getElementById(tempcard[0]);
          var tile_2 = document.getElementById(tempcard[1]);
          console.log(tile_1,tile_2)

					tile_1.style.background='url(img/back.jpg) no-repeat';
					tile_1.innerHTML = "";
					tile_2.style.background= 'url(img/back.jpg) no-repeat';
					tile_2.innerHTML = "";

					valimage = [];
					tempcard = [];
          clearInterval(delayflip);
				}
				var delayflip = setTimeout(flip2Back, 300);
			}

      labelscore.html(score);
		}
	}
}
