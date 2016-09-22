$(document).ready(function(){
	
	var Game = function() {
		this.gameType = "";
		this.winConditions = [[1,2,3], [4,5,6], [7,8,9],
							 [1,4,7], [2,5,8], [3,6,9],
							 [1,5,9], [3,5,7]];
		this.moveCount = "";
		this.inPlay = inPlay;
		this.player1Token = "";
		this.player2Token = "";
		this.computerToken = "";
        this.currentMove = "X";
		this.player1Moves = "";
		this.player2Moves = ""
		this.computerMoves = ""
		this.winner = "";
    var winConditions = this.winConditions;
    var inPlay = false;
	
    //set for 1 or 2 player game
	this.getGameType = function(numPlayers) {
		
		//if gametype not set yet, set variable, or else disable
		if(this.gameType == "") {
			this.gameType = numPlayers;
			
			if (this.gameType == "One Player") {
				$('.x-or-o-header').html("Chose X or O");
			}
			if (this.gameType == "Two Player") {
				$('.x-or-o-header').html("Player 1 Chose X or O");
			}
		}
		else {
			return 0;
		}
		
	}

	this.gameStatus = function() {
		return this.inPlay;
	}

	this.inplay = function(status) {
		console.log(status);
	}



	
     

	this.setTokens = function(gameType, token) {
		
		if (gameType == "One Player") {
			if (token == "X") {
				this.player1Token = "X";
				this.computerToken = "O";
			}
			else {
				this.player1Token = "O";
				this.computerToken = "X";
			}
		}	
		else {
			if (token == "X") {
				this.player1Token = "X";
				this.player2Token = "O";

			}
			else {
				this.player1Token = "O";
				this.player2Token = "X";
			}
			
		}
		
		this.inPlay = setGameStatus(this.inPlay);
		
	}

	function setGameStatus(status) {
		// console.log(status);

		if (status == false) {
			return true;
		} else {
			return false;
		}
	}

	this.displayCurrentPlayer = function(game, move) {
		
		var msg = "";
	    var currPlayer = Object.keys(game).filter(function(key) {
	    	return game[key] === move
	    })[0];
	    if (currPlayer == "player1Token") {
	    	msg += "Player 1 Is Up";
	    	
	    } else if (currPlayer == "player2Token") {
	    	msg += "Player 2 is Up";
	    } else {
	    	msg += "Computer is Up";
	    }
	    
	    $(".currentPlayer").html(msg);
		
	}
    this.getCurrentMove = function() {
    	
    	return this.currentMove;
    }

    this.changeCurrentMove = function() {
    	var current = this.currentMove;
    	if (current == "X") {
    		this.currentMove = "O";
    	} else {
    		this.currentMove = "X";
    	}
    }

    this.playerMove = function(move) {
    	
    	//check to see if space is occupied before placeing
    	//token
    	if ($("." + move).html() == "") {
    		$("." + move).html(this.currentMove);
    	} else {
    		return false;
    	}


    	checkWinner(this.currentMove);

    	//change which token is up
    	if (this.currentMove == "X") {
    		this.currentMove = "O";
    	} else {
    		this.currentMove = "X";
    	}
    	
    }

   function checkWinner(currentMove) {
   	  
   	  var tiles = $('.board-space');
		// var x = $.each(x, function(index, value) {
		
            
		// });
	 //get all board-space that have x
	   var x = tiles.filter(function(index, value){
		return $(value).text() == "X";
		});
	  // get all board-spaces with O
	  var o = tiles.filter(function(index, value) {
	  	return $(value).text() == "O";
	 	});
	  //when win is possilble check win patterns
      if (x.length >= 3) {
      	checkPattern(x, currentMove);
      }
      if (o.length >= 3) {
      	checkPattern(o, currentMove);
      }
	  
   	 
   	
   	  
   }

   function checkPattern(selectSpaces, currentMove) {
   		//when count reaches 3 we have a winner
   		console.log(inPlay);
        
   		//collect the values of boards spaces
   		//occupied by game piece
   		var values = []
   		for (i = 0; i < selectSpaces.length; i++) {
   			values.push(parseInt(selectSpaces[i].getAttribute('class').split("")[5]));
   		}
   		
   		//loop through winConditions
   		for (i = 0; i < winConditions.length; i++){
   			// console.log(winConditions[i]);
   			var count = 0;
   			for (j = 0; j < winConditions[i].length; j++) {
   				
   				
   				if (values.indexOf(winConditions[i][j]) > -1) {
   					count++;
   				}
   				
   			}
   			if (count === 3) {
   				
   				displayWinner(currentMove);
   				this.inPlay = false;

   			}
   			
   		}

   	function displayWinner(winner) {
   		
   		var currPlayer = Object.keys(game).filter(function(key) {
	    	return game[key] === winner
	    })[0];
	    
	    if (currPlayer == "computerToken") {
	    	console.log("Computer Wins");
	    	$(".winner").text("Computer Wins");
	    }
	    else if(currPlayer == "player1Token") {
	    	$(".winner").text("Player 1 Wins");
	    }
	    else {
	    	$(".winner").text("Player 2 Wins");
	    }

	    $(".currentPlayer").text("Game Over");

	    
	    


   	}	
   		
   		
   		
   		
   		
   }


						 
	}

	var game = new Game();
	
    
	$(".gameType").click(function(event) {
		game.getGameType($(this).html());
		
		$('.player-choice').fadeOut(800);
		$('.token-choice').fadeIn(800);
		
		
	});
    
	//select which token player 1 wants
	$('.token-choice button').click(function(event) {
		
		game.setTokens(game.gameType, $(this).html());
		$('.game-overlay').fadeOut(800, function() {
			$('.game-board').fadeIn(1000);
		});
		game.inplay(game.gameStatus());

		game.displayCurrentPlayer(game, game.getCurrentMove());
	});
    
    if(game.gameStatus) {
    	$('.board-space').click(function(event) {
		//get location of clicked board
			
			var boardSpace = $(this).attr('class').split(" ")[0];
			game.playerMove(boardSpace);
			game.displayCurrentPlayer(game, game.getCurrentMove());
		});
    }
	
	
	
	

	
});