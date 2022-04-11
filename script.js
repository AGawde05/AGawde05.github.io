let canvas;
let ctx;

// objects for the board and detective, declared globally
let gameBoard;
let detective;

let spaceInterval;
let direction;

let currentSpace = 1;
let spaceTo = 25; // space numbers start from 0 (go) to 28 (the space before go)


// story
// part 1 is until the first roll prompt, part 2 is after the detective goes to Myspace Mile until 
// they visit the other properties, and part 3 is the end. 
// Doesn't really line up with Jason's parts but this is easier
const part1 = [
	"Part 1: <u> The Murder on Myspace Mile </u>",
	"You wake up to the scent of a fresh pear tree, swaying in the breeze. You take in the smell for a bit, stretching as you sit up in bed.",
	"It almost feels too perfect and serene… <br> <i> Stop, it’s fake. Nothing here is real anymore. Pear trees went extinct 50 years ago. </i>",
	"Dismayed, you look around at your room- just an ordinarily bland room meant to resemble any college dorm. <br> You look down and examine your hands, turning and feeling them. <i> Good, at least some things are not digitized… </i>", 
	"Shaking it off like you always do, you walk over to the kitchen and swipe on the refrigerator for a hot glass of cappuccino and fruit loops. In the blink of an eye, breakfast appears in front of you. The smell is overwhelmingly delicious, but no matter how much they try to hide it… none of this is real. Coffee? Fruit loops? Departicalized and condensed air molecules. At this point, who knows if humans even need oxygen anymore. <br> … <br> You take one final look as your empty bowls and bottles disappear into thin air. <br> Just then, you hear your com ring. <i> <br> Sigh <br> Another day of work, I guess.</i>", 
	"\"Yes? Yes! Glad to see you’re awake. We have another assignment for you- today is an intriguing one. <br> \”Yes? Ah I think you will like this.\" ", 
	"\"Alright, cool. Hop on over to xxx.xxxxxx.xxxx\” <br> <i> Clicks </i> <br> Sigh <br> You walk into the digital lightspeed interface technology (DigLIT for short) and prepare for another day at work… <br>", 
	"Part 2: <u> The Internet Town </u>",
	" <i> White. <br> Suddenly, <br> Bright light flashes through your eyes and over your head. More, a symphony of colors. A flash of every color both known and unknown to humankind. </i>",
	"In an instant, you find yourself materializing in a blank world. "
];

const part2 = [
	"You see a luxurious mansion in the middle of a serene grassy field. There is a pond to the side with fish darting back and forth… nature is alive. <br> You fix your gaze towards the double oak wood doors that adorn the front of the mansion. <br> You walk towards the doors and slowly open the door… ",
	"deadMan.jpg",
	"You see caution tape surrounding the whole scene… but at first glance, nothing seems out of the ordinary except for the dead man at the floor of the staircase. The whole room feels… empty. You walk around the room taking note of everything out of the ordinary. <br> The wet spots on the red rug, presumably from blood. The phone in the man’s outstretched hand. The peaceful expression. You notice something off about the man’s throat, but right as you are about to investigate, you hear a car pulling up to the driveway.",
	"You turn around. An astute man greets you. <i> Of course… They always have to be bald and round. </i> \”Hello! I assume you’re the detective that they sent to investigate this case?\” ", 
	"\”Ah of course, Police Chief Jim, at your service. This is a tragic day for internet town; it baffles me why someone would want the mayor of Myspace dead… after all that he’s done for our community.\” ", 
	" \”As you can probably tell already, we have isolated the crime scene but haven’t had time to run tests yet… of course we still haven’t figured out the cause of death, who committed the crime, or the intentions, as the police were only alerted less than an hour ago.\”", 
	"\”As such, we want you, the esteemed detective, to travel around internet town and investigate this case.\” ", 
	"\”For this task, we will be providing you a balance of &2000 in our currency to solve this mystery.\”", 
	"\”Good luck… we are counting on you.\” You take one last look at the crime scene before turning away…"
];

const part3 = [
	"<i> Ring Ring… Click </i> <br> You pick up the com.", 
	"\"Hi, detective?\"", 
	"\"I’m going to cut right to the chase, we have news from the autopsy and information that you would like to know.\"", 
	"\"The cause of death… was a straight up red herring-\"", 
	"\"Let me finish- an ACTUAL red herring shoved down the throat of the mayor of Myspace.\"", 
	"\"We have examined the scene more and also realized that no blood was actually spilled during the crime… but there are fresh water marks on the carpet. However, we still don’t know…\"", 
	"\"!!! Wozzas!!! You actually figured out… the whole situation?!?\"", 
	" <i> You explain that the murderer is the Influencer penguin of Instagram Igloo. You explain the whole process of what led you to think this and all the clues you came across along your search. </i>", 
	"\"I… this is why they call you the greatest. You have our humblest respect and great appreciation from everyone in the internet town. I still can’t believe that the influencer penguin would commit this crime though… I wonder what his motivations were…\"", 
	"Part 5: <u> The end </u>", 
	"<b> Two hours later </b>", 
	"You sit on your couch in the \"real\" and mindlessly scroll through the 2 second videos on MyFeed.", 
	"<i> Ring. Ring. Click </i> <br> You pick up the phone.", 
	"\"Hey, it’s me again. Thank you for your continued success on these investigations. The police of internet town have finished their investigations- please check it out and report back.\"", 
	"\"Good luck. We will get your paycheck to you soon.\"<br> <i> Click. Sigh. </i>", 
	"You walk back into the DigLIT… the same feelings of color bombard you. Within a blink of the eye, you are back in internet town, standing at the steps of Instagram Igloo. You notice the police chief’s car parked outside. You take a step and walk into the igloo. ", 
	"Inside, you immediately notice the police sentients situated around the living room. Their empty faces remind you of the great AI work shift 200 years ago… <br> The police chief stood across from the influencer penguin seated in a red velvet chair. ", 
	"\"Oh, hey. You made it just in time. We have incriminating evidence against the influencer penguin on the death of the mayor of Myspace, especially with the red herrings and your investigation results.\"", 
	"\"Now, Mr. Penguin… would you like to explain your actions.\"", 
	"The penguin awkwardly shifted in his chair and turned to face you. ", 
	"\"Detective… You are a smart man. You of all people should know of the devastating effects of global warming. As such, we must do everything we can to prevent these things.. My whole family was separated from me as part of the ice mass cracked in half. My last vision was of them drifting off into the sea… never to be seen again.\"", 
	"\"I thought that I could start over in Internet town… but everywhere I go in society, the same persistent problems appear. Corruption, politics, fake promises, and… no action towards climate change. I witnessed first hand a corrupt business deal between the mayor of Myspace and Rob Johnson. Rob paid off the mayor to allow him to bypass factory and monopoly laws. What does that mean about society… huh?! However, the tipping point of the iceberg is the fact that the mayor does not do anything about climate change. I have run multiple lobbies, protests, one on one conversations… yet nothing has changed. We are all doomed to the same fate if this-\"", 
	"\"Alright, I have had enough of this.\" The police chief turns to you. \"Thank you for your investigative work. We appreciate all that you have done for internet town and uncovering this mystery. We will investigate further and deal with the situation now. \" <br> <i> You are about to say something in protest but suddenly- </i>", 
	"You find yourself back into the \"real.\" ", 
	"<i> Ring. Click. </i> <br> \"Thank you for your continued help keeping our society pristine. You are a key part of our world and we appreciate your dedication towards humankind. We will see you tomorrow.\"", 
	" <i> Click. </i> <br> You see the paycheck rolling into your virtual account. <br> <i> Sigh <br> Another day of work… </i>", 
	"You lie back down on your bed, thinking about the climate change thoughts the penguin was spouting.", 
	"<i> Hmph. </i> You let out a small smile. <i> If only the world was that naive. </i>", 
	"endPhoto.jpeg"
];

let index = 0;

// animation functions:
class MovableImage { 
	constructor(picture, x, y, xTo, yTo) {
		this.picture = picture;
		//current position
		this.x = x;
		this.y = y;
		//position that it is going to
		this.xTo = xTo;
		this.yTo = yTo;
	}
	
	move(callback) {
		// moves the object in the direction specified one unit
		switch (direction) {
			case "left":
				this.x-=10;
				if (this.x == this.xTo) {
					clearInterval(spaceInterval);
					console.log('interval cleared -> (' + this.x + ", " + this.y + ")");
					callback();
				}
				break;
			case "right":
				this.x+=10;
				if (this.x == this.xTo) {
					clearInterval(spaceInterval);
					console.log('interval cleared -> (' + this.x + ", " + this.y + ")");
					callback();
				}
				break;
			case "up":
				this.y-=10;
				if (this.y == this.yTo) {
					clearInterval(spaceInterval);
					console.log('interval cleared -> (' + this.x + ", " + this.y + ")");
					callback();
				}
				break;
			case "down":
				this.y+=10;
				if (this.y == this.yTo) {
					clearInterval(spaceInterval);
					console.log('interval cleared -> (' + this.x + ", " + this.y + ")");
					callback();
				}
				break;
		}
		this.display();
	}
}

class Board extends MovableImage {
	// A class for the board that has the 
	constructor(picture, x, y, xTo, yTo) {
		super(picture, x, y, xTo, yTo);
	}
	
	display() {
		// displays board
		ctx.drawImage(this.picture, this.x, this.y, 1094, 1094, 0, 0, 1000, 1000);
	}
	
	animateBoard() {
		// "Moves" the board and draws the detective
		this.move(animateImages);
		ctx.drawImage(detective.picture, detective.x, detective.y, 150, 150)
	}
	
	startBoardAnimation(moveDirection) {
		//sets up for animating the board: changes the xTo/yTo and sets up an interval.
		direction = moveDirection;
		switch (direction) {
			case "left":
				this.xTo -= 340;
				break;
			case "up":
				this.yTo -= 340;
				break;
			case "right":
				this.xTo += 340;
				break;
			case "down":
				this.yTo += 340;
				break;
		}
		spaceInterval = setInterval( () => this.animateBoard(), 30);
		//console.log("timeout set in board animation");
		if (currentSpace == 28){
			currentSpace = 1;
		} 
		else {
		currentSpace++;
		}
	}
}

class Detective extends MovableImage {
	// A class for the detective, inherits from movableImage
	constructor(picture, x, y, xTo, yTo){
		// Same constructor as movableImage
		super(picture, x, y, xTo, yTo);
	}
	
	display(){
		// displays detective
		ctx.drawImage(this.picture, this.x, this.y, 150, 150);
	}
	
	animateDetective(){
        // Displays the board, then "moves" the detective 
		gameBoard.display();
		this.move(animateImages);
	}
	
	startDetectiveAnimation(moveDirection) {
		//sets up the xTo/yTo, and an interval to animate. 
		direction = moveDirection;
		switch (direction) {
			case "left":
				this.xTo -= 340;
				break;
			case "up":
				this.yTo -= 340;
				break;
			case "right":
				this.xTo += 340;
				break;
			case "down":
				this.yTo += 340;
				break;
		}
		spaceInterval = setInterval( () => this.animateDetective(), 30);
		if (currentSpace == 28){
			currentSpace = 1;
		} 
		else {
		currentSpace++;
		}
	}
}

function initialize(){
	// initializes everything
	//call this to start the animations
	canvas = document.getElementById("Canvas1");
	ctx = canvas.getContext("2d");
	
	gameBoard = new Board(new Image(2804, 2804), 1710, 1710, 1710, 1710);
	detective = new Detective (new Image(151, 151), 700, 750, 700, 750);
	// if you don't want the animation to start right away, then delete the next five lines of code and call animateImages() somewhere else
	gameBoard.picture.addEventListener('load', function() { 
		detective.picture.addEventListener('load', function() {
			animateImages();
		}, false);
	}, false);
	gameBoard.picture.src = 'board.png';
	detective.picture.src = 'detectiveIcon.png';
}

function animateImages() {
	//calls the correct animation function based on where the detective must go
	if (currentSpace < spaceTo) {
		if (currentSpace == 1 || currentSpace == 7) {
			detective.startDetectiveAnimation("left");
		} else 
		if (currentSpace == 8 || currentSpace == 14) {
			detective.startDetectiveAnimation("up");
		} else
		if (currentSpace == 15 || currentSpace == 21) {
			detective.startDetectiveAnimation("right");
		} else
		if (currentSpace == 22 || currentSpace == 28) {
			detective.startDetectiveAnimation("down");
		} else
		if (currentSpace < 7) {
			gameBoard.startBoardAnimation("left");
		} else
		if (currentSpace < 14) {
			gameBoard.startBoardAnimation("up");
		} else
		if (currentSpace < 21) {
			gameBoard.startBoardAnimation("right");
		} else
		if (currentSpace < 28) {
			gameBoard.startBoardAnimation("down");
		}
	}
}

function scrollText(mode, part, callback) {
	var textArray;
	if (part == 1) {
		textArray = part1;
	} else
	if (part == 2) {
		textArray = part2;
	} else 
	if (part == 3) {
		textArray = part3;
	}
	
	if (mode == "forward"){
		if ((part == 2 && index == 1) || (part == 3 && index == 28)){
			console.log(textArray[index]);
			document.getElementById('textImage').style.display = "block";
			document.getElementById('textImage').src = textArray[index];
			index++;
		} else {
			document.getElementById('textParagraph').innerHTML = textArray[index];
			document.getElementById('textImage').style.display = "none";
			index++;
			if (index == (textArray.length) + 1) {
				// hides the text div once done
				document.getElementById('textDiv').style.display = "none";
				// function call of what to do next here (probably the function telling the user to roll, or the end. pass the function name in as the callback argument).
				callback();
			}
		}
	} else
	if (mode == "backward"){
		document.getElementById('textParagraph').innerHTML = textArray[index-2];
	}
}