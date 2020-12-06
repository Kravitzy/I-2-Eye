let song;

const backgroundCount = 4;
const bodyCount = 5;
const headCount = 5;
const armCount = 5;
const legCount = 5;
const poseCount = 5;
const totalCharachters = 5;
const scale = 1.5;
const bubbleCount = 2

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
let faceImage;

let midX, midY, bootstrapX, bootstrapY;
let selectedPose;

let eyeContactTime = 0;
let isThereEyeContact = false;

const gameStates = {
	GAMEPLAY: 'gameplay',
	FACELOOK: 'facelook'
}
let gameState = "";

function preload() {
	song = loadSound('./assets/sound/bensound-cute.mp3');
	bubbleReset = loadSound('./assets/sound/bubble_reset.mp3');
	cheerSound = loadSound('./assets/sound/cheer0.mp3');
	// for (let i = 0; i < array.length; i++) {
	// 	bubbleSounds[i] = loadSound('./assets/sound/bubble' + i + '.mp3');
	// }

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

	faceImage = loadImage('./assets/images/michelle.jpg');
}



function setup() {
	gameState = gameStates.GAMEPLAY;

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

	setupFace();

}


function resetGame() {
	// reset timer
	eyeContactTime = 0;
	isThereEyeContact = false;

	// set gam mode to gameplay
	gameState = gameStates.GAMEPLAY

	// reset face visibility
	face.visible = false;
	eyeRect.visible = false;

	// change pose
	let rnd = int(random(0, poseCount));
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

function displayText(params) {
	let spaceing = 500;
	let spaceBy = 15;
	let xPos = 20;
	text("Credits: ", xPos, spaceing, 300, 300)
	spaceing += spaceBy
	text("Sound effects obtained from www.zapsplat.com", xPos, spaceing, 300, 300)
	spaceing += spaceBy
	text("Music: www.bensound.com", xPos, spaceing, 300, 300)
	spaceing += spaceBy
	text("Art: www.kenney.nl", xPos, spaceing, 300, 300)
}

function debugDisplay(params) {
	let spaceing = 0;
	let spaceBy = 15;
	let xPos = 500;
	text("--Debug Mode--", xPos, spaceing, 100, 100)
	spaceing += spaceBy
	text("selectedPose: " + selectedPose, xPos, spaceing, 200, 100)
	spaceing += spaceBy
	text("currentHead: " + currentHead, xPos, spaceing, 200, 100)
	spaceing += spaceBy
	text("currentBody: " + currentBody, xPos, spaceing, 200, 100)
	spaceing += spaceBy
	text("currentArm: " + currentArm, xPos, spaceing, 200, 100)
	spaceing += spaceBy
	text("currentLeg: " + currentLeg, xPos, spaceing, 200, 100)
	spaceing += spaceBy
	text("gameState: " + gameState, xPos, spaceing, 200, 100)
	spaceing += spaceBy
	text("eyeContactTime: " + eyeContactTime, xPos, spaceing, 200, 100)
	spaceing += spaceBy
	text("isThereEyeContact: " + isThereEyeContact, xPos, spaceing, 200, 100)
}


function winLevl() {

	cheerSound.play();

	// set gamestate to facelook to block incoming touches
	gameState = gameStates.FACELOOK;

	// display face and eye bounds
	face.visible = true;
	eyeRect.visible = false;
}

function checkPlayerMatchesPose() {
	bubbleReset.play();

	let wonGame = currentBody === selectedPose && /*currentArm  === selectedPose &&*/ currentHead === selectedPose && currentLeg === selectedPose;
	if (wonGame) {
		winLevl()
	}
}

function setupBackground() {
	bg = createSprite(midX, midY);
	for (let i = 0; i < backgroundCount; i++) {
		bg.addImage('bg' + i, bgImages[i]);
		bg.depth = -100;
	}
}

function setupFace() {

	face = createSprite(midX, midY);
	face.addImage('face', faceImage);
	face.scale = 1;
	face.visible = false;

	eyeRect = createSprite(midX - 55, midY - 240, 370, 140);
	eyeRect.visible = false;
	// eyeRect.onMouseOver = function () {
	// 	if (gameState === gameStates.FACELOOK) {
	// 		isThereEyeContact = true;
	// 	}
	// }
	// eyeRect.onMouseOut = function () {
	// 	if (gameState === gameStates.FACELOOK) {
	// 		isThereEyeContact = false;
	// 	}
	// }

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
	armRight = createSprite(midX + (40 * scale), midY + (10 * scale));
	for (let i = 0; i < armCount; i++) {
		armRight.addImage('armRight' + i, arms[i]);
		armRight.depth = 20;
		armRight.scale = scale;
	}
	armLeft = createSprite(midX - (40 * scale), midY + (10 * scale));
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
	legRight = createSprite(midX + (20 * scale), midY + (60 * scale));
	for (let i = 0; i < legCount; i++) {
		legRight.addImage('legRight' + i, legs[i]);
		legRight.depth = 20;
		legRight.scale = scale;
	}
	legLeft = createSprite(midX - (20 * scale), midY + (60 * scale));
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
	pose = createSprite(bootstrapX * 9, bootstrapY * 2);
	for (let i = 0; i < poseCount; i++) {
		pose.addImage('pose' + i, poses[i]);
		pose.depth = 50;
		pose.scale = 1;

	}
	pose.changeImage('pose' + selectedPose);
}

var nextBackground = function () {
	currentBg = (currentBg + 1) % backgroundCount;
	background.changeImage('bg' + currentBg);
}

function setupButtons() {

	// dashboard = createSprite(bootstrapX * 1, bootstrapY * 9);
	// dashboard.addImage('btn1', buttons[0]);
	// dashboard.onMouseReleased = function () {
	// 	if (gameState === gameStates.GAMEPLAY) {
	// 		window.location.href = 'https://kravitzy.github.io/I-2-Eye/dashboard.html';
	// 	}
	// };

	// buttonBackground = createSprite(bootstrapX * 11, bootstrapY * 1);
	// buttonBackground.addImage('btn0', buttons[0]);
	// buttonBackground.onMouseReleased = function () {
	// 	currentBg = (currentBg + 1) % backgroundCount;
	// 	background.changeImage('bg' + currentBg);
	// };

	buttonHead = createSprite(bootstrapX * 11, bootstrapY * 3);
	buttonHead.addImage('btn1', buttons[1]);
	buttonHead.onMouseReleased = function () {
		if (gameState === gameStates.GAMEPLAY) {
			currentHead = (currentHead + 1) % headCount;
			head.changeImage('head' + currentHead);
			checkPlayerMatchesPose()
		}
	};

	buttonBody = createSprite(bootstrapX * 11, bootstrapY * 5);
	buttonBody.addImage('btn2', buttons[4]);
	buttonBody.onMouseReleased = function () {
		if (gameState === gameStates.GAMEPLAY) {
			currentBody = (currentBody + 1) % bodyCount;
			body.changeImage('body' + currentBody);
			currentArm = (currentArm + 1) % armCount;
			armRight.changeImage('armRight' + currentArm);
			armLeft.changeImage('armLeft' + currentArm);
			checkPlayerMatchesPose()
		}
	};

	// buttonArms = createSprite(bootstrapX * 11, bootstrapY * 7);
	// buttonArms.addImage('btn3', buttons[2]);
	// buttonArms.onMouseReleased = function() {
	// if (gameState === gameStates.GAMEPLAY) {
	// 	currentArm = (currentArm+1) % armCount;
	// 	armRight.changeImage('armRight' + currentArm);
	// 	armLeft.changeImage('armLeft' + currentArm);
	// checkPlayerMatchesPose()
	// }
	// };

	buttonLegs = createSprite(bootstrapX * 11, bootstrapY * 7);
	buttonLegs.addImage('btn4', buttons[3]);
	buttonLegs.onMouseReleased = function () {
		if (gameState === gameStates.GAMEPLAY) {
			currentLeg = (currentLeg + 1) % legCount;
			legRight.changeImage('legRight' + currentLeg);
			legLeft.changeImage('legLeft' + currentLeg);
			checkPlayerMatchesPose()
		}
	};



}

function faceLookLogic() {

	let isThereEyeContact = pointInside(avgPoint, eyeRect);

	if (isThereEyeContact) {
		eyeContactTime++;
	}


	if (eyeContactTime > 60*1) {
		resetGame()
	}



}

function draw() {
	const debugMode = window.debugMode;

	background(255);
	drawSprites();
	displayText()

	switch (gameState) {
		case gameStates.FACELOOK:
			faceLookLogic()
			break;
		default:
			break;
	}

	if (debugMode === true) {
		debugDisplay()
	}

}


// Kalman Filter defaults to on.
window.applyKalmanFilter = true;

// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
window.debugMode = urlParams.get('debug') === 'true' 

avgDot = document.createElement('div');

avgDot.style.display = window.debugMode ? 'block' : 'none';
avgDot.style.position = 'fixed';
avgDot.style.zIndex = 99999;
avgDot.style.left = '-5px'; //'-999em';
avgDot.style.top = '-5px';
avgDot.style.background = 'blue';
avgDot.style.borderRadius = '100%';
avgDot.style.opacity = '0.7';
avgDot.style.width = '10px';
avgDot.style.height = '10px';


window.onload = async function () {

	document.body.appendChild(avgDot);
	if (!window.saveDataAcrossSessions) {
		var localstorageDataLabel = 'webgazerGlobalData';
		localforage.setItem(localstorageDataLabel, null);
		var localstorageSettingsLabel = 'webgazerGlobalSettings';
		localforage.setItem(localstorageSettingsLabel, null);
	}

	webgazer.params.showVideoPreview = true;
	webgazer.params.showVideo = webgazer.params.showFaceOverlay = webgazer.params.showFaceFeedbackBox = window.debugMode;
	const webgazerInstance = await webgazer.setRegression('ridge') /* currently must set regression and tracker */
		.setTracker('TFFacemesh')
		.begin();
	webgazerInstance.showPredictionPoints(window.debugMode); /* shows a square every 100 milliseconds where current prediction is */

	webgazer.setGazeListener(collisionEyeListener);
};

window.onbeforeunload = function () {
	if (window.saveDataAcrossSessions) {
		webgazer.end();
	} else {
		localforage.clear();
	}
}

function inBounds(pointX, pointY, boundX, boundY, boundWidth, boundHeight) {
	return pointX > boundX && pointX < boundX + boundWidth && pointY > boundY && pointY < boundY + boundHeight;
}

var allData = {};
var LOOK_BACK_TIME = 2000; // look back 2 seconds

lastChange = -1;

function calculateAveragePoint(allData) {
	avgPoint = Object.keys(allData).reduce((obj, key) => {
		return {
			x: obj.x + allData[key].x,
			y: obj.y + allData[key].y,
		}
	}, { x: 0, y: 0 });
	dataLength = Object.keys(allData).length;
	return { x: avgPoint.x / dataLength, y: avgPoint.y / dataLength };
}

function pointInside(point, sprite) {
	return inBounds(point.x, point.y, sprite.position.x, sprite.position.y, sprite.width, sprite.height);
}

useAveragePoint = true;

var collisionEyeListener = async function (data, clock) {
	if (!data || !head)
		return;
	allData[clock] = { x: data.x, y: data.y };
	// remove points older than 2 seconds ago
	cutoff = clock - LOOK_BACK_TIME;
	allData = Object.keys(allData)
		.filter(key => key > cutoff)
		.reduce((obj, key) => {
			obj[key] = allData[key];
			return obj;
		}, {});

	isColliding = false;
	if (useAveragePoint) {
		// calculate the average point over the last 2 seconds
		avgPoint = calculateAveragePoint(allData);
		console.log(avgPoint);
		avgDot.style.transform = 'translate3d(' + avgPoint.x + 'px,' + avgPoint.y + 'px,0)';
		// isColliding = pointInside(avgPoint, eyeRect);
	} else {
		// isColliding = pointInside(data, eyeRect);
	}

	// if((lastChange < 0 || lastChange < cutoff) && isColliding) {
	//    lastChange = clock;
	//    nextBackground();
	// }
	// console.log(avgPoint);
}