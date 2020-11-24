let song;

const backgroundCount = 4;
const bodyCount = 5;
const headCount = 5;
const armCount = 5;
const legCount = 5;
const poseCount = 5;
const totalCharachters = 5;
const scale = 1.5;

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
let poses = [];
let buttons = [];

let midX, midY, bootstrapX, bootstrapY;
let selectedPose;

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
		poses[i] = loadImage('./assets/images/pose' + i + '.png');
	}

	// load buttons
	for (let i = 0; i < 5; i++) {
		buttons[i] = loadImage('./assets/images/btn' + i + '.png');
	}
}


function setup() {
	const debugMode = true;
	createCanvas(windowWidth, windowHeight);

	initValues();

	setupSounds();

	setupButtons();

	setupSprites();

}


function initValues() {
	midX = windowWidth / 2;
	midY = windowHeight / 2;
	bootstrapX = windowWidth / 12;
	bootstrapY = windowHeight / 12;

	selectedPose = int(random(0, poseCount));
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

	poseSetup();

}

function resetGame() {
	// change pose
	rnd = int(random(0, poseCount));
	selectedPose = rnd
	pose.changeImage('pose' + selectedPose);
	// change head
	rnd = int(random(0, headCount));
	currentHead = rnd;
	head.changeImage('head' + rnd);
	// change body
	rnd = int(random(0, bodyCount));
	currentBody = rnd;
	body.changeImage('body' + rnd);
	// change arms
	rnd = int(random(0, armCount));
	currentArm = currentBody;
	armRight.changeImage('armRight' + currentBody);
	armLeft.changeImage('armLeft' + currentBody);
	// change legs
	rnd = int(random(0, legCount));
	currentLeg = rnd;
	legRight.changeImage('legRight' + rnd);
	legLeft.changeImage('legLeft' + rnd);


}

function debugDisplay(params) {
	let spaceing = 0;
	let spaceBy = 15
	text("--Debug Mode--", 0, spaceing, 100, 100)
	spaceing += spaceBy
	text("selectedPose: " + selectedPose, 0, spaceing, 100, 100)
	spaceing += spaceBy
	text("currentHead: " + currentHead, 0, spaceing, 100, 100)
	spaceing += spaceBy
	text("currentBody: " + currentBody, 0, spaceing, 100, 100)
	spaceing += spaceBy
	text("currentArm: " + currentArm, 0, spaceing, 100, 100)
	spaceing += spaceBy
	text("currentLeg: " + currentLeg, 0, spaceing, 100, 100)

}

function checkPlayerMatchesPose() {
	if (currentBody === selectedPose &&
		// currentArm  === selectedPose &&
		currentHead === selectedPose &&
		currentLeg  === selectedPose	
	) {
		alert("yay! you win");
		resetGame();
	}
}

function setupBackground() {
	bg = createSprite(midX, midY);
	for (let i = 0; i < backgroundCount; i++) {
		bg.addImage('bg' + i, bgImages[i]);
		bg.depth = -100;
	}
}

function setupHead() {
	head = createSprite(midX, midY - (65 * scale));
	for (let i = 0; i < headCount; i++) {
		head.addImage('head' + i, heads[i]);
		head.depth = 100;
		head.scale = scale;
	}
	let rnd = int(random(0, headCount));
	currentHead = rnd;
	head.changeImage('head' + rnd);
}


function setupBody() {
	body = createSprite(midX, midY);
	for (let i = 0; i < bodyCount; i++) {
		body.addImage('body' + i, bodys[i]);
		body.depth = 50;
		body.scale = scale;
	}
	let rnd = int(random(0, bodyCount));
	currentBody = rnd;
	body.changeImage('body' + rnd);
}


function setupArms() {
	armRight = createSprite(midX + (40*scale), midY + (10*scale));
	for (let i = 0; i < armCount; i++) {
		armRight.addImage('armRight' + i, arms[i]);
		armRight.depth = 20;
		armRight.scale = scale;
	}
	armLeft = createSprite(midX - (40*scale), midY + (10*scale));
	for (let i = 0; i < armCount; i++) {
		armLeft.addImage('armLeft' + i, arms[i]);
		armLeft.mirrorX(-1);
		armLeft.depth = 20;
		armLeft.scale = scale;
	}
	currentArm = currentBody;
	armRight.changeImage('armRight' + currentBody);
	armLeft.changeImage('armLeft' + currentBody);
}

function legSetup() {
	legRight = createSprite(midX + (20*scale), midY + (60*scale));
	for (let i = 0; i < legCount; i++) {
		legRight.addImage('legRight' + i, legs[i]);
		legRight.depth = 20;
		legRight.scale = scale;
	}
	legLeft = createSprite(midX - (20*scale), midY + (60*scale));
	for (let i = 0; i < legCount; i++) {
		legLeft.addImage('legLeft' + i, legs[i]);
		legLeft.mirrorX(-1);
		legLeft.depth = 20;
		legLeft.scale = scale;
	}
	let rnd = int(random(0, legCount));
	currentLeg = rnd;
	legRight.changeImage('legRight' + rnd);
	legLeft.changeImage('legLeft' + rnd);
}

function poseSetup() {
	pose = createSprite(bootstrapX * 2, bootstrapY * 2);
	for (let i = 0; i < poseCount; i++) {
		pose.addImage('pose' + i, poses[i]);
		pose.depth = 50;
		pose.scale = 1;

	}
	pose.changeImage('pose' + selectedPose);
}


function setupButtons() {

	// buttonBackground = createSprite(bootstrapX * 1, bootstrapY * 1);
	// buttonBackground.addImage('btn0', buttons[0]);
	// buttonBackground.onMouseReleased = function () {
	// 	currentBg = (currentBg + 1) % backgroundCount;
	// 	background.changeImage('bg' + currentBg);
	// };

	buttonHead = createSprite(bootstrapX * 1, bootstrapY * 3);
	buttonHead.addImage('btn1', buttons[1]);
	buttonHead.onMouseReleased = function () {
		currentHead = (currentHead + 1) % headCount;
		head.changeImage('head' + currentHead);
		checkPlayerMatchesPose()
	};

	buttonBody = createSprite(bootstrapX * 1, bootstrapY * 5);
	buttonBody.addImage('btn2', buttons[4]);
	buttonBody.onMouseReleased = function () {
		currentBody = (currentBody + 1) % bodyCount;
		body.changeImage('body' + currentBody);
		currentArm = (currentArm + 1) % armCount;
		armRight.changeImage('armRight' + currentArm);
		armLeft.changeImage('armLeft' + currentArm);
		checkPlayerMatchesPose()
	};

	// buttonArms = createSprite(bootstrapX * 1, bootstrapY * 7);
	// buttonArms.addImage('btn3', buttons[2]);
	// buttonArms.onMouseReleased = function() {
	// 	currentArm = (currentArm+1) % armCount;
	// 	armRight.changeImage('armRight' + currentArm);
	// 	armLeft.changeImage('armLeft' + currentArm);
	// checkPlayerMatchesPose()
	// };

	buttonLegs = createSprite(bootstrapX * 1, bootstrapY * 7);
	buttonLegs.addImage('btn4', buttons[3]);
	buttonLegs.onMouseReleased = function () {
		currentLeg = (currentLeg + 1) % legCount;
		legRight.changeImage('legRight' + currentLeg);
		legLeft.changeImage('legLeft' + currentLeg);
		checkPlayerMatchesPose()
	};



}

function draw() {
	const debugMode= true;

	background(255)
	drawSprites();

	if (debugMode === true) {
		debugDisplay()		
	}
}