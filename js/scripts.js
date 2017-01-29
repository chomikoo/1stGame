// scripts.js
// Kamien, papier, nozyce


var newGameBtn = document.getElementById('js-newGameButton'), //New game button
    //Buttony wybory
	pickRock = document.getElementById('js-playerPick_rock'), //kamien
	pickPaper = document.getElementById('js-playerPick_paper'), //papier
	pickScissors = document.getElementById('js-playerPick_scissors'), //nozyce
    
//	newGameBtn = document.getElementById('js-newGameButton'),
    
	newGameElem = document.getElementById('js-newGameElement'), //div z przyciskiem noewj gry
	pickElem = document.getElementById('js-playerPickElement'), // wybór gracza 
	resultsElem = document.getElementById('js-resultsTableElement'), //tabela wynikow
//rozp. gry
	playerPointsElem = document.getElementById('js-playerPoints'),// pkt gracza
	playerNameElem = document.getElementById('js-playerName'), //nazwa gracza
	computerPointsElem = document.getElementById('js-computerPoints'),// pkt komputera
	playerPickElem = document.getElementById('js-playerPick'), //wybor gracza 
	computerPickElem = document.getElementById('js-computerPick'),//wybor komputera
	playerResultElem = document.getElementById('js-playerResult'),//wynik gracza
	computerResultElem = document.getElementById('js-computerResult'),//wynik komputera

//Wartosci poczatkowe
    gameState = 'notStarted', // stan gry - started,/ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };


//Listener'y
pickRock.addEventListener('click', function () {playerPick('Rock')});
pickPaper.addEventListener('click', function() {playerPick('Paper')});
pickScissors.addEventListener('click', function() {playerPick('Scissors')});
newGameBtn.addEventListener('click', newGame);

//funkcja badajaca czy gra zostala rozpoczeta
function setGameElements() {
	switch(gameState) {
		case 'started':
			newGameElem.style.display = 'none';
			pickElem.style.display = 'block';
			resultsElem.style.display = 'block';
			playerPointsElem.display = 'block';

		break;
		case 'ended':
			newGameBtn.innerText = 'Again?';
		case 'notStarted':
		default:
			newGameElem.style.display = 'block';
			pickElem.style.dispaly = 'none';
			resultsElem.style.display = 'none'; 
	}
}

setGameElements();

function newGame() {
    player.name = prompt('Set your nickname ', 'Nickname'); //pobieramy imie gracza
    if (player.name) {
        player.score = computer.score = 0;
        gameState = 'started';
        setGameElements();
        
        playerNameElem.innerHTML = player.name; //zais imienia gracza w tablicy wynikow
        
        setGamePoints();
    }
}


// losowanie wyboru komputera

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
    
    checkRoundWinner(playerPick, computerPick);
}
function getComputerPick() {
    var possiblePicks = ['Rock', 'Paper', 'Scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];

}
function checkRoundWinner(playerPick, computerPick) {
    playerResultElem.innerHTML = computerResultElem.innerHTML = '';
    
    var winnerIs = 'player';
    
        if (playerPick == computerPick) {
            winnerIs == 'noone'; // Remis
        }
        else if (
            (computerPick == 'Rock' && playerPick == 'Scissors') ||
            (computerPick == 'Scissors' && playerPick == 'Paper') ||
            (computerPick == 'Paper' && playerPick == 'Rock')) {
            
            winnerIs = 'computer';
        }
        
        if (winnerIs == 'player') {
            playerResultElem.innerHTML = 'Win!';
            player.score++;
            playerPointsElem.innerHTML = player.score; //dodwaanie do licznika
        }
        else if (winnerIs == 'computer') {
            computerResultElem.innerHTML = "Win!";
            computer.score++;
            computerPointsElem.innerHTML = computer.score;
        }
    
        if (player.score == '10') {
            alert(player.name + ' win!!' +  " 10 points !!! Congrats:D");
            gameState = 'ended';
            setGameElements();
        }
        else if (computer.score == '10') {
            alert('Unfortunately you lose. Try again! ');
            gameState == 'ended';
            setGameElements();
            
        }
}
function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPickElem.innerHTML = computer.score;
}