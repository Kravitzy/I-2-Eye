let song;

const backgroundCount = 4;
const bodyCount = 5;
const headCount = 5;
const armCount = 5;
const legCount = 5;
const totalCharachters = 5;

let currentBg = 0;
let currentBody = 0;
let currentHead = 0;
let currentArm = 0;
let currentLeg = 0;

let bgImages = [];
let bodys = [];
let heads = [];
let legs = [];
let arms = [];
let buttons = [];

let midX, midY, bootstrapX, bootstrapY;

function preload() {
	song = loadSound('./assets/sound/bensound-funnysong.mp3');

	// load backgrounds
	for (let i = 0; i < backgroundCount; i++) {
		bgImages[i] = loadImage('./assets/images/bg' + i + '.png');
	}

	// load charachters
	for (let i = 0; i < totalCharachters; i++) {
		bodys[i] = loadImage('./assets/images/body' + i + '.png');
		heads[i] = loadImage('./assets/images/head' + i + '.png');
		legs[i] = loadImage('./assets/images/leg' + i + '.png');
		arms[i] = loadImage('./assets/images/arm' + i + '.png');
	}

	// load buttons
	for (let i = 0; i < 5; i++) {
		buttons[i] = loadImage('./assets/images/btn' + i + '.png');
	}
}


function setup() {
	createCanvas(windowWidth, windowHeight);
	
	initValues();

	// setupSounds();

	setupButtons();

	setupSprites();

	var foo = new p5.Speech(); // speech synthesis object
	foo.speak('hi there'); // say something
}


function initValues() {
	midX = windowWidth / 2;
	midY = windowHeight / 2;
	bootstrapX = windowWidth / 12;
	bootstrapY = windowHeight / 12;
}

function setupSounds() {
	song.loop(); // song is ready to play during setup() because it was loaded during preload
	song.play();
}

function setupSprites() {

	setupBackground();

	setupHead();

	setupBody();

	setupArms();

	legSetup();
}

function setupBackground() {
	background = createSprite(midX, midY);
	for (let i = 0; i < backgroundCount; i++) {
		background.addImage('bg' + i, bgImages[i]);
		background.depth = -100;
	}
}

function setupHead() {
	head = createSprite(midX, midY - 65);
	for (let i = 0; i < headCount; i++) {
		head.addImage('head' + i, heads[i]);
		head.depth =  100;
	}
}


function setupBody() {
	body = createSprite(midX, midY);
	for (let i = 0; i < bodyCount; i++) {
		body.addImage('body' + i, bodys[i]);
		body.depth =  50;
	}
}


function setupArms() {
	armRight = createSprite(midX + 40, midY + 10);
	for (let i = 0; i < armCount; i++) {
		armRight.addImage('armRight' + i, arms[i]);
		armRight.depth =  20;
	}
	armLeft = createSprite(midX - 40, midY + 10);
	for (let i = 0; i < armCount; i++) {
		armLeft.addImage('armLeft' + i, arms[i]);
		armLeft.mirrorX(-1);
		armLeft.depth =  20;
	}
}

function legSetup() {
	legRight = createSprite(midX + 20, midY + 60);
	for (let i = 0; i < legCount; i++) {
		legRight.addImage('legRight' + i, legs[i]);
		legRight.depth =  20;
	}
	legLeft = createSprite(midX - 20, midY + 60);
	for (let i = 0; i < legCount; i++) {
		legLeft.addImage('legLeft' + i, legs[i]);
		legLeft.mirrorX(-1);
		legLeft.depth =  20;
	}
}


function setupButtons() {

	buttonBackground = createSprite(bootstrapX * 1, bootstrapY * 1);
	buttonBackground.addImage('btn0', buttons[0]);
	buttonBackground.onMouseReleased = function() {
		currentBg = (currentBg+1) % backgroundCount;
		background.changeImage('bg' + currentBg);
	};

	buttonHead = createSprite(bootstrapX * 1, bootstrapY * 3);
	buttonHead.addImage('btn1', buttons[1]);
	buttonHead.onMouseReleased = function() {
		currentHead = (currentHead+1) % headCount;
		head.changeImage('head' + currentHead);
	};

	buttonBody = createSprite(bootstrapX * 1, bootstrapY * 5);
	buttonBody.addImage('btn2', buttons[4]);
	buttonBody.onMouseReleased = function() {
		currentBody = (currentBody+1) % bodyCount;
		body.changeImage('body' + currentBody);
	};

	buttonArms = createSprite(bootstrapX * 1, bootstrapY * 7);
	buttonArms.addImage('btn3', buttons[2]);
	buttonArms.onMouseReleased = function() {
		currentArm = (currentArm+1) % armCount;
		armRight.changeImage('armRight' + currentArm);
		armLeft.changeImage('armLeft' + currentArm);
	};

	buttonLegs = createSprite(bootstrapX * 1, bootstrapY * 9);
	buttonLegs.addImage('btn4', buttons[3]);
	buttonLegs.onMouseReleased = function() {
		currentLeg = (currentLeg+1) % legCount;
		legRight.changeImage('legRight' + currentLeg);
		legLeft.changeImage('legLeft' + currentLeg);
	};


	
}

function draw() {
	drawSprites();
}