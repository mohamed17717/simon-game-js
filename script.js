let order = [];
let playerOrder = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.getElementById('counter');
const topLeft = document.querySelector('.top .left');
const topRight = document.querySelector('.top .right');
const bottomLeft = document.querySelector('.bottom .left');
const bottomRight = document.querySelector('.bottom .right');
const strictButton = document.querySelector('.strict');
const onButton = document.querySelector('.power');
const startButton = document.querySelector('.start');

strictButton.addEventListener('change', event => {
	strict = event.target.checked;
});

onButton.addEventListener('change', event => {
	on = event.target.checked;
	turnCounter.innerHTML = on ? '-' : '';
	if (!on) {
		clearColor();
		clearInterval(intervalId);
	}
});

startButton.addEventListener('click', event => {
	on || win ? play() : {};
});

function play() {
	// set variables to default
	win = false;
	order = [];
	playerOrder = [];
	flash = 0;
	intervalId = 0;
	turn = 1;
	turnCounter.innerHTML = 1;
	good = true;

	for (let i = 0; i < 20; i++) {
		order.push(Math.floor(Math.random() * 4) + 1);
	}

	compTurn = true;
	intervalId = setInterval(gameTurn, 800);
}

function gameTurn() {
	on = false;
	if (flash == turn) {
		clearInterval(intervalId);
		compTurn = false;
		clearColor();
		on = true;
	}

	if (compTurn) {
		clearColor();
		setTimeout(()=>{
			if(order[flash] == 1) one();
			else if(order[flash] == 2) two();
			else if(order[flash] == 3) three();
			else if(order[flash] == 4) four();
			flash++;
		}, 200);
	}
}

function one(){
	if(noise){
		let audio = document.getElementById('clip1');
		audio.play();
	}
	noise = true;
	topLeft.style.backgroundColor = 'lightgreen';
}

function two(){
	if(noise){
		let audio = document.getElementById('clip2');
		audio.play();
	}
	noise = true;
	topRight.style.backgroundColor = 'tomato';
}

function three(){
	if(noise){
		let audio = document.getElementById('clip3');
		audio.play();
	}
	noise = true;
	bottomLeft.style.backgroundColor = 'yellow';
}

function four(){
	if(noise){
		let audio = document.getElementById('clip4');
		audio.play();
	}
	noise = true;
	bottomRight.style.backgroundColor = 'lightskyblue';
}

function clearColor(){
	topLeft.style.backgroundColor = 'darkgreen';
	topRight.style.backgroundColor = 'darkred';
	bottomLeft.style.backgroundColor = 'darkgoldenrod';
	bottomRight.style.backgroundColor = 'darkblue';
}

function flashColor(){
	topLeft.style.backgroundColor = 'lightgreen';
	topRight.style.backgroundColor = 'tomato';
	bottomLeft.style.backgroundColor = 'yellow';
	bottomRight.style.backgroundColor = 'lightskyblue';
}

topLeft.addEventListener('click', event=>{
	if(on){
		playerOrder.push(1);
		check();
		one();
		if(!win){
			setTimeout(clearColor, 300)
		}
	}
});

topRight.addEventListener('click', event=>{
	if(on){
		playerOrder.push(2);
		check();
		two();
		if(!win){
			setTimeout(clearColor, 300)
		}
	}
});

bottomLeft.addEventListener('click', event=>{
	if(on){
		playerOrder.push(3);
		check();
		three();
		if(!win){
			setTimeout(clearColor, 300)
		}
	}
});

bottomRight.addEventListener('click', event=>{
	if(on){
		playerOrder.push(4);
		check();
		four();
		if(!win){
			setTimeout(clearColor, 300)
		}
	}
});

function check(){
	if(playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) 
		good = false;
	if( playerOrder.length == 20 && good){
		winGame();
	}

	if (good == false){
		flashColor();
		turnCounter.innerHTML = 'No!';
		setTimeout(()=>{
			turnCounter.innerHTML = turn;
			clearColor();

			if(strict){
				play();
			}else{
				compTurn = true;
				flash = 0;
				playerOrder = [];
				good = true;
				intervalId = setInterval(gameTurn, 800);
			}
		}, 800);

		noise = false;
	}

	if( turn == playerOrder.length && good && !win){
		turn++;
		playerOrder = [];
		compTurn = true;
		flash = 0;
		turnCounter.innerHTML = turn;
		intervalId = setInterval(gameTurn, 800);
	}
} 

function winGame(){
	flashColor();
	turnCounter.innerHTML= "WIN!!";
	on = false;
	win = true;
}