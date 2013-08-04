(function(lib) {
	var pin = function(board, scoreTxt, callback) {
		lib.DartPin.call(this);
		this.isDown = false;
		this.board = board
		this.score = 0;
		this.scoreTxt = scoreTxt;
		//disable all events if pin sleeps
		this.sleep = false;
		this.callback = callback;
	}
	pin.prototype = new lib.DartPin();

	//drag function
	pin.prototype.onPress = function(evt) {
		//remove and add
		//this.parent.removeChild(this);
		var _score = 0;
		if (this.sleep) {
			return;
		}
		this.board.power.gotoAndPlay(2);
		this.parent.addChild(this);
		this.isDown = true;
		var that = this;
		var target = evt.target;
		target.anim.gotoAndStop(2);
		var offset = {
			x: target.x - evt.stageX,
			y: target.y - evt.stageY
		};
		evt.onMouseMove = function(ev) {
			target.x = ev.stageX + offset.x;
			target.y = ev.stageY + offset.y;
		}
		evt.onMouseUp = function(ev) {
			that.isDown = false;
			//disable onPress event
			that.sleep = true;
			that.y += that.board.power.bar.y / 5;
			that.board.power.gotoAndStop(1);
			target.anim.gotoAndPlay(1);
			//animation end call back
			that.anim.callback = function() {
				//alert(_score);
				that.scoreTxt.text = "Score :" + (parseInt(that.scoreTxt.text.split(":")[1]) + _score);
				//that.score=0;
				//console.log(that.callback);
				if (that.callback) {
					that.callback.call(that);
				}
				DartGame.playSound("sound683", false);
				//updating scrore after pin landed on board

			};
			//landed on board?
			if (that.board._getObjectsUnderPoint(that.x, that.y)) {

				for (var i = 1; i <= 20; i++) {
					if (that.board["Board_" + i]._getObjectsUnderPoint(that.x, that.y)) {
					//	alert("hited")
						_score = i;
						if (that.board["Board_" + i]["triple_mc"]._getObjectsUnderPoint(that.x, that.y)) {
						//	alert("hited3")
							_score *= 3;
							return;
						}
						if (that.board["Board_" + i]["double_mc"]._getObjectsUnderPoint(that.x, that.y)) {
							//alert("hited2")
						//	_score *= 2;
							return;
						}
						return;
					}
				}//for end
				
			}//ifend
		}

	}
	//pin tick
	pin.prototype.onTick = function() {
		//shake 
		if (this.isDown) {
			this.x += Math.random() * 1.5 -0.5;
			this.y += Math.random() * 1.5 -0.5;
		}
	}
	pin.prototype.destroy = function() {
		delete this;
	}
	lib.pin = pin;
})(window.lib)