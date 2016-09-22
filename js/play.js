$(document).ready(function() {

	var Game = function(numPlayers, tokenX, tokenO) {
		this.numPlayers = numPlayers;
		this.moves = 0;
		this.tokenX = tokenX;
		this.tokenO = tokenO;
		this.inplay = true;
		this.computerMove = "";
		this.currentMove = "X";
		this.winner = "";
		this.winConditions = [[1,2,3], [4,5,6], [7,8,9],
							 [1,4,7], [2,5,8], [3,6,9],
							 [1,5,9], [3,5,7]];

		this.displayCurrentPlayer = function(game, move) {
			
			if (game.inplay) {
				var msg = "";
				if (move == "X") {
					if (this.tokenX == "player1") {
						msg += "Player 1 Is Up";
					} else if (this.tokenX === "player2") {
						msg += "Player 2 is Up";
					}
					else {
						msg += "Computer is Up";
					}
				} 
				if (move == "O") {
					if (this.tokenO == "player1") {
						msg += "Player 1 Is Up";
					} else if (this.tokenO === "player2") {
						msg += "Player 2 is Up";
					}
					else {
						msg += "Computer is Up";
					}	
				}
				$('.currentPlayer').html(msg);	
				if (msg == "Computer is Up" && game.inplay) {
					setTimeout(function() {game.computerMove(game)}, 2000);
				}
			
			}
			

		}
			
		


		this.getCurrentMove = function() {
			return this.currentMove;
		}

		this.playerMove = function(space) {
			//check to space if used

			
			if ($("." + space).html() == "") {
				$("." + space).html(this.currentMove);
			} else {
				return false;
			}
			
			//change token

		}
		this.computerMove = function(game) {
			
			var available_moves = game.getAvailableMoves(game);
			
			var computerMove = available_moves[Math.floor(Math.random() * available_moves.length)];
			var move = $(computerMove).attr('class').split(" ")[0];
			game.playerMove(move);
			checkWinner(game.getCurrentMove);
			game.changePlayer();
			game.displayCurrentPlayer(game, game.getCurrentMove());

		}

		
		this.getAvailableMoves = function(game) {
			
			var tiles = $('.board-space');
			var available = []
            
            for (var i = 0; i < tiles.length; i++) {
            	
            	if (tiles[i].firstChild == null) {
            		available.push(tiles[i]);
            	}
            }
            return available;
		}

		
		

		
		this.changePlayer = function() {
			
			if (this.currentMove == "X") {
				this.currentMove = "O";
			} else {
				this.currentMove = "X";
			}
		}

		this.displayWinner = function(currentMove) {
			
			var msg = ""
			if (currentMove == "X") {
				if (tokenX == "player1") {
					msg += "Player 1 Wins";
				}
				else if (tokenX == "player2") {
					msg += "Player 2 Wins";
				} else {
					msg += "Computer Wins";
				} 
			}
			if (currentMove == "O") {
				if (tokenO == "player2") {
					msg += "Player 2 Wins";
				} else if (tokenO == "player1") {
					msg += "Player 1 Wins";
				} else {
					msg += "Computer Wins";
				}
			}
			$('.winner').text(msg);
			$('.currentPlayer').html("Game Over");
			$('.game-over').fadeIn(300);
		}

		this.displayDraw = function() {
			$('.winner').text("It's A Draw");
			$('.currentPlayer').text("Game Over");
			$('.game-over').fadeIn(300);
		}

		

		


		
	};

	//end game object


	/****************************
	Game Functions
	*****************************/
	function setSelectionText(numPlayers) {
		if(numPlayers == "One Player") {
			$('.x-or-o-header').html("Chose X or O");
		} else {
			$('.x-or-o-header').html("Player 1 Chose X or O");
		}
	};

	function checkWinner(currentMove) {

		

		var tiles = $('.board-space');
			var x = tiles.filter(function(index, value) {
				return $(value).text() == "X";
			});

			var o = tiles.filter(function(index, value) {
				return $(value).text() == "O";
			});
	    
	    //when win is possible check win patterns
	    if (x.length >= 3) {
	    	checkPattern(x, currentMove);
	    }

	    if (o.length >= 3) {
	    	checkPattern(o, currentMove);
	    }

	};

	function checkPattern(selectSpaces, currentMove) {
		//collect values of board spaces 
		//occupied by game token
		var values = [];
		for (i = 0; i < selectSpaces.length; i++) {
			values.push(parseInt(selectSpaces[i].getAttribute('class').split("")[5]));
		}

		//loop throuhg and check win conditions
		for (i = 0; i < game.winConditions.length; i++) {
			var count = 0;
			for (j = 0; j < game.winConditions[i].length; j++) {
				if (values.indexOf(game.winConditions[i][j]) > -1) {
					count ++;
				}
			}

			if (count === 3) {
				game.displayWinner(game.currentMove);
				game.inplay = false;
				return true;
			}
		}
		game.moves += 1;
		console.log(game.moves);
		if (game.moves >= 9) {
				game.inplay = false;
				
				game.displayDraw();
		}
	};

	



	//get one or two player game
	var numPlayers,
		tokenX,
		tokenY,
		game;
	$('.gameType').click(function(event) {
		numPlayers = $(this).html();
		$('.player-choice').fadeOut(800);
		$('.token-choice').fadeIn(800);
		

		//set text for token choice
		setSelectionText(numPlayers);
		
		
	});

	//select Player 1 token
	$('.token-choice button').click(function(event) {
		var selectToken = $(this).html();
		var tokenX,
			tokenO;
		if (numPlayers == "One Player") {
			if (selectToken == "X"){
				tokenX = "player1";
				tokenO = "computer";

			}
			else {
				tokenX = "computer";
				tokenO = "player1";
			}
		}
		else {
			if (selectToken == "X") {
				tokenX = "player1";
				tokenO = "player2";
			}
			else {
				tokenX = "player2";
				tokenO = "player1";
			}
		}
		

		//start new game
	    game = new Game(numPlayers, tokenX, tokenO);
		//set computer move status if one person game
		


		$('.game-overlay').fadeOut(800, function() {
			$('.game-board').fadeIn(1000);
			$('.token-choice').hide();
			$('.player-choice').show();
		});
		game.displayCurrentPlayer(game, game.getCurrentMove());
		//check if computer move next
			
	});

	
	
	
	$('.board-space').click(function(event) {
		if (game.inplay) {
			var boardSpace = $(this).attr('class').split(" ")[0];

			
			game.playerMove(boardSpace, game.getCurrentMove());
			checkWinner(game.getCurrentMove);
			game.changePlayer();
			game.displayCurrentPlayer(game, game.getCurrentMove());
			

			

		}
		

			
			
			
	});

	$('.yes').click(function(event) {
		$('.game-over').fadeOut(400, function() {
			$('.winner').html("");
			$('.board-space').html("");
		});
		game.inplay = true;
		game.currentMove = "X";
		game.moves = 0;
		setTimeout(function() {game.displayCurrentPlayer(game, game.getCurrentMove())}, 700);

	});

	$('.no').click(function(event) {
		$('.game-over').fadeOut(300);
		$('.game-board').fadeOut(800, function() {
			$('.game-overlay').fadeIn(800);
			$('.board-space').html("");
		})
	})

	

	

	
	


	
    
	
})