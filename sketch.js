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

// Kalman Filter defaults to on.
window.applyKalmanFilter = true;

// Set to true if you want to save the data even if you reload the page.
window.saveDataAcrossSessions = true;


avgDot = document.createElement('div');

avgDot.style.display  = 'block';
avgDot.style.position = 'fixed';
avgDot.style.zIndex = 99999;
avgDot.style.left = '-5px'; //'-999em';
avgDot.style.top  = '-5px';
avgDot.style.background = 'blue';
avgDot.style.borderRadius = '100%';
avgDot.style.opacity = '0.7';
avgDot.style.width = '10px';
avgDot.style.height = '10px';


window.onload = async function() {

	document.body.appendChild(avgDot);
if (!window.saveDataAcrossSessions) {
	var localstorageDataLabel = 'webgazerGlobalData';
	localforage.setItem(localstorageDataLabel, null);
	var localstorageSettingsLabel = 'webgazerGlobalSettings';
	localforage.setItem(localstorageSettingsLabel, null);
}
webgazer.params.showVideoPreview = true;
const webgazerInstance = await webgazer.setRegression('ridge') /* currently must set regression and tracker */
.setTracker('TFFacemesh')
.begin();
webgazerInstance.showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */

webgazer.setGazeListener( collisionEyeListener );
};

window.onbeforeunload = function() {
if (window.saveDataAcrossSessions) {
	webgazer.end();
} else {
	localforage.clear();
}
}


function setup() {
	createCanvas(windowWidth, windowHeight);
	
	initValues();

	// setupSounds();

	setupButtons();

	setupSprites();

	// var foo = new p5.Speech(); // speech synthesis object
	// foo.speak('hi there'); // say something
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

var nextBackground= function() {
		currentBg = (currentBg+1) % backgroundCount;
		background.changeImage('bg' + currentBg);
}
function setupButtons() {

	buttonBackground = createSprite(bootstrapX * 1, bootstrapY * 1);
	buttonBackground.addImage('btn0', buttons[0]);
	buttonBackground.onMouseReleased = nextBackground;

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

function inBounds(pointX,pointY,boundX,boundY,boundWidth,boundHeight) {
	return pointX > boundX && pointX < boundX + boundWidth && pointY > boundY && pointY < boundY + boundHeight;
}
var allData = {};
var LOOK_BACK_TIME = 2000; // look back 2 seconds

lastChange = -1;
var collisionEyeListener = async function(data, clock) {
    if(!data || !head)
	  return;
	  
	allData[clock] = {x:data.x,y:data.y};
	cutoff = clock - LOOK_BACK_TIME;
		
	allData = Object.keys(allData)
	.filter(key => key > cutoff)
	.reduce((obj, key) => {
	obj[key] = allData[key];
	return obj;
	}, {});

	avgPoint = Object.keys(allData).reduce((obj, key) => {
		return {
			x:obj.x+allData[key].x,
			y:obj.y+allData[key].y,
		}
	}, {x:0,y:0});
	dataLength = Object.keys(allData).length;
	avgPoint = {x:avgPoint.x/dataLength, y:avgPoint.y/dataLength};
	avgDot.style.transform = 'translate3d(' + avgPoint.x + 'px,' + avgPoint.y + 'px,0)';
	
	if((lastChange < 0 || lastChange < cutoff) && inBounds(avgPoint.x,avgPoint.y,head.position.x,head.position.y,head.width,head.height)) {
	   lastChange = clock;
	   nextBackground();
	}
	console.log(avgPoint);
}