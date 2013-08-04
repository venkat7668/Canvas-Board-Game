var DartGame = {
	init: function() {
		canvas = document.getElementById("canvas");
		popupBox = document.getElementById("popup");
		playBtn = document.getElementById("play_btn");
		diamons = document.getElementById("diamonds");
		shareBtn = document.getElementById("share_btn");
		playBtn.addEventListener('click', this.startGame, false);
		shareBtn.addEventListener('click', this.postToFeed, false);

		var manifest = [{
			src: "sounds/sound683.mp3",
			id: "sound683"
		},
		{
			src: "sounds/sound684.mp3",
			id: "sound684"
		}];

		var loader = new createjs.LoadQueue(false);
		loader.installPlugin(createjs.Sound);
		loader.addEventListener("complete", this.startGame);
		loader.loadManifest(manifest);

	},
	pinsCallback: function() {
		thowrnPins++;
		if (thowrnPins == 3) {
			var _score = parseInt(scroeTxt.text.split(":")[1]);
			var _diamods = 1;

			if (_score > 60 && _score <= 100) {
				_diamods = 1.5;
			} else if (_score > 100 && _score <= 120) {
				_diamods = 2;
			} else if (_score > 120 && _score < 180) {
				_diamods = 2.5;
			} else if (_score >= 180) {
				_diamods = 3;
			}
			//alert(_diamods);
			//delay to show popup
			setTimeout(function(){
			diamons.style.width = 100 * _diamods + "px";
			popupBox.style.left = "0";
			},1000)

		}
	},
	startGame: function() {
		//hide popup
		popupBox.style.left = "550px";
		//reset pins count
		thowrnPins = 0;
		//Score text
		scroeTxt = scroeTxt || new createjs.Text("Score :0", "20px Arial", "#e4ff00");
		scroeTxt.text = "Score :0";
		scroeTxt.x = 450;
		scroeTxt.y = 30;
		scroeTxt.textBaseline = "alphabetic";
		exportRoot = exportRoot || new lib.drat();
		exportRoot.x=-100;
		//stop power animation 
		exportRoot.power.gotoAndStop(1);

		//passing @dart board, @scroe to update @update num
		pin1 = pin1 || new lib.pin(exportRoot, scroeTxt);
		pin1.anim.gotoAndStop(0);
		pin1.sleep = false;
		pin1.x = 450;
		pin1.y = 200;
		pin1.callback = DartGame.pinsCallback;

		pin2 = pin2 || new lib.pin(exportRoot, scroeTxt);
		pin2.anim.gotoAndStop(0);
		pin2.sleep = false;
		pin2.x = 480;
		pin2.y = 200;
		pin2.callback = DartGame.pinsCallback;

		pin3 = pin3 || new lib.pin(exportRoot, scroeTxt);
		pin3.anim.gotoAndStop(0);
		pin3.sleep = false;
		pin3.x = 510;
		pin3.y = 200;
		pin3.callback = DartGame.pinsCallback;

		stage = stage || new createjs.Stage(canvas);

		stage.addChild(exportRoot);
		stage.addChild(scroeTxt);
		stage.addChild(pin1);
		stage.addChild(pin2);
		stage.addChild(pin3);

		stage.update();
		createjs.Ticker.setFPS(24);
		createjs.Ticker.addEventListener("tick", stage);

	},
	playSound: function(id, loop) {
		createjs.Sound.play(id, createjs.Sound.INTERRUPT_EARLY, 0, 0, loop);
	},
	postToFeed: function() {
		// calling the API ...
		var obj = {
			method: 'feed',
			redirect_uri: 'http://localhost/facebook_share/',
			link: 'https://google.com',
			picture: 'http://www.all-science-fair-projects.com/science_fair_projects_encyclopedia/upload/0/06/Dart_board.png',
			name: 'HTML5 Dart Game',
			caption: 'I have played HTML5 Dart game it is very nice',
			description: 'developed by venkat.l'
		};

		function callback(response) {
			// document.getElementById('msg').innerHTML = "Post ID: " + response['post_id'];
		}
		FB.ui(obj, callback);
	}
}

FB.init({
	appId: "155873947828885",
	status: true,
	cookie: true
});


var canvas, stage, exportRoot, score = 0,
	scroeTxt, pin1, pin2, pin3, thowrnPins = 0,
	popupBox, playBtn, diamons,shareBtn;