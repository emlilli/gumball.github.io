(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.Background = function() {
	this.initialize(img.Background);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4000,3000);


(lib.GOutline = function() {
	this.initialize(img.GOutline);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,335,335);


(lib.G1E = function() {
	this.initialize(img.G1E);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,329,328);


(lib.GBCrown = function() {
	this.initialize(img.GBCrown);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4000,3000);


(lib.GEB = function() {
	this.initialize(img.GEB);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,329,328);


(lib.Geyebrow1 = function() {
	this.initialize(img.Geyebrow1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,329,328);


(lib.Geyebrow2 = function() {
	this.initialize(img.Geyebrow2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,329,328);


(lib.GIW = function() {
	this.initialize(img.GIW);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,329,328);


(lib.Glass = function() {
	this.initialize(img.Glass);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2177,2178);


(lib.Gumball1 = function() {
	this.initialize(img.Gumball1);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,329,328);


(lib.Hardware = function() {
	this.initialize(img.Hardware);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2177,2897);


(lib.Layer2 = function() {
	this.initialize(img.Layer2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1196,2447);


(lib.Layer22 = function() {
	this.initialize(img.Layer22);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,262,263);


(lib.Layer23 = function() {
	this.initialize(img.Layer23);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,431,124);


(lib.Layer24 = function() {
	this.initialize(img.Layer24);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,446,192);


(lib.Layer49 = function() {
	this.initialize(img.Layer49);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,551,337);


(lib.Layer5 = function() {
	this.initialize(img.Layer5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1163,2084);


(lib.LM = function() {
	this.initialize(img.LM);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,551,337);


(lib.Saviour = function() {
	this.initialize(img.Saviour);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4000,3000);


(lib.Saviour2 = function() {
	this.initialize(img.Saviour2);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4000,3000);


(lib.SIE = function() {
	this.initialize(img.SIE);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,551,337);


(lib.SpEB = function() {
	this.initialize(img.SpEB);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,551,337);


(lib.SpecialEyeball = function() {
	this.initialize(img.SpecialEyeball);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,551,337);


(lib.SpecialEyes = function() {
	this.initialize(img.SpecialEyes);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,551,337);


(lib.Title_Button = function() {
	this.initialize(img.Title_Button);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4000,3000);


(lib.Title_Text = function() {
	this.initialize(img.Title_Text);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4000,3000);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Tween227 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GBCrown();
	this.instance.setTransform(-217.25,-123.75,0.1,0.1,-7.2053);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-217.2,-173.9,434.5,347.8);


(lib.Tween226 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GBCrown();
	this.instance.setTransform(-200,-150,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-200,-150,400,300);


(lib.Tween225 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjMEZIgFgBQgDgCgBgCQADgFAJAAQAKgBAFADQABABAAAAQABAAAAABQABAAAAABQAAAAAAABQAAAAAAABQgBAAAAABQgBAAAAAAQgBABgBAAQgFACgGAAIgGgBgAEAERQgFgBgBgEQADgEAJAAQAJgBAGACQADACAAACQAAABAAAAQgBABAAAAQgBAAAAABQgBAAgBAAQgEADgGAAQgEAAgGgCgAHpCgQgFgBgBgDQADgDAEgBIAHgBIABAAQAIABADABQAEABAAADIgCACQgEADgJAAQgFAAgEgCgAnMCaQgGgCAAgDQADgEAIAAQAKgBAFADQABAAABABQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBAAQgBABgBAAQgEACgFAAIgKgCgAqjirQgGgBAAgEQADgEAJAAQAJgBAFACQADACAAACQAAABAAAAQAAABgBAAQAAAAgBABQAAAAgBAAQgFADgFAAQgFAAgFgCgAKSjBQgFgCAAgCQACgDAFgBIAFgBQAJAAAEACIADACIABADIgCACQgFACgFAAQgGAAgGgCgAGpjJQgEgBAAgDQACgDADgBIAHgBQAKgBAFADQABAAABABQAAAAABABQAAAAAAABQAAAAAAABIgCACQgCACgJABQgJAAgEgCgAnIkQQgDgBgBgDQADgFAIAAQAKgBAFADQABABABAAQAAABAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAABAAAAQgBAAAAABQgBAAgBAAIgGABIgFABQgHAAgEgCg");
	this.shape.setTransform(0.0083,0.0125);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.2,-28.2,136.4,56.4);


(lib.Tween224 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjOEfIgFgBQgDgCAAgCQADgFAJAAQAJgBAFADQABABABAAQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAgBABQAAAAgBAAQAAABgBAAQgGACgGAAIgGgBgAD/EXQgGgBAAgEQADgEAJAAQAJgBAFACQADACAAACQAAABAAAAQAAABgBAAQAAAAgBABQAAAAgBAAQgFACgFAAQgFAAgFgBgAHnCmQgFgBAAgDQACgDAEgBIAIgBIABAAQAHABADABQAEABAAADIgCACQgDADgJAAQgFAAgFgCgAnNCgQgGgCgBgDQADgEAJAAQAKgBAFADQABAAAAABQABAAAAABQAAAAAAABQABAAgBABQAAAAAAABQAAAAAAABQgBAAgBAAQAAABgBAAQgFABgFAAIgJgBgAqlilQgFgBgBgEQADgEAJAAQAJgBAGACQADACAAACQAAABAAAAQgBABAAAAQgBAAAAABQgBAAgBAAQgEACgGAAQgEAAgGgBgAKaiyQgIgBgCgCIgFgDIgGgCQgGgDAAgGQgBgGAFgDQACgCAHgBQAMAAAHADQAJAFADAJQABAFgCADQgCADgDAAIgGABIgFAAgAGnjDQgDgBgBgDQACgDAEgBIAGgBQAKgBAGADQABAAAAABQABAAAAABQABAAAAABQAAAAAAABIgCACQgDACgJABQgJAAgEgCgAnQj7QgFgBgCgDQAAgIgCgDIgDgFQAAAAABgBQAAAAAAAAQAAgBABAAQAAAAABgBIADgDIABgFQAAgCAFgBIAMgCIAJACQAGADgBAFIgBAFIABAEIgBAEIAAAFIgBAEQgCAFgHAAIgGAAIgJgBg");
	this.shape.setTransform(0.0071,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.3,-28.7,136.7,57.5);


(lib.Tween223 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjXEiIgFgBQgDgCAAgCQADgFAJAAQAJgBAFADQABAAABABQAAAAABAAQAAABAAAAQAAABAAABQAAAAAAABQAAAAgBAAQAAABgBAAQAAAAgBABQgGACgGAAIgGgBgAD2EaQgGgBAAgEQADgEAJAAQAJgBAFACQADACAAACQAAABAAAAQAAAAgBABQAAAAgBABQAAAAgBAAQgFACgFAAQgFAAgFgBgAHeCpQgFgBAAgDQACgDAEgBIAIgBIABAAQAHABADABQAEABAAADIgCACQgDADgJAAQgFAAgFgCgAnWCjQgGgCgBgDQADgEAJAAQAKgBAFADQABAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQAAAAgBAAQAAABgBAAQAAAAgBABQgFABgFAAIgJgBgAKJigQgDgCgBgCIAEgHIACgIQACgDAFAAQAPgCAIADQAHACgBAFIAEACQABABAAAAQAAABABAAQAAABAAAAQAAABgBAAIgDACIgJAGQgEACgLAAQgLAAgFgCgAquiiQgFgBgBgEQADgEAJAAQAJgBAGACQADACAAACQAAABgBAAQAAAAAAABQgBAAAAABQgBAAgBAAQgEACgGAAQgFAAgFgBgAGejAQgDgBgBgDQACgDAEgBIAGgBQAKgBAGADQABAAAAABQABAAAAABQAAAAABABQAAAAAAABIgCACQgDACgJABQgJAAgEgCgAnakGIgIgDIgIgBQgFgBAAgFQABgDAEgCIANgDIAHgGQAGgEANABQAKAAABAGIACAIQACAGgGAEQgFAEgMAAIgGAAQgGAAgDgBg");
	this.shape.setTransform(0.0167,-0.0091);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.2,-29,138.5,58.1);


(lib.Tween222 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AD7EYQABgEAIgBIAbgEQAKgBAGACQAGACABAEIgGAGIgGAGIgIACIgEAAQgTAAgQgMgAj+EHQgFgEABgEQACgFAGAAQAMgCAGADIAHAFIAGAFQADACAIABQAIAAADADIACACQAAABAAAAQAAABAAAAQgBABAAAAQgBAAgBABQgCABgKABIgDAAQgaAAgPgMgAH/DCIgGgCIgGgEQgJgEgEgDQgGgGACgKQABgGAGgKQADgFAEgCQAIgFAMAIQAFAEACADQADAGAAAKQAAAMgCAFQgEAJgHAAIgCAAgAm6CyQgGgEgBgGQAAgEABgFQAEgPAPgHQAIgDAHABQAIACACAHIAAAMIgBANQgCAIgLABIgHABIgGACIgDAAQgEAAgEgDgAqliRIgIgCQgDgBgCgDQgCgEABgDQADgFAKAAIASgBQASAAAIACQAGABABAEQgCADgHABIgKACIgJAEQgDACgMAAgAKWiXQgFgDgDgFIgDgJIgHgIQgDgFACgGQACgGAFgCIAFgCQAEgBABgCIAEgGQAEgFAKABQAGABACADQAEACACAHQABAJgEARIgFAOQgEAHgHABIgDABQgEAAgEgDgAGwjUQgDgCgEgGQgDgGgDgCQABgEAIgBQANgBAFADIAGADIAGAAQAOgBAFAHQgNAMgRABQgLAAgEgDgAmsjwQgGgBgFgEQgFgEgBgGIgBgMIgCgHQgBgGAFgGQAFgGAKABQAKACAEAIQADADACAJQACALgCAFQgCAGgFAEQgEADgGAAIgBAAg");
	this.shape.setTransform(0.0133,0.0425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.2,-29.2,138.5,58.5);


(lib.Tween221 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjuEfIgIAAIgCgBIgCgCQgDgFADgFQACgEAGgBQABAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAAAIAWABIAFACQACABgCAEQgBACgDACIgKAEIgGADIgCABIgDgBgADuEWQgFgCAAgCQAEgEAIgCIAMAAIAMgCQAIgCAHACQAHABACAFQgCABgCAFQgDAFgJABIgEAAQgNAAgWgGgAHwCwQgDgBgBgCIgJgDIgHgEQgKgDgCgCQgCgCgBgDQAAgEACgCQACgCAGAAIAWABQAEABAEACQAIAGgBAGQAAADgEAFIgDADIgCABIgDAAgAnLCSQgPgCgHgGQAAgBgBAAQAAgBgBAAQAAgBAAAAQAAgBAAAAQgBgGAGAAIAIgBQABAAAAgBQABAAAAAAQAAAAAAAAQAAAAAAgBQAGAAAHAEIAEACIAHABQAFABADABQAEABABADQAAAAAAABQAAAAgBAAQAAABAAAAQgBABAAAAQgFAFgIABIgDAAIgKgBgAqWiiIgKgBIgEgBQgCAAgCgDQgDgFAAgDQABgDAEgBQALgEARACQAEAAACADQABACgBADQgBAFgEADQgEADgFAAgAJ+jJQgEgCgFgJQAGgFAJAAQAIAAAHAFIAEACIAOACQAGACABAEQgGAHgRAAQgQAAgHgGgAHBjgIgQgBQgJgBgEgEQAAgBgBAAQAAgBAAAAQAAgBAAAAQAAAAAAgBIACgDQAFgFANABIANABIADAAIADACQAEAFAAADQAAAFgFAAIgFABIgDAAgAnYkPQgEgCgFgFIgCgEIADgCQAHgDANAAIAVABQAIAAAAAEQABAEgEAEQgGAEgOABIgGAAQgIAAgEgCg");
	this.shape.setTransform(0.0214,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.3,-28.8,136.7,57.6);


(lib.Tween220 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjuEoQgJgBgEgJQgFgHABgKIACgIQAFgNANgBQAFgBAEABQAGABAFAEQADAEABAHQADAOgIAKQgGAKgKAAIgGgBgADvENQgFgCAAgCQAEgEAIgBIAMAAIAMgDQAIgBAHABQAHABABAFQgCACgBAFQgDAEgJABIgEAAQgOAAgVgGgAHcCiQgLAAgEgEQgFgDgBgJIABgIQAEgHAJgCQAHgCAIAAQAQAAAGAFQAHAGgCAMQgBAGgDACQgEAFgNAAgAnKCJQgQgCgGgGQgBgBAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQgBgFAFgBIAJgBQABAAAAAAQAAgBABAAQAAAAAAAAQAAAAAAAAQAGAAAHADIAEADIAGABQAFAAAEABQAEABABADQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBABQgFAEgHABIgDAAIgKgBgAqlidQgHgFABgNQAAgKAEgKQAEgLAHAAQABAAABAAQAAAAABAAQAAAAAAAAQABAAAAgBQAKADADAGIAEAPQABAHgGAKQgFAIgFADQgDACgEAAQgEAAgEgEgAJ/jRQgEgDgFgJQAGgFAIAAQAIAAAIAFIADACIAPACQAGACABAEQgHAHgQAAQgRAAgGgFgAG9jWIgIAAQgEAAgEgCQgDgDgBgEQgDgEgCgFQgBgHAGgGQAFgHAGgBIAGAAQAFAAAGADQAGAEADADQADAEAAAFQABAHgDAGQgDAHgHAAgAnYkYQgDgCgFgFIgCgDIADgDQAHgDANAAIAVABQAHAAABAFQABAEgFADQgFAEgOABIgGAAQgIAAgFgCg");
	this.shape.setTransform(0,-0.0117);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.4,-29.7,136.9,59.4);


(lib.Tween219 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ADuEYQgFgCAAgCQAEgEAHgBIANAAIAMgDQAHgBAIABQAHABABAFQgCACgCAFQgDAEgIABIgFAAQgNAAgVgGgAjtEbIgCgBIgCgCQgCgDACgCQAAgDAEgBIAIgCQAAAAAAAAQABAAAAgBQAAAAAAAAQAAAAAAAAQAFgBAKAEIAJACQACACAAAEQAAACgEACIgFABgAHGCpIgDAAQgBgBAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQgBgBAAgBQAAAAAAgBQAAgBAAAAQAAAAABgBIADgDQAKgFAKgBIAEgBIADgCQADgCAEABQAFAAACADQACACgBADIAAAIIgCAEQgBACgFAAgAnMCUQgPgCgGgGQgBAAgBgBQAAgBAAAAQgBgBAAAAQAAAAAAgBQgBgFAGgBIAJgBQAAAAABAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQAHAAAHADIAEADIAGABQAFAAAEABQAEABAAADQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBABQgFAEgHABIgEAAIgKgBgAqZinIgEgBIgDgBIgFgBQgEgBgBgDQAAgDADgCIAGgBIAQACIACABIAJACQAGABgBAFQgBAEgGAAQgMAAgFgCgAJ9jGQgDgDgGgJQAHgFAIAAQAIAAAHAFIAEACIAPACQAFACABAEQgGAHgQAAQgRAAgHgFgAGyjPIgDAAQgCgBgBgFIABgJQABgFAFgCIAFAAIAgABIAFABQACACgBAEQAAACgDADQgBADgDABIgIADIgFADIgFAAgAG2jaIAPABQgFgCgKAAgAnZkNQgEgCgEgFIgCgDIADgDQAHgDANAAIAUABQAIAAABAFQABAEgFADQgGAEgNABIgGAAQgJAAgEgCg");
	this.shape.setTransform(-0.0036,0.0317);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.3,-28.5,136.6,57.1);


(lib.Tween218 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AiKERQgHgEgDgOQgCgJAAgLQAAgKABgFQAEgIAHgCQAJgBAHAJIAJAQIAIAOQAEAKgFAGIgNAGIgLAFIgCAAQgDAAgDgCgAE+EMQgFgCgFgFIgIgHQAEgGAKABIAQAAIAQgDIABgBQADACAHAAIAEADQAAABAAAAQAAABABABQAAAAgBABQAAAAAAABIgGADQgCABgDAEIgGAFQgDACgKAAQgIAAgFgCgAI9CaQgFAAgHgHQgHgHgCgEQgEgHAEgGQACgEAHgFIAEgGQAFgHAJABQAIACADAIQABAFAAAMIACAGQACAHgJAIQgHAEgFAAIgBAAgAo5i0QgOgCgDgCQgHgEABgJQABgJAIgDQAGgCADgCIAEgEQAFgFAJACQAIABADAEQAFAHgFAKQgDAJgFAFQgFAFgDABIgCAAIgGgCgAISjeQgFgBgEgDQgEgGABgRQAAgMAEgFQAEgFALgCQAKgCAEABQAGACAEAFQADAFAAAFQAAAJgKALIgGAGIgIAIQgDACgEAAIgDgBg");
	this.shape.setTransform(-0.0135,0.0226);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.3,-27.5,118.69999999999999,55.1);


(lib.Tween217 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ADuEYQgGgCAAgCQAEgEAIgBIANAAIALgDQAIgBAIABQAGABACAFQgCACgCAFQgDAEgIABIgFAAQgNAAgVgGgAjpEYIgDAAIgDgDQgDgDgBgCQABgFADgCQACgCAFgBQAPgDAMAKIACACQABACgCADIgFADIgGACgAHZCfIgCAAQgBgBgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAgBABgBQAAAAAAgBQAAgBAAAAQABAAAAgBQAEgFAKgDQAIgCAEABIAGACIAFABQAGABAEAGQABAEgBACQgCAEgGAAIgFAAIgfgCgAnMCUQgPgCgGgGQgBAAgBgBQAAgBAAAAQgBgBAAAAQAAAAAAgBQgBgFAGgBIAJgBQAAAAABAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQAGAAAIADIADADIAHABQAFAAAEABQAEABAAADQAAAAAAABQAAAAAAABQgBAAAAABQgBAAAAABQgFAEgHABIgEAAIgKgBgAqYidIgMAAIgEgBQgCgBAAgGIAAgFQACgCAFAAIATABQAFAAABACQACADgDADQgDAEgBACIgEAAIgFAAgAJ9jGQgEgDgFgJQAHgFAIAAQAIAAAHAFIAEACIAOACQAGACABAEQgGAHgQAAQgRAAgHgFgAHCjUIgIgBIgFgCQgDgDACgGQAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAIADgBIAFAAIAYgCQAIAAAEADQACACABADQABAEgCACQgCACgEAAIgNACIgGABIgDABIgFgBgAnZkNQgEgCgEgFIgDgDIAEgDQAGgDANAAIAVABQAIAAAAAFQACAEgFADQgGAEgNABIgHAAQgIAAgEgCg");
	this.shape.setTransform(0,0.0317);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.3,-28.5,136.6,57.1);


(lib.Tween216 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Aj1EbQgEgHAGgIIALgLQALgJAEgCQAEgBAGAAQAHAAAFADQAIAFAAAJQABAJgGAHQgDADgGAEQgNAHgNAAQgOAAgEgJgADzESQgFgCAAgCQAEgEAHgBIANAAIAMgDQAHgBAIABQAHABABAFQgCACgCAFQgDAEgIABIgFAAQgNAAgVgGgAHKCdQgEgHADgIIAEgFIACgGQACgFALgCIAPgCQALAAAFAHQADAFgBAGQAAAGgCAEQgBADgGAFQgGAGgFAAIgJgBIgIABIgCAAQgHAAgFgHgAnHCOQgPgCgGgGQgBAAgBgBQAAgBAAAAQgBgBAAAAQAAAAAAgBQgBgFAGgBIAJgBQAAAAABAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQAHAAAHADIAEADIAGABQAFAAAEABQAEABAAADQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBABQgFAEgHABIgEAAIgKgBgAqpifQgGgFAAgIQAAgJANgLQADgDADgBQAHgEAIAFQAHAFgBAIQgBAEgDAGIgEALQgEAFgEACIgGABQgGAAgGgGgAKCjMQgDgDgGgJQAHgFAIAAQAIAAAHAFIAEACIAPACQAFACABAEQgGAHgQAAQgRAAgHgFgAHEjOQgIgCgKgJQgIgHgBgFQgDgGAFgHQAEgGAIgBQAEACAOABQAMABAFAHQAEAFgCALQgBAIgEAEQgFAFgHAAIgHgBgAnUkTQgEgCgEgFIgCgDIADgDQAHgDANAAIAUABQAIAAABAFQABAEgFADQgGAEgNABIgHAAQgIAAgEgCg");
	this.shape.setTransform(-0.0009,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.8,-29.1,137.6,58.3);


(lib.Tween215 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Aj6EcIgDgBQgDgBAAgGQAAgFACgCIAFgBQAOABAKgCQAGgBACACIABAEQAAADgCACQgCACgDABIgDABIgCACQgCABgHAAgAEBEWQgGAAgBgDQgBgCADgCIAFgDIAegFQAEACALAAQADgBADABQADACAAACQAAADgDACIgHABIgMAEIgKABgAHbCpQgCgCAAgEQAAgEACgCIAEgBIAOgCQgBgGAEgBQAFgDACAEQADAEgDADIAIABQAFACgBAEQgBADgHABIgMACIgHACIgHABQgEAAgCgCgAnFCXIgHgBQgDgBgBgCQgBgDACgDQACgDADABIABAAQABAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIAiABIAEACQACACgCAFQgBAAAAABQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIgbgBgAqhijIgGgBQgDgCAAgCQABgDAEgBIAPgGIABgBQAGAAAFACQAEABABABQAAABAAABQABAAAAABQAAAAgBABQAAABAAAAQgBAEgFABIgJACgAKNi6QgNgBgHgCQgDgBgCgCQgBgCAAgEQgBgCACgDQACgDAHgBIAmACIAFABQADABAAADIgDAGIgBADQAAABgBAAQAAAAAAABQgBAAAAAAQAAAAgBAAIgHAEgAHCjWIgMgCQgDAAgCgBQgCgCAAgEQAAgDAEgDQAEgEAFgCIAGgCIACgCQACgCAEAAIAYAAIAIABQAEACAAADQAAAFgFACIgPAHQgHAFgFACIgHAAIgFAAgAnFkIQgEAAgCgCQgCgCAAgDQAAgEADgEQADgCAEgBQABAAAAAAQAAAAABAAQAAgBAAAAQAAAAAAAAIAYABIAFACQACADgDAEIgCAGIgVACIgHABIgCAAg");
	this.shape.setTransform(-0.0031,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.3,-28.4,136.6,56.9);


(lib.Tween214 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjmEeIgDgBIgDgCQgDgDgBgDQAAgFAEgCQACgCAFgBQAPgCAMAJIABACQACACgCADIgFADIgGADgAErEbQgHgCgKAAIgSgBIgDgBQgBgBgBgFIAAgHQAAgEACgBIACAAIABgBQAIgBAKADIAMAFIAIABQAEABACADQABAEgBADQgBADgCACIgBAAIgFgBgAHcClIgDgBQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQAAAAABAAQAEgGAKgDQAIgCAEABIAGACIAFABQAGACADAFQACAEgBACQgCAEgGAAIgFAAIgfgBgAnHCaIgDgEQgBgFADgEQAEgEAEgBIAMgCIAGgEQADgDADAAQAEAAABAFQAAAGgFAAQABADgDAEIgGAFIgMAFIgJAAgAqViXIgMgBIgFgBQgBgBAAgGIAAgEQACgDAFAAIATABQAFAAABADQABADgDADQgDAEAAACIgEAAIgFAAgAJ5ipQgCgDAAgFIACgIQADgHAEgBIAEgBQANAAAQADIAFACQABABAAAAQABABAAAAQAAABAAABQAAAAAAABIgEADQgFADgDABIgGABIgFAEQgEADgHAAIgNAAgAHFjOIgIgBIgGgCQgDgDACgHQAAgBAAAAQABgBAAAAQAAAAAAgBQAAAAABAAIADgBIAEgBIAZgCQAIAAAEADQACACABAEQABADgCACQgCACgEAAIgNACIgGACIgEAAIgEAAgAnPj/QgEAAgCgCQgEgEADgFIAHgIIAHgFQAGgEAFgCQAGgBAEAEQAEAEAAAFIgDAEQgEAFgFACIgFACIgEADQgCACgFAAIgEAAg");
	this.shape.setTransform(0.0143,-0.0091);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68,-28.6,136.1,57.3);


(lib.Tween213 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjqEgQgEgHAGgIIALgLQALgJAEgCQAEgBAGAAQAHAAAFADQAIAFAAAJQABAJgGAHQgDADgGAEQgNAHgNAAQgOAAgEgJgAEWEfQgIgCgDgDQgGgGACgIQACgIAJgCIAJgDIAGgFQADgCAJAAQAMAAAEAEQAEADABAHQABAIgDAIQgDAIgIADQgEACgJAAQgKgBgIgDgAHVCiQgEgHADgIIAEgFIACgGQACgFALgCIAPgCQALAAAFAHQADAFgBAGQAAAGgCAEQgBADgGAFQgGAGgFAAIgJgBIgIABIgCAAQgHAAgFgHgAm5CgQgKgHgCgNQgCgHACgFQACgEAEgCQAEgDAEABQAFgBAFAFIAIAIIAFACIAHADQAGAEABAGQABAHgFAFQgGAFgMAAQgKAAgHgEgAqeiaQgGgFAAgIQAAgJANgLQADgDADgBQAHgEAIAFQAHAFgBAIQgBAEgDAGIgEALQgEAFgEACIgGACQgGAAgGgHgAJ6isQgFgDgBgIQgCgPALgHQAJgGARAGQAKADADAHQABAEAAAEQAAAMgGAEQgDACgGAAIgQABQgIAAgEgEgAHPjJQgIgCgKgJQgIgHgBgFQgDgGAFgHQAEgGAIgBQAEACAOABQAMABAFAHQAEAFgCALQgBAIgEAEQgFAFgHAAIgHgBgAm6kFIgKgDQgGgDgBgGQgBgEACgFQACgIAIgEQAGgCAFAAIAKADIALAEQAJAEgBAKQgBAKgJADIgLABg");
	this.shape.setTransform(-0.0009,0.0208);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-67.7,-29.6,135.4,59.3);


(lib.Tween212 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Aj6EcIgDgBQgDgBAAgGQAAgFACgCIAFgBQAOABAKgCQAGgBACACIABAEQAAADgCACQgCACgDABIgDABIgCACQgCABgHAAgAEBEWQgGAAgBgDQgBgCADgCIAFgDIAegFQAEACALAAQADgBADABQADACAAACQAAADgDACIgHABIgMAEIgKABgAHbCpQgCgCAAgEQAAgEACgCIAEgBIAOgCQgBgGAEgBQAFgDACAEQADAEgDADIAIABQAFACgBAEQgBADgHABIgMACIgHACIgHABQgEAAgCgCgAnFCXIgHgBQgDgBgBgCQgBgDACgDQACgDADABIABAAQABAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIAiABIAEACQACACgCAFQgBAAAAABQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIgbgBgAqhijIgGgBQgDgCAAgCQABgDAEgBIAPgGIABgBQAGAAAFACQAEABABABQAAABAAABQABAAAAABQAAAAgBABQAAABAAAAQgBAEgFABIgJACgAKNi6QgNgBgHgCQgDgBgCgCQgBgCAAgEQgBgCACgDQACgDAHgBIAmACIAFABQADABAAADIgDAGIgBADQAAABgBAAQAAAAAAABQgBAAAAAAQAAAAgBAAIgHAEgAHCjWIgMgCQgDAAgCgBQgCgCAAgEQAAgDAEgDQAEgEAFgCIAGgCIACgCQACgCAEAAIAYAAIAIABQAEACAAADQAAAFgFACIgPAHQgHAFgFACIgHAAIgFAAgAnFkIQgEAAgCgCQgCgCAAgDQAAgEADgEQADgCAEgBQABAAAAAAQAAAAABAAQAAgBAAAAQAAAAAAAAIAYABIAFACQACADgDAEIgCAGIgVACIgHABIgCAAg");
	this.shape.setTransform(-0.0031,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.3,-28.4,136.6,56.9);


(lib.Tween211 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjvEoQgIgCgDgDQgCgDAAgIIgBgPQAAgNAFgEQAEgDAHgBIAKgBQACABAJAGQAOAIADAEQAEAIgEAJQgEAIgJAFQgHAFgHABIgCAAIgLgCgAETEiIgDgEIgGAAQgLAAgEgGQgEgEAAgGQAAgFAEgEQAEgEAHgCIANgBIARgCQALAAAFAEQAGAFAAAIQABAIgEAGQgFAKgLACIgGABQgIAAgGgGgAH2C1QgMgBgFgHQgFgIAFgIQAEgIAKgDQAIgDAJABIAMACQAGADACAGQABAEgCAFQgEAJgJAFQgIAEgIAAIgEgBgAm3CiIgKgCIgLACQgLABgFgJQgCgEAAgFQAAgFAEgDQACgDAMgEIAXgKQAGgCAGABQAHABADAFQADAEAAAIQAAAOgIAGQgFAFgKAAIgEAAgAqXiQQgGgCgCgFQgUAAgFgHQgEgFABgHQACgGAFgDQADgCAIgBQAIgBADgBIAJgFQAFgBAIADQAHACACADQADADAAAHQABAJgCAEQgBACgGAHQgEAEgEACIgFACIgGgCgAKSipQgLAAgGgGQgEgEAAgMQgBgQAGgGQAHgHANABQAQAAAFAKIAEAGQACACAGACQADADACAFQABAFgCAEQgEAIgKADQgGACgLAAIgKAAgAGzjLQgGgCgDgGQgDgFABgGQABgLAMgIQAIgFAPgCQAMgCAHAFQAJAEgBALQgBAKgJAEIgHAEIgEAFQgCAEgGABIgJAAIgFAAIgJgBgAnEj+QgGgFgCgDQgBgDgBgJQAAgPAHgFQAFgEALABQAHAAAFADQAGAFAAAFQALACABALQACALgLAFIgKADIgIAFIgCAAQgGAAgIgHg");
	this.shape.setTransform(-0.0194,0.0189);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70,-29.7,140,59.5);


(lib.Tween210 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AEJEdIgDgBQgEgDADgEIAGgFIALgKQAGgGAHABIAGAAIAEABIADAEQACAGAAABQgBADgDADQgNALgPAAIgJgBgAEfEMIgBABIgEADQgDABgBACQADAAAKgFIAEgDIgHAAgAkDEYQgFAAgCgBQgDgDABgGQAAgDACgCIAEAAIAIgBQAaAAANACQAFABABACQAEADgCADQgCAEgHgBQgIgBgDABIgIACIgLABgAH/CsIgEgBQgDgBgBgDIgFgIIgHgBQgEAAgCgBQgDgCAAgDIAFgEIAZABIAFABQADABABAEIAAAHQgBAHgCACIgEACIgDgBgAm6CfIgFgDIgOgKIgEgFQgCgEADgCQABgCAFAAIAJAAIABAAQAJgBAFAEIADADIADACQACACAAAEIgCAFQAAAFgBABIgEABgAqdimQgGAAgDgCQgGgFAGgIQABAAABAAQAAAAAAAAQABAAAAAAQAAgBAAAAIAHAAIAHABIAFADQAEACAMABIAGACQACADAAADQgBADgHAAgAKXinIgBgEQgCgDgGgBQgGAAgCgDQgCgCABgFIAGgNIADgEIAEAAQAHgBADAEQABACAAAFQACAEADACQAHADAAACQABADgDACQgCACgFABQAAAEgCACIgDACQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBgBAAgAG+jMQgHgDAAgDQgBgDAEgCQAHgGAMAAIAHAAIAFgCIAKgBQAIAAABAEQACAEgEAEQgFAGgGADQgFACgGAAQgJAAgNgDgAnCkIQAAgEADgCQAGgEAFgBQAAgHADgCIAFgBIAXAAIADABQAEACgCAEQgCADgEACIgHADIgLAGQgIAEgKAAQgIgBAAgDg");
	this.shape.setTransform(0.0046,0.0194);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.1,-28.6,136.3,57.3);


(lib.Tween209 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AkHElQgJgBgFgHQgEgHAEgHQACgEAFgDIAIgGQAIgKAGgEQAKgIAKAGQAGAEADALQAEANgFAFQgCADgFABIgIADIgOAHQgHAEgGAAIgBAAgAEKEcQgLgGgDgNQgBgJAEgFQADgEAIgCQAKgCAIACQAHADAEAEIAFAGQADADABAFQACAHgFAGQgDAFgIADQgFACgEAAQgIAAgHgFgAHtCxQgNgBgDgGQgLABgGgHQgDgEAAgFQgBgFADgDQAFgHANgBQAQgCAPAAIAGABQAHADABAIQACAGgDAHQgEAKgGADQgEACgIAAIgGAAgAnHCbQgGgCgFgHQgGgGgBgEQgCgFAEgGQAEgFAGgBQAIgDAPAFQAOAFAFAHQAEAEAAAGQAAAHgEADQgEAEgKABIgGAAQgLAAgFgDgAqgiWQgJgDgDgFQgDgFACgJQABgHADgDIAFgEIAHgDIANgHQAHgEAGABQAGABAEAEQAEAFABAGQABAKgJALQgGAHgKADQgGACgGAAIgIAAgAKXisIgSgFQgLgEgEgGQgDgFAAgGQAAgIAFgFQADgCAGgBQAUgDAPAMQAIAHACAJQACAMgKAEQgCACgFAAIgIgBgAG1jJQgKgEgCgLIgBgNQgBgJACgFQACgKAMAAIAMABQAHAAAEAEQAGAFgCAKIgEAQQgDAJgDAEQgGAFgGAAIgHgCgAnSkAQgIgDgDgHQgDgJAHgIQAFgGAKgCQAIgBAKABQAPABAEAHQAEAGgEAIQgDAIgLAFQgFACgKAAQgLAAgFgCg");
	this.shape.setTransform(0.0024,0.0325);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.6,-29.2,137.3,58.5);


(lib.Tween208 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ADzEfIgGgCQgCgDAAgDQAFgEAMgBIAWABQAFAAAEACQABAAAAAAQABAAAAABQABAAAAAAQAAABABABQABACgDADIgEADQgEABgKAAQgSAAgGgCgAkFEEQgFgEABgEQACgFAGAAQAMgCAGADIAHAFIAGAFQADACAIABQAIAAADADIACACQAAABAAAAQAAABgBAAQAAABAAAAQgBAAgBABQgCABgKABIgEAAQgZAAgPgMgAHoC0QgFgBgBgCIgBgHIgHgFQgDgDABgDQAAgEACgCQADgCAIAAQABAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAAAQAKAAAFACQAJACADAIIABAJIgBAGQgDAFgIAAQgIAAgHgCgAm4CeIgGgFIgIgBQgGgBABgEQAAgDADgBIAHgBQAAAAABAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIALAEQABAAAAABQAAAAABAAQAAAAAAABQAAAAAAABIAPABQADAAACABQADADgCADQgCACgGAAgAqsiUIgIgCQgDgBgCgDQgCgEABgDQADgFAKAAIASgBQASAAAIACQAGABABAEQgCADgHABIgKACIgJAEQgDACgMAAgAKqimIgTgBQgFAAgBgCIgCgGQAAgIADgCIAGgBIAZAAQAAAAABAAQAAAAAAAAQABAAAAgBQgBAAAAAAQAFAAACACQAEAEgCAJQAAAAAAABQAAAAgBAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgHABIgFAAgAGpjXQgDgCgEgGQgDgGgDgCQABgEAIgBQANgBAFADIAGADIAGAAQAOgBAFAHQgNAMgRABQgLAAgEgDgAnGkKQgCgBAAgFQABgGAEgEQAEgEAGAAQAAAAABgBQAAAAAAAAQAAAAABAAQAAgBAAAAQAIAAAKACIAGADQADADgBADIgGADIgMAHQgGADgMAAIgFgCg");
	this.shape.setTransform(0.0262,-0.0042);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.9,-28.9,139.9,57.8);


(lib.Tween207 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AD7EYQABgEAIgBIAbgEQAKgBAGACQAGACABAEIgGAGIgGAGIgIACIgEAAQgTAAgQgMgAj+EHQgFgEABgEQACgFAGAAQAMgCAGADIAHAFIAGAFQADACAIABQAIAAADADIACACQAAABAAAAQAAABAAAAQgBABAAAAQgBAAgBABQgCABgKABIgDAAQgaAAgPgMgAH/DCIgGgCIgGgEQgJgEgEgDQgGgGACgKQABgGAGgKQADgFAEgCQAIgFAMAIQAFAEACADQADAGAAAKQAAAMgCAFQgEAJgHAAIgCAAgAm6CyQgGgEgBgGQAAgEABgFQAEgPAPgHQAIgDAHABQAIACACAHIAAAMIgBANQgCAIgLABIgHABIgGACIgDAAQgEAAgEgDgAqliRIgIgCQgDgBgCgDQgCgEABgDQADgFAKAAIASgBQASAAAIACQAGABABAEQgCADgHABIgKACIgJAEQgDACgMAAgAKWiXQgFgDgDgFIgDgJIgHgIQgDgFACgGQACgGAFgCIAFgCQAEgBABgCIAEgGQAEgFAKABQAGABACADQAEACACAHQABAJgEARIgFAOQgEAHgHABIgDABQgEAAgEgDgAGwjUQgDgCgEgGQgDgGgDgCQABgEAIgBQANgBAFADIAGADIAGAAQAOgBAFAHQgNAMgRABQgLAAgEgDgAmsjwQgGgBgFgEQgFgEgBgGIgBgMIgCgHQgBgGAFgGQAFgGAKABQAKACAEAIQADADACAJQACALgCAFQgCAGgFAEQgEADgGAAIgBAAg");
	this.shape.setTransform(0.0133,0.0425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.2,-29.2,138.5,58.5);


(lib.Tween206 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AiWEfIgIAAIgCgBIgCgCQgDgFADgFQACgEAGgBQABAAAAAAQAAAAABAAQAAAAAAgBQAAAAAAAAIAWABIAFACQACABgCAEQgBACgDACIgKAEIgGADIgDABIgCgBgAFGEWQgFgCAAgCQAEgEAIgCIAMAAIAMgCQAIgCAHACQAHABACAFQgCABgCAFQgDAFgJABIgEAAQgOAAgVgGgAJICwQgDgBgBgCIgJgDIgHgEQgKgDgCgCQgCgCgBgDQAAgEACgCQACgCAGAAIAWABQAEABAEACQAIAGgBAGQAAADgEAFIgDADIgDABIgCAAgAlzCSQgPgCgHgGQgBgBAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQgBgGAGAAIAIgBQABAAAAgBQAAAAABAAQAAAAAAAAQAAAAAAgBQAGAAAHAEIAEACIAHABQAFABADABQAEABABADQAAAAgBABQAAAAAAAAQAAABgBAAQAAABAAAAQgFAFgIABIgDAAIgKgBgAo+iiIgKgBIgEgBQgCAAgCgDQgDgFAAgDQABgDAEgBQALgEARACQAEAAACADQABACgBADQgBAFgEADQgEADgFAAgAIZjgIgQgBQgJgBgEgEQAAgBgBAAQAAgBAAAAQgBgBAAAAQAAAAABgBIACgDQAFgFANABIANABIADAAIADACQAEAFAAADQAAAFgFAAIgFABIgDAAgAmAkPQgEgCgFgFIgCgEIADgCQAHgDANAAIAVABQAIAAAAAEQABAEgEAEQgGAEgOABIgGAAQgIAAgEgCg");
	this.shape.setTransform(-0.0021,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.6,-28.8,119.2,57.6);


(lib.Tween205 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjuEoQgJgBgEgJQgFgHABgKIACgIQAFgNANgBQAFgBAEABQAGABAFAEQADAEABAHQADAOgIAKQgGAKgKAAIgGgBgADvENQgFgCAAgCQAEgEAIgBIAMAAIAMgDQAIgBAHABQAHABABAFQgCACgBAFQgDAEgJABIgEAAQgOAAgVgGgAHcCiQgLAAgEgEQgFgDgBgJIABgIQAEgHAJgCQAHgCAIAAQAQAAAGAFQAHAGgCAMQgBAGgDACQgEAFgNAAgAnKCJQgQgCgGgGQgBgBAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQgBgFAFgBIAJgBQABAAAAAAQAAgBABAAQAAAAAAAAQAAAAAAAAQAGAAAHADIAEADIAGABQAFAAAEABQAEABABADQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBABQgFAEgHABIgDAAIgKgBgAqlidQgHgFABgNQAAgKAEgKQAEgLAHAAQABAAABAAQAAAAABAAQAAAAAAAAQABAAAAgBQAKADADAGIAEAPQABAHgGAKQgFAIgFADQgDACgEAAQgEAAgEgEgAJ/jRQgEgDgFgJQAGgFAIAAQAIAAAIAFIADACIAPACQAGACABAEQgHAHgQAAQgRAAgGgFgAG9jWIgIAAQgEAAgEgCQgDgDgBgEQgDgEgCgFQgBgHAGgGQAFgHAGgBIAGAAQAFAAAGADQAGAEADADQADAEAAAFQABAHgDAGQgDAHgHAAgAnYkYQgDgCgFgFIgCgDIADgDQAHgDANAAIAVABQAHAAABAFQABAEgFADQgFAEgOABIgGAAQgIAAgFgCg");
	this.shape.setTransform(0,-0.0117);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.4,-29.7,136.9,59.4);


(lib.Tween204 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ADuEYQgFgCAAgCQAEgEAHgBIANAAIAMgDQAHgBAIABQAHABABAFQgCACgCAFQgDAEgIABIgFAAQgNAAgVgGgAjtEbIgCgBIgCgCQgCgDACgCQAAgDAEgBIAIgCQAAAAAAAAQABAAAAgBQAAAAAAAAQAAAAAAAAQAFgBAKAEIAJACQACACAAAEQAAACgEACIgFABgAHGCpIgDAAQgBgBAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQgBgBAAgBQAAAAAAgBQAAgBAAAAQAAAAABgBIADgDQAKgFAKgBIAEgBIADgCQADgCAEABQAFAAACADQACACgBADIAAAIIgCAEQgBACgFAAgAnMCUQgPgCgGgGQgBAAgBgBQAAgBAAAAQgBgBAAAAQAAAAAAgBQgBgFAGgBIAJgBQAAAAABAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQAHAAAHADIAEADIAGABQAFAAAEABQAEABAAADQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBABQgFAEgHABIgEAAIgKgBgAqZinIgEgBIgDgBIgFgBQgEgBgBgDQAAgDADgCIAGgBIAQACIACABIAJACQAGABgBAFQgBAEgGAAQgMAAgFgCgAJ9jGQgDgDgGgJQAHgFAIAAQAIAAAHAFIAEACIAPACQAFACABAEQgGAHgQAAQgRAAgHgFgAGyjPIgDAAQgCgBgBgFIABgJQABgFAFgCIAFAAIAgABIAFABQACACgBAEQAAACgDADQgBADgDABIgIADIgFADIgFAAgAG2jaIAPABQgFgCgKAAgAnZkNQgEgCgEgFIgCgDIADgDQAHgDANAAIAUABQAIAAABAFQABAEgFADQgGAEgNABIgGAAQgJAAgEgCg");
	this.shape.setTransform(-0.0036,0.0317);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.3,-28.5,136.6,57.1);


(lib.Tween203 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AiKERQgHgEgDgOQgCgJAAgLQAAgKABgFQAEgIAHgCQAJgBAHAJIAJAQIAIAOQAEAKgFAGIgNAGIgLAFIgCAAQgDAAgDgCgAE+EMQgFgCgFgFIgIgHQAEgGAKABIAQAAIAQgDIABgBQADACAHAAIAEADQAAABAAAAQAAABABABQAAAAgBABQAAAAAAABIgGADQgCABgDAEIgGAFQgDACgKAAQgIAAgFgCgAI9CaQgFAAgHgHQgHgHgCgEQgEgHAEgGQACgEAHgFIAEgGQAFgHAJABQAIACADAIQABAFAAAMIACAGQACAHgJAIQgHAEgFAAIgBAAgAo5i0QgOgCgDgCQgHgEABgJQABgJAIgDQAGgCADgCIAEgEQAFgFAJACQAIABADAEQAFAHgFAKQgDAJgFAFQgFAFgDABIgCAAIgGgCgAISjeQgFgBgEgDQgEgGABgRQAAgMAEgFQAEgFALgCQAKgCAEABQAGACAEAFQADAFAAAFQAAAJgKALIgGAGIgIAIQgDACgEAAIgDgBg");
	this.shape.setTransform(-0.0135,0.0226);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.3,-27.5,118.69999999999999,55.1);


(lib.Tween202 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ADuEYQgGgCAAgCQAEgEAIgBIANAAIALgDQAIgBAIABQAGABACAFQgCACgCAFQgDAEgIABIgFAAQgNAAgVgGgAjpEYIgDAAIgDgDQgDgDgBgCQABgFADgCQACgCAFgBQAPgDAMAKIACACQABACgCADIgFADIgGACgAHZCfIgCAAQgBgBgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAgBABgBQAAAAAAgBQAAgBAAAAQABAAAAgBQAEgFAKgDQAIgCAEABIAGACIAFABQAGABAEAGQABAEgBACQgCAEgGAAIgFAAIgfgCgAnMCUQgPgCgGgGQgBAAgBgBQAAgBAAAAQgBgBAAAAQAAAAAAgBQgBgFAGgBIAJgBQAAAAABAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQAGAAAIADIADADIAHABQAFAAAEABQAEABAAADQAAAAAAABQAAAAAAABQgBAAAAABQgBAAAAABQgFAEgHABIgEAAIgKgBgAqYidIgMAAIgEgBQgCgBAAgGIAAgFQACgCAFAAIATABQAFAAABACQACADgDADQgDAEgBACIgEAAIgFAAgAJ9jGQgEgDgFgJQAHgFAIAAQAIAAAHAFIAEACIAOACQAGACABAEQgGAHgQAAQgRAAgHgFgAHCjUIgIgBIgFgCQgDgDACgGQAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAIADgBIAFAAIAYgCQAIAAAEADQACACABADQABAEgCACQgCACgEAAIgNACIgGABIgDABIgFgBgAnZkNQgEgCgEgFIgDgDIAEgDQAGgDANAAIAVABQAIAAAAAFQACAEgFADQgGAEgNABIgHAAQgIAAgEgCg");
	this.shape.setTransform(0,0.0317);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.3,-28.5,136.6,57.1);


(lib.Tween201 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Aj1EbQgEgHAGgIIALgLQALgJAEgCQAEgBAGAAQAHAAAFADQAIAFAAAJQABAJgGAHQgDADgGAEQgNAHgNAAQgOAAgEgJgADzESQgFgCAAgCQAEgEAHgBIANAAIAMgDQAHgBAIABQAHABABAFQgCACgCAFQgDAEgIABIgFAAQgNAAgVgGgAHKCdQgEgHADgIIAEgFIACgGQACgFALgCIAPgCQALAAAFAHQADAFgBAGQAAAGgCAEQgBADgGAFQgGAGgFAAIgJgBIgIABIgCAAQgHAAgFgHgAnHCOQgPgCgGgGQgBAAgBgBQAAgBAAAAQgBgBAAAAQAAAAAAgBQgBgFAGgBIAJgBQAAAAABAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQAHAAAHADIAEADIAGABQAFAAAEABQAEABAAADQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBABQgFAEgHABIgEAAIgKgBgAqpifQgGgFAAgIQAAgJANgLQADgDADgBQAHgEAIAFQAHAFgBAIQgBAEgDAGIgEALQgEAFgEACIgGABQgGAAgGgGgAKCjMQgDgDgGgJQAHgFAIAAQAIAAAHAFIAEACIAPACQAFACABAEQgGAHgQAAQgRAAgHgFgAHEjOQgIgCgKgJQgIgHgBgFQgDgGAFgHQAEgGAIgBQAEACAOABQAMABAFAHQAEAFgCALQgBAIgEAEQgFAFgHAAIgHgBgAnUkTQgEgCgEgFIgCgDIADgDQAHgDANAAIAUABQAIAAABAFQABAEgFADQgGAEgNABIgHAAQgIAAgEgCg");
	this.shape.setTransform(-0.0009,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.8,-29.1,137.6,58.3);


(lib.Tween200 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Aj6EcIgDgBQgDgBAAgGQAAgFACgCIAFgBQAOABAKgCQAGgBACACIABAEQAAADgCACQgCACgDABIgDABIgCACQgCABgHAAgAEBEWQgGAAgBgDQgBgCADgCIAFgDIAegFQAEACALAAQADgBADABQADACAAACQAAADgDACIgHABIgMAEIgKABgAHbCpQgCgCAAgEQAAgEACgCIAEgBIAOgCQgBgGAEgBQAFgDACAEQADAEgDADIAIABQAFACgBAEQgBADgHABIgMACIgHACIgHABQgEAAgCgCgAnFCXIgHgBQgDgBgBgCQgBgDACgDQACgDADABIABAAQABAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIAiABIAEACQACACgCAFQgBAAAAABQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIgbgBgAqhijIgGgBQgDgCAAgCQABgDAEgBIAPgGIABgBQAGAAAFACQAEABABABQAAABAAABQABAAAAABQAAAAgBABQAAABAAAAQgBAEgFABIgJACgAKNi6QgNgBgHgCQgDgBgCgCQgBgCAAgEQgBgCACgDQACgDAHgBIAmACIAFABQADABAAADIgDAGIgBADQAAABgBAAQAAAAAAABQgBAAAAAAQAAAAgBAAIgHAEgAHCjWIgMgCQgDAAgCgBQgCgCAAgEQAAgDAEgDQAEgEAFgCIAGgCIACgCQACgCAEAAIAYAAIAIABQAEACAAADQAAAFgFACIgPAHQgHAFgFACIgHAAIgFAAgAnFkIQgEAAgCgCQgCgCAAgDQAAgEADgEQADgCAEgBQABAAAAAAQAAAAABAAQAAgBAAAAQAAAAAAAAIAYABIAFACQACADgDAEIgCAGIgVACIgHABIgCAAg");
	this.shape.setTransform(-0.0031,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.3,-28.4,136.6,56.9);


(lib.Tween199 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjvEoQgIgCgDgDQgCgDAAgIIgBgPQAAgNAFgEQAEgDAHgBIAKgBQACABAJAGQAOAIADAEQAEAIgEAJQgEAIgJAFQgHAFgHABIgCAAIgLgCgAETEiIgDgEIgGAAQgLAAgEgGQgEgEAAgGQAAgFAEgEQAEgEAHgCIANgBIARgCQALAAAFAEQAGAFAAAIQABAIgEAGQgFAKgLACIgGABQgIAAgGgGgAH2C1QgMgBgFgHQgFgIAFgIQAEgIAKgDQAIgDAJABIAMACQAGADACAGQABAEgCAFQgEAJgJAFQgIAEgIAAIgEgBgAm3CiIgKgCIgLACQgLABgFgJQgCgEAAgFQAAgFAEgDQACgDAMgEIAXgKQAGgCAGABQAHABADAFQADAEAAAIQAAAOgIAGQgFAFgKAAIgEAAgAqXiQQgGgCgCgFQgUAAgFgHQgEgFABgHQACgGAFgDQADgCAIgBQAIgBADgBIAJgFQAFgBAIADQAHACACADQADADAAAHQABAJgCAEQgBACgGAHQgEAEgEACIgFACIgGgCgAKSipQgLAAgGgGQgEgEAAgMQgBgQAGgGQAHgHANABQAQAAAFAKIAEAGQACACAGACQADADACAFQABAFgCAEQgEAIgKADQgGACgLAAIgKAAgAGzjLQgGgCgDgGQgDgFABgGQABgLAMgIQAIgFAPgCQAMgCAHAFQAJAEgBALQgBAKgJAEIgHAEIgEAFQgCAEgGABIgJAAIgFAAIgJgBgAnEj+QgGgFgCgDQgBgDgBgJQAAgPAHgFQAFgEALABQAHAAAFADQAGAFAAAFQALACABALQACALgLAFIgKADIgIAFIgCAAQgGAAgIgHg");
	this.shape.setTransform(-0.0194,0.0189);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70,-29.7,140,59.5);


(lib.Tween198 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AEJEdIgDgBQgEgDADgEIAGgFIALgKQAGgGAHABIAGAAIAEABIADAEQACAGAAABQgBADgDADQgNALgPAAIgJgBgAEfEMIgBABIgEADQgDABgBACQADAAAKgFIAEgDIgHAAgAkDEYQgFAAgCgBQgDgDABgGQAAgDACgCIAEAAIAIgBQAaAAANACQAFABABACQAEADgCADQgCAEgHgBQgIgBgDABIgIACIgLABgAH/CsIgEgBQgDgBgBgDIgFgIIgHgBQgEAAgCgBQgDgCAAgDIAFgEIAZABIAFABQADABABAEIAAAHQgBAHgCACIgEACIgDgBgAm6CfIgFgDIgOgKIgEgFQgCgEADgCQABgCAFAAIAJAAIABAAQAJgBAFAEIADADIADACQACACAAAEIgCAFQAAAFgBABIgEABgAqdimQgGAAgDgCQgGgFAGgIQABAAABAAQAAAAAAAAQABAAAAAAQAAgBAAAAIAHAAIAHABIAFADQAEACAMABIAGACQACADAAADQgBADgHAAgAKXinIgBgEQgCgDgGgBQgGAAgCgDQgCgCABgFIAGgNIADgEIAEAAQAHgBADAEQABACAAAFQACAEADACQAHADAAACQABADgDACQgCACgFABQAAAEgCACIgDACQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBgBAAgAG+jMQgHgDAAgDQgBgDAEgCQAHgGAMAAIAHAAIAFgCIAKgBQAIAAABAEQACAEgEAEQgFAGgGADQgFACgGAAQgJAAgNgDgAnCkIQAAgEADgCQAGgEAFgBQAAgHADgCIAFgBIAXAAIADABQAEACgCAEQgCADgEACIgHADIgLAGQgIAEgKAAQgIgBAAgDg");
	this.shape.setTransform(0.0046,0.0194);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.1,-28.6,136.3,57.3);


(lib.Tween197 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AkHElQgJgBgFgHQgEgHAEgHQACgEAFgDIAIgGQAIgKAGgEQAKgIAKAGQAGAEADALQAEANgFAFQgCADgFABIgIADIgOAHQgHAEgGAAIgBAAgAEKEcQgLgGgDgNQgBgJAEgFQADgEAIgCQAKgCAIACQAHADAEAEIAFAGQADADABAFQACAHgFAGQgDAFgIADQgFACgEAAQgIAAgHgFgAHtCxQgNgBgDgGQgLABgGgHQgDgEAAgFQgBgFADgDQAFgHANgBQAQgCAPAAIAGABQAHADABAIQACAGgDAHQgEAKgGADQgEACgIAAIgGAAgAnHCbQgGgCgFgHQgGgGgBgEQgCgFAEgGQAEgFAGgBQAIgDAPAFQAOAFAFAHQAEAEAAAGQAAAHgEADQgEAEgKABIgGAAQgLAAgFgDgAqgiWQgJgDgDgFQgDgFACgJQABgHADgDIAFgEIAHgDIANgHQAHgEAGABQAGABAEAEQAEAFABAGQABAKgJALQgGAHgKADQgGACgGAAIgIAAgAKXisIgSgFQgLgEgEgGQgDgFAAgGQAAgIAFgFQADgCAGgBQAUgDAPAMQAIAHACAJQACAMgKAEQgCACgFAAIgIgBgAG1jJQgKgEgCgLIgBgNQgBgJACgFQACgKAMAAIAMABQAHAAAEAEQAGAFgCAKIgEAQQgDAJgDAEQgGAFgGAAIgHgCgAnSkAQgIgDgDgHQgDgJAHgIQAFgGAKgCQAIgBAKABQAPABAEAHQAEAGgEAIQgDAIgLAFQgFACgKAAQgLAAgFgCg");
	this.shape.setTransform(0.0024,0.0325);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.6,-29.2,137.3,58.5);


(lib.Tween196 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ADzEfIgGgCQgCgDAAgDQAFgEAMgBIAWABQAFAAAEACQABAAAAAAQABAAAAABQABAAAAAAQAAABABABQABACgDADIgEADQgEABgKAAQgSAAgGgCgAkFEEQgFgEABgEQACgFAGAAQAMgCAGADIAHAFIAGAFQADACAIABQAIAAADADIACACQAAABAAAAQAAABgBAAQAAABAAAAQgBAAgBABQgCABgKABIgEAAQgZAAgPgMgAHoC0QgFgBgBgCIgBgHIgHgFQgDgDABgDQAAgEACgCQADgCAIAAQABAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAAAQAKAAAFACQAJACADAIIABAJIgBAGQgDAFgIAAQgIAAgHgCgAm4CeIgGgFIgIgBQgGgBABgEQAAgDADgBIAHgBQAAAAABAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIALAEQABAAAAABQAAAAABAAQAAAAAAABQAAAAAAABIAPABQADAAACABQADADgCADQgCACgGAAgAqsiUIgIgCQgDgBgCgDQgCgEABgDQADgFAKAAIASgBQASAAAIACQAGABABAEQgCADgHABIgKACIgJAEQgDACgMAAgAKqimIgTgBQgFAAgBgCIgCgGQAAgIADgCIAGgBIAZAAQAAAAABAAQAAAAAAAAQABAAAAgBQgBAAAAAAQAFAAACACQAEAEgCAJQAAAAAAABQAAAAgBAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgHABIgFAAgAGpjXQgDgCgEgGQgDgGgDgCQABgEAIgBQANgBAFADIAGADIAGAAQAOgBAFAHQgNAMgRABQgLAAgEgDgAnGkKQgCgBAAgFQABgGAEgEQAEgEAGAAQAAAAABgBQAAAAAAAAQAAAAABAAQAAgBAAAAQAIAAAKACIAGADQADADgBADIgGADIgMAHQgGADgMAAIgFgCg");
	this.shape.setTransform(0.0262,-0.0042);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.9,-28.9,139.9,57.8);


(lib.Tween195 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AD7EYQABgEAIgBIAbgEQAKgBAGACQAGACABAEIgGAGIgGAGIgIACIgEAAQgTAAgQgMgAj+EHQgFgEABgEQACgFAGAAQAMgCAGADIAHAFIAGAFQADACAIABQAIAAADADIACACQAAABAAAAQAAABAAAAQgBABAAAAQgBAAgBABQgCABgKABIgDAAQgaAAgPgMgAH/DCIgGgCIgGgEQgJgEgEgDQgGgGACgKQABgGAGgKQADgFAEgCQAIgFAMAIQAFAEACADQADAGAAAKQAAAMgCAFQgEAJgHAAIgCAAgAm6CyQgGgEgBgGQAAgEABgFQAEgPAPgHQAIgDAHABQAIACACAHIAAAMIgBANQgCAIgLABIgHABIgGACIgDAAQgEAAgEgDgAqliRIgIgCQgDgBgCgDQgCgEABgDQADgFAKAAIASgBQASAAAIACQAGABABAEQgCADgHABIgKACIgJAEQgDACgMAAgAKWiXQgFgDgDgFIgDgJIgHgIQgDgFACgGQACgGAFgCIAFgCQAEgBABgCIAEgGQAEgFAKABQAGABACADQAEACACAHQABAJgEARIgFAOQgEAHgHABIgDABQgEAAgEgDgAGwjUQgDgCgEgGQgDgGgDgCQABgEAIgBQANgBAFADIAGADIAGAAQAOgBAFAHQgNAMgRABQgLAAgEgDgAmsjwQgGgBgFgEQgFgEgBgGIgBgMIgCgHQgBgGAFgGQAFgGAKABQAKACAEAIQADADACAJQACALgCAFQgCAGgFAEQgEADgGAAIgBAAg");
	this.shape.setTransform(0.0133,0.0425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.2,-29.2,138.5,58.5);


(lib.Tween194 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjuEfIgIAAIgCgBIgCgCQgDgFADgFQACgEAGgBQABAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAAAIAWABIAFACQACABgCAEQgBACgDACIgKAEIgGADIgCABIgDgBgADuEWQgFgCAAgCQAEgEAIgCIAMAAIAMgCQAIgCAHACQAHABACAFQgCABgCAFQgDAFgJABIgEAAQgNAAgWgGgAHwCwQgDgBgBgCIgJgDIgHgEQgKgDgCgCQgCgCgBgDQAAgEACgCQACgCAGAAIAWABQAEABAEACQAIAGgBAGQAAADgEAFIgDADIgCABIgDAAgAnLCSQgPgCgHgGQAAgBgBAAQAAgBgBAAQAAgBAAAAQAAgBAAAAQgBgGAGAAIAIgBQABAAAAgBQABAAAAAAQAAAAAAAAQAAAAAAgBQAGAAAHAEIAEACIAHABQAFABADABQAEABABADQAAAAAAABQAAAAgBAAQAAABAAAAQgBABAAAAQgFAFgIABIgDAAIgKgBgAqWiiIgKgBIgEgBQgCAAgCgDQgDgFAAgDQABgDAEgBQALgEARACQAEAAACADQABACgBADQgBAFgEADQgEADgFAAgAJ+jJQgEgCgFgJQAGgFAJAAQAIAAAHAFIAEACIAOACQAGACABAEQgGAHgRAAQgQAAgHgGgAHBjgIgQgBQgJgBgEgEQAAgBgBAAQAAgBAAAAQAAgBAAAAQAAAAAAgBIACgDQAFgFANABIANABIADAAIADACQAEAFAAADQAAAFgFAAIgFABIgDAAgAnYkPQgEgCgFgFIgCgEIADgCQAHgDANAAIAVABQAIAAAAAEQABAEgEAEQgGAEgOABIgGAAQgIAAgEgCg");
	this.shape.setTransform(0.0214,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.3,-28.8,136.7,57.6);


(lib.Tween193 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjuEoQgJgBgEgJQgFgHABgKIACgIQAFgNANgBQAFgBAEABQAGABAFAEQADAEABAHQADAOgIAKQgGAKgKAAIgGgBgADvENQgFgCAAgCQAEgEAIgBIAMAAIAMgDQAIgBAHABQAHABABAFQgCACgBAFQgDAEgJABIgEAAQgOAAgVgGgAHcCiQgLAAgEgEQgFgDgBgJIABgIQAEgHAJgCQAHgCAIAAQAQAAAGAFQAHAGgCAMQgBAGgDACQgEAFgNAAgAnKCJQgQgCgGgGQgBgBAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQgBgFAFgBIAJgBQABAAAAAAQAAgBABAAQAAAAAAAAQAAAAAAAAQAGAAAHADIAEADIAGABQAFAAAEABQAEABABADQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBABQgFAEgHABIgDAAIgKgBgAqlidQgHgFABgNQAAgKAEgKQAEgLAHAAQABAAABAAQAAAAABAAQAAAAAAAAQABAAAAgBQAKADADAGIAEAPQABAHgGAKQgFAIgFADQgDACgEAAQgEAAgEgEgAJ/jRQgEgDgFgJQAGgFAIAAQAIAAAIAFIADACIAPACQAGACABAEQgHAHgQAAQgRAAgGgFgAG9jWIgIAAQgEAAgEgCQgDgDgBgEQgDgEgCgFQgBgHAGgGQAFgHAGgBIAGAAQAFAAAGADQAGAEADADQADAEAAAFQABAHgDAGQgDAHgHAAgAnYkYQgDgCgFgFIgCgDIADgDQAHgDANAAIAVABQAHAAABAFQABAEgFADQgFAEgOABIgGAAQgIAAgFgCg");
	this.shape.setTransform(0,-0.0117);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.4,-29.7,136.9,59.4);


(lib.Tween192 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ADuEYQgFgCAAgCQAEgEAHgBIANAAIAMgDQAHgBAIABQAHABABAFQgCACgCAFQgDAEgIABIgFAAQgNAAgVgGgAjtEbIgCgBIgCgCQgCgDACgCQAAgDAEgBIAIgCQAAAAAAAAQABAAAAgBQAAAAAAAAQAAAAAAAAQAFgBAKAEIAJACQACACAAAEQAAACgEACIgFABgAHGCpIgDAAQgBgBAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQgBgBAAgBQAAAAAAgBQAAgBAAAAQAAAAABgBIADgDQAKgFAKgBIAEgBIADgCQADgCAEABQAFAAACADQACACgBADIAAAIIgCAEQgBACgFAAgAnMCUQgPgCgGgGQgBAAgBgBQAAgBAAAAQgBgBAAAAQAAAAAAgBQgBgFAGgBIAJgBQAAAAABAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQAHAAAHADIAEADIAGABQAFAAAEABQAEABAAADQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBABQgFAEgHABIgEAAIgKgBgAqZinIgEgBIgDgBIgFgBQgEgBgBgDQAAgDADgCIAGgBIAQACIACABIAJACQAGABgBAFQgBAEgGAAQgMAAgFgCgAJ9jGQgDgDgGgJQAHgFAIAAQAIAAAHAFIAEACIAPACQAFACABAEQgGAHgQAAQgRAAgHgFgAGyjPIgDAAQgCgBgBgFIABgJQABgFAFgCIAFAAIAgABIAFABQACACgBAEQAAACgDADQgBADgDABIgIADIgFADIgFAAgAG2jaIAPABQgFgCgKAAgAnZkNQgEgCgEgFIgCgDIADgDQAHgDANAAIAUABQAIAAABAFQABAEgFADQgGAEgNABIgGAAQgJAAgEgCg");
	this.shape.setTransform(-0.0036,0.0317);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.3,-28.5,136.6,57.1);


(lib.Tween191 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AiKERQgHgEgDgOQgCgJAAgLQAAgKABgFQAEgIAHgCQAJgBAHAJIAJAQIAIAOQAEAKgFAGIgNAGIgLAFIgCAAQgDAAgDgCgAE+EMQgFgCgFgFIgIgHQAEgGAKABIAQAAIAQgDIABgBQADACAHAAIAEADQAAABAAAAQAAABABABQAAAAgBABQAAAAAAABIgGADQgCABgDAEIgGAFQgDACgKAAQgIAAgFgCgAI9CaQgFAAgHgHQgHgHgCgEQgEgHAEgGQACgEAHgFIAEgGQAFgHAJABQAIACADAIQABAFAAAMIACAGQACAHgJAIQgHAEgFAAIgBAAgAo5i0QgOgCgDgCQgHgEABgJQABgJAIgDQAGgCADgCIAEgEQAFgFAJACQAIABADAEQAFAHgFAKQgDAJgFAFQgFAFgDABIgCAAIgGgCgAISjeQgFgBgEgDQgEgGABgRQAAgMAEgFQAEgFALgCQAKgCAEABQAGACAEAFQADAFAAAFQAAAJgKALIgGAGIgIAIQgDACgEAAIgDgBg");
	this.shape.setTransform(-0.0135,0.0226);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.3,-27.5,118.69999999999999,55.1);


(lib.Tween190 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ADuEYQgGgCAAgCQAEgEAIgBIANAAIALgDQAIgBAIABQAGABACAFQgCACgCAFQgDAEgIABIgFAAQgNAAgVgGgAjpEYIgDAAIgDgDQgDgDgBgCQABgFADgCQACgCAFgBQAPgDAMAKIACACQABACgCADIgFADIgGACgAHZCfIgCAAQgBgBgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAgBABgBQAAAAAAgBQAAgBAAAAQABAAAAgBQAEgFAKgDQAIgCAEABIAGACIAFABQAGABAEAGQABAEgBACQgCAEgGAAIgFAAIgfgCgAnMCUQgPgCgGgGQgBAAgBgBQAAgBAAAAQgBgBAAAAQAAAAAAgBQgBgFAGgBIAJgBQAAAAABAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQAGAAAIADIADADIAHABQAFAAAEABQAEABAAADQAAAAAAABQAAAAAAABQgBAAAAABQgBAAAAABQgFAEgHABIgEAAIgKgBgAqYidIgMAAIgEgBQgCgBAAgGIAAgFQACgCAFAAIATABQAFAAABACQACADgDADQgDAEgBACIgEAAIgFAAgAJ9jGQgEgDgFgJQAHgFAIAAQAIAAAHAFIAEACIAOACQAGACABAEQgGAHgQAAQgRAAgHgFgAHCjUIgIgBIgFgCQgDgDACgGQAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAIADgBIAFAAIAYgCQAIAAAEADQACACABADQABAEgCACQgCACgEAAIgNACIgGABIgDABIgFgBgAnZkNQgEgCgEgFIgDgDIAEgDQAGgDANAAIAVABQAIAAAAAFQACAEgFADQgGAEgNABIgHAAQgIAAgEgCg");
	this.shape.setTransform(0,0.0317);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.3,-28.5,136.6,57.1);


(lib.Tween189 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Aj1EbQgEgHAGgIIALgLQALgJAEgCQAEgBAGAAQAHAAAFADQAIAFAAAJQABAJgGAHQgDADgGAEQgNAHgNAAQgOAAgEgJgADzESQgFgCAAgCQAEgEAHgBIANAAIAMgDQAHgBAIABQAHABABAFQgCACgCAFQgDAEgIABIgFAAQgNAAgVgGgAHKCdQgEgHADgIIAEgFIACgGQACgFALgCIAPgCQALAAAFAHQADAFgBAGQAAAGgCAEQgBADgGAFQgGAGgFAAIgJgBIgIABIgCAAQgHAAgFgHgAnHCOQgPgCgGgGQgBAAgBgBQAAgBAAAAQgBgBAAAAQAAAAAAgBQgBgFAGgBIAJgBQAAAAABAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQAHAAAHADIAEADIAGABQAFAAAEABQAEABAAADQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBABQgFAEgHABIgEAAIgKgBgAqpifQgGgFAAgIQAAgJANgLQADgDADgBQAHgEAIAFQAHAFgBAIQgBAEgDAGIgEALQgEAFgEACIgGABQgGAAgGgGgAKCjMQgDgDgGgJQAHgFAIAAQAIAAAHAFIAEACIAPACQAFACABAEQgGAHgQAAQgRAAgHgFgAHEjOQgIgCgKgJQgIgHgBgFQgDgGAFgHQAEgGAIgBQAEACAOABQAMABAFAHQAEAFgCALQgBAIgEAEQgFAFgHAAIgHgBgAnUkTQgEgCgEgFIgCgDIADgDQAHgDANAAIAUABQAIAAABAFQABAEgFADQgGAEgNABIgHAAQgIAAgEgCg");
	this.shape.setTransform(-0.0009,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.8,-29.1,137.6,58.3);


(lib.Tween188 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Aj6EcIgDgBQgDgBAAgGQAAgFACgCIAFgBQAOABAKgCQAGgBACACIABAEQAAADgCACQgCACgDABIgDABIgCACQgCABgHAAgAEBEWQgGAAgBgDQgBgCADgCIAFgDIAegFQAEACALAAQADgBADABQADACAAACQAAADgDACIgHABIgMAEIgKABgAHbCpQgCgCAAgEQAAgEACgCIAEgBIAOgCQgBgGAEgBQAFgDACAEQADAEgDADIAIABQAFACgBAEQgBADgHABIgMACIgHACIgHABQgEAAgCgCgAnFCXIgHgBQgDgBgBgCQgBgDACgDQACgDADABIABAAQABAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIAiABIAEACQACACgCAFQgBAAAAABQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIgbgBgAqhijIgGgBQgDgCAAgCQABgDAEgBIAPgGIABgBQAGAAAFACQAEABABABQAAABAAABQABAAAAABQAAAAgBABQAAABAAAAQgBAEgFABIgJACgAKNi6QgNgBgHgCQgDgBgCgCQgBgCAAgEQgBgCACgDQACgDAHgBIAmACIAFABQADABAAADIgDAGIgBADQAAABgBAAQAAAAAAABQgBAAAAAAQAAAAgBAAIgHAEgAHCjWIgMgCQgDAAgCgBQgCgCAAgEQAAgDAEgDQAEgEAFgCIAGgCIACgCQACgCAEAAIAYAAIAIABQAEACAAADQAAAFgFACIgPAHQgHAFgFACIgHAAIgFAAgAnFkIQgEAAgCgCQgCgCAAgDQAAgEADgEQADgCAEgBQABAAAAAAQAAAAABAAQAAgBAAAAQAAAAAAAAIAYABIAFACQACADgDAEIgCAGIgVACIgHABIgCAAg");
	this.shape.setTransform(-0.0031,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.3,-28.4,136.6,56.9);


(lib.Tween187 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjmEeIgDgBIgDgCQgDgDgBgDQAAgFAEgCQACgCAFgBQAPgCAMAJIABACQACACgCADIgFADIgGADgAErEbQgHgCgKAAIgSgBIgDgBQgBgBgBgFIAAgHQAAgEACgBIACAAIABgBQAIgBAKADIAMAFIAIABQAEABACADQABAEgBADQgBADgCACIgBAAIgFgBgAHcClIgDgBQAAAAgBgBQAAAAAAgBQgBAAAAgBQAAAAAAgBQAAgBAAAAQABgBAAgBQAAAAAAgBQAAAAABAAQAEgGAKgDQAIgCAEABIAGACIAFABQAGACADAFQACAEgBACQgCAEgGAAIgFAAIgfgBgAnHCaIgDgEQgBgFADgEQAEgEAEgBIAMgCIAGgEQADgDADAAQAEAAABAFQAAAGgFAAQABADgDAEIgGAFIgMAFIgJAAgAqViXIgMgBIgFgBQgBgBAAgGIAAgEQACgDAFAAIATABQAFAAABADQABADgDADQgDAEAAACIgEAAIgFAAgAJ5ipQgCgDAAgFIACgIQADgHAEgBIAEgBQANAAAQADIAFACQABABAAAAQABABAAAAQAAABAAABQAAAAAAABIgEADQgFADgDABIgGABIgFAEQgEADgHAAIgNAAgAHFjOIgIgBIgGgCQgDgDACgHQAAgBAAAAQABgBAAAAQAAAAAAgBQAAAAABAAIADgBIAEgBIAZgCQAIAAAEADQACACABAEQABADgCACQgCACgEAAIgNACIgGACIgEAAIgEAAgAnPj/QgEAAgCgCQgEgEADgFIAHgIIAHgFQAGgEAFgCQAGgBAEAEQAEAEAAAFIgDAEQgEAFgFACIgFACIgEADQgCACgFAAIgEAAg");
	this.shape.setTransform(0.0143,-0.0091);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68,-28.6,136.1,57.3);


(lib.Tween186 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjqEgQgEgHAGgIIALgLQALgJAEgCQAEgBAGAAQAHAAAFADQAIAFAAAJQABAJgGAHQgDADgGAEQgNAHgNAAQgOAAgEgJgAEWEfQgIgCgDgDQgGgGACgIQACgIAJgCIAJgDIAGgFQADgCAJAAQAMAAAEAEQAEADABAHQABAIgDAIQgDAIgIADQgEACgJAAQgKgBgIgDgAHVCiQgEgHADgIIAEgFIACgGQACgFALgCIAPgCQALAAAFAHQADAFgBAGQAAAGgCAEQgBADgGAFQgGAGgFAAIgJgBIgIABIgCAAQgHAAgFgHgAm5CgQgKgHgCgNQgCgHACgFQACgEAEgCQAEgDAEABQAFgBAFAFIAIAIIAFACIAHADQAGAEABAGQABAHgFAFQgGAFgMAAQgKAAgHgEgAqeiaQgGgFAAgIQAAgJANgLQADgDADgBQAHgEAIAFQAHAFgBAIQgBAEgDAGIgEALQgEAFgEACIgGACQgGAAgGgHgAJ6isQgFgDgBgIQgCgPALgHQAJgGARAGQAKADADAHQABAEAAAEQAAAMgGAEQgDACgGAAIgQABQgIAAgEgEgAHPjJQgIgCgKgJQgIgHgBgFQgDgGAFgHQAEgGAIgBQAEACAOABQAMABAFAHQAEAFgCALQgBAIgEAEQgFAFgHAAIgHgBgAm6kFIgKgDQgGgDgBgGQgBgEACgFQACgIAIgEQAGgCAFAAIAKADIALAEQAJAEgBAKQgBAKgJADIgLABg");
	this.shape.setTransform(-0.0009,0.0208);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-67.7,-29.6,135.4,59.3);


(lib.Tween185 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Aj6EcIgDgBQgDgBAAgGQAAgFACgCIAFgBQAOABAKgCQAGgBACACIABAEQAAADgCACQgCACgDABIgDABIgCACQgCABgHAAgAEBEWQgGAAgBgDQgBgCADgCIAFgDIAegFQAEACALAAQADgBADABQADACAAACQAAADgDACIgHABIgMAEIgKABgAHbCpQgCgCAAgEQAAgEACgCIAEgBIAOgCQgBgGAEgBQAFgDACAEQADAEgDADIAIABQAFACgBAEQgBADgHABIgMACIgHACIgHABQgEAAgCgCgAnFCXIgHgBQgDgBgBgCQgBgDACgDQACgDADABIABAAQABAAAAAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIAiABIAEACQACACgCAFQgBAAAAABQAAABgBAAQAAABgBAAQAAAAAAAAQgBABAAAAQgBAAAAAAQgBAAAAAAQgBAAgBAAIgbgBgAqhijIgGgBQgDgCAAgCQABgDAEgBIAPgGIABgBQAGAAAFACQAEABABABQAAABAAABQABAAAAABQAAAAgBABQAAABAAAAQgBAEgFABIgJACgAKNi6QgNgBgHgCQgDgBgCgCQgBgCAAgEQgBgCACgDQACgDAHgBIAmACIAFABQADABAAADIgDAGIgBADQAAABgBAAQAAAAAAABQgBAAAAAAQAAAAgBAAIgHAEgAHCjWIgMgCQgDAAgCgBQgCgCAAgEQAAgDAEgDQAEgEAFgCIAGgCIACgCQACgCAEAAIAYAAIAIABQAEACAAADQAAAFgFACIgPAHQgHAFgFACIgHAAIgFAAgAnFkIQgEAAgCgCQgCgCAAgDQAAgEADgEQADgCAEgBQABAAAAAAQAAAAABAAQAAgBAAAAQAAAAAAAAIAYABIAFACQACADgDAEIgCAGIgVACIgHABIgCAAg");
	this.shape.setTransform(-0.0031,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.3,-28.4,136.6,56.9);


(lib.Tween184 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjvEoQgIgCgDgDQgCgDAAgIIgBgPQAAgNAFgEQAEgDAHgBIAKgBQACABAJAGQAOAIADAEQAEAIgEAJQgEAIgJAFQgHAFgHABIgCAAIgLgCgAETEiIgDgEIgGAAQgLAAgEgGQgEgEAAgGQAAgFAEgEQAEgEAHgCIANgBIARgCQALAAAFAEQAGAFAAAIQABAIgEAGQgFAKgLACIgGABQgIAAgGgGgAH2C1QgMgBgFgHQgFgIAFgIQAEgIAKgDQAIgDAJABIAMACQAGADACAGQABAEgCAFQgEAJgJAFQgIAEgIAAIgEgBgAm3CiIgKgCIgLACQgLABgFgJQgCgEAAgFQAAgFAEgDQACgDAMgEIAXgKQAGgCAGABQAHABADAFQADAEAAAIQAAAOgIAGQgFAFgKAAIgEAAgAqXiQQgGgCgCgFQgUAAgFgHQgEgFABgHQACgGAFgDQADgCAIgBQAIgBADgBIAJgFQAFgBAIADQAHACACADQADADAAAHQABAJgCAEQgBACgGAHQgEAEgEACIgFACIgGgCgAKSipQgLAAgGgGQgEgEAAgMQgBgQAGgGQAHgHANABQAQAAAFAKIAEAGQACACAGACQADADACAFQABAFgCAEQgEAIgKADQgGACgLAAIgKAAgAGzjLQgGgCgDgGQgDgFABgGQABgLAMgIQAIgFAPgCQAMgCAHAFQAJAEgBALQgBAKgJAEIgHAEIgEAFQgCAEgGABIgJAAIgFAAIgJgBgAnEj+QgGgFgCgDQgBgDgBgJQAAgPAHgFQAFgEALABQAHAAAFADQAGAFAAAFQALACABALQACALgLAFIgKADIgIAFIgCAAQgGAAgIgHg");
	this.shape.setTransform(-0.0194,0.0189);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-70,-29.7,140,59.5);


(lib.Tween183 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AEJEdIgDgBQgEgDADgEIAGgFIALgKQAGgGAHABIAGAAIAEABIADAEQACAGAAABQgBADgDADQgNALgPAAIgJgBgAEfEMIgBABIgEADQgDABgBACQADAAAKgFIAEgDIgHAAgAkDEYQgFAAgCgBQgDgDABgGQAAgDACgCIAEAAIAIgBQAaAAANACQAFABABACQAEADgCADQgCAEgHgBQgIgBgDABIgIACIgLABgAH/CsIgEgBQgDgBgBgDIgFgIIgHgBQgEAAgCgBQgDgCAAgDIAFgEIAZABIAFABQADABABAEIAAAHQgBAHgCACIgEACIgDgBgAm6CfIgFgDIgOgKIgEgFQgCgEADgCQABgCAFAAIAJAAIABAAQAJgBAFAEIADADIADACQACACAAAEIgCAFQAAAFgBABIgEABgAqdimQgGAAgDgCQgGgFAGgIQABAAABAAQAAAAAAAAQABAAAAAAQAAgBAAAAIAHAAIAHABIAFADQAEACAMABIAGACQACADAAADQgBADgHAAgAKXinIgBgEQgCgDgGgBQgGAAgCgDQgCgCABgFIAGgNIADgEIAEAAQAHgBADAEQABACAAAFQACAEADACQAHADAAACQABADgDACQgCACgFABQAAAEgCACIgDACQgBAAAAAAQgBgBAAAAQAAAAgBAAQAAgBgBAAgAG+jMQgHgDAAgDQgBgDAEgCQAHgGAMAAIAHAAIAFgCIAKgBQAIAAABAEQACAEgEAEQgFAGgGADQgFACgGAAQgJAAgNgDgAnCkIQAAgEADgCQAGgEAFgBQAAgHADgCIAFgBIAXAAIADABQAEACgCAEQgCADgEACIgHADIgLAGQgIAEgKAAQgIgBAAgDg");
	this.shape.setTransform(0.0046,0.0194);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.1,-28.6,136.3,57.3);


(lib.Tween182 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AkHElQgJgBgFgHQgEgHAEgHQACgEAFgDIAIgGQAIgKAGgEQAKgIAKAGQAGAEADALQAEANgFAFQgCADgFABIgIADIgOAHQgHAEgGAAIgBAAgAEKEcQgLgGgDgNQgBgJAEgFQADgEAIgCQAKgCAIACQAHADAEAEIAFAGQADADABAFQACAHgFAGQgDAFgIADQgFACgEAAQgIAAgHgFgAHtCxQgNgBgDgGQgLABgGgHQgDgEAAgFQgBgFADgDQAFgHANgBQAQgCAPAAIAGABQAHADABAIQACAGgDAHQgEAKgGADQgEACgIAAIgGAAgAnHCbQgGgCgFgHQgGgGgBgEQgCgFAEgGQAEgFAGgBQAIgDAPAFQAOAFAFAHQAEAEAAAGQAAAHgEADQgEAEgKABIgGAAQgLAAgFgDgAqgiWQgJgDgDgFQgDgFACgJQABgHADgDIAFgEIAHgDIANgHQAHgEAGABQAGABAEAEQAEAFABAGQABAKgJALQgGAHgKADQgGACgGAAIgIAAgAKXisIgSgFQgLgEgEgGQgDgFAAgGQAAgIAFgFQADgCAGgBQAUgDAPAMQAIAHACAJQACAMgKAEQgCACgFAAIgIgBgAG1jJQgKgEgCgLIgBgNQgBgJACgFQACgKAMAAIAMABQAHAAAEAEQAGAFgCAKIgEAQQgDAJgDAEQgGAFgGAAIgHgCgAnSkAQgIgDgDgHQgDgJAHgIQAFgGAKgCQAIgBAKABQAPABAEAHQAEAGgEAIQgDAIgLAFQgFACgKAAQgLAAgFgCg");
	this.shape.setTransform(0.0024,0.0325);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.6,-29.2,137.3,58.5);


(lib.Tween181 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ADzEfIgGgCQgCgDAAgDQAFgEAMgBIAWABQAFAAAEACQABAAAAAAQABAAAAABQABAAAAAAQAAABABABQABACgDADIgEADQgEABgKAAQgSAAgGgCgAkFEEQgFgEABgEQACgFAGAAQAMgCAGADIAHAFIAGAFQADACAIABQAIAAADADIACACQAAABAAAAQAAABgBAAQAAABAAAAQgBAAgBABQgCABgKABIgEAAQgZAAgPgMgAHoC0QgFgBgBgCIgBgHIgHgFQgDgDABgDQAAgEACgCQADgCAIAAQABAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAAAQAKAAAFACQAJACADAIIABAJIgBAGQgDAFgIAAQgIAAgHgCgAm4CeIgGgFIgIgBQgGgBABgEQAAgDADgBIAHgBQAAAAABAAQAAAAAAAAQAAAAAAgBQAAAAAAAAIALAEQABAAAAABQAAAAABAAQAAAAAAABQAAAAAAABIAPABQADAAACABQADADgCADQgCACgGAAgAqsiUIgIgCQgDgBgCgDQgCgEABgDQADgFAKAAIASgBQASAAAIACQAGABABAEQgCADgHABIgKACIgJAEQgDACgMAAgAKqimIgTgBQgFAAgBgCIgCgGQAAgIADgCIAGgBIAZAAQAAAAABAAQAAAAAAAAQABAAAAgBQgBAAAAAAQAFAAACACQAEAEgCAJQAAAAAAABQAAAAgBAAQAAABAAAAQAAABgBAAQAAABAAAAQAAAAgBABQAAAAgBAAQgBAAAAAAIgHABIgFAAgAGpjXQgDgCgEgGQgDgGgDgCQABgEAIgBQANgBAFADIAGADIAGAAQAOgBAFAHQgNAMgRABQgLAAgEgDgAnGkKQgCgBAAgFQABgGAEgEQAEgEAGAAQAAAAABgBQAAAAAAAAQAAAAABAAQAAgBAAAAQAIAAAKACIAGADQADADgBADIgGADIgMAHQgGADgMAAIgFgCg");
	this.shape.setTransform(0.0262,-0.0042);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.9,-28.9,139.9,57.8);


(lib.Tween180 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AD7EYQABgEAIgBIAbgEQAKgBAGACQAGACABAEIgGAGIgGAGIgIACIgEAAQgTAAgQgMgAj+EHQgFgEABgEQACgFAGAAQAMgCAGADIAHAFIAGAFQADACAIABQAIAAADADIACACQAAABAAAAQAAABAAAAQgBABAAAAQgBAAgBABQgCABgKABIgDAAQgaAAgPgMgAH/DCIgGgCIgGgEQgJgEgEgDQgGgGACgKQABgGAGgKQADgFAEgCQAIgFAMAIQAFAEACADQADAGAAAKQAAAMgCAFQgEAJgHAAIgCAAgAm6CyQgGgEgBgGQAAgEABgFQAEgPAPgHQAIgDAHABQAIACACAHIAAAMIgBANQgCAIgLABIgHABIgGACIgDAAQgEAAgEgDgAqliRIgIgCQgDgBgCgDQgCgEABgDQADgFAKAAIASgBQASAAAIACQAGABABAEQgCADgHABIgKACIgJAEQgDACgMAAgAKWiXQgFgDgDgFIgDgJIgHgIQgDgFACgGQACgGAFgCIAFgCQAEgBABgCIAEgGQAEgFAKABQAGABACADQAEACACAHQABAJgEARIgFAOQgEAHgHABIgDABQgEAAgEgDgAGwjUQgDgCgEgGQgDgGgDgCQABgEAIgBQANgBAFADIAGADIAGAAQAOgBAFAHQgNAMgRABQgLAAgEgDgAmsjwQgGgBgFgEQgFgEgBgGIgBgMIgCgHQgBgGAFgGQAFgGAKABQAKACAEAIQADADACAJQACALgCAFQgCAGgFAEQgEADgGAAIgBAAg");
	this.shape.setTransform(0.0133,0.0425);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69.2,-29.2,138.5,58.5);


(lib.Tween179 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjuEfIgIAAIgCgBIgCgCQgDgFADgFQACgEAGgBQABAAAAAAQABAAAAAAQAAAAAAgBQAAAAAAAAIAWABIAFACQACABgCAEQgBACgDACIgKAEIgGADIgCABIgDgBgADuEWQgFgCAAgCQAEgEAIgCIAMAAIAMgCQAIgCAHACQAHABACAFQgCABgCAFQgDAFgJABIgEAAQgNAAgWgGgAHwCwQgDgBgBgCIgJgDIgHgEQgKgDgCgCQgCgCgBgDQAAgEACgCQACgCAGAAIAWABQAEABAEACQAIAGgBAGQAAADgEAFIgDADIgCABIgDAAgAnLCSQgPgCgHgGQAAgBgBAAQAAgBgBAAQAAgBAAAAQAAgBAAAAQgBgGAGAAIAIgBQABAAAAgBQABAAAAAAQAAAAAAAAQAAAAAAgBQAGAAAHAEIAEACIAHABQAFABADABQAEABABADQAAAAAAABQAAAAgBAAQAAABAAAAQgBABAAAAQgFAFgIABIgDAAIgKgBgAqWiiIgKgBIgEgBQgCAAgCgDQgDgFAAgDQABgDAEgBQALgEARACQAEAAACADQABACgBADQgBAFgEADQgEADgFAAgAJ+jJQgEgCgFgJQAGgFAJAAQAIAAAHAFIAEACIAOACQAGACABAEQgGAHgRAAQgQAAgHgGgAHBjgIgQgBQgJgBgEgEQAAgBgBAAQAAgBAAAAQAAgBAAAAQAAAAAAgBIACgDQAFgFANABIANABIADAAIADACQAEAFAAADQAAAFgFAAIgFABIgDAAgAnYkPQgEgCgFgFIgCgEIADgCQAHgDANAAIAVABQAIAAAAAEQABAEgEAEQgGAEgOABIgGAAQgIAAgEgCg");
	this.shape.setTransform(0.0214,0);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.3,-28.8,136.7,57.6);


(lib.Tween178 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AjuEoQgJgBgEgJQgFgHABgKIACgIQAFgNANgBQAFgBAEABQAGABAFAEQADAEABAHQADAOgIAKQgGAKgKAAIgGgBgADvENQgFgCAAgCQAEgEAIgBIAMAAIAMgDQAIgBAHABQAHABABAFQgCACgBAFQgDAEgJABIgEAAQgOAAgVgGgAHcCiQgLAAgEgEQgFgDgBgJIABgIQAEgHAJgCQAHgCAIAAQAQAAAGAFQAHAGgCAMQgBAGgDACQgEAFgNAAgAnKCJQgQgCgGgGQgBgBAAAAQgBgBAAAAQAAgBAAAAQAAgBAAAAQgBgFAFgBIAJgBQABAAAAAAQAAgBABAAQAAAAAAAAQAAAAAAAAQAGAAAHADIAEADIAGABQAFAAAEABQAEABABADQAAAAgBABQAAAAAAABQAAAAgBABQAAAAgBABQgFAEgHABIgDAAIgKgBgAqlidQgHgFABgNQAAgKAEgKQAEgLAHAAQABAAABAAQAAAAABAAQAAAAAAAAQABAAAAgBQAKADADAGIAEAPQABAHgGAKQgFAIgFADQgDACgEAAQgEAAgEgEgAJ/jRQgEgDgFgJQAGgFAIAAQAIAAAIAFIADACIAPACQAGACABAEQgHAHgQAAQgRAAgGgFgAG9jWIgIAAQgEAAgEgCQgDgDgBgEQgDgEgCgFQgBgHAGgGQAFgHAGgBIAGAAQAFAAAGADQAGAEADADQADAEAAAFQABAHgDAGQgDAHgHAAgAnYkYQgDgCgFgFIgCgDIADgDQAHgDANAAIAVABQAHAAABAFQABAEgFADQgFAEgOABIgGAAQgIAAgFgCg");
	this.shape.setTransform(0,-0.0117);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.4,-29.7,136.9,59.4);


(lib.Tween177 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ADuEYQgFgCAAgCQAEgEAHgBIANAAIAMgDQAHgBAIABQAHABABAFQgCACgCAFQgDAEgIABIgFAAQgNAAgVgGgAjtEbIgCgBIgCgCQgCgDACgCQAAgDAEgBIAIgCQAAAAAAAAQABAAAAgBQAAAAAAAAQAAAAAAAAQAFgBAKAEIAJACQACACAAAEQAAACgEACIgFABgAHGCpIgDAAQgBgBAAAAQgBAAAAgBQAAAAAAAAQAAgBAAAAQgBgBAAgBQAAAAAAgBQAAgBAAAAQAAAAABgBIADgDQAKgFAKgBIAEgBIADgCQADgCAEABQAFAAACADQACACgBADIAAAIIgCAEQgBACgFAAgAnMCUQgPgCgGgGQgBAAgBgBQAAgBAAAAQgBgBAAAAQAAAAAAgBQgBgFAGgBIAJgBQAAAAABAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQAHAAAHADIAEADIAGABQAFAAAEABQAEABAAADQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBABQgFAEgHABIgEAAIgKgBgAqZinIgEgBIgDgBIgFgBQgEgBgBgDQAAgDADgCIAGgBIAQACIACABIAJACQAGABgBAFQgBAEgGAAQgMAAgFgCgAJ9jGQgDgDgGgJQAHgFAIAAQAIAAAHAFIAEACIAPACQAFACABAEQgGAHgQAAQgRAAgHgFgAGyjPIgDAAQgCgBgBgFIABgJQABgFAFgCIAFAAIAgABIAFABQACACgBAEQAAACgDADQgBADgDABIgIADIgFADIgFAAgAG2jaIAPABQgFgCgKAAgAnZkNQgEgCgEgFIgCgDIADgDQAHgDANAAIAUABQAIAAABAFQABAEgFADQgGAEgNABIgGAAQgJAAgEgCg");
	this.shape.setTransform(-0.0036,0.0317);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.3,-28.5,136.6,57.1);


(lib.Tween176 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AiKERQgHgEgDgOQgCgJAAgLQAAgKABgFQAEgIAHgCQAJgBAHAJIAJAQIAIAOQAEAKgFAGIgNAGIgLAFIgCAAQgDAAgDgCgAE+EMQgFgCgFgFIgIgHQAEgGAKABIAQAAIAQgDIABgBQADACAHAAIAEADQAAABAAAAQAAABABABQAAAAgBABQAAAAAAABIgGADQgCABgDAEIgGAFQgDACgKAAQgIAAgFgCgAI9CaQgFAAgHgHQgHgHgCgEQgEgHAEgGQACgEAHgFIAEgGQAFgHAJABQAIACADAIQABAFAAAMIACAGQACAHgJAIQgHAEgFAAIgBAAgAo5i0QgOgCgDgCQgHgEABgJQABgJAIgDQAGgCADgCIAEgEQAFgFAJACQAIABADAEQAFAHgFAKQgDAJgFAFQgFAFgDABIgCAAIgGgCgAISjeQgFgBgEgDQgEgGABgRQAAgMAEgFQAEgFALgCQAKgCAEABQAGACAEAFQADAFAAAFQAAAJgKALIgGAGIgIAIQgDACgEAAIgDgBg");
	this.shape.setTransform(-0.0135,0.0226);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-59.3,-27.5,118.69999999999999,55.1);


(lib.Tween175 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("ADuEYQgGgCAAgCQAEgEAIgBIANAAIALgDQAIgBAIABQAGABACAFQgCACgCAFQgDAEgIABIgFAAQgNAAgVgGgAjpEYIgDAAIgDgDQgDgDgBgCQABgFADgCQACgCAFgBQAPgDAMAKIACACQABACgCADIgFADIgGACgAHZCfIgCAAQgBgBgBAAQAAgBAAAAQgBgBAAAAQAAgBAAAAQAAgBABgBQAAAAAAgBQAAgBAAAAQABAAAAgBQAEgFAKgDQAIgCAEABIAGACIAFABQAGABAEAGQABAEgBACQgCAEgGAAIgFAAIgfgCgAnMCUQgPgCgGgGQgBAAgBgBQAAgBAAAAQgBgBAAAAQAAAAAAgBQgBgFAGgBIAJgBQAAAAABAAQAAAAAAgBQAAAAAAAAQAAAAAAAAQAGAAAIADIADADIAHABQAFAAAEABQAEABAAADQAAAAAAABQAAAAAAABQgBAAAAABQgBAAAAABQgFAEgHABIgEAAIgKgBgAqYidIgMAAIgEgBQgCgBAAgGIAAgFQACgCAFAAIATABQAFAAABACQACADgDADQgDAEgBACIgEAAIgFAAgAJ9jGQgEgDgFgJQAHgFAIAAQAIAAAHAFIAEACIAOACQAGACABAEQgGAHgQAAQgRAAgHgFgAHCjUIgIgBIgFgCQgDgDACgGQAAgBAAAAQAAgBAAAAQAAgBAAAAQABgBAAAAIADgBIAFAAIAYgCQAIAAAEADQACACABADQABAEgCACQgCACgEAAIgNACIgGABIgDABIgFgBgAnZkNQgEgCgEgFIgDgDIAEgDQAGgDANAAIAVABQAIAAAAAFQACAEgFADQgGAEgNABIgHAAQgIAAgEgCg");
	this.shape.setTransform(0,0.0317);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.3,-28.5,136.6,57.1);


(lib.Tween174 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Aj1EbQgEgHAGgIIALgLQALgJAEgCQAEgBAGAAQAHAAAFADQAIAFAAAJQABAJgGAHQgDADgGAEQgNAHgNAAQgOAAgEgJgADzESQgFgCAAgCQAEgEAHgBIANAAIAMgDQAHgBAIABQAHABABAFQgCACgCAFQgDAEgIABIgFAAQgNAAgVgGgAHKCdQgEgHADgIIAEgFIACgGQACgFALgCIAPgCQALAAAFAHQADAFgBAGQAAAGgCAEQgBADgGAFQgGAGgFAAIgJgBIgIABIgCAAQgHAAgFgHgAnHCOQgPgCgGgGQgBAAgBgBQAAgBAAAAQgBgBAAAAQAAAAAAgBQgBgFAGgBIAJgBQAAAAABAAQAAAAAAAAQAAgBAAAAQAAAAAAAAQAHAAAHADIAEADIAGABQAFAAAEABQAEABAAADQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBABQgFAEgHABIgEAAIgKgBgAqpifQgGgFAAgIQAAgJANgLQADgDADgBQAHgEAIAFQAHAFgBAIQgBAEgDAGIgEALQgEAFgEACIgGABQgGAAgGgGgAKCjMQgDgDgGgJQAHgFAIAAQAIAAAHAFIAEACIAPACQAFACABAEQgGAHgQAAQgRAAgHgFgAHEjOQgIgCgKgJQgIgHgBgFQgDgGAFgHQAEgGAIgBQAEACAOABQAMABAFAHQAEAFgCALQgBAIgEAEQgFAFgHAAIgHgBgAnUkTQgEgCgEgFIgCgDIADgDQAHgDANAAIAUABQAIAAABAFQABAEgFADQgGAEgNABIgHAAQgIAAgEgCg");
	this.shape.setTransform(-0.0009,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-68.8,-29.1,137.6,58.3);


(lib.Tween167 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Layer23();
	this.instance.setTransform(19.65,-10.85,0.1,0.1,135);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19.6,-19.6,39.3,39.3);


(lib.Tween166 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Layer23();
	this.instance.setTransform(-21.55,-6.2,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-21.5,-6.2,43.1,12.4);


(lib.Tween165 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Layer5();
	this.instance.setTransform(19.55,-69,0.0602,0.0601,44.9897);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-69,-69,138.1,138.1);


(lib.Tween164 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Layer5();
	this.instance.setTransform(1.05,-71.75,0.0602,0.0601,29.9865);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-61.6,-71.7,123.30000000000001,143.5);


(lib.Tween163 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Layer5();
	this.instance.setTransform(-17.55,-69.6,0.0602,0.0601,14.9988);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-50,-69.6,100.1,139.2);


(lib.Tween162 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Layer5();
	this.instance.setTransform(-35,-62.7,0.0602,0.0602);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-35,-62.7,70,125.4);


(lib.Tween160 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Gumball1();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween158 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#0066CC").s().p("Ah0B0QgwgwAAhEQAAhEAwgwQAwgwBEAAQBFAAAvAwQAxAwAABEQAABEgxAwQgvAxhFAAQhEAAgwgxg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.5,-16.5,33,33);


(lib.Tween156 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GIW();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween154 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.G1E();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween152 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Geyebrow1();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween150 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Geyebrow2();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween148 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GEB();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween146 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GOutline();
	this.instance.setTransform(-16.75,-16.75,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.7,-16.7,33.5,33.5);


(lib.Tween144 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Gumball1();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween142 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#993399").s().p("Ah0B0QgwgvAAhFQAAhEAwgwQAwgwBEAAQBFAAAvAwQAxAwAABEQAABFgxAvQgvAxhFAAQhEAAgwgxg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.5,-16.5,33,33);


(lib.Tween140 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GIW();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween138 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.G1E();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween136 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Geyebrow1();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween134 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Geyebrow2();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween132 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GEB();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween130 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GOutline();
	this.instance.setTransform(-16.75,-16.75,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.7,-16.7,33.5,33.5);


(lib.Tween128 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Gumball1();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween126 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#33CC33").s().p("Ah0B1QgwgwAAhFQAAhEAwgwQAxgwBDAAQBFAAAvAwQAxAwAABEQAABFgxAwQgvAwhFAAQhDAAgxgwg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.5,-16.5,33,33);


(lib.Tween124 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GIW();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween122 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.G1E();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween120 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Geyebrow1();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween118 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Geyebrow2();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween116 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GEB();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween114 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GOutline();
	this.instance.setTransform(-16.75,-16.75,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.7,-16.7,33.5,33.5);


(lib.Tween112 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Gumball1();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween110 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#33CC33").s().p("Ah0B0QgwgvAAhFQAAhEAwgwQAxgwBDAAQBEAAAxAwQAwAwAABEQAABFgwAvQgxAxhEAAQhDAAgxgxg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.5,-16.5,33,33);


(lib.Tween108 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GIW();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween106 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.G1E();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween104 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Geyebrow1();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween102 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Geyebrow2();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween100 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GEB();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween98 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GOutline();
	this.instance.setTransform(-16.75,-16.75,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.7,-16.7,33.5,33.5);


(lib.Tween96 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Gumball1();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween94 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#9933CC").s().p("Ah0B0QgwgwAAhEQAAhEAwgwQAxgwBDAAQBEAAAxAwQAwAwAABEQAABEgwAwQgxAxhEAAQhDAAgxgxg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.5,-16.5,33,33);


(lib.Tween92 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GIW();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween90 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.G1E();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween88 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Geyebrow1();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween86 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Geyebrow2();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween84 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GEB();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween82 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GOutline();
	this.instance.setTransform(-16.75,-16.75,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.7,-16.7,33.5,33.5);


(lib.Tween80 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Gumball1();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween78 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#3366CC").s().p("Ah0B1QgwgxAAhEQAAhDAwgxQAwgwBEAAQBEAAAwAwQAxAxAABDQAABEgxAxQgwAwhEAAQhEAAgwgwg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.5,-16.5,33,33);


(lib.Tween76 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GIW();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween74 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.G1E();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween72 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Geyebrow1();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween70 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GEB();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween68 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GOutline();
	this.instance.setTransform(-16.75,-16.75,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.7,-16.7,33.5,33.5);


(lib.Tween67 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Gumball1();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween66 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Gumball1();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween65 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF3333").s().p("Ah0B1QgwgxAAhEQAAhDAwgxQAxgwBDAAQBEAAAxAwQAwAxAABDQAABEgwAxQgxAwhEAAQhDAAgxgwg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.5,-16.5,33,33);


(lib.Tween64 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FF3333").s().p("Ah0B1QgwgxAAhEQAAhDAwgxQAxgwBDAAQBEAAAxAwQAwAxAABDQAABEgwAxQgxAwhEAAQhDAAgxgwg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.5,-16.5,33,33);


(lib.Tween63 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GIW();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween62 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GIW();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween61 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.G1E();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween60 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.G1E();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween59 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Geyebrow1();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween58 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Geyebrow1();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween57 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GEB();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween56 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GEB();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween55 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GOutline();
	this.instance.setTransform(-16.75,-16.75,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.7,-16.7,33.5,33.5);


(lib.Tween54 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GOutline();
	this.instance.setTransform(-16.75,-16.75,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.7,-16.7,33.5,33.5);


(lib.Tween52 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Gumball1();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween50 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#33CC33").s().p("Ah0B1QgwgxAAhEQAAhDAwgxQAxgwBDAAQBEAAAxAwQAwAxAABDQAABEgwAxQgxAwhEAAQhDAAgxgwg");

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.5,-16.5,33,33);


(lib.Tween48 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GIW();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween46 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.G1E();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween44 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Geyebrow1();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween42 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Geyebrow2();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween40 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GEB();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween38 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GOutline();
	this.instance.setTransform(-16.75,-16.75,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.7,-16.7,33.5,33.5);


(lib.Tween36 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Layer49();
	this.instance.setTransform(-27.55,-16.85,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.5,-16.8,55.1,33.7);


(lib.Tween34 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgQAIQgHgCgCgDIAKgEIAIgFQAFgCAFAAQAPAAAGAFIACACIgCACIgJACIgLAEQgFACgHAAIgIgBg");
	this.shape.setTransform(0.025,0.015);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2.5,-0.9,5.1,1.9);


(lib.Tween30 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GEB();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween29 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GEB();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween28 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GEB();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween27 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.GEB();
	this.instance.setTransform(-16.45,-16.4,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-16.4,-16.4,32.9,32.8);


(lib.Tween26 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.LM();
	this.instance.setTransform(-27.55,-16.85,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.5,-16.8,55.1,33.7);


(lib.Tween25 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.LM();
	this.instance.setTransform(-27.55,-16.85,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.5,-16.8,55.1,33.7);


(lib.Tween24 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.SIE();
	this.instance.setTransform(-27.55,-16.85,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.5,-16.8,55.1,33.7);


(lib.Tween23 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.SIE();
	this.instance.setTransform(-27.55,-16.85,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.5,-16.8,55.1,33.7);


(lib.Tween22 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.SpecialEyes();
	this.instance.setTransform(-27.55,-16.85,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.5,-16.8,55.1,33.7);


(lib.Tween21 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.SpecialEyes();
	this.instance.setTransform(-27.55,-16.85,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.5,-16.8,55.1,33.7);


(lib.Tween20 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.SpecialEyeball();
	this.instance.setTransform(-27.55,-16.85,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.5,-16.8,55.1,33.7);


(lib.Tween19 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.SpecialEyeball();
	this.instance.setTransform(-27.55,-16.85,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.5,-16.8,55.1,33.7);


(lib.Tween18 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.SpEB();
	this.instance.setTransform(-27.55,-16.85,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.5,-16.8,55.1,33.7);


(lib.Tween17 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.SpEB();
	this.instance.setTransform(-27.55,-16.85,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-27.5,-16.8,55.1,33.7);


(lib.Tween16 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgBAFQgFAAgEgCQgEgCABgBQACgCAFgBIAHgBIAAgBIAIACQAFABABADQgCADgGABIgEABIgEgBg");
	this.shape.setTransform(-0.0031,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.4,-0.5,2.9,1.1);


(lib.Tween15 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgBAFQgFAAgEgCQgBAAgBgBQgBAAAAgBQAAAAAAgBQgBAAABAAQACgCAFgBIAHgBIAAgBIAIACQAFABABADQgCADgGABIgEABIgEgBg");
	this.shape.setTransform(-0.0031,0.025);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1.4,-0.5,2.9,1.1);


(lib.Symbol23 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Title_Button();
	this.instance.setTransform(-200,-150,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol23, new cjs.Rectangle(-200,-150,400,300), null);


(lib.Symbol20 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Layer23();
	this.instance.setTransform(-21.55,-6.1,0.1,0.1);

	this.instance_1 = new lib.Layer22();
	this.instance_1.setTransform(-11.55,-13.1,0.1,0.0998);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol20, new cjs.Rectangle(-21.5,-13.1,43.1,26.299999999999997), null);


(lib.Symbol19 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Saviour2();
	this.instance.setTransform(0,101.2,0.1,0.1,-14.6621);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol19, new cjs.Rectangle(0,0,462.7,391.3), null);


(lib.Symbol18 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.149)").s().p("ApWRSQg0gMggg8QgXgsgOhJQgficgMhRQgTiDgChrQgBg8AEhAIgCgDIgGgPIgGgCQgnA+gnA8QgPAWgZAJQgsAQgqgWQhJg2AohSQAVgoAXgmIBMh/IgEgKIgIgZIgFgQQgWgqgQgsQgOgpgSgnQgUgsgLgvQgLgvACgwQABgdAMgbIACgHIABgHIABgHIAGgQIAHgPIAIgPIAJgRIAEgIIAEgIIADgIIADgIIACgDIAIgUIABgBIAAgCIAKgaQAHgZALgXQAIgSAGgSIAPgnQAIgUAKgSIAHgQIAGgNIAGgNIADgJIAHgOIAGgNIACgDIACgIIADgIIADgIIAEgHQAMghAegUQAYgQAdABQAiAAAaAVQAbAUAIAgQAIAcgHAbIAFAKIAFANIABAJIABAJIABAIIAAAIIgBAIIgCAHIgCAHIgCAHIgDAHIgEAHIgCAGIgEAFIAAAIIAAAJIAAAIIABAJIADARIADASIADASIABAQIAAAQIABAIIABAHIACAIIABAIIACAIIABAIIABAJIABAIIABAJIADAJIADADIAEADIAFAEIADAEIADAEIAFAFIAEAGIAEAGIADAGIACACIASgZQATgYAHgVQAPgngMgyQgHgfgbg7Qgdg/gIgdQgPgzALgoIAEgPIgJgRQgJgSgEgLQgQgsAQgwQARgvApgXQASgKAcgHIAxgLQATgEAqgPQAmgOAWgFQAvgKAxAIQAxAHAqAYQAsAZAVAiQAQAbAGAmQADAaAAAtIAABhQAAAngDAUQgEAhgLAXIgHAMQAXgCBAgSQA3gPAgALQAcAJAXAdQAPASAVAmIB0DWQAVAmANATQAWAeAYARQAYARA3ASQA3ARAXARQAiAYAYAvIAZATQBeBNBxCWQCgDWAcAhQAaAdAHAKQARAWAJAUQASAogIAtQgJAtgeAeQggAfgtAGQguAGglgVQgUgMgUgWQgMgMgVgdIgrg5QgZAjgxANQg7AQgugfQgpAng8ARQg4AOg9gHQg1gHg8gWQgrgRhBggQgfgQgSAEQgLACgMAJIgTAQQgrAkg9gFQg+gFglgqIhlDLIAEAKIARAsIAPArIACAFQANAXADAaQADAZgKAYQgIAQgMANQgNANgQAIQgVAKgWAAQgOAAgNgEQgYgKgSgPQgTAmgNAVQgUAhgWAWQgaAaggAMQgWAIgVAAQgNAAgMgDgAvOneIABgDIgCAHIABgEgAvHnuIgDAHIAAABIADgIg");
	this.shape.setTransform(104.6311,110.8417);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol18, new cjs.Rectangle(0,0,209.3,221.7), null);


(lib.Symbol17 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.149)").s().p("AnxRSQg0gMgfg8QgYgsgOhJQgeicgMhRQgUiDgChrQgBg8AEhAIgBgDIgGgPIgHgCQgmA+goA8QgPAWgZAJQgsAQgpgWQhKg2AphSQAUgoAXgmIBMh/IgEgKIgIgZIgFgQQgWgqgPgsQgPgpgSgnQgUgsgLgvQgKgvACgwQABgdAMgbIABgHIABgHIACgHIAGgQIAHgPIAHgPIAJgRIAFgIIADgIIADgIIAEgIIABgDIAJgUIAAgBIABgCIAJgaQAIgZALgXQAIgSAGgSIAPgnQAHgUALgSIAGgQIAGgNIAGgNIAEgJIAGgOIAHgNIABgDIADgIIADgIIADgIIAEgHQALghAegUQAYgQAdABQAiAAAbAVQAaAUAJAgQAHAcgGAbIAEAKIAFANIABAJIABAJIACAIIgBAIIgBAIIgBAHIgCAHIgDAHIgDAHIgDAHIgDAGIgDAFIAAAIIAAAJIAAAIIAAAJIAEARIADASIACASIABAQIABAQIAAAIIACAHIACAIIABAIIABAIIABAIIABAJIABAIIABAJIADAJIAEADIAEADIAEAEIAEAEIACAEIAFAFIAEAGIAEAGIAEAGIABACIATgZQASgYAIgVQAPgngMgyQgIgfgbg7Qgcg/gIgdQgPgzAKgoIAFgPIgJgRQgJgSgEgLQgRgsARgwQAQgvApgXQASgKAdgHIAxgLQASgEAqgPQAmgOAXgFQAvgKAxAIQAxAHAqAYQAsAZAVAiQAPAbAFAmQAEAagBAtIAABhQAAAngCAUQgEAhgLAXIgGAMQAVgCBBgSQA3gPAhALQAbAJAYAdQAPASAUAmIB1DWQAUAmAOATQAVAeAZARQAXARA3ASQA3ARAXARQAjAYAYAvIAZATQBdBNBxCWQCgDWAdAhQAZAdAHAKQASAWAJAUQARAogIAtQgIAtgfAeQgfAfguAGQgtAGgmgVQgUgMgUgWQgLgMgWgdIgqg5QgaAjgwANQg8AQgugfQgoAng9ARQg3AOg+gHQg0gHg9gWQgrgRhAggQgggQgSAEQgKACgMAJIgUAQQgsAkg9gFQg8gFgmgqIhkDLIADAKIARAsIAPArIACAFQANAXADAaQADAZgKAYQgHAQgMANQgNANgRAIQgUAKgXAAQgNAAgNgEQgZgKgSgPQgTAmgMAVQgUAhgWAWQgbAaggAMQgWAIgVAAQgMAAgNgDgAx5pzIABgDIgDAHIACgEgAxzqDIgCAHIgBABIADgIg");
	this.shape.setTransform(114.7755,110.8417);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol17, new cjs.Rectangle(0,0,229.6,221.7), null);


(lib.Symbol16 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.149)").s().p("Ak1RSQg0gMggg8QgXgsgOhJQgficgMhRQgTiDgChrQgBg8AEhAIgCgDIgGgPIgGgCQgnA+gnA8QgPAWgZAJQgsAQgqgWQhJg2AohSQAVgoAXgmIBMh/IgEgKIgIgZIgFgQQgWgqgQgsQgOgpgSgnQgUgsgLgvQgLgvACgwQABgdAMgbIACgHIABgHIABgHIAGgQIAHgPIAIgPIAJgRIAEgIIAEgIIADgIIADgIIACgDIAIgUIABgBIAAgCIAKgaQAHgZALgXQAIgSAGgSIAPgnQAIgUAKgSIAHgQIAGgNIAGgNIADgJIAHgOIAGgNIACgDIACgIIADgIIADgIIAEgHQAMghAegUQAYgQAdABQAiAAAaAVQAbAUAIAgQAIAcgHAbIAFAKIAFANIABAJIABAJIABAIIAAAIIgBAIIgCAHIgCAHIgCAHIgDAHIgEAHIgCAGIgEAFIAAAIIAAAJIAAAIIABAJIADARIADASIADASIABAQIAAAQIABAIIABAHIACAIIABAIIACAIIABAIIABAJIABAIIABAJIADAJIADADIAEADIAFAEIADAEIADAEIAFAFIAEAGIAEAGIADAGIACACIASgZQATgYAHgVQAPgngMgyQgHgfgbg7Qgdg/gIgdQgPgzALgoIAEgPIgJgRQgJgSgEgLQgQgsAQgwQARgvApgXQASgKAcgHIAxgLQATgEAqgPQAmgOAWgFQAvgKAwAIQAxAHAqAYQAsAZAVAiQAQAbAGAmQADAaAAAtIAABhQAAAngDAUQgEAhgLAXIgHAMQAXgCBAgSQA4gPAgALQAcAJAXAdQAPASAVAmIB0DWQAVAmANATQAWAeAYARQAYARA3ASQA3ARAXARQAiAYAYAvIAZATQBeBNBxCWQCgDWAcAhQAaAdAHAKQARAWAJAUQASAogIAtQgJAtgeAeQggAfgtAGQguAGglgVQgUgMgUgWQgMgMgVgdIgrg5QgZAjgxANQg7AQgugfQgpAng8ARQg4AOg9gHQg1gHg8gWQgrgRhBggQgfgQgSAEQgLACgMAJIgTAQQgsAkg9gFQg+gFglgqIhlDLIAEAKIARAsIAPArIACAFQANAXADAaQADAZgKAYQgIAQgMANQgNANgQAIQgUAKgWAAQgOAAgNgEQgYgKgSgPQgTAmgNAVQgUAhgWAWQgaAaggAMQgWAIgVAAQgNAAgMgDgA01ttIABgCIgCAGIABgEgA0ut8IgDAGIAAABIADgHg");
	this.shape.setTransform(133.5255,110.8417);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol16, new cjs.Rectangle(0,0,267.1,221.7), null);


(lib.Symbol15 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.149)").s().p("AiyRSQg0gMggg8QgXgsgOhJQgficgMhRQgTiDgChrQgBg8AEhAIgCgDIgGgPIgGgCQgnA+gnA8QgPAWgZAJQgsAQgqgWQhJg2AohSQAVgoAXgmIBMh/IgEgKIgIgZIgFgQQgWgqgQgsQgOgpgSgnQgUgsgLgvQgLgvACgwQABgdAMgbIACgHIABgHIABgHIAGgQIAHgPIAIgPIAJgRIAEgIIAEgIIADgIIADgIIACgDIAIgUIABgBIAAgCIAKgaQAHgZALgXQAIgSAGgSIAPgnQAIgUAKgSIAHgQIAGgNIAGgNIADgJIAHgOIAGgNIACgDIACgIIADgIIADgIIAEgHQAMghAegUQAYgQAdABQAiAAAaAVQAbAUAIAgQAIAcgHAbIAFAKIAFANIABAJIABAJIABAIIAAAIIgBAIIgCAHIgCAHIgCAHIgDAHIgEAHIgCAGIgEAFIAAAIIAAAJIAAAIIABAJIADARIADASIADASIABAQIAAAQIABAIIABAHIACAIIABAIIACAIIABAIIABAJIABAIIABAJIADAJIADADIAEADIAFAEIADAEIADAEIAFAFIAEAGIAEAGIADAGIACACIASgZQATgYAHgVQAPgngMgyQgHgfgbg7Qgdg/gIgdQgPgzALgoIAEgPIgJgRQgJgSgEgLQgQgsAQgwQARgvApgXQASgKAcgHIAxgLQATgEAqgPQAlgOAWgFQAvgKAxAIQAxAHAqAYQAsAZAVAiQAQAbAGAmQADAaAAAtIAABhQAAAngDAUQgEAhgLAXIgHAMQAXgCBAgSQA4gPAgALQAcAJAXAdQAPASAVAmIB0DWQAVAmANATQAWAeAYARQAYARA3ASQA3ARAXARQAiAYAYAvIAZATQBeBNBxCWQCgDWAcAhQAaAdAHAKQARAWAJAUQASAogIAtQgJAtgeAeQggAfgtAGQguAGglgVQgUgMgUgWQgMgMgVgdIgrg5QgZAjgxANQg7AQgugfQgpAng8ARQg4AOg9gHQg1gHg8gWQgrgRhBggQgfgQgSAEQgLACgMAJIgTAQQgsAkg9gFQg+gFglgqIhlDLIAEAKIARAsIAPArIACAFQANAXADAaQADAZgKAYQgIAQgMANQgNANgQAIQgVAKgWAAQgOAAgNgEQgYgKgSgPQgTAmgMAVQgUAhgWAWQgaAaggAMQgWAIgVAAQgNAAgMgDgA24wXIABgDIgCAHIABgEgA2xwnIgDAHIAAABIADgIg");
	this.shape.setTransform(146.6255,110.8417);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol15, new cjs.Rectangle(0,0,293.3,221.7), null);


(lib.Symbol14 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.149)").s().p("AAjTRQgzgMggg8QgXgrgOhKQgficgMhQQgTiEgChrQgBg7AEhAIgCgEIgGgPIgGgBQgnA9gnA8QgPAWgZAJQgsARgqgXQhJg2AohRQAVgoAXgnIBMh+IgEgLIgIgYIgFgRQgWgqgQgtQgOgogSgoQgUgrgLguQgLgvACgwQABgeAMgbIACgGIABgHIABgIIAGgPIAHgPIAIgQIAJgQIAEgJIAEgHIADgIIADgIIACgEIAIgUIABgBIAAgBIAKgbQAHgYALgYQAIgRAGgSIAPgoQAIgTAKgTIAHgQIAGgNIAGgNIADgIIAHgOIAGgOIACgDIACgHIADgIIADgIIAEgHQAMgiAegTQAYgQAdAAQAiAAAaAVQAbAVAIAgQAIAbgHAcIAFAJIAFANIABAJIABAJIABAJIAAAIIgBAHIgCAHIgCAIIgCAHIgDAHIgEAGIgCAGIgEAFIAAAJIAAAIIAAAJIABAIIADASIADARIADASIABAQIAAAQIABAIIABAIIACAIIABAHIACAJIABAIIABAIIABAJIABAJIACAIIADADIAEADIAFAEIADAEIADAEIAFAGIAEAFIAEAGIADAGIACACIASgYQATgZAHgUQAPgogMgxQgHgggbg7Qgdg/gIgcQgOgzAKgpIAEgOIgJgSQgIgRgEgLQgQgtAQgvQAQgwApgWQASgKAcgHIAxgLQATgFAqgPQAmgNAWgFQAvgKAxAHQAxAIAqAXQAsAZAVAiQAQAbAGAnQADAaAAAtIAABhQAAAmgDAVQgEAggLAYIgHALQAXgBBAgSQA4gQAgALQAcAKAXAcQAPATAVAlIB0DWQAVAmANAUQAWAeAYARQAYAQA3ASQA3ASAXAQQAiAYAYAuIAZATQBeBNBxCYQCgDWAcAhQAaAcAHAKQARAWAJAVQASAngIAtQgJAugeAeQggAegtAHQguAGglgWQgUgLgUgWQgMgNgVgcIgrg6QgZAjgxANQg7AQgugeQgpAng8AQQg4APg9gIQg1gGg8gXQgrgQhBggQgfgQgSADQgLACgMAJIgTARQgsAjg9gEQg+gFglgrIhlDLIAEAKIARAtIAPAqIACAGQANAXADAaQADAZgKAXQgIAQgMANQgNAOgQAIQgVAJgWAAQgOAAgNgDQgYgKgSgQQgTAngNAUQgUAhgWAWQgaAaggAMQgWAIgVAAQgNAAgMgDgA6OzEIABgCIgCAGIABgEgA6HzTIgDAGIAAABIADgHg");
	this.shape.setTransform(168.0255,123.6274);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol14, new cjs.Rectangle(0,0,336.1,247.3), null);


(lib.Symbol13 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.149)").s().p("AEJVcQg0gMggg8QgXgsgOhJQgficgMhRQgTiDgChrQgBg8AEhAIgCgDIgGgPIgGgCQgnA+gmA8QgPAWgZAJQgsAQgqgWQhJg2AohSQAVgoAXgmIBMh/IgEgKIgIgZIgFgQQgWgqgQgtQgOgpgSgnQgUgsgLgvQgLgvACgvQABgdAMgbIACgHIABgHIABgHIAGgQIAHgPIAIgPIAJgRIAEgIIAEgIIADgIIADgIIACgDIAIgUIABgBIAAgCIAKgaQAHgZALgXQAIgSAGgSIAPgnQAIgUAKgSIAHgQIAGgNIAGgNIADgJIAGgOIAGgNIACgDIACgIIADgIIADgIIAEgHQAMghAegUQAYgQAdABQAiAAAaAVQAbAUAIAgQAIAcgHAbIAFAKIAFANIABAJIABAJIABAIIAAAIIgBAIIgCAHIgCAHIgCAHIgDAHIgEAHIgCAGIgEAFIAAAIIAAAJIAAAIIABAJIADARIADASIADASIABAQIAAAQIABAIIABAHIACAIIABAIIACAIIABAIIABAJIABAIIABAJIADAJIADADIAEADIAFAEIADAEIADAEIAFAFIAEAGIAEAGIADAGIACACIASgZQATgYAHgVQAPgngMgyQgHgfgbg7Qgdg/gIgdQgPgzALgoIAEgPIgJgRQgJgSgEgLQgQgsAQgwQARgvApgXQASgKAcgHIAxgLQATgEAqgPQAmgOAWgFQAvgKAxAIQAxAHAqAYQAsAZAVAiQAQAbAGAmQADAaAAAtIAABhQAAAngDAUQgEAhgLAXIgHAMQAXgCBAgSQA4gPAgALQAcAJAXAdQAPASAVAmIB0DWQAVAmANATQAWAeAYARQAYAQA3ASQA3ARAXARQAiAYAYAvIAZATQBeBNBxCXQCgDWAcAhQAaAdAHAKQARAWAJAUQASAogIAtQgJAtgeAeQggAfgtAGQguAGglgVQgUgMgUgWQgMgMgVgdIgrg5QgZAjgxANQg7AQgugfQgpAng8ARQg4AOg9gHQg1gHg8gWQgrgRhBggQgfgQgSAEQgLACgMAJIgTAQQgsAkg9gFQg+gFglgqIhlDLIAEAKIARAsIAPArIACAFQANAXADAaQADAZgKAYQgIAQgMANQgNANgQAIQgVAKgWAAQgOAAgNgEQgYgKgSgPQgTAmgNAVQgUAhgWAWQgaAaggAMQgWAIgVAAQgNAAgMgDgA901OIABgDIgCAHIABgEgA9t1eIgDAHIAAABIADgIg");
	this.shape.setTransform(191.0255,137.4774);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol13, new cjs.Rectangle(0,0,382.1,275), null);


(lib.Symbol12 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Layer2();
	this.instance.setTransform(0,0,0.0585,0.0585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol12, new cjs.Rectangle(0,0,70,143.3), null);


(lib.Symbol11 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Layer2();
	this.instance.setTransform(0,0,0.0585,0.0585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol11, new cjs.Rectangle(0,0,70,143.3), null);


(lib.Symbol10 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Layer2();
	this.instance.setTransform(0,0,0.0585,0.0585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol10, new cjs.Rectangle(0,0,70,143.3), null);


(lib.Symbol9 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Layer2();
	this.instance.setTransform(0,0,0.0585,0.0585);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol9, new cjs.Rectangle(0,0,70,143.3), null);


(lib.Symbol8 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.149)").s().p("Ap1Q/QghgXgSgtQgNgigJg1QgXiXgEjQIgCloQgBiLABgrQAChlAOhPQAQhfAlhOQAqhYBAg6Qgugmgdg6Qgbg3gGg/QgMhvAziCQAkhcA2gtQBHg7BoANQBlANBEBGQBABAAbBjQAYBYgIBmIgEAtQgBAaAEATQAFAUAMAWQAIAOARAZQEbGiCCDaQDYFrBzE8QASAyAHAfQAJAugEAlQgGAsgbAiQgcAkgoAGQhHALhJhUQgvg2hMiBQhJh9g0g4QgMArglAdQgmAegsABQgtACgngbQgmgagPgqQAPCZhFA6QgwAqhGgUQhGgUgTg9QgSAfgeAVQgfAWgjAGQAGAvgOAsQgPAughAdQgjAggwAFIgQABQgnAAgegWg");
	this.shape.setTransform(73.2523,110.9057);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol8, new cjs.Rectangle(0,0,146.5,221.8), null);


(lib.Symbol7 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.149)").s().p("AoBPRQglgSgZghQgog2gNhgQgOhsATjQQATjXgKhkQgFgugShiQgShdgEgyQgEgrABhXQAAhWgEgsQgCgdgRhpQgNhSAAg0QABhJAZg8QAdhDA2giQAUgMAfgLIA1gSIBDgZQAogPAdgDQBQgLBMAyQBJAvAkBOQA9CIgxC/QBvB3A5A6QBfBgBRBJIBjBXQA4AzAmAoQCMCaBJDjQAOAuAFAgQAGAsgJAjQgKApggAbQgiAdgmgEQAUAugZAzQgZAygwAUQgtAUg2gJQgygHgvgcQgngYgogoQgZgYgsgzQABAWAUBTQAQBAgLAnQgPA2g7AYQg6AXg0gYQgvgYggg7QgWgogWhKQgEBDhCAnQhCAng9gdQgLAugeAiQghAkgqAHIgTACQgdAAgdgOg");
	this.shape.setTransform(69.8941,99.1066);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol7, new cjs.Rectangle(0,0,139.8,198.2), null);


(lib.Symbol6 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.149)").s().p("AI6PGQgogLgkglQgXgYghgyIiij0QAQBEg0A9Qg0A8hGgGQADA2goAsQgnAsg0AEQg2AEgtglQgtgmgGg1QgoAKgUAHQggAMgVASQgOALgUAaQgWAbgLAKQgvAthKgCQhHgDg3gqQhfhIghifQgniyAwknQAdifAMhPQAViKAAhmQABhSAFgdQALg+AighIAggYQATgPAJgNQATgagDgsIgKhNQgKhNAfhJQAghLA/gqQBAgrBRADQBTADA5AyQAcAZAaApQAPAZAZA0QA7B+AUA4QAHASAdBcQAVBEATApQAdA+A6BPIBkCGQBRBvBLCVQA2BsBHCpQA2CEA6CUQATAxAGAbQAKArgIAiQgMAygxAdQghAUgiAAQgQAAgQgFg");
	this.shape.setTransform(73.346,97.1041);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol6, new cjs.Rectangle(0,0,146.7,194.3), null);


(lib.Symbol5 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.149)").s().p("AwuRiQgqgegSgwQgQgogBg3QgBgjAHg/QAajoArloQAej4AUh5QAijMAvifQAahVAfgrQAWgeAcgSQAggVAigCQgahMgChRQgDhRAVhNQAUhRAtgnQAwgqBHAFQBFAEAzAtQAmAhAUAvQAUAwgEAxQgEAygeArQgeArgtAUIAKBSQA6gQBEAeQAvAVBEA0QBFA0AiAcIAdAaIABgMQAGg0APgnQAMgaAEgOQAJgXgCgSQgBgRgLgUQgFgKgRgYQg4hTgIhGQgFgrANgoQAOgrAfgaQAngiA8gCQA1gCA4AWQA7AYApAqQAtAvAIA4QADAVACAsQAFAlATARQAPAPAbAEQAQACAggBQB4gDBNAXQB9AlByB7QBOBVAaBRQAPAuADA9QACAkgDBJQgEBmgGA0QgLBVgZBAIgNAhQgHAUgBAPQgEAuAnAvQASAXA9A0QBeBSA9BvQA0BggYBAQgRAtgzAYQgtAWg2gDQgJA1gyAgQgyAggzgPQgjgJghggQgXgVgegpQhah+hEiEQgeAZgpAGQgpAGglgQQgCAngYAgQgZAggkANQgPAFgQABIgNAKQgiAWgmgBQgnAAghgXQghgXgPgjQgyAlhCgSQhCgRgbg4QgfASgqgCQgmgCgjgSQgfgQgfgcQgUgSgjglQAHAtgVArQgVArgnAVQgoAWgvgGQgwgFghgeQgYAwg4ATQg3ATgxgYQgWB0gFB4IgDBLQgEAqgLAeQgMAmgZAbQgcAdgjAHQgLADgKAAQgjAAgigYg");
	this.shape.setTransform(114.7977,114.5598);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol5, new cjs.Rectangle(0,0,229.6,229.1), null);


(lib.Symbol4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.149)").s().p("AFKPZQgjgKghgfQgWgVgfgqQhah+hDiDQgfAZgoAGQgpAFgkgPQgCAmgZAgQgYAhglAMQgkANgngLQgngKgagdQgjgpgEhJIAEiBQADhQgUhRQgThPgohHQgKgShNhyQg1hOgTg6QgOgtgEg7QgCglABhGQABg9AEghQAFgzAQgnQALgbAFgNQAIgYgBgRQgCgSgKgUQgGgKgQgXQg5hTgIhGQgEgsANgoQAOgqAegbQAoghA8gDQA2gCA3AXQA8AYAoAqQAtAvAIA4QADAVADArQAEAlATASQAQAOAaAEQARADAggBQB3gEBMAXQB+AlByB8QBOBVAaBRQAOAuADA8QACAlgCBJQgEBlgHA0QgKBVgZBAIgOAiQgGATgCAQQgDAuAmAvQATAWA8A0QBfBSA8BvQA0BggYBAQgRAtgyAYQguAWg2gDQgIA1gyAgQgjAWgjAAQgQAAgQgEg");
	this.shape.setTransform(66.4711,98.8929);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol4, new cjs.Rectangle(0,0,133,197.8), null);


(lib.Symbol3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.149)").s().p("ACxNOQgZgRgVgfQgNgUgTgpIiJkiQhMiggkhTQg6iJgghxIgWhKQgNgqgRgdIgjg3QgVgggGgaQgGgYAFg9QAEg3gLgdQgKgagdgeIgwgyQgqg0AChHQADhJAwgrQAggdAvgMQAqgKAxAEQBPAGAxAnQAcAXAPAgQAPAigGAhQBbARAtAOQBLAXAyAlQAlAbArAzIBJBWQAuAzAGAIQAcAjAKAgQAOAygaAyQgZAzgwASQAPAgAgAoIA2BEQBCBWgJBIQgFAngbAfQgbAfgmALQglAMgogMQgngMgagdQAjCrA4CeIAYBGQALAnAEAgQADAngIAiQgKAmgYAaQgfAggwAGIgRABQglAAgfgVg");
	this.shape.setTransform(48.9777,86.6674);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol3, new cjs.Rectangle(0,0,98,173.4), null);


(lib.Symbol2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,0,0,0.149)").s().p("AAsEFQgsgFgegcQgOgNgRgYIgdgnQgdghgNgSQgTgdgSg8QgVhFgBgvQgBhEAlgsQAXgaAigMQAjgLAhAHQAhAGAbAZQAbAXAMAhQAFAPAEAcQAFAdAEANQAKAgAtA9QApA6AHAmQAIApgTAoQgSAoglAVQgeARgjAAIgPgBg");
	this.shape.setTransform(19.1944,26.1581);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol2, new cjs.Rectangle(0,0,38.4,52.4), null);


(lib.Tween173 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween20("synched",0);
	this.instance.setTransform(-1.15,2.1,0.9999,0.9999,-9.2691,0,0,0.2,0.1);

	this.instance_1 = new lib.Tween18("synched",0);
	this.instance_1.setTransform(-2.95,-0.65,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_2 = new lib.Tween22("synched",0);
	this.instance_2.setTransform(-2.95,-0.65,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_3 = new lib.Tween24("synched",0);
	this.instance_3.setTransform(-2.95,-0.65,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_4 = new lib.Tween26("synched",0);
	this.instance_4.setTransform(-2.95,-0.65,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_5 = new lib.Tween36("synched",0);
	this.instance_5.setTransform(3.4,-2,0.9999,0.9999,-9.2691,0,0,0.3,0.1);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgBAsIgBAAIgBgBIgBAAIgBgBIgBgBIgBgBIgBgBIAAgBIgBgBIAAgCIAAgBIAAgOIAAgNIAAgNIAAgOIAAgNIAAgDIABgBIAAgBIABgBIABgBIABgBIABgBIABAAIABgBIABAAIABAAIABAAIABAAIACABIABAAIABABIABABIABABIAAABIABABIAAABQABAGAAAHIAAANIAAANIAAAOIAAANIgBAHIAAABIgBABIAAABIgBABIgBABIgBABIgBAAIgCABIgBAAIgBAAIgBAAg");
	this.shape.setTransform(15.1083,-2.325);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.9,-23,65.9,46.2);


(lib.Tween172 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween20("synched",0);
	this.instance.setTransform(-2.85,0.7,0.9999,0.9999,-9.2691,0,0,0.2,0.1);

	this.instance_1 = new lib.Tween18("synched",0);
	this.instance_1.setTransform(-2.95,0.75,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_2 = new lib.Tween22("synched",0);
	this.instance_2.setTransform(-2.95,0.75,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_3 = new lib.Tween24("synched",0);
	this.instance_3.setTransform(-2.95,0.75,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_4 = new lib.Tween26("synched",0);
	this.instance_4.setTransform(-2.95,0.75,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_5 = new lib.Tween36("synched",0);
	this.instance_5.setTransform(3.4,-0.6,0.9999,0.9999,-9.2691,0,0,0.3,0.1);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("AgBAsIgBAAIgBgBIgBAAIgBgBIgBgBIgBgBIgBgBIAAgBIgBgBIAAgCIAAgBIAAgOIAAgNIAAgNIAAgOIAAgNIAAgDIABgBIAAgBIABgBIABgBIABgBIABgBIABAAIABgBIABAAIABAAIABAAIABAAIACABIABAAIABABIABABIABABIAAABIABABIAAABQABAGAAAHIAAANIAAANIAAAOIAAANIgBAHIAAABIgBABIAAABIgBABIgBABIgBABIgBAAIgCABIgBAAIgBAAIgBAAg");
	this.shape.setTransform(15.1083,-0.925);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.9,-21.6,65.9,43.400000000000006);


(lib.Tween171 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween20("synched",0);
	this.instance.setTransform(-2.25,-0.65,0.9999,0.9999,-9.2691,0,0,0.2,0.1);

	this.instance_1 = new lib.Tween18("synched",0);
	this.instance_1.setTransform(-2.95,0.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_2 = new lib.Tween22("synched",0);
	this.instance_2.setTransform(-2.95,0.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_3 = new lib.Tween24("synched",0);
	this.instance_3.setTransform(-2.95,0.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_4 = new lib.Tween26("synched",0);
	this.instance_4.setTransform(-2.95,0.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_5 = new lib.Tween36("synched",0);
	this.instance_5.setTransform(3.4,-0.55,0.9999,0.9999,-9.2691,0,0,0.3,0.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.9,-21.7,65.9,43.5);


(lib.Tween169 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween55("synched",0);
	this.instance.setTransform(1.5,-0.15);

	this.instance_1 = new lib.Tween57("synched",0);
	this.instance_1.setTransform(-1.8,0.5);

	this.instance_2 = new lib.Tween59("synched",0);
	this.instance_2.setTransform(-1.8,0.5);

	this.instance_3 = new lib.Tween61("synched",0);
	this.instance_3.setTransform(-1.8,0.5);

	this.instance_4 = new lib.Tween63("synched",0);
	this.instance_4.setTransform(-1.8,0.5);

	this.instance_5 = new lib.Tween65("synched",0);
	this.instance_5.setTransform(1.75,-0.4);

	this.instance_6 = new lib.Tween67("synched",0);
	this.instance_6.setTransform(1.2,-0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.2,-16.9,36.5,33.8);


(lib.Tween168 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween55("synched",0);
	this.instance.setTransform(1.5,-0.15);

	this.instance_1 = new lib.Tween57("synched",0);
	this.instance_1.setTransform(-1.8,0.5);

	this.instance_2 = new lib.Tween59("synched",0);
	this.instance_2.setTransform(-1.8,0.5);

	this.instance_3 = new lib.Tween61("synched",0);
	this.instance_3.setTransform(-1.8,0.5);

	this.instance_4 = new lib.Tween63("synched",0);
	this.instance_4.setTransform(-1.8,0.5);

	this.instance_5 = new lib.Tween65("synched",0);
	this.instance_5.setTransform(1.75,-0.4);

	this.instance_6 = new lib.Tween67("synched",0);
	this.instance_6.setTransform(1.2,-0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6},{t:this.instance_5},{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-18.2,-16.9,36.5,33.8);


(lib.Symbol24 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween163("synched",0);
	this.instance.setTransform(0.05,0.15,1,1,13.0179,0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol24, new cjs.Rectangle(-60.3,-71.7,120.69999999999999,143.5), null);


(lib.Symbol21 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Symbol9();
	this.instance.setTransform(0,3.2,1,1,0,0,0,35,71.6);

	this.instance_1 = new lib.Tween167("synched",0);
	this.instance_1.setTransform(-4.1,-55.25);

	this.instance_2 = new lib.Layer22();
	this.instance_2.setTransform(-15.55,-68.4,0.1,0.0998);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol21, new cjs.Rectangle(-35,-74.8,70,149.7), null);


(lib.Tween230 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween173("synched",0);
	this.instance.setTransform(0,0,1,1,14.9983);

	this.instance_1 = new lib.Tween173("synched",0);
	this.instance_1.setTransform(0,0,1,1,14.9983);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-31.8,-21,64.4,42.2);


(lib.Tween229 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween172("synched",0);

	this.instance_1 = new lib.Tween172("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.9,-21.6,65.9,43.400000000000006);


(lib.Tween228 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.instance = new lib.Tween171("synched",0);

	this.instance_1 = new lib.Tween171("synched",0);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-32.9,-21.7,65.9,43.5);


(lib.Symbol22 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.movieClip_2 = new lib.Symbol21();
	this.movieClip_2.name = "movieClip_2";

	this.instance = new lib.Tween167("synched",0);
	this.instance.setTransform(-4.1,-55.25);

	this.instance_1 = new lib.Layer22();
	this.instance_1.setTransform(-15.55,-68.4,0.1,0.0998);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance},{t:this.movieClip_2}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Symbol22, new cjs.Rectangle(-35,-74.8,70,149.7), null);


// stage content:
(lib.AdventuresofaMisshapenGumball = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,19,42,47,52,79,80,132,135,137,144,208,225,233,235,299,303,304,315,322,329,333];
	this.streamSoundSymbolsList[19] = [{id:"V1",startFrame:19,endFrame:42,loop:1,offset:0}];
	this.streamSoundSymbolsList[42] = [{id:"V1",startFrame:42,endFrame:52,loop:1,offset:0}];
	this.streamSoundSymbolsList[52] = [{id:"V1",startFrame:52,endFrame:55,loop:1,offset:0}];
	this.streamSoundSymbolsList[80] = [{id:"Footstepsmp3onlineaudioconvertcom",startFrame:80,endFrame:119,loop:1,offset:0}];
	this.streamSoundSymbolsList[144] = [{id:"whimpering85279mp3",startFrame:144,endFrame:206,loop:1,offset:0}];
	this.streamSoundSymbolsList[304] = [{id:"hmmmm",startFrame:304,endFrame:324,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.movieClip_4.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_4.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_4()
		{
			this.gotoAndPlay(5);
		}
	}
	this.frame_1 = function() {
		playSound("V1");
		playSound("outdoor");
	}
	this.frame_19 = function() {
		var soundInstance = playSound("V1",0);
		this.InsertIntoSoundStreamData(soundInstance,19,42,1);
	}
	this.frame_42 = function() {
		var soundInstance = playSound("V1",0);
		this.InsertIntoSoundStreamData(soundInstance,42,52,1);
	}
	this.frame_47 = function() {
		playSound("V3");
	}
	this.frame_52 = function() {
		var soundInstance = playSound("V1",0);
		this.InsertIntoSoundStreamData(soundInstance,52,55,1);
	}
	this.frame_79 = function() {
		playSound("Gasp");
	}
	this.frame_80 = function() {
		var soundInstance = playSound("Footstepsmp3onlineaudioconvertcom",0);
		this.InsertIntoSoundStreamData(soundInstance,80,119,1);
	}
	this.frame_132 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.movieClip_1.addEventListener("click", fl_ClickToGoToAndPlayFromFrame.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame()
		{
			this.gotoAndPlay(133);
		}
	}
	this.frame_135 = function() {
		playSound("marbles63784mp3");
	}
	this.frame_137 = function() {
		playSound("Machine");
	}
	this.frame_144 = function() {
		var soundInstance = playSound("whimpering85279mp3",0);
		this.InsertIntoSoundStreamData(soundInstance,144,206,1);
	}
	this.frame_208 = function() {
		playSound("gasp81796mp3");
	}
	this.frame_225 = function() {
		playSound("gasphoh104639mp3");
	}
	this.frame_233 = function() {
		playSound("chewinggum73551mp3");
	}
	this.frame_235 = function() {
		playSound("whimpering85279mp3mp3copy");
	}
	this.frame_299 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.movieClip_3.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_3.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_3()
		{
			this.gotoAndPlay(300);
		}
	}
	this.frame_303 = function() {
		playSound("Machinemp3copy");
	}
	this.frame_304 = function() {
		var soundInstance = playSound("hmmmm",0);
		this.InsertIntoSoundStreamData(soundInstance,304,324,1);
	}
	this.frame_315 = function() {
		/* Stop at This Frame
		The  timeline will stop/pause at the frame where you insert this code.
		Can also be used to stop/pause the timeline of movieclips.
		*/
		
		this.stop();
		
		/* Click to Go to Frame and Play
		Clicking on the specified symbol instance moves the playhead to the specified frame in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		
		Instructions:
		1. Replace the number 5 in the code below with the frame number you would like the playhead to move to when the symbol instance is clicked.
		2.Frame numbers in EaselJS start at 0 instead of 1
		*/
		
		this.movieClip_5.addEventListener("click", fl_ClickToGoToAndPlayFromFrame_5.bind(this));
		
		function fl_ClickToGoToAndPlayFromFrame_5()
		{
			this.gotoAndPlay(316);
		}
	}
	this.frame_322 = function() {
		playSound("yayy");
	}
	this.frame_329 = function() {
		playSound("applause");
	}
	this.frame_333 = function() {
		playSound("whoohoo");
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(18).call(this.frame_19).wait(23).call(this.frame_42).wait(5).call(this.frame_47).wait(5).call(this.frame_52).wait(27).call(this.frame_79).wait(1).call(this.frame_80).wait(52).call(this.frame_132).wait(3).call(this.frame_135).wait(2).call(this.frame_137).wait(7).call(this.frame_144).wait(64).call(this.frame_208).wait(17).call(this.frame_225).wait(8).call(this.frame_233).wait(2).call(this.frame_235).wait(64).call(this.frame_299).wait(4).call(this.frame_303).wait(1).call(this.frame_304).wait(11).call(this.frame_315).wait(7).call(this.frame_322).wait(7).call(this.frame_329).wait(4).call(this.frame_333).wait(117));

	// Title_button
	this.movieClip_4 = new lib.Symbol23();
	this.movieClip_4.name = "movieClip_4";
	this.movieClip_4.setTransform(200,150);

	this.timeline.addTween(cjs.Tween.get(this.movieClip_4).to({_off:true},1).wait(449));

	// Title
	this.instance = new lib.Title_Text();
	this.instance.setTransform(0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({_off:true},1).wait(449));

	// closed_hand
	this.instance_1 = new lib.Layer5();
	this.instance_1.setTransform(943,916);

	this.instance_2 = new lib.Tween162("synched",0);
	this.instance_2.setTransform(191,314.7);
	this.instance_2._off = true;

	this.instance_3 = new lib.Tween163("synched",0);
	this.instance_3.setTransform(181.55,317.4);
	this.instance_3._off = true;

	this.instance_4 = new lib.Tween164("synched",0);
	this.instance_4.setTransform(181.6,316);
	this.instance_4._off = true;

	this.instance_5 = new lib.Tween165("synched",0);
	this.instance_5.setTransform(171.75,299.9);

	this.movieClip_5 = new lib.Symbol24();
	this.movieClip_5.name = "movieClip_5";
	this.movieClip_5.setTransform(176.5,301.05);
	this.movieClip_5._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1}]}).to({state:[{t:this.instance_2}]},137).to({state:[{t:this.instance_3}]},2).to({state:[{t:this.instance_4}]},2).to({state:[{t:this.instance_5}]},2).to({state:[]},2).to({state:[{t:this.instance_2}]},15).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},4).to({state:[{t:this.instance_2}]},3).to({state:[{t:this.instance_2}]},1).to({state:[]},1).to({state:[{t:this.instance_3}]},129).to({state:[{t:this.instance_3}]},3).to({state:[{t:this.instance_3}]},2).to({state:[{t:this.movieClip_5}]},2).to({state:[{t:this.instance_3}]},2).to({state:[{t:this.instance_3}]},2).to({state:[{t:this.instance_3}]},3).to({state:[{t:this.instance_3}]},2).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},1).to({state:[{t:this.instance_3}]},2).to({state:[{t:this.instance_3}]},2).to({state:[{t:this.instance_3}]},2).to({state:[]},1).wait(117));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(137).to({_off:false},0).to({_off:true,x:181.55,y:317.4},2).wait(21).to({_off:false,rotation:29.9992,x:178.6,y:339.05},0).to({regX:0.1,rotation:14.9994,x:193.85,y:307.45},3).to({regY:0.1,rotation:0,x:235.9,y:307.5},3).to({rotation:-14.9996,x:271.95,y:310.6},4).to({x:297.9,y:324.65},4).to({x:316.85,y:350.65},3).to({y:384.65},1).to({_off:true},1).wait(271));
	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(137).to({_off:false},2).to({_off:true,x:181.6,y:316},2).wait(167).to({_off:false,x:192.75,y:299.6},0).to({rotation:14.9992,x:176.45,y:301.05},3).to({regX:0.1,regY:0.1,rotation:21.4657,x:176.5,y:301.2},2).to({_off:true,regX:0,regY:0,rotation:0,y:301.05,mode:"independent"},2).to({_off:false,regX:0.2,regY:0.1,rotation:21.2539,x:176.6,y:301.25,mode:"synched",startPosition:0},2).to({scaleX:0.9999,scaleY:0.9999,rotation:6.2541,x:176.65},2).to({regX:0.3,rotation:21.2534,x:176.75,y:301.3},3).to({regX:0.4,rotation:6.2543,x:176.85,y:301.35},2).to({rotation:6.2543},1).to({rotation:-1.9685},1).to({regX:0.5,regY:0.2,rotation:-10.174,x:176.95,y:301.4},2).to({regX:0.4,rotation:4.8252,x:176.85},2).to({regX:0.5,rotation:19.8245,x:176.9},2).to({_off:true},1).wait(117));
	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(139).to({_off:false},2).to({_off:true,x:171.75,y:299.9},2).wait(307));
	this.timeline.addTween(cjs.Tween.get(this.movieClip_5).wait(313).to({_off:false},2).to({_off:true,regX:0.2,regY:0.1,rotation:21.2539,x:176.6,y:301.25,mode:"synched",startPosition:0},2).wait(133));

	// Open_hand
	this.instance_6 = new lib.Layer2();
	this.instance_6.setTransform(928,553);

	this.instance_7 = new lib.Symbol9();
	this.instance_7.setTransform(220,365.6,1,1,0,0,0,35,71.6);
	this.instance_7._off = true;

	this.instance_8 = new lib.Symbol10();
	this.instance_8.setTransform(220,352.6,1,1,0,0,0,35,71.6);

	this.instance_9 = new lib.Symbol11();
	this.instance_9.setTransform(206,339.6,1,1,0,0,0,35,71.6);

	this.instance_10 = new lib.Symbol12();
	this.instance_10.setTransform(195,319.6,1,1,0,0,0,35,71.6);
	this.instance_10._off = true;

	this.movieClip_3 = new lib.Symbol22();
	this.movieClip_3.name = "movieClip_3";
	this.movieClip_3.setTransform(196.55,336.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_6}]}).to({state:[{t:this.instance_7}]},129).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_8}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_9}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[]},1).to({state:[{t:this.instance_10}]},8).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[{t:this.instance_10}]},1).to({state:[]},1).to({state:[{t:this.instance_7}]},144).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.movieClip_3}]},1).to({state:[{t:this.movieClip_3}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[]},1).to({state:[{t:this.instance_7}]},25).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[{t:this.instance_7}]},1).to({state:[]},1).wait(99));
	this.timeline.addTween(cjs.Tween.get(this.instance_7).wait(129).to({_off:false},0).wait(1).to({_off:true},1).wait(164).to({_off:false,x:196.55,y:382.9},0).wait(3).to({y:360.9},0).to({_off:true},1).wait(2).to({_off:false,y:324.6},0).wait(4).to({y:311.35},0).wait(2).to({y:301.3},0).to({_off:true},1).wait(25).to({_off:false,x:190.6},0).wait(2).to({regX:35.1,regY:71.5,x:190.65,y:319.4},0).wait(1).to({regX:35,regY:71.6,x:190.55,y:319.5},0).wait(3).to({x:190.6,y:333.15},0).wait(4).to({y:352.6},0).wait(3).to({y:365.85},0).wait(3).to({y:382.9},0).wait(1).to({_off:true},1).wait(99));
	this.timeline.addTween(cjs.Tween.get(this.instance_10).wait(135).to({_off:false},0).wait(1).to({_off:true},1).wait(8).to({_off:false,regX:34.9,regY:71.5,rotation:44.9994,x:174.65,y:306.35},0).wait(1).to({regX:35,regY:71.6,rotation:44.9996,x:174.6,y:306.45},0).wait(1).to({regX:34.8,regY:71.5,rotation:44.9994,x:162.5,y:318.25},0).wait(1).to({regX:35,regY:71.6,rotation:44.9996,x:162.55,y:318.45},0).wait(1).to({regX:34.9,regY:71.4,rotation:44.9994,x:142.55,y:329.9},0).wait(1).to({regX:35,regY:71.6,rotation:44.9996,x:142.45,y:330.05},0).to({_off:true},1).wait(299));

	// LOVE
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#CC9999").s().p("AnMCoQgPgGgNgNQgHgHgBgEQgDgFAAgIQAAgLAEgFQAFgGAKABQAHgBAIAHQAFADADAAQADAAAGgGQAGgGAJgDQAJgCAHAFQAJAFAAAOQAAAIgGAMQgGAOgIAJQgHAIgHACIgEAAQgGAAgIgFgAC/AAIgsghQgNgLgEgGQgFgJABgLQAAgSALgKQAFgFAIgCQAIgCAGADQAGADAIALQAIALAGADQgCgLAGgJQAGgJAJgFQAKgDALADQAKAEAGAJQALASgMAbIgKAVQgHANgCAIIgDAJQgCAFgDACQgEADgEAAQgJAAgMgJgAK2g2QgJgCgJgMQgLgPgFgDQgLgHgDgFQgEgFAAgOQAAgPAFgGQAGgHAKAAQALACAGAGQAEAGADAAQADgBADgDQANgKAQAAQAJAAAFAFQAFAFABAJQADARgKAOIgLARIgFAOQgEAGgHADQgEACgEAAIgGgBgAqkhBQgLAAgNgJQgGgDgOgNQgOgMgFgIQgDgHAAgGQAAgIAFgFQAFgEAKgBQAQgCAOAKQACgQADgIQAGgLALgEQAIgCAIAHQAIAFADAJQACAIgDASIgIAoQgCALgDAEQgGAIgKAAIgDgBg");
	this.shape.setTransform(208.151,198.45);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(355).to({_off:false},0).to({_off:true},8).wait(5).to({_off:false},0).to({_off:true},6).wait(7).to({_off:false},0).wait(8).to({_off:true},1).wait(60));

	// Shadow
	this.instance_11 = new lib.Symbol2();
	this.instance_11.setTransform(413.6,198.8,1,1,0,0,0,19.2,26.2);
	this.instance_11._off = true;

	this.instance_12 = new lib.Symbol3();
	this.instance_12.setTransform(388.35,231.8,1,1,0,0,0,49,86.7);
	this.instance_12._off = true;

	this.instance_13 = new lib.Symbol4();
	this.instance_13.setTransform(343.85,256.55,1,1,0,0,0,66.5,98.9);
	this.instance_13._off = true;

	this.instance_14 = new lib.Symbol5();
	this.instance_14.setTransform(295.5,266,1,1,0,0,0,114.8,114.5);
	this.instance_14._off = true;

	this.instance_15 = new lib.Symbol6();
	this.instance_15.setTransform(232.75,251.4,1,1,0,0,0,73.4,97.1);
	this.instance_15._off = true;

	this.instance_16 = new lib.Symbol7();
	this.instance_16.setTransform(223.05,248.4,1,1,0,0,0,69.9,99.1);
	this.instance_16._off = true;

	this.instance_17 = new lib.Symbol8();
	this.instance_17.setTransform(226.55,247.7,1,1,0,0,0,73.2,110.9);
	this.instance_17._off = true;

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,0,0,0.149)").s().p("ArZRSQg0gMggg8QgXgsgOhJQgficgMhRQgTiDgChrQgEjMA6kFQAWhhAUhHQARg3AOgjQAUgwAZgjIAggqQATgYAHgVQAPgngMgyQgHgfgbg7Qgdg/gIgdQgPgzALgoIAEgPIgJgRQgJgSgEgLQgQgsAQgwQARgvApgXQASgKAcgHIAxgLQATgEAqgPQAmgOAWgFQAvgKAxAIQAxAHAqAYQAsAZAVAiQAQAbAGAmQADAaAAAtIAABhQAAAngDAUQgEAhgLAXIgHALQAXgBBAgSQA4gPAgALQAcAJAXAdQAPASAUAmIB0DWQAVAmANATQAWAeAYARQAYARA3ASQA3ARAXARQAiAXAYAvIAZAUQBeBNBxCWQCgDWAcAhQAaAdAHAKQARAWAJAUQASAogIAtQgJAtgeAeQggAfgtAGQguAGglgVQgUgMgUgWQgMgMgVgdIgrg6QgZAkgxANQg7AQgugfQgpAng8ARQg4AOg9gHQg1gHg8gWQgrgRhAggQgfgQgSAEQgLACgMAJIgTAQQgsAkg9gFQg+gFglgqIjWGvQgUAogNAWQgUAhgWAWQgaAaggAMQgWAIgVAAQgNAAgMgDg");
	this.shape_1.setTransform(233.9127,277.2417);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("rgba(0,0,0,0.149)").s().p("Ap4RSQg0gMggg8QgXgsgOhJQgficgMhRQgTiDgChrQgEioAnjQIgGgJQgOgTgMgUIgdgvQgOgUgPgUQgLgOgJgPIgEgEIgEgEIgFgFIgGgEIgGgFIgFgGIgFgFIgEgEQgVgGgRgMQgOgLgKgPQgIgLgFgOQgFgQAAgRQAAgSADgSQACgRAHgPQACgOADgNIAGgaIAHgZIAHgbIAEgSIAAgJIABgKIACgJIABgKIACgKIADgJIACgKIADgRIADgQIAFgSIAGgRIACgIIACgHIABgIIABgHIACgIIACgGIADgIIAEgIIACgFIADgIIADgIIAEgIIAFgHIADgGIAEgGIADgGIAFgHIAFgHIAGgPIAIgPIAKgNIALgLIAFgGIAFgGQAOgNARgIQARgIAUgBQAQAAAQAFQAPAEANAJQALAIAJALQAJALAGANIAFANIABAJIABAJIABAIIAAAIIgBAIIgCAHIgCAHIgCAHIgDAHIgEAHIgCAGIgEAFIAAAIIAAAJIAAAIIABAJIADARIADASIADASIABAQIAAAQIABAIIABAHIACAIIABAIIACAIIABAIIABAJIABAIIABAJIADAJIADADIAEADIAFAEIADAEIADAEIAFAFIAEAGIAEAGIADAGIABACIATgZQATgYAHgVQAPgngMgyQgHgfgbg7Qgdg/gIgdQgPgzALgoIAEgPIgJgRQgJgSgEgLQgQgsAQgwQARgvApgXQASgKAcgHIAxgLQATgEAqgPQAmgOAWgFQAvgKAxAIQAxAHAqAYQAsAZAVAiQAQAbAGAmQADAaAAAtIAABhQAAAngDAUQgEAhgLAXIgHALQAWgBBBgSQA4gPAfALQAcAJAXAdQAPASAVAmIB0DWQAVAmANATQAWAeAYARQAYARA3ASQA3ARAXARQAiAXAYAvIAZAUQBeBNBxCWQCgDWAcAhQAaAdAHAKQARAWAJAUQASAogIAtQgJAtgeAeQggAfgtAGQguAGglgVQgUgMgUgWQgMgMgVgdIgrg6QgaAkgwANQg7AQgugfQgpAng8ARQg4AOg9gHQg1gHg8gWQgrgRhBggQgfgQgSAEQgLACgMAJIgSAQQgsAkg9gFQg+gFglgqIhlDKIAEALIARAsIAPArIACAFQANAXADAaQADAZgKAYQgIAQgMANQgNANgQAIQgVAKgWAAQgOAAgNgEQgYgKgSgPQgTAmgNAVQgUAhgWAWQgaAaggAMQgWAIgVAAQgNAAgMgDg");
	this.shape_2.setTransform(224.2484,277.2417);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,0,0,0.149)").s().p("ApWRSQg0gMggg8QgXgsgOhJQgficgMhRQgTiDgChrQgBg8AEhAIgCgDIgGgPIgHgCQgmA9gnA9QgPAWgZAJQgsAQgqgWQhJg2AohSQAVgoAXgmIBLh/IgDgKIgIgZIgFgQQgWgqgQgsQgOgpgSgnQgUgsgLgvQgLgvACgwQABgdAMgbIACgHIABgHIABgHIAGgQIAHgPIAIgPIAJgRIAEgIIAEgIIADgIIADgIIACgDIABgEIABgDIgCAHIAIgUIABgCIAAgBIAKgaQAHgZALgXQAIgSAGgSIAPgnQAIgUAKgSIAHgQIAGgNIAGgNIADgJIAHgOIAGgNIACgDIACgIIADgIIADgIIAEgHQAMghAegUQAYgQAdABQAiAAAaAVQAbAUAIAgQAIAbgHAcIAFAKIAFANIABAJIABAJIABAIIAAAIIgBAIIgCAHIgCAHIgCAHIgDAHIgEAHIgCAGIgEAFIAAAIIAAAJIAAAIIABAJIADARIADASIADASIABAQIAAAQIABAIIABAHIACAIIABAIIACAIIABAIIABAJIABAIIABAJIADAJIADADIAEADIAFAEIADAEIADAEIAFAFIAEAGIAEAGIADAGIABACIATgZQATgYAHgVQAPgngMgyQgHgfgbg7Qgdg/gIgdQgPgzALgoIAEgPIgJgRQgJgSgEgLQgQgsAQgwQARgvApgXQASgKAcgHIAxgLQATgEAqgPQAmgOAWgFQAvgKAxAIQAxAHAqAYQAsAZAVAiQAQAbAGAmQADAaAAAtIAABhQAAAngDAUQgEAhgLAXIgHALQAXgBBAgSQA3gPAgALQAcAJAXAdQAPASAVAmIB0DWQAVAmANATQAWAeAYARQAYARA3ASQA3ARAXARQAiAXAYAvIAZAUQBeBNBxCWQCgDWAcAhQAaAdAHAKQARAWAJAUQASAogIAtQgJAtgeAeQggAfgtAGQguAGglgVQgUgMgUgWQgMgMgVgdIgrg6QgZAkgxANQg7AQgugfQgpAng8ARQg4AOg9gHQg1gHg8gWQgrgRhBggQgfgQgSAEQgLACgMAJIgTAQQgrAkg9gFQg+gFglgqIhlDKIAEALIARAsIAPArIACAFQANAXADAaQADAZgKAYQgIAQgMANQgNANgQAIQgVAKgWAAQgOAAgNgEQgYgKgSgPQgTAmgNAVQgUAhgWAWQgaAaggAMQgWAIgVAAQgNAAgMgDgAvHnuIgDAHIAAABIADgIg");
	this.shape_3.setTransform(220.8311,277.2417);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("rgba(0,0,0,0.149)").s().p("ApWRSQg0gMggg8QgXgsgOhJQgficgMhRQgTiDgChrQgBg8AEhAIgCgDIgGgPIgHgCQgmA9gnA9QgPAWgZAJQgsAQgqgWQhJg2AohSQAVgoAXgmIBLh/IgDgKIgIgZIgFgQQgWgqgQgsQgOgpgSgnQgUgsgLgvQgLgvACgwQABgdAMgbIACgHIABgHIABgHIAGgQIAHgPIAIgPIAJgRIAEgIIAEgIIADgIIADgIIACgDIAIgUIABgCIAAgBIAKgaQAHgZALgXQAIgSAGgSIAPgnQAIgUAKgSIAHgQIAGgNIAGgNIADgJIAHgOIAGgNIACgDIACgIIADgIIADgIIAEgHQAMghAegUQAYgQAdABQAiAAAaAVQAbAUAIAgQAIAbgHAcIAFAKIAFANIABAJIABAJIABAIIAAAIIgBAIIgCAHIgCAHIgCAHIgDAHIgEAHIgCAGIgEAFIAAAIIAAAJIAAAIIABAJIADARIADASIADASIABAQIAAAQIABAIIABAHIACAIIABAIIACAIIABAIIABAJIABAIIABAJIADAJIADADIAEADIAFAEIADAEIADAEIAFAFIAEAGIAEAGIADAGIABACIATgZQATgYAHgVQAPgngMgyQgHgfgbg7Qgdg/gIgdQgPgzALgoIAEgPIgJgRQgJgSgEgLQgQgsAQgwQARgvApgXQASgKAcgHIAxgLQATgEAqgPQAmgOAWgFQAvgKAxAIQAxAHAqAYQAsAZAVAiQAQAbAGAmQADAaAAAtIAABhQAAAngDAUQgEAhgLAXIgHALQAXgBBAgSQA3gPAgALQAcAJAXAdQAPASAVAmIB0DWQAVAmANATQAWAeAYARQAYARA3ASQA3ARAXARQAiAXAYAvIAZAUQBeBNBxCWQCgDWAcAhQAaAdAHAKQARAWAJAUQASAogIAtQgJAtgeAeQggAfgtAGQguAGglgVQgUgMgUgWQgMgMgVgdIgrg6QgZAkgxANQg7AQgugfQgpAng8ARQg4AOg9gHQg1gHg8gWQgrgRhBggQgfgQgSAEQgLACgMAJIgTAQQgrAkg9gFQg+gFglgqIhlDKIAEALIARAsIAPArIACAFQANAXADAaQADAZgKAYQgIAQgMANQgNANgQAIQgVAKgWAAQgOAAgNgEQgYgKgSgPQgTAmgNAVQgUAhgWAWQgaAaggAMQgWAIgVAAQgNAAgMgDgAvOneIABgDIgCAHIABgEgAvHnuIgDAHIAAABIADgIg");
	this.shape_4.setTransform(220.8311,277.2417);

	this.instance_18 = new lib.Symbol18();
	this.instance_18.setTransform(220.8,277.3,1,1,0,0,0,104.6,110.9);

	this.instance_19 = new lib.Symbol17();
	this.instance_19.setTransform(238,292.2,1,1,0,0,0,114.8,110.9);
	this.instance_19._off = true;

	this.instance_20 = new lib.Symbol16();
	this.instance_20.setTransform(256.7,317.15,1,1,0,0,0,133.5,110.9);
	this.instance_20._off = true;

	this.instance_21 = new lib.Symbol15();
	this.instance_21.setTransform(269.8,334.2,1,1,0,0,0,146.6,110.9);
	this.instance_21._off = true;

	this.instance_22 = new lib.Symbol14();
	this.instance_22.setTransform(291.2,351.35,1,1,0,0,0,168,123.6);
	this.instance_22._off = true;

	this.instance_23 = new lib.Symbol13();
	this.instance_23.setTransform(314.2,365.25,1,1,0,0,0,191,137.5);
	this.instance_23._off = true;

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(0,0,0,0.149)").s().p("AEJXyQg0gMggg8QgXgsgOhJQgficgMhRQgTiDgChrQgBg8AEhAIgCgDIgGgPIgGgCQgnA+gmA8QgPAWgZAJQgsAQgqgWQhJg2AohSQAVgoAXgmIBMh/IgEgKIgIgZIgFgQQgWgqgQgtQgOgpgSgnQgUgsgLgvQgLgvACgwQABgdAMgbIACgHIABgHIABgHIAGgQIAHgPIAIgOIAJgRIAEgIIAEgIIADgIIADgIIACgDIAIgUIABgBIAAgCIAKgaQAHgZALgXQAIgSAGgSIAPgnQAIgUAKgSIAHgQIAGgNIAGgNIADgJIAGgOIAGgNIACgDIACgIIADgIIADgIIAEgHQAMghAegUQAYgQAdABQAiAAAaAVQAbAUAIAgQAIAcgHAbIAFAKIAFANIABAJIABAJIABAIIAAAIIgBAIIgCAHIgCAHIgCAHIgDAHIgEAHIgCAGIgEAFIAAAIIAAAJIAAAIIABAJIADARIADASIADASIABAQIAAAQIABAIIABAHIACAIIABAIIACAIIABAIIABAJIABAIIABAJIADAJIADADIAEADIAFADIADAEIADAEIAFAFIAEAGIAEAGIADAGIACACIASgZQATgXAHgVQAPgngMgyQgHgfgbg7Qgdg/gIgdQgPgzALgoIAEgPIgJgRQgJgSgEgLQgQgsAQgwQARgvApgXQASgKAcgHIAxgLQATgEAqgPQAmgOAWgFQAvgKAxAIQAxAHAqAYQAsAZAVAiQAQAbAGAmQADAaAAAtIAABhQAAAngDAUQgEAhgLAXIgHAMQAXgCBAgSQA4gPAgALQAcAJAXAdQAPASAVAmIB0DVQAVAmANATQAWAeAYARQAYARA3ASQA3ARAXARQAiAYAYAvIAZATQBeBNBxCXQCgDWAcAhQAaAdAHAKQARAWAJAUQASAogIAtQgJAtgeAeQggAfgtAGQguAGglgVQgUgMgUgWQgMgMgVgdIgrg5QgZAjgxANQg7AQgugfQgpAng8ARQg4AOg9gHQg1gHg8gWQgrgRhBggQgfgQgSAEQgLACgMAJIgTAQQgsAkg9gFQg+gFglgqIhlDLIAEAKIARAsIAPArIACAFQANAXADAaQADAZgKAYQgIAQgMANQgNANgQAIQgVAKgWAAQgOAAgNgEQgYgKgSgPQgTAmgNAVQgUAhgWAWQgaAaggAMQgWAIgVAAQgNAAgMgDgA903kIABgDIgCAHIABgEgA9t30IgDAHIAAABIADgIg");
	this.shape_5.setTransform(314.2255,380.2274);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_11}]},89).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_11}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_12}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_13}]},1).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_14}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_15}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_16}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.instance_17}]},1).to({state:[{t:this.shape_1}]},1).to({state:[{t:this.shape_2}]},6).to({state:[{t:this.shape_3}]},5).to({state:[{t:this.shape_4}]},50).to({state:[{t:this.instance_18,p:{regY:110.9,x:220.8,y:277.3}}]},1).to({state:[{t:this.instance_18,p:{regY:110.8,x:238.5,y:277.5}}]},1).to({state:[{t:this.instance_18,p:{regY:110.8,x:238.5,y:277.5}}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_19}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_20}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_21}]},1).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_22}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.instance_23}]},1).to({state:[{t:this.shape_5}]},1).to({state:[]},135).wait(107));
	this.timeline.addTween(cjs.Tween.get(this.instance_11).wait(89).to({_off:false},0).wait(3).to({_off:true},1).wait(357));
	this.timeline.addTween(cjs.Tween.get(this.instance_12).wait(93).to({_off:false},0).wait(3).to({_off:true},1).wait(353));
	this.timeline.addTween(cjs.Tween.get(this.instance_13).wait(97).to({_off:false},0).wait(3).to({_off:true},1).wait(349));
	this.timeline.addTween(cjs.Tween.get(this.instance_14).wait(101).to({_off:false},0).wait(1).to({regY:114.6,y:266.1},0).wait(2).to({_off:true},1).wait(345));
	this.timeline.addTween(cjs.Tween.get(this.instance_15).wait(105).to({_off:false},0).wait(1).to({regX:73.3,x:232.65},0).wait(2).to({_off:true},1).wait(341));
	this.timeline.addTween(cjs.Tween.get(this.instance_16).wait(109).to({_off:false},0).wait(3).to({_off:true},1).wait(337));
	this.timeline.addTween(cjs.Tween.get(this.instance_17).wait(113).to({_off:false},0).wait(1).to({regX:73.3,x:226.65},0).wait(3).to({_off:true},1).wait(332));
	this.timeline.addTween(cjs.Tween.get(this.instance_19).wait(183).to({_off:false},0).wait(1).to({regY:110.8,x:243.7,y:292.1},0).wait(1).to({x:249.45},0).wait(1).to({x:260.5,y:307.8},0).to({_off:true},1).wait(263));
	this.timeline.addTween(cjs.Tween.get(this.instance_20).wait(187).to({_off:false},0).wait(1).to({regY:110.8,x:262.4,y:321.4},0).wait(1).to({x:268.15,y:325.75},0).wait(1).to({x:277.85,y:335.75},0).wait(1).to({_off:true},1).wait(258));
	this.timeline.addTween(cjs.Tween.get(this.instance_21).wait(192).to({_off:false},0).wait(1).to({regY:110.8,x:290.1,y:347.6},0).wait(1).to({x:310.1},0).wait(1).to({x:316.55,y:353.1},0).wait(1).to({x:323,y:358.6},0).wait(1).to({x:330},0).wait(1).to({x:337},0).wait(1).to({_off:true},1).wait(250));
	this.timeline.addTween(cjs.Tween.get(this.instance_22).wait(200).to({_off:false},0).wait(1).to({x:302.75,y:360.65},0).wait(1).to({x:314.3,y:370},0).wait(1).to({_off:true},1).wait(246));
	this.timeline.addTween(cjs.Tween.get(this.instance_23).wait(204).to({_off:false},0).wait(1).to({x:319.25,y:369.75},0).wait(1).to({x:324.3,y:374.3},0).wait(1).to({_off:true},1).wait(242));

	// Knob
	this.instance_24 = new lib.Layer23();
	this.instance_24.setTransform(171,275,0.1,0.1);

	this.movieClip_1 = new lib.Symbol20();
	this.movieClip_1.name = "movieClip_1";
	this.movieClip_1.setTransform(192.55,281.1);

	this.instance_25 = new lib.Tween166("synched",0);
	this.instance_25.setTransform(192.55,281.2);
	this.instance_25._off = true;

	this.instance_26 = new lib.Tween167("synched",0);
	this.instance_26.setTransform(192.45,281.15);
	this.instance_26._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_24}]}).to({state:[{t:this.movieClip_1}]},119).to({state:[{t:this.instance_25}]},20).to({state:[{t:this.instance_26}]},7).to({state:[{t:this.instance_26}]},10).to({state:[{t:this.instance_26}]},23).to({state:[{t:this.instance_26}]},164).to({state:[{t:this.instance_26}]},25).to({state:[{t:this.instance_26}]},13).wait(69));
	this.timeline.addTween(cjs.Tween.get(this.instance_25).wait(139).to({_off:false},0).to({_off:true,x:192.45,y:281.15},7).wait(304));
	this.timeline.addTween(cjs.Tween.get(this.instance_26).wait(139).to({_off:false},7).wait(10).to({startPosition:0},0).wait(23).to({startPosition:0},0).wait(164).to({startPosition:0},0).wait(25).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Base
	this.instance_27 = new lib.Layer22();
	this.instance_27.setTransform(181,268,0.1,0.0998);

	this.timeline.addTween(cjs.Tween.get(this.instance_27).to({_off:true},119).wait(37).to({_off:false},0).wait(294));

	// Highlight
	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFF00").s().p("AgZCrQg7gLgcgZQgLgKgNgVQgZACgUAAQgnAAgRgPQgOgMgFgWQgEgOgBgbQgBgsAMgUQAOgYAjgKQAYgGAoAAQALglAmgWIABAAQAQgNAYgEIAGgDQAVgMAyADQAhADASAEQAcAIAQAQIAMANQAHAJAHADQAJAFAUABQAWAAAIADQATAGAMAXQAIAQAGAcQAFAZABAKQACATgCAQQgDATgJAPQgLARgPAHQgQAHgjgBIgXAAIgDAHQgQAhgUAQQgdAZg0AAQgZAAgdgGgAAAAIQANAEAIAIQAGAGACAGIARgFQAWgGAPgBQACgTAPgLIgqggQgJgHgFgCQgHgCgIABQgdACgfAIQgSAFgHAIQgEAFgEAKIgBAEQAGADAGAFQADADAFAHQAOgCALAAQANAAAHACg");
	this.shape_6.setTransform(193.4337,280.9135);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFF00").s().p("AhbDtQgigBgmgHQgmgIgOgRQgRgUADglQADgiAQgdIAHgOQAEgIACgGQABgIgCgWQgGhEAfg8QAPgbAQgNIAVgOIAVgNIAUgQQAMgJAJgEQAOgHAbAAQAfAAAJgCQAZgQAcgIQAggIAeAGQAgAGAYAUQAaAWAIAeQAJAegNAfQgNAggcAMQgFBRgUAsQgOAfgYAVQgVASgZAHQgLAEgQACIgjADQgKAugeASQgUAMgkAAIgGAAgAhjB6QgGAGgQAFQgSAEgGAFQAmAOAmgGIgBgIQgKgEgHgHQgGgGgDgIIgDAFgAAMhbQgZALgbAAQgSAAgGAEQgIAFgFANQgeBAANBGIABAMIAFgGQALgMAQgEQANgDASABIAeAEQAbAEATgFQAHgFAFgRQAFgQAFgbIAIgqQAGgWgCgKQgCgIgLgRQgKgQAAgKQgTAUgaAMg");
	this.shape_7.setTransform(193.4366,282.6296);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFF00").s().p("AD0G4QgVgQALgtIADgPQgMgFgIgNQgMgUAHgTQADgIAIgJIAMgQQAOgTAPgwQAPguAQgTIAXgdQADgGACgFQgCgKgFgHQgLAEgNgGQgRgHgGgPQgHgPADgRQADgQAKgNQANgTAjgaIgDhRQgBgJgDgDQgHgGgNAIQgrAXgWASQgiAagNAgQgFAMgGAZQgGAYgFAMQgJATgQAMQgRANgSgFQgTgFgJgWQgJgUAEgXQADgVANgaQAIgQATgdIB5i9QgigFgcAJQghALgNAaQgFAKgCAQIgDAbQgHA3ggAqQgMARgPAIQgSAKgPgGQgSgHgEgWQgEgSAEgXQAEgUAMgdIATgwQAVg9gNgpIgLAUIABADQAFANgGAOQgGANgMAHIgEACIgTAzIglBhQgSAxgTAVQgOAPgTAHQgUAHgSgGQgWgHgLgYQgLgWAEgZQAFgjAngxQAWgcAIgPQAOgagCgWQgCgQgKgTIgDAAIiMCxQgcAigIAWQgHAWABAlQADBOAdAsQAGAIAOASQAOAQAGAKQAPAZAEAkQADAagCAnQgBAYgIARQgJAUgSADQgLACgLgHQgKgHgGgKQgFgCgFgEQgIgHgFgOIgIgYQgCgHgOgZQhKh+ADi0QABg0AKgdQAIgaAggwQAuhFAcgeQAyg0A2gPQARgFAVgCQAUgIAVgCQAJgBAJABIApgXQAhgTAagGQAigJAgAJQAjAKAQAbQAJAQAFAkQAngNAXgBQAYgBAVAGQAXAIAOAQQARATAEAcQADAbgJAbQAVgHAWAMQAVAKAMAVQALARAFAZQADAOADAfQAGA0gDAeIgFAhIgDAiQAAAQACAgIACAMQADAsgQAwQgHAXgcA+QgYA1gIAhIgIAiQgFATgIAMQgLAPgRAGQgHACgGAAQgLAAgIgHg");
	this.shape_8.setTransform(186.2459,276.6287);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_6}]},129).to({state:[{t:this.shape_6}]},2).to({state:[]},2).to({state:[{t:this.shape_7}]},165).to({state:[]},2).to({state:[{t:this.shape_8}]},14).to({state:[]},2).wait(134));

	// Gumball1
	this.instance_28 = new lib.Tween168("synched",0);
	this.instance_28.setTransform(193.85,290.75);
	this.instance_28._off = true;

	this.instance_29 = new lib.Tween169("synched",0);
	this.instance_29.setTransform(193.85,307.45);
	this.instance_29._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_28).wait(146).to({_off:false},0).to({_off:true,y:307.45},9).wait(295));
	this.timeline.addTween(cjs.Tween.get(this.instance_29).wait(146).to({_off:false},9).to({startPosition:0},5).to({y:269.45},3).to({x:212.1,y:264.1},2).to({x:247.1,y:278.45},4).to({x:290.15,y:297.9},6).to({y:331.9},3).wait(272));

	// Gum_hole
	this.instance_30 = new lib.Layer24();
	this.instance_30.setTransform(174,281,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_30).wait(450));

	// Hardware
	this.instance_31 = new lib.Hardware();
	this.instance_31.setTransform(83,10,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_31).wait(450));

	// Glass
	this.instance_32 = new lib.Glass();
	this.instance_32.setTransform(83,30,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_32).wait(450));

	// Shock
	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#999933").s().p("AFFEhQgMgPgVgLIgKgHIgFgGQgHgGABgDQAAgEAEgDIAHgEQAEgCAFgGIAJgKQAKgMAPgHIAFgBQAEABABAFIgBAPQgCAPABATIADAjIAAAHQgBAEgEAAQgCAAgEgEgAkbESQgKgKgEgOIgDgGIgHgGQgDgFADgDIAGgCIAUgDQADgBADACQADABAAAHIAAAhIgBAGQgCAEgDAAQgCAAgDgDgAmEBnQgEgCABgFIAEgGIAJgOQAFgFAAgFQACgHABAAQACgDAEAEIAEAFIAGAEQADADAAADQAAADgDACIgRAOQgHAHgEACIgEAAIgCAAgAmYBmQgDgBAAgFIABg2QAAgJAEgDQAEgCAFABIAPACQAJABACAFQACAFgIAJQgGAHgGAQQgIASgEAGQgCAFgDAAIgCgBgAJ3ikIgTgHQgMgEgIgBQgJgBgCgDQgDgGAIgFIAMgNQAFgJACAAQAGgCAFAJQAJAMALAKQAEAFACAEQADAHgFADQgCABgDAAIgEAAgAqDiyQgHgEgUgUQgPgPgNgEQgJgDgBgDQgCgGAJgFIAcgPQAEgCADABQAEABACAGIAEAPQACAJAFAEQAHAIgBADIgBAEIACAFQAFAHACAIQACAGgFABIgBAAIgEgBgAqyjpIABAAIgBAAgAKPizIgEgFIgMgSIgKgJIgLgNIgIgJQgFgGgFgBIgFgBQgBgBAAAAQgBAAAAgBQgBAAAAgBQAAAAgBgBIABgDIAFgFIAHgEIAGgFIAIgDIAYgPIAGgEQAEgBADABQADACACAEIAAAIQAAAYACAiIACAYQAAAJgCABIgDAAIgEgBgAKrjBQgCgBgBgEIAAgGQABgFAAgSQgBgIADgDQADgDAFgBIAIAAIAGABQAGADgEAHIgHAJQgDAEgCAHIgFAMQgBAGgEAAIgCAAgADcjEIgOgLIgHgHQgRgRgQgMQgDgDgEgCIgFgDQAAgDABgDQACgDADgDIAKgJQAJgIADgFQAEgHADABQADAAABADIACAFIAFAPIASApQAJAQACAHQABADgBADQgBADgDABIgFgCgADwjIQgBAAAAAAQgBAAAAgBQgBAAAAAAQAAgBgBAAQgCgCgBgGIgKgUQgGgMAAgMQAAgGADgDQACgCAFgBIAPgDQAEgBADACQAEACgCAIIgGA1IgBAEIgDABIgBAAgApwjTIgKgNQgPgVgBgRQAAgIADgDQACgCAGgBQAGgBACgBIAGgIQAEgFAEABQAEAAACAFIABAIIAAAZQAAAdgCAKQgBAGgCABIgCAAQgDAAgEgFg");
	this.shape_9.setTransform(190.8618,180.7982);
	this.shape_9._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_9).wait(83).to({_off:false},0).to({_off:true},15).wait(352));

	// Crown
	this.instance_33 = new lib.Tween226("synched",0);
	this.instance_33.setTransform(200,168);
	this.instance_33._off = true;

	this.instance_34 = new lib.Tween227("synched",0);
	this.instance_34.setTransform(190.55,180.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_33}]},384).to({state:[{t:this.instance_33}]},8).to({state:[{t:this.instance_34}]},9).wait(49));
	this.timeline.addTween(cjs.Tween.get(this.instance_33).wait(384).to({_off:false},0).to({x:195.55,y:177.7},8).to({_off:true,x:190.55,y:180.1},9).wait(49));

	// Sash_full
	this.instance_35 = new lib.Saviour();
	this.instance_35.setTransform(-37.75,70.25,0.1,0.1,-10.9876);
	this.instance_35._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_35).wait(379).to({_off:false},0).wait(2).to({rotation:-14.2144,x:-50.15,y:83.65},0).wait(69));

	// Sash
	this.instance_36 = new lib.Saviour2();
	this.instance_36.setTransform(-44.05,213.35,0.1,0.1,-45);
	this.instance_36._off = true;

	this.instance_37 = new lib.Symbol19();
	this.instance_37.setTransform(203.5,178.1,1,1,0,0,0,231.3,195.7);
	this.instance_37._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_36).wait(364).to({_off:false},0).wait(2).to({rotation:-40.5254,x:-46,y:193.95},0).wait(2).to({rotation:-30.5649,x:-44.95,y:150.6},0).wait(2).to({rotation:-15.6486,x:-29.45,y:87.6},0).to({_off:true},2).wait(78));
	this.timeline.addTween(cjs.Tween.get(this.instance_37).wait(372).to({_off:false},0).wait(2).to({regY:195.6,rotation:4.223,x:203.55,y:178.05},0).wait(2).to({rotation:8.6656,x:203.6,y:178.1},0).wait(2).to({regY:195.5,rotation:12.4103,x:203.65,y:178.05},0).to({_off:true},1).wait(71));

	// Smile
	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#000000").s().p("AhAEwIAAgCIAAgCIAEgFIADgBQAFgCAEAAIADABIACABIAEADIABADIABADQAAAFgDAGIgRADQgFgHgCgGgAFZDrIAAgDIAAgBIAEgGIADgBQAFgBAEAAIADAAIACABIAEAEIABACIABADQAAAGgDAGIgRADQgFgIgCgFgAo0DgIAAgCIAAgCIAEgGIADgBQAFgBAEAAIADAAIACABIAEAEIABACIABADQAAAFgDAHIgRADQgFgIgCgFgAIhAjIAAgCIAAgCIAEgFIADgBQAFgCAEAAIADABIACABIAEADIABADIABACQAAAGgDAGIgRADQgFgHgCgGgABDgYIAAgDIABgBIAEgGIADgBQAFgCADAAIAEABIACABIADAEIACACIAAADQAAAGgCAGIgSADQgFgIgCgFgAkugZIAAgCIABgCIAEgFIADgBQAFgCADAAIAEAAIACACIADAEIACACIAAACQAAAGgCAHIgSACQgFgHgCgGgAr8hpIAAgDIABgCIAEgFIADgBQAFgCADAAIAEABIACABIADAEIACACIAAADQAAAGgCAGIgSADQgFgIgCgFgALikwIAAgCIAAgCIAEgFIADgBQAFgCAEAAIADAAIACACIAEAEIABACIABACQAAAGgDAHIgRACQgFgHgCgGg");
	this.shape_10.setTransform(194.675,202.75);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#000000").s().p("AhdFGQgHgBgEgCQgDgBgGgIQgFgKAAgPQABgLACgDQAEgJAIABQAEAAgDgBIATgBQAMAAAEAHQACACACAIIABAQQAAAKgEAHQgGALgSAAIgDAAgAFLEAQgEgEAAgOQAAgLACgDIAGgOQADgGAIgBIAMAAQAOAAAFAEQADADACAKQACAOgDAKQgDANgLAEQgFACgKAAQgQAAgFgHgAoxDdIgFgHIgFgGIgGgHQgEgEAAgEQgBgFAEgEQAEgFAFgBIALgCIALgBIAPgDQAJgBAFAFQAEADACAIIAAASQgBANgFAFQgFAEgLAAIgEAAQgQAAgHgGgAJHA/QgGgEgFgMQgGgOABgLQABgOALgHQAGgCAKAAQALgBAFAEQAFAFABAPIAAATQABANgEAGQgFAIgJABIgDAAQgIAAgGgGgAk3ACQgKAAgEgCQgIgFABgRIAAgOQABgMADgEQAEgEAIgBIANAAIALAAQAGABADADQAFAEABAKIABATQgBAQgIAEQgEACgLAAgABOgCQgKgDgGgKQgFgKAAgLQABgJACgEQADgEAKgEQAPgFAPABQAIAAAEADQAGAEABAOQABAMgCAIQgDALgJAFQgEACgOABQgJAAgEgBgArphbQgLgEgFgGQgJgKAEgNQAEgNAMgEQAFgBAKAAIALAAQAKAAAEADQAHAEABANQACAYgPAIQgFADgHAAQgHAAgLgEgALlkAQgJgBgMgMQgKgJgCgHIAAgOIAAgNQACgIAFgDQAEgDAHABIAMADIAMABQAGAAAEADQAFAEACAJIABAOQAAAQgCAEQgCAIgIAEQgGADgGAAIgDAAg");
	this.shape_11.setTransform(195.001,203.4894);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#000000").s().p("AhSFcQgGgEgFgMQgKgYACgZQABgLAEgFQAGgGARgBQAPgCASgGQAHgBAEAIQACAFABAKQABAYgDAMQgDAKgJAPQgEAKgGADQgFAEgLAAQgKAAgGgEgAFJELQgFgDgGgJIgOgZQgFgLAAgHQAAgQARgIQAGgDAYgFQATgEAHAFQAHAGAAARIAAAeQAAASgHAGQgDADgGABIgJACIgNADIgFABIgHgBgAouD3QgKgCgIgGQgMgKgIgWQgFgNgDgPQgBgLADgEQAEgHAQAAIArAAQALAAAFADQAJAGgBARQgBAVgJAVQgHANgHAFQgGAEgIAAIgFAAgAI3AyQgHgFgEgJIgMgbQgHgPABgIQABgHAFgFQAGgFAGABIAKADQAEABAIgGQAMgHAJAFQAIAEABALIAAATIABAWQAAANgGAIQgFAIgLACIgGABQgIAAgGgEgABMAMQgRgGgKgKQgFgGgHgLIgHgOQgBgDAAgNQAAgNABgEQAGgMAYgDIAXgDQAUgCAIAIQAIAHAAARQAAAbgJAYQgDAKgFADQgGAGgJAAQgFAAgGgCgAkzABQgPgEgIgKQgOgNgBgXQgBgMAFgFQAFgGAQAAIAdAAQAQAAAFAGQACADACAHQAFAYgNAVQgEAJgHACQgFADgGAAIgLgCgAsWhrQgDgEgEgJIgIgWQgGgRAEgJQAGgPAWAAQALABAXAEIANAAQAHABAEAEQAJAGgDAPIgIAWIgHAOQgEAGgHAFQgMAIgNABQgPAAgJgLgAMBkMQgIgDgIgHQgWgVgCgfQAAgLAFgEQAFgGAOAAIAhAAQAOAAAEAGQADADABAIQACAOgBAHQgBAIgGAQQgIAQgGAEQgFADgFAAIgJgCg");
	this.shape_12.setTransform(196.3617,204.975);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#000000").s().p("AiGFbQgGgEgFgLQgJgZABgZQABgLAFgFQAFgGARgBQAQgCARgGQAIAAAEAIQACAEABAKQABAZgDALQgDALgJAOQgFAKgGAEQgFADgLAAQgKAAgGgEgAFJEMQgFgDgGgJIgOgZQgFgMAAgGQAAgQARgJQAGgCAYgGQATgEAHAGQAHAFAAASIAAAeQAAASgHAGQgDACgGABIgJADIgNADIgFABIgHgBgAouD4QgKgCgIgGQgMgKgIgXQgFgNgDgPQgBgKADgEQAEgIAQABIArAAQALAAAFACQAJAGgBASQgBAVgJAVQgHAMgHAGQgGAEgIAAIgFAAgAI3AzQgHgGgEgIIgMgbQgHgPABgIQABgIAFgEQAGgFAGABIAKADQAEABAIgGQAMgHAJAEQAIAFABAKIAAATIABAXQAAAMgGAIQgFAJgLACIgGABQgIAAgGgEgABMANQgRgGgKgKQgFgGgHgLIgHgOQgBgDAAgOQAAgMABgEQAGgNAYgCIAXgDQAUgCAIAHQAIAIAAARQAAAbgJAYQgDAJgFAEQgGAFgJAAQgFAAgGgBgAkzACQgPgEgIgKQgOgOgBgWQgBgMAFgFQAFgGAQAAIAdAAQAQAAAFAGQACADACAHQAFAYgNAVQgEAJgHABQgFADgGAAIgLgBgAsWhqQgDgEgEgJIgIgXQgGgQAEgJQAGgPAWAAQALAAAXAEIANABQAHABAEAEQAJAGgDAOIgIAXIgHAOQgEAFgHAFQgMAJgNAAQgPABgJgLgAMBkLQgIgDgIgHQgWgVgCgfQAAgLAFgEQAFgGAOAAIAhAAQAOAAAEAGQADACABAIQACAPgBAHQgBAIgGAQQgIAQgGADQgFADgFAAIgJgBg");
	this.shape_13.setTransform(196.3617,204.9);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#000000").s().p("AhYFbQgGgEgFgLQgJgZABgZQABgLAFgFQAFgGARgBQAQgCARgGQAIAAAEAIQACAEABAKQABAZgDALQgDALgJAOQgFAKgGAEQgFADgLAAQgKAAgGgEgAFJEMQgFgDgGgJIgOgZQgFgMAAgGQAAgQARgJQAGgCAYgGQATgEAHAGQAHAFAAASIAAAeQAAASgHAGQgDACgGABIgJADIgNADIgFABIgHgBgAouD4QgKgCgIgGQgMgKgIgXQgFgNgDgPQgBgKADgEQAEgIAQABIArAAQALAAAFACQAJAGgBASQgBAVgJAVQgHAMgHAGQgGAEgIAAIgFAAgAI3AzQgHgGgEgIIgMgbQgHgPABgIQABgIAFgEQAGgFAGABIAKADQAEABAIgGQAMgHAJAEQAIAFABAKIAAATIABAXQAAAMgGAIQgFAJgLACIgGABQgIAAgGgEgABMANQgRgGgKgKQgFgGgHgLIgHgOQgBgDAAgOQAAgMABgEQAGgNAYgCIAXgDQAUgCAIAHQAIAIAAARQAAAbgJAYQgDAJgFAEQgGAFgJAAQgFAAgGgBgAkzACQgPgEgIgKQgOgOgBgWQgBgMAFgFQAFgGAQAAIAdAAQAQAAAFAGQACADACAHQAFAYgNAVQgEAJgHABQgFADgGAAIgLgBgAsWhqQgDgEgEgJIgIgXQgGgQAEgJQAGgPAWAAQALAAAXAEIANABQAHABAEAEQAJAGgDAOIgIAXIgHAOQgEAFgHAFQgMAJgNAAQgPABgJgLgAMBkLQgIgDgIgHQgWgVgCgfQAAgLAFgEQAFgGAOAAIAhAAQAOAAAEAGQADACABAIQACAPgBAHQgBAIgGAQQgIAQgGADQgFADgFAAIgJgBg");
	this.shape_14.setTransform(196.3617,204.9);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_10}]},316).to({state:[{t:this.shape_11}]},11).to({state:[{t:this.shape_12}]},5).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},17).to({state:[{t:this.shape_12}]},31).wait(69));

	// Scream
	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#000000").s().p("AhZFKIgDAAIgDgBIgDgBIgBgCIgDgBIgCgCIgCgBIgBgCIgBgDIgBgDIAAgCIgCgBIgDgDIgBgBIgCgDIgBgCIgBgDIAAgCIAAgCIAAgEIABgEIABgCIABgEIABgCIACgCIADgCIACgDIACgCIACgCIADgBIACgBIADgBIAEAAIADAAIACABIAEABIACACIACABIACACIACADIACACIABACIABACIABADIAAAGIAAAIIAAAHIAAAHIAAADIgBACIgBADIgBACIgCABIgDACIgCABIgCACIgCABIgDABIgCAAgAGAD6IgEAAIgDAAIgEAAIgEAAIgCAAIgDAAIgCgBIgCgCIgCgBIgCgCIgDgCIgBgCIgBgCIgBgDIAAgDIAAgCIAAgEIAAgCIACgDIAAgEIABgDIABgDIACgDIACgCIACgBIACgBIACgBIADgBIACgCIADAAIAEAAIADAAIAEAAIADAAIACABIADABIADABIACACIACABIACACIACADIABADIABACIAAADIABADIAAADIAAADIgBADIAAADIgBADIgBADIgCACIgCACIgCACIgCACIgCABIgDABIgCAAIgDAAgAoUD0IgEAAIgDAAIgDAAIgDgBIgDgBIgBgBIgCgBIgDgCIgCgCIgBgCIgBgCIgBgDIAAgDIAAgCIAAgDIABgDIAAgCIABgCIACgCIACgDIAAgDIABgCIABgCIABgDIABgCIACgCIACgBIACgCIADgCIADgBIADAAIADAAIADABIADAAIADABIACACIADACIADACIABACIACACIACACIACACIABACIABAEIABACIAAADIAAADIgBADIAAACIgBADIgBADIgCACIgCACIgBACIgCACIgCACIgCABIgDABIgCABIgDAAIgEABIgCAAgAITA3IgCAAIgCgBIgEgBIgCgBIgCgBIgDgCIgCgDIgCgCIgBgDIgBgDIAAgDIAAgCIAAgEIAAgDIAAgDIAAgEIABgDIAAgEIABgDIABgCIACgDIABgCIACgCIACAAIACgCIABgCIADgCIADgBIADgBIADgBIADAAIADABIADAAIADABIADAAIADACIADACIACACIABABIACACIACADIABADIABACIAAADIAAADIAAACIgBADIgBADIgCACIgBACIgCACIgBACIgDABIgCABIAAADIgBAEIgBACIgBACIgBACIgCADIgCABIgDABIgBABIgDABIgDABIgDAAgAlKAJIgCAAIgDAAIgDgBIgCgBIgCgCIgCgBIgBgDIgCgBIgCgBIgCgCIAAgDIgCgDIgBgCIAAgEIAAgDIABgCIAAgEIABgCIABgCIACgCIABgDIADgCIACgBIACgBIADgBIADgBIACAAIACAAIADABIADAAIACABIACAAIACACIACABIACACIABACIACACIABACIABADIABADIAAADIAAAEIAAADIAAADIgBADIgBADIgCABIgBABIgBADIgCACIgDABIgCABIgCABIgDAAIgDAAgABagTIgCgBIgCAAIgDgBIgBgBIgCAAIgBgCIgCgCIgDgBIgCgBIgBgCIgCgCIgCgCIgBgDIgBgBIgBgEIAAgCIABgDIAAgDIABgDIABgDIACgCIACgDIABgCIACgBIADgCIADgBIADgCIADAAIADAAIAEAAIAEABIACABIACABIADABIACABIACACIACACIACADIABACIABADIABADIAAADIAAADIgBADIAAADIgBACIgBACIgBADIgCACIgBACIgCACIgCACIgDABIgDABIgCABIgDAAIgDAAgArthkIgDAAIgDAAIgCgBIgCgCIgDgBIgCgCIgBgCIgCgCIgBgCIgBgDIgBgDIAAgCIAAgCIABgDIABgCIAAgDIABgEIABgCIABgDIABgDIACgCIACgBIADgBIABgBIACgBIACgBIADgBIADAAIACAAIADAAIACAAIACAAIADAAIADACIACABIACABIACACIACACIABACIACADIAAACIABACIAAADIAAADIgBACIAAADIgCACIgBACIgCACIgCACIgCACIgCABIgCACIgCACIgCACIgBACIgDABIgDABIgDABIgCAAgALukNIgDAAIgDgBIgDABIgCAAIgBAAIgCAAIgEAAIgCgBIgCAAIgCgBIgDgCIgCgCIgCgCIgBgCIgBgCIgBgCIAAgDIAAgDIAAgCIAAgEIAAgCIAAgEIAAgEIABgHIABgDIABgDIABgCIACgCIADgCIACgBIACgBIADgBIADgBIADAAIADAAIAEAAIACAAIADABIADABIACABIADAAIADACIACABIABADIACACIABACIABADIACADIAAACIABADIAAAEIAAACIAAADIAAAEIAAADIAAACIgBADIgBACIgCACIgBACIgCADIgBACIgCABIgDABIgDABIgCAAIgDAAg");
	this.shape_15.setTransform(195.35,202.2);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#000000").s().p("AiJEwIgCAAIgBAAIgCgBIgBgBIgBAAIgBgBIAAgBIgBgCIAAgBIgBgBIAAgCIAAgBIABgBIAAgBIABgBIAAgCIADgCIACgCIADgDIACgDIACgBIABgBIABAAIABAAIACgBIABgBIABgBIABgBIABgBIABgBIACAAIAFgBIAFAAIAFAAIAGAAIADAAIABABIABAAIACACIABAAIACACIAAAAIABABIABABIABAAIABABIABABIAAABIACACIABABIAAABIABABIABABIAAABIAAABIABABIgBACIAAABIAAACIgBABIgBABIAAAAIgBABIgCABIgBABIgBABIgCAAIAAAAIgCAAIgBAAIgCgBIgBgBIgBgBIgBgBIgBgBIgBAAIgBgBIgBgBIgCgBIgBAAIgCgBIgCAAIgEAAIgDAAIgBABIgBABIgBABIgBAAIgCABIgBAAIgBAAIgBABIgBACIgBABIgBABIgBACIgCABIgBAAIgCABIgBABIgBAAIgCAAgAEzDrIgBAAIgBgBIgCAAIgBgBIgBAAIgBgBIgBgBIgBgBIAAgBIgBgBIAAgBIAAgCIAAgCIAAgBIABgBIAAgBIABgBIABgBIABgBIABgBIABAAIABgBIACgBIABgBIAAgBIACAAIAAgBIABgBIACgBIABgBIABgBIABgBIACAAIABgBIACAAIACAAIABAAIACAAIABAAIABAAIADAAIABAAIABABIABAAIACABIABABIABABIACACIABAAIABABIABAAIABABIABABIABABIAAABIABACIABACIABABIAAABIAAACIgBABIAAACIgBABIgBABIgBABIgBABIgBAAIAAABIgBAAIgCAAIgCABIgBAAIgBgBIgBAAIgBgBIgBAAIgBgBIgBAAIgCgBIgBgBIgBAAIgBgBIAAgBIgBAAIAAABIgBABIgBAAIgBABIgCABIgBAAIgBABIgBABIgBABIgBAAIgCABIgCAAIgCABIgBAAgAo2DMIgBAAIgBAAIgBAAIgCgBIgBAAIgBgBIgBgBIgBgBIAAgBIgBgBIAAgCIgBgBIAAgBIAAgBIABgBIAAgCIABgBIAAgBIABgBIABgBIABAAIABgBIABgBIABgBIABgBIABgBIABgBIAAAAIABgBIABgBIABgBIABgBIACAAIACAAIABgBIAGgBIAFAAIAFAAIAEAAIAEABIABAAIACABIABAAIABABIABABIABAAIAAABIACABIAAABIABABIABABIABABIABABIABABIAAABIABACIAAABIAAACIAAABIAAABIgBABIAAABIgBABIgBABIAAACIgCAAIgBABIgCAAIgBABIgBAAIgBgBIgCAAIgBAAIgBgBIgCgBIgBgBIgBgBIgBgBIgBgBIgBAAIAAgBIgBAAIgCAAIgCAAIgCAAIgBAAIgCAAIgBABIgCABIgBABIgBABIgBABIgBACIgBAAIgBABIgBABIgCAAIgBABIgCAAIgBAAgAJHAnIgBAAIgCAAIgBAAIgBgBIgBgBIgBgBIgBgBIgBgBIAAgBIgBgBIAAgBIgBgCIAAgBIgBgCIgBgBIgBgBIgBAAIAAgBIgBgBIgBgBIgBgBIgBAAIAAgCIgCgBIAAAAIgBgBIgBgBIgCAAIgBAAIgCAAIgCABIgBAAIAAABIAAAAIgBABIAAACIgBABIAAABIgBABIgCABIgBAAIgCABIgBAAIgBAAIgCAAIAAAAIgCgBIgBAAIgBAAIgBgBIgBgBIgBgBIAAgBIgBgCIAAgBIAAgCIAAgBIAAgBIAAgCIABgCIAAgBIABgBIABgBIABgBIABgBIABgBIABgBIABgCIAAAAIACgBIABAAIABgBIACgBIACAAIADAAIAEAAIAFAAIADAAIADAAIACAAIAAABIABAAIACABIABABIABAAIABABIACACIABABIAAABIABABIACAAIABABIABABIABABIABACIABABIABABIABABIABABIABABIABABIABACIAAACIABABIAAACIAAABIABABIAAACIAAABIAAACIAAABIgBABIAAABIgBABIgBABIgBABIgBABIgCABIgBAAIgCAAgAkygbIgCAAIgCgBIgCAAIgBgBIgBgBIAAAAIAAgBIgBgCIgBgBIAAgBIgBgCIAAAAIgCgBIgBAAIgBgBIgBAAIgCAAIgCAAIgBABIgBAAIgBABIgCABIgBABIgBAAIgBABIAAABIgBABIgCABIgBABIgBAAIgCAAIgBAAIgBAAIgBAAIgCAAIgBgBIgBAAIgBgBIgBgBIAAgCIgBgBIAAgBIgBgBIAAgBIAAgCIABgBIAAgCIAAgCIABgBIABgBIAAgBIABgBIACgBIABgBIACgBIABgBIABAAIABgBIABgBIABgBIABAAIACgBIABAAIADgBIADAAIAEAAIAEAAIAEAAIACAAIABABIABAAIACABIABAAIACABIABABIABABIAAABIABAAIABACIABABIABABIABABIABABIABABIAAACIABACIAAACIABABIAAABIAAABIAAABIAAACIgBACIAAABIgBABIgBAAIgBABIgBABIgCAAIgBABIgBAAIgBAAgAAlgnIgBAAIgBAAIgCgBIgBAAIgBgBIgBgBIgBgBIgBgBIAAgBIgBgCIAAgBIAAgBIAAgCIAAgCIAAgCIAAgBIABgCIAAgBIABgCIAAgBIACgCIABgBIACgBIAAgBIABgBIACgBIAAgCIACgBIABgBIACAAIADgBIACAAIADAAIAFAAIAEAAIAFAAIACAAIABAAIACABIABABIABAAIABABIABACIABABIAAABIACABIABABIABAAIABABIABABIABABIABABIABACIAAABIABABIAAACIAAABIAAACIgBACIAAABIgBABIAAAAIgBABIgCABIgBABIgBAAIgCAAIgBAAIgBAAIgBAAIgBgBIgCAAIgCgBIgBgBIgBAAIgBgBIgBgBIAAgBIgBgCIgBAAIgBgBIgCAAIgBAAIgCAAIgBAAIgBAAIgCAAIgCAAIAAAAIgBABIgBACIAAAAIAAABIAAABIAAABIgBABIAAACIgBABIAAABIgBABIgBABIgBABIgBAAIgCABIgBAAIgBAAgArYh7IgBAAIgCAAIgCgBIgBgBIgBgBIgBgBIgBgBIAAAAIgBgBIgBgBIgBgBIAAgBIgBgCIgBgCIAAgBIAAgCIAAgBIAAgBIAAgCIgBgBIgBAAIgBABIgBABIgBABIgBAAIgCABIgCAAIgBAAIgCAAIgBAAIgCAAIgCABIAAAAIgBABIgBABIAAABIAAABIAAABIgBACIAAABIAAABIgBABIgBABIgBABIgBAAIgBABIgCAAIgBABIgBAAIgBAAIgBgBIgCAAIgBgBIgBAAIgBgBIgBgBIgBgBIAAgBIgBgBIAAgCIAAgBIAAgCIAAgBIAAgCIAAgBIAAgDIABgBIABgBIAAgBIABgCIABgBIABgBIACgBIAAgBIABgBIABgBIABgBIABgBIACAAIACgBIABgBIACAAIABAAIACgBIABAAIADAAIACAAIAAgBIABgBIABgBIACgBIADgBIACAAIACAAIABAAIABAAIADAAIABAAIABABIACAAIABABIABABIACABIABACIACABIABABIABABIABABIAAABIABABIABABIABACIAAACIAAABIAAACIAAABIABACIAAACIABABIABABIABABIAAABIAAACIAAACIAAABIAAABIAAABIgBABIgBABIAAABIgBABIgCABIgCABIgBAAIgCAAgAMFkYIgBAAIgCgBIgCAAIgBgBIgBAAIgBgBIgIAAIgHAAIgHAAIgHAAIgIAAIgCgBIgCAAIgBgBIgBAAIgBgCIgBgBIAAgBIgBgBIAAgBIgBgBIAAgBIAAgCIABgBIAAgCIABgBIAAgBIABAAIABgBIABgBIABAAIACgBIAGAAIAHAAIAJAAIAIAAIAJAAIAGAAIACAAIABABIABAAIABABIACABIABAAIABACIABABIABABIAAACIABACIAAABIAAABIAAABIAAABIgBABIAAACIgBABIgBABIgBABIgBAAIgCABIgBAAIgBABIgBAAg");
	this.shape_16.setTransform(196.6,204.2);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#000000").s().p("AiRE7IgBAAIgCAAIgCgBIgBgBIgBgBIgBgBIAAgBIgBgBIAAgBIgBgBIAAgCIAAgBIABgBIAAgCIABgBIAAgBIACgCIADgDIADgCIACgDIACgBIABgBIABAAIACgBIABgBIABgBIABgBIABAAIABgBIABgBIACAAIAFgBIAFAAIAFAAIAGAAIACAAIACABIABAAIACABIABABIACABIAAABIABABIABABIABAAIABABIABABIABABIABABIABABIAAABIABABIAAACIABABIAAABIAAABIAAACIAAABIgBABIAAABIgBACIAAAAIgBABIgBABIgCABIgBAAIgCAAIAAAAIgCAAIgBAAIgBAAIgCgBIgBgBIgBgBIgCgBIAAgBIgBgBIgBAAIgBgBIgCgBIgCAAIgCgBIgEAAIgDABIgBAAIgBABIgBABIgBABIgCABIgBAAIgBAAIgBABIgBACIgBABIgBABIgBABIgCABIgBABIgCABIgBABIgBAAIgCAAgAEzDgIgBAAIgBAAIgCgBIgBAAIgBgBIgBgBIgBgBIgBgBIAAgBIgBgBIAAgBIAAgCIAAgBIAAgBIABgCIAAgBIABgBIABgBIABgBIABAAIABgBIABAAIACgCIABAAIAAgBIACgBIAAgBIABgBIACgBIABgBIABAAIABgBIACgBIABAAIACgBIACAAIABAAIACAAIABAAIABAAIADAAIABABIABAAIABABIACABIABAAIABABIACACIABAAIABABIABAAIABABIABABIABACIAAABIABABIABACIABABIAAACIAAABIgBACIAAABIgBABIgBABIgBABIgBABIgBABIAAAAIgBABIgCAAIgCAAIgBAAIgBAAIgBgBIgBAAIgBgBIgBgBIgBAAIgCgBIgBgBIgBAAIgBgBIAAgBIgBAAIAAABIgBABIgBAAIgBABIgCABIgBAAIgBABIgBABIgBABIgBABIgCAAIgCABIgCAAIgBAAgAo2DBIgBAAIgBAAIgBAAIgCgBIgBAAIgBgBIgBgBIgBgBIAAgBIgBgBIAAgBIgBgBIAAgCIAAgBIABgBIAAgCIABgBIAAgBIABgBIABgBIABAAIABgBIABgBIABgBIABgBIABgBIABAAIAAgBIABgBIABgBIABAAIABgBIACgBIACAAIABgBIAGgBIAFAAIAFAAIAEAAIAEABIABAAIACABIABAAIABABIABABIABABIAAABIACABIAAAAIABABIABABIABABIABABIABACIAAABIABABIAAABIAAACIAAABIAAABIgBABIAAACIgBABIgBABIAAABIgCAAIgBABIgCAAIgBABIgBAAIgBgBIgCAAIgBAAIgBgBIgCgBIgBgBIgBgBIgBAAIgBgBIgBgBIAAgBIgBAAIgCAAIgCAAIgCAAIgBAAIgCAAIgBACIgCABIgBABIgBAAIgBABIgBACIgBAAIgBABIgBABIgCAAIgBABIgCAAIgBAAgAJHAcIgBAAIgCAAIgBAAIgBgBIgBgBIgBAAIgBgBIgBgCIAAgBIgBgBIAAgBIgBgCIAAgBIgBgBIgBgBIgBgBIgBgBIAAgBIgBgBIgBgBIgBgBIgBAAIAAgBIgCgBIAAgBIgBAAIgBgBIgCAAIgBAAIgCAAIgCAAIgBABIAAAAIAAABIgBABIAAABIgBABIAAABIgBABIgCABIgBABIgCAAIgBABIgBAAIgCAAIAAgBIgCAAIgBgBIgBAAIgBgBIgBgBIgBgBIAAgBIgBgCIAAgBIAAgBIAAgCIAAgBIAAgCIABAAIAAgCIABgBIABgBIABgBIABgBIABgBIABgBIABgBIAAgBIACgBIABgBIABgBIACAAIACgBIADAAIAEAAIAFAAIADAAIADAAIACABIAAAAIABABIACABIABABIABABIABAAIACACIABABIAAABIABABIACABIABABIABAAIABACIABAAIABABIABABIABABIABABIABACIABABIABABIAAACIABABIAAACIAAABIABACIAAABIAAABIAAACIAAABIgBABIAAABIgBABIgBABIgBABIgBABIgCABIgBAAIgCAAgAkyglIgCgBIgCAAIgCgBIgBgBIgBAAIAAgBIAAgBIgBgCIgBgBIAAgBIgBgBIAAgBIgCAAIgBgBIgBgBIgBAAIgCAAIgCAAIgBABIgBABIgBABIgCAAIgBABIgBAAIgBABIAAABIgBABIgCABIgBABIgBAAIgCABIgBAAIgBAAIgBgBIgCAAIgBgBIgBAAIgBgBIgBgBIAAgBIgBgBIAAgCIgBgBIAAgBIAAgCIABgBIAAgCIAAgBIABgBIABgCIAAgBIABgBIACgBIABgBIACgBIABAAIABgBIABgBIABgBIABAAIABgBIACgBIABAAIADgBIADAAIAEAAIAEAAIAEAAIACAAIABABIABAAIACABIABAAIACABIABABIABABIAAABIABABIABABIABABIABABIABABIABABIABACIAAABIABACIAAACIABABIAAABIAAACIAAABIAAABIgBACIAAABIgBABIgBABIgBABIgBAAIgCABIgBAAIgBABIgBAAgAAlgyIgBAAIgBAAIgCgBIgBAAIgBgBIgBgBIgBgBIgBgBIAAgBIgBgBIAAgBIAAgCIAAgCIAAgBIAAgCIAAgCIABgCIAAgBIABgCIAAgBIACgBIABgBIACgCIAAgBIABgBIACgBIAAgBIACgBIABgBIACgBIADAAIACgBIADAAIAFAAIAEAAIAFAAIACAAIABABIACAAIABABIABABIABABIABABIABABIAAABIACABIABABIABABIABABIABABIABAAIABABIABACIAAABIABACIAAABIAAACIAAABIgBACIAAABIgBABIAAABIgBABIgCAAIgBABIgBAAIgCABIgBAAIgBAAIgBgBIgBAAIgCgBIgCAAIgBgBIgBgBIgBgBIgBgBIAAgBIgBgBIgBgBIgBgBIgCAAIgBAAIgCAAIgBAAIgBAAIgCAAIgCAAIAAABIgBABIgBABIAAAAIAAABIAAABIAAACIgBABIAAABIgBABIAAABIgBABIgBABIgBABIgBAAIgCABIgBAAIgBAAgArYiGIgBAAIgCAAIgCgBIgBgBIgBAAIgBgBIgBgBIAAgBIgBgBIgBgBIgBgBIAAgBIgBgCIgBgBIAAgCIAAgCIAAgBIAAgBIAAgCIgBgBIgBAAIgBABIgBABIgBABIgBAAIgCABIgCAAIgBAAIgCAAIgBAAIgCAAIgCABIAAAAIgBABIgBABIAAABIAAABIAAACIgBABIAAABIAAABIgBABIgBABIgBABIgBABIgBAAIgCABIgBAAIgBAAIgBAAIgBAAIgCgBIgBAAIgBgBIgBgBIgBgBIgBgBIAAgBIgBgBIAAgBIAAgCIAAgBIAAgCIAAgCIAAgBIAAgCIABgCIABgBIAAgBIABgCIABgBIABgBIACAAIAAgCIABgBIABgBIABgBIABgBIACAAIACgBIABgBIACAAIABAAIACgBIABAAIADAAIACAAIAAgBIABgBIABgBIACAAIADgBIACAAIACgBIABAAIABAAIADAAIABABIABAAIACABIABABIABABIACABIABABIACABIABABIABABIABABIAAABIABABIABACIABABIAAACIAAACIAAABIAAACIABABIAAACIABABIABABIABACIAAABIAAABIAAACIAAABIAAABIAAABIgBABIgBABIAAABIgBABIgCABIgCABIgBAAIgCAAgAMFkjIgBAAIgCAAIgCgBIgBAAIgBgBIgBgBIgIAAIgHAAIgHAAIgHAAIgIAAIgCgBIgCAAIgBgBIgBAAIgBgBIgBgBIAAgBIgBgBIAAgCIgBgBIAAgBIAAgCIABgBIAAgBIABgBIAAgBIABgBIABgBIABgBIABAAIACgBIAGAAIAHAAIAJAAIAIAAIAJAAIAGAAIACAAIABABIABAAIABABIACABIABABIABABIABABIABACIAAABIABACIAAABIAAABIAAABIAAACIgBABIAAABIgBABIgBABIgBABIgBABIgCAAIgBABIgBAAIgBAAg");
	this.shape_17.setTransform(196.6,205.275);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#000000").s().p("AhnE+IgBAAIgCgBIgBAAIAAgBIgBAAIgBgBIgBgBIgBgCIgBgBIAAgCIAAgBIgBgBIgBgBIAAgCIgBgBIgBgCIgCgCIgEgBIgCgBIgBAAIgBAAIgCAAIgCAAIgCAAIgBAAIAAAAIgBAAIgCABIgDAAIgBAAIgBABIgCAAIgBABIgCAAIgCgBIgBAAIgCgBIgBgBIgBAAIgBgBIAAgCIgBgCIAAgBIAAgBIAAgCIAAgBIAAAAIABgCIABgCIABAAIABgBIAAgBIABAAIAEgBIAEgBIACgBIAFgBIABAAIACAAIABAAIABAAIACAAIACAAIABAAIABAAIACgBIABAAIACABIAEACIAFACIAEADIAFADIADABIAAABIABABIABACIAAABIABACIAAABIAAABIABABIACABIAAACIAAABIAAABIAAACIABABIgBABIABABIgBABIAAACIAAACIAAABIgCABIgBAAIgBABIgBABIgBABIgCAAIgBAAIgCAAgAEzDdIgBAAIgBgBIgCAAIgBgBIgBAAIgBgBIgBgBIgBgBIAAgBIgBgBIAAgBIAAgCIAAgCIAAgBIABgBIAAgBIABgBIABgBIABgBIABgBIABAAIABgBIACgBIABgBIAAgBIACAAIAAgBIABgBIACgBIABgBIABgBIABgBIACAAIABgBIACAAIACAAIABAAIACAAIABAAIABAAIADAAIABAAIABABIABAAIACABIABABIABABIACACIABAAIABABIABAAIABABIABABIABABIAAABIABACIABACIABABIAAABIAAACIgBABIAAACIgBABIgBABIgBABIgBABIgBAAIAAABIgBAAIgCAAIgCABIgBAAIgBgBIgBAAIgBgBIgBAAIgBgBIgBAAIgCgBIgBgBIgBAAIgBgBIAAgBIgBAAIAAABIgBABIgBAAIgBABIgCABIgBAAIgBABIgBABIgBABIgBAAIgCABIgCAAIgCABIgBAAgAo2C+IgBAAIgBAAIgBAAIgCgBIgBAAIgBgBIgBgBIgBgBIAAgBIgBgBIAAgCIgBgBIAAgBIAAgBIABgBIAAgCIABgBIAAgBIABgBIABgBIABAAIABgBIABgBIABgBIABgBIABgBIABgBIAAAAIABgBIABgBIABgBIABgBIACAAIACAAIABgBIAGgBIAFAAIAFAAIAEAAIAEABIABAAIACABIABAAIABABIABABIABAAIAAABIACABIAAABIABABIABABIABABIABABIABABIAAABIABACIAAABIAAACIAAABIAAABIgBABIAAABIgBABIgBABIAAACIgCAAIgBABIgCAAIgBABIgBAAIgBgBIgCAAIgBAAIgBgBIgCgBIgBgBIgBgBIgBgBIgBgBIgBAAIAAgBIgBAAIgCAAIgCAAIgCAAIgBAAIgCAAIgBABIgCABIgBABIgBABIgBABIgBACIgBAAIgBABIgBABIgCAAIgBABIgCAAIgBAAgAJHAZIgBAAIgCAAIgBAAIgBgBIgBgBIgBgBIgBgBIgBgBIAAgBIgBgBIAAgBIgBgCIAAgBIgBgCIgBgBIgBgBIgBAAIAAgBIgBgBIgBgBIgBgBIgBAAIAAgCIgCgBIAAAAIgBgBIgBgBIgCAAIgBAAIgCAAIgCABIgBAAIAAABIAAAAIgBABIAAACIgBABIAAABIgBABIgCABIgBAAIgCABIgBAAIgBAAIgCAAIAAAAIgCgBIgBAAIgBAAIgBgBIgBgBIgBgBIAAgBIgBgCIAAgBIAAgCIAAgBIAAAAIAAgCIABgCIAAgBIABgBIABgBIABgBIABgBIABgBIABgBIABgCIAAgBIACgBIABAAIABgBIACgBIACAAIADAAIAEAAIAFAAIADAAIADAAIACAAIAAABIABAAIACABIABABIABABIABABIACACIABABIAAABIABABIACAAIABABIABABIABABIABACIABABIABABIABAAIABABIABABIABABIABACIAAACIABABIAAACIAAABIABABIAAACIAAABIAAACIAAABIgBABIAAABIgBABIgBABIgBABIgBABIgCABIgBAAIgCAAgAkygpIgCAAIgCgBIgCAAIgBgBIgBgBIAAAAIAAgBIgBgCIgBgBIAAgBIgBgCIAAAAIgCgBIgBAAIgBgBIgBAAIgCAAIgCAAIgBABIgBAAIgBABIgCABIgBABIgBAAIgBABIAAABIgBABIgCABIgBABIgBAAIgCAAIgBAAIgBAAIgBAAIgCAAIgBgBIgBAAIgBgBIgBgBIAAgCIgBgBIAAgBIgBgBIAAgBIAAgCIABgBIAAgCIAAgCIABgBIABgBIAAgBIABgBIACgBIABgBIACgBIABgBIABAAIABgBIABgBIABgBIABAAIACgBIABAAIADgBIADAAIAEAAIAEAAIAEAAIACAAIABABIABAAIACABIABAAIACABIABABIABABIAAABIABAAIABACIABABIABABIABABIABABIABABIAAACIABACIAAACIABABIAAABIAAABIAAABIAAACIgBACIAAABIgBABIgBAAIgBABIgBABIgCAAIgBABIgBAAIgBAAgAAlg1IgBAAIgBAAIgCgBIgBAAIgBgBIgBgBIgBgBIgBgBIAAgBIgBgCIAAgBIAAgBIAAgCIAAgCIAAgCIAAgBIABgCIAAgBIABgCIAAgBIACgCIABgBIACgBIAAgBIABgBIACgBIAAgCIACgBIABgBIACAAIADgBIACAAIADAAIAFAAIAEAAIAFAAIACAAIABAAIACABIABABIABAAIABABIABACIABABIAAABIACABIABABIABAAIABABIABABIABABIABABIABACIAAABIABABIAAACIAAABIAAACIgBACIAAABIgBABIAAAAIgBABIgCABIgBABIgBAAIgCAAIgBAAIgBAAIgBAAIgBgBIgCAAIgCgBIgBgBIgBAAIgBgBIgBgBIAAgBIgBgCIgBAAIgBgBIgCAAIgBAAIgCAAIgBAAIgBAAIgCAAIgCAAIAAAAIgBABIgBACIAAAAIAAABIAAABIAAABIgBABIAAACIgBABIAAABIgBABIgBABIgBABIgBAAIgCABIgBAAIgBAAgArYiJIgBAAIgCAAIgCgBIgBgBIgBgBIgBgBIgBgBIAAAAIgBgBIgBgBIgBgBIAAgBIgBgCIgBgCIAAgBIAAgCIAAgBIAAgBIAAgCIgBgBIgBAAIgBABIgBABIgBABIgBAAIgCABIgCAAIgBAAIgCAAIgBAAIgCAAIgCABIAAAAIgBABIgBABIAAABIAAABIAAABIgBACIAAABIAAABIgBABIgBABIgBABIgBAAIgBABIgCAAIgBABIgBAAIgBAAIgBgBIgCAAIgBgBIgBAAIgBgBIgBgBIgBgBIAAgBIgBgBIAAgCIAAgBIAAgCIAAgBIAAgCIAAgBIAAgDIABgBIABgBIAAgBIABgCIABgBIABgBIACgBIAAgBIABgBIABgBIABgBIABgBIACAAIACgBIABgBIACAAIABAAIACgBIABAAIADAAIACAAIAAgBIABgBIABgBIACgBIADgBIACAAIACAAIABAAIABAAIADAAIABAAIABABIACAAIABABIABABIACABIABACIACABIABABIABABIABABIAAABIABABIABABIABACIAAACIAAABIAAACIAAABIABACIAAACIABABIABABIABABIAAABIAAACIAAACIAAABIAAABIAAABIgBABIgBABIAAABIgBABIgCABIgCABIgBAAIgCAAgAMFkmIgBAAIgCgBIgCAAIgBgBIgBAAIgBgBIgIAAIgHAAIgHAAIgHAAIgIAAIgCgBIgCAAIgBgBIgBAAIgBgCIgBgBIAAgBIgBgBIAAgBIgBgBIAAgBIAAgCIABgBIAAgCIABgBIAAgBIABAAIABgBIABgBIABAAIACgBIAGAAIAHAAIAJAAIAIAAIAJAAIAGAAIACAAIABABIABAAIABABIACABIABAAIABACIABABIABABIAAACIABACIAAABIAAABIAAABIAAABIgBABIAAACIgBABIgBABIgBABIgBAAIgCABIgBAAIgBABIgBAAg");
	this.shape_18.setTransform(196.6,205.6);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#000000").s().p("AgXARIgBAAIgCAAIgBgBIgCgBIgBAAIgBgBIAAgBIgBgCIAAgBIgBgBIAAgCIAAgBIABgBIAAgBIABgBIAAgCIADgBIACgCIADgDIACgDIACgBIACgBIABAAIABgBIABAAIABgBIABgBIABgBIACgBIABgBIABAAIAFgBIAEAAIAGAAIAFAAIADAAIABABIACAAIABACIABAAIACACIAAAAIABABIABABIACAAIABABIAAABIABABIABACIABABIAAABIABABIABABIAAABIAAAAIABABIgBACIAAABIAAACIgBABIgBABIAAAAIgBABIgBABIgCABIgBABIgBAAIgBAAIgCAAIgBAAIgBgBIgBgBIgCgBIgBgBIgBgBIgBAAIgBgBIgBgBIgBgBIgBAAIgCgBIgDAAIgEAAIgCAAIgBABIgBABIgBABIgBAAIgCABIgBAAIAAAAIgCABIgBACIgBABIgBABIgBACIgCABIgBAAIgBABIgCABIgBAAIgCAAg");
	this.shape_19.setTransform(184.25,238.8,1,1,29.9992,0,0,-0.1,0.2);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#000000").s().p("AEzEOIgBAAIgBgBIgCAAIgBgBIgBAAIgBgBIgBgBIgBgBIAAgBIgBgCIAAgBIAAgBIAAgCIAAgBIABgBIAAgBIABgBIABgBIABgBIABgBIABAAIABgBIACgBIABgBIAAgBIACAAIAAgBIABgBIACgBIABgBIABgBIABgBIACAAIABgBIACAAIACAAIABAAIACAAIABAAIABAAIADAAIABAAIABABIABAAIACABIABABIABABIACABIABAAIABABIABABIABABIABABIABABIAAABIABACIABABIABACIAAABIAAACIgBABIAAACIgBABIgBABIgBABIgBABIgBAAIAAABIgBAAIgCAAIgCABIgBAAIgBgBIgBAAIgBgBIgBAAIgBgBIgBgBIgCAAIgBgBIgBgBIgBAAIAAgBIgBAAIAAAAIgBABIgBABIgBAAIgCABIgBABIgBABIgBABIgBABIgBAAIgCABIgCAAIgCABIgBAAgAo2DvIgBAAIgBAAIgBgBIgCAAIgBgBIgBAAIgBgBIgBgBIAAgBIgBgBIAAgCIgBgBIAAgBIAAgCIABgBIAAgBIABgBIAAgBIABgBIABgBIABgBIABgBIABgBIABAAIABgBIABgBIABgBIAAAAIABgBIABgBIABgBIABgBIACAAIACgBIABgBIAGAAIAFAAIAFAAIAEAAIAEAAIABABIACAAIABABIABABIABABIABAAIAAABIACABIAAABIABABIABABIABABIABABIABABIAAABIABACIAAABIAAABIAAABIAAACIgBABIAAABIgBABIgBABIAAABIgCABIgBAAIgCABIgBAAIgBAAIgBAAIgCAAIgBgBIgBgBIgCAAIgBgBIgBgBIgBgBIgBgBIgBAAIAAgBIgBAAIgCAAIgCAAIgCAAIgBAAIgCAAIgBABIgCABIgBABIgBABIgBABIgBABIgBABIgBABIgBAAIgCABIgBAAIgCABIgBAAgAJHBKIgBAAIgCAAIgBgBIgBAAIgBgBIgBgBIgBgBIgBgBIAAgBIgBgCIAAgBIgBgBIAAgBIgBgCIgBgBIgBgBIgBgBIAAgBIgBgBIgBAAIgBgBIgBgBIAAgBIgCgBIAAAAIgBgBIgBgBIgCAAIgBAAIgCAAIgCABIgBAAIAAABIAAAAIgBABIAAACIgBABIAAABIgBABIgCABIgBAAIgCABIgBAAIgBAAIgCAAIAAAAIgCgBIgBAAIgBgBIgBgBIgBgBIgBgBIAAgBIgBgBIAAgBIAAgCIAAgBIAAgCIAAgBIABgCIAAgBIABgBIABgCIABgBIABAAIABgBIABgCIABgBIAAgBIACgBIABAAIABgBIACgBIACAAIADAAIAEgBIAFAAIADAAIADABIACAAIAAABIABAAIACABIABABIABABIABABIACABIABABIAAABIABABIACABIABABIABABIABABIABABIABACIABABIABABIABABIABABIABABIABACIAAABIABACIAAABIAAACIABABIAAACIAAABIAAABIAAABIgBACIAAABIgBABIgBABIgBABIgBABIgCAAIgBABIgCAAgAkyAHIgCAAIgCgBIgCAAIgBgBIgBgBIAAgBIAAgBIgBgBIgBgBIAAAAIgBgCIAAAAIgCgBIgBgBIgBAAIgBgBIgCAAIgCAAIgBABIgBABIgBABIgCABIgBABIgBAAIgBAAIAAABIgBABIgCABIgBAAIgBABIgCAAIgBAAIgBAAIgBAAIgCgBIgBAAIgBgBIgBgBIgBgBIAAAAIgBgBIAAgBIgBgBIAAgCIAAgBIABgCIAAgBIAAgCIABgBIABgBIAAgBIABgBIACgBIABgBIACgBIABgBIABAAIABgBIABgBIABgBIABgBIACAAIABgBIADAAIADgBIAEAAIAEAAIAEAAIACABIABAAIABABIACAAIABABIACABIABABIABABIAAABIABAAIABABIABABIABABIABABIABACIABABIAAACIABABIAAACIABACIAAABIAAABIAAABIAAABIgBABIAAABIgBABIgBABIgBABIgBABIgCAAIgBABIgBAAIgBAAgAAlgEIgBAAIgBgBIgCAAIgBgBIgBAAIgBgBIgBgBIgBgBIAAgBIgBgCIAAgBIAAgBIAAgCIAAgCIAAgCIAAgBIABgCIAAgCIABgBIAAgBIACgCIABgBIACgBIAAgBIABgCIACgBIAAgBIACgBIABgBIACAAIADgBIACAAIADAAIAFAAIAEAAIAFAAIACAAIABAAIACABIABABIABAAIABABIABABIABABIAAABIACABIABABIABABIABABIABABIABABIABABIABABIAAACIABABIAAACIAAABIAAACIgBABIAAABIgBABIAAABIgBABIgCABIgBABIgBAAIgCAAIgBAAIgBAAIgBAAIgBgBIgCAAIgCgBIgBgBIgBAAIgBgBIgBgCIAAgBIgBgBIgBAAIgBgBIgCAAIgBAAIgCAAIgBAAIgBAAIgCAAIgCAAIAAAAIgBABIgBABIAAABIAAABIAAABIAAABIgBABIAAACIgBABIAAABIgBABIgBABIgBAAIgBABIgCAAIgBABIgBAAgArYhYIgBAAIgCgBIgCAAIgBgBIgBgBIgBgBIgBgBIAAAAIgBgBIgBgBIgBgCIAAgBIgBgBIgBgCIAAgBIAAgCIAAgCIAAgBIAAgBIgBgBIgBAAIgBABIgBABIgBAAIgBABIgCAAIgCABIgBAAIgCAAIgBAAIgCAAIgCAAIAAABIgBAAIgBACIAAABIAAABIAAABIgBABIAAACIAAABIgBABIgBABIgBABIgBAAIgBABIgCAAIgBABIgBAAIgBAAIgBgBIgCAAIgBgBIgBAAIgBgBIgBgBIgBgBIAAgBIgBgCIAAgBIAAgBIAAgCIAAgCIAAgBIAAgCIAAgCIABgBIABgBIAAgCIABgBIABgBIABgBIACgBIAAgBIABgBIABgBIABgBIABgBIACgBIACgBIABAAIACgBIABAAIACAAIABAAIADAAIACAAIAAgBIABgBIABgBIACgBIADgBIACAAIACAAIABAAIABAAIADAAIABAAIABABIACAAIABABIABABIACABIABACIACABIABABIABABIABABIAAABIABABIABABIABACIAAACIAAABIAAACIAAABIABACIAAABIABACIABABIABABIAAABIAAACIAAABIAAABIAAACIAAABIgBABIgBABIAAABIgBABIgCABIgCAAIgBABIgCAAgAMFj1IgBAAIgCgBIgCAAIgBgBIgBgBIgBgBIgIAAIgHAAIgHAAIgHAAIgIAAIgCAAIgCgBIgBAAIgBgBIgBgBIgBgBIAAgBIgBgBIAAgBIgBgBIAAgCIAAgBIABgBIAAgCIABgBIAAgBIABgBIABgBIABAAIABgBIACAAIAGgBIAHAAIAJAAIAIAAIAJAAIAGAAIACABIABAAIABABIABAAIACABIABABIABACIABABIABABIAAACIABABIAAABIAAACIAAABIAAABIgBABIAAACIgBABIgBABIgBABIgBAAIgCABIgBAAIgBABIgBAAg");
	this.shape_20.setTransform(196.6,200.725);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#000000").s().p("AhrFdIgBAAIgCAAIgCgBIgBAAIgBgBIgBgBIgBgBIAAAAIAAgCIgBgBIAAgCIAAgBIAAgCIAAgBIAAgCIgBgBIAAgBIAAgBIgBgCIgDgDIgCgCIgCgCIgBAAIgCAAIgCgBIgBAAIgBAAIgBgBIgCAAIgDAAIgBAAIgCAAIgBAAIgCAAIgBAAIgCgBIgCAAIgBgBIgBgBIgBgBIgBgBIAAgCIAAgBIgBgCIAAgBIABgCIAAgBIABgBIAAgBIABgBIABgBIABAAIABgBIABgBIACAAIADAAIADAAIAEAAIADAAIADABIACAAIABAAIABABIABAAIACAAIABAAIABAAIACABIACAAIABABIADADIAEAEIAEAEIAEADIACACIAAACIABABIAAACIABABIAAACIAAABIAAABIAAABIAAACIAAABIAAACIAAAAIAAACIAAABIAAABIgBACIAAABIAAABIgBABIgBABIgBABIgBABIgCAAIgBABIgCAAIAAAAIAAAAgAEzC+IgBAAIgBAAIgCgBIgBAAIgBgBIgBgBIgBgBIgBgBIAAgBIgBgBIAAgBIAAgCIAAgBIAAgBIABgCIAAgBIABgBIABgBIABgBIABAAIABgBIABAAIACgCIABAAIAAgBIACgBIAAgBIABgBIACgBIABgBIABAAIABgBIACgBIABAAIACgBIACAAIABAAIACAAIABAAIABAAIADAAIABABIABAAIABABIACABIABAAIABABIACACIABAAIABABIABAAIABABIABABIABACIAAABIABABIABACIABABIAAACIAAABIgBACIAAABIgBABIgBABIgBABIgBABIgBABIAAAAIgBABIgCAAIgCAAIgBAAIgBAAIgBgBIgBAAIgBgBIgBgBIgBAAIgCgBIgBgBIgBAAIgBgBIAAgBIgBAAIAAABIgBABIgBAAIgBABIgCABIgBAAIgBABIgBABIgBABIgBABIgCAAIgCABIgCAAIgBAAgAo2CfIgBAAIgBAAIgBAAIgCgBIgBAAIgBgBIgBgBIgBgBIAAgBIgBgBIAAgBIgBgBIAAgCIAAgBIABgBIAAgCIABgBIAAgBIABgBIABgBIABAAIABgBIABgBIABgBIABgBIABgBIABAAIAAgBIABgBIABgBIABAAIABgBIACgBIACAAIABgBIAGgBIAFAAIAFAAIAEAAIAEABIABAAIACABIABAAIABABIABABIABABIAAABIACABIAAAAIABABIABABIABABIABABIABACIAAABIABABIAAABIAAACIAAABIAAABIgBABIAAACIgBABIgBABIAAABIgCAAIgBABIgCAAIgBABIgBAAIgBgBIgCAAIgBAAIgBgBIgCgBIgBgBIgBgBIgBAAIgBgBIgBgBIAAgBIgBAAIgCAAIgCAAIgCAAIgBAAIgCAAIgBACIgCABIgBABIgBAAIgBABIgBACIgBAAIgBABIgBABIgCAAIgBABIgCAAIgBAAgAJHgFIgBAAIgCAAIgBAAIgBgBIgBgBIgBAAIgBgBIgBgCIAAgBIgBgBIAAgBIgBgCIAAgBIgBgBIgBgBIgBgBIgBgBIAAgBIgBgBIgBgBIgBgBIgBAAIAAgBIgCgBIAAgBIgBAAIgBgBIgCAAIgBAAIgCAAIgCAAIgBABIAAAAIAAABIgBABIAAABIgBABIAAABIgBABIgCABIgBABIgCAAIgBABIgBAAIgCAAIAAgBIgCAAIgBgBIgBAAIgBgBIgBgBIgBgBIAAgBIgBgCIAAgBIAAgBIAAgCIAAgBIAAgCIABgBIAAgCIABgBIABgBIABgBIABgBIABgBIABgBIABgBIAAgBIACgBIABgBIABgBIACAAIACgBIADAAIAEAAIAFAAIADAAIADAAIACABIAAAAIABABIACABIABABIABABIABAAIACACIABABIAAABIABABIACABIABABIABAAIABACIABABIABABIABABIABABIABABIABACIABABIABABIAAACIABABIAAACIAAABIABACIAAABIAAABIAAACIAAABIgBABIAAABIgBABIgBABIgBABIgBABIgCABIgBAAIgCAAgAkyhHIgCgBIgCAAIgCgBIgBgBIgBAAIAAgBIAAgBIgBgCIgBgBIAAgBIgBgBIAAgBIgCAAIgBgBIgBgBIgBAAIgCAAIgCAAIgBABIgBABIgBABIgCAAIgBABIgBAAIgBABIAAABIgBABIgCABIgBABIgBAAIgCABIgBAAIgBAAIgBgBIgCAAIgBgBIgBAAIgBgBIgBgBIAAgBIgBgBIAAgCIgBgBIAAgBIAAgCIABgBIAAgCIAAgBIABgBIABgCIAAgBIABgBIACgBIABgBIACgBIABAAIABgBIABgBIABgBIABAAIABgBIACgBIABAAIADgBIADAAIAEAAIAEAAIAEAAIACAAIABABIABAAIACABIABAAIACABIABABIABABIAAABIABABIABABIABABIABABIABABIABABIABACIAAABIABACIAAACIABABIAAABIAAACIAAABIAAABIgBACIAAABIgBABIgBABIgBABIgBAAIgCABIgBAAIgBABIgBAAgAAlhUIgBAAIgBAAIgCgBIgBAAIgBgBIgBgBIgBgBIgBgBIAAgBIgBgBIAAgBIAAgCIAAgCIAAgBIAAgCIAAgCIABgCIAAgBIABgCIAAgBIACgBIABgBIACgCIAAgBIABgBIACgBIAAgBIACgBIABgBIACgBIADAAIACgBIADAAIAFAAIAEAAIAFAAIACAAIABABIACAAIABABIABABIABABIABABIABABIAAABIACABIABABIABABIABABIABABIABAAIABABIABACIAAABIABACIAAABIAAACIAAABIgBACIAAABIgBABIAAABIgBABIgCAAIgBABIgBAAIgCABIgBAAIgBAAIgBgBIgBAAIgCgBIgCAAIgBgBIgBgBIgBgBIgBgBIAAgBIgBgBIgBgBIgBgBIgCAAIgBAAIgCAAIgBAAIgBAAIgCAAIgCAAIAAABIgBABIgBABIAAAAIAAABIAAABIAAACIgBABIAAABIgBABIAAABIgBABIgBABIgBABIgBAAIgCABIgBAAIgBAAgArYioIgBAAIgCAAIgCgBIgBgBIgBAAIgBgBIgBgBIAAgBIgBgBIgBgBIgBgBIAAgBIgBgCIgBgBIAAgCIAAgCIAAgBIAAgBIAAgCIgBgBIgBAAIgBABIgBABIgBABIgBAAIgCABIgCAAIgBAAIgCAAIgBAAIgCAAIgCABIAAAAIgBABIgBABIAAABIAAABIAAACIgBABIAAABIAAABIgBABIgBABIgBABIgBABIgBAAIgCABIgBAAIgBAAIgBAAIgBAAIgCgBIgBAAIgBgBIgBgBIgBgBIgBgBIAAgBIgBgBIAAgBIAAgCIAAgBIAAgCIAAgCIAAgBIAAgCIABgCIABgBIAAgBIABgCIABgBIABgBIACAAIAAgCIABgBIABgBIABgBIABgBIACAAIACgBIABgBIACAAIABAAIACgBIABAAIADAAIACAAIAAgBIABgBIABgBIACAAIADgBIACAAIACgBIABAAIABAAIADAAIABABIABAAIACABIABABIABABIACABIABABIACABIABABIABABIABABIAAABIABABIABACIABABIAAACIAAACIAAABIAAACIABABIAAACIABABIABABIABACIAAABIAAABIAAACIAAABIAAABIAAABIgBABIgBABIAAABIgBABIgCABIgCABIgBAAIgCAAgAMFlFIgBAAIgCAAIgCgBIgBAAIgBgBIgBgBIgIAAIgHAAIgHAAIgHAAIgIAAIgCgBIgCAAIgBgBIgBAAIgBgBIgBgBIAAgBIgBgBIAAgCIgBgBIAAgBIAAgCIABgBIAAgBIABgBIAAgBIABgBIABgBIABgBIABAAIACgBIAGAAIAHAAIAJAAIAIAAIAJAAIAGAAIACAAIABABIABAAIABABIACABIABABIABABIABABIABACIAAABIABACIAAABIAAABIAAABIAAACIgBABIAAABIgBABIgBABIgBABIgBABIgCAAIgBABIgBAAIgBAAg");
	this.shape_21.setTransform(196.6,208.6875);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#000000").s().p("AhRE2IgBgBIgBAAIgCAAIgBgBIgCAAIgBgBQAAAAAAgBQAAAAAAAAQAAAAAAAAQAAAAAAgBIgBAAIgBgCIAAgBIgBgBIgCgBIgBgBIAAgBIgCgBIgDgBIgDgBIgDAAIgBAAIgBABIgCAAIgCAAIgBABIgBAAIgBAAIgBABIgCAAIgBABIgCABIgBABIgCABIgBAAIgBABIgCAAIgCAAIgCAAIgBgBIgBAAIgBgBIgBgCIgBgBIAAgBIgBgBIAAgCIgBgBIAAgBIABgBIAAgCIABgBIABgBIABgBIABgBIACgCIAEgBIADgCIACgCIADgBIACAAIABAAIABAAIABgBIABgBIACAAIAAgBIADAAIABAAIABgBIAFABIAFACIAGABIAEABIAEABIABABIABABIABABIABABIAAACIABABIABABIAAABIACABIABABIAAABIAAABIABACIABABIAAABIAAABIABABIAAACIgBABIABABIgBACIgBABIAAABIgBABIgCABIAAAAIgBABIgCAAIgBABIgBAAgAEzDmIgBAAIgBgBIgCAAIgBgBIgBAAIgBgBIgBgBIgBgBIAAgBIgBgCIAAgBIAAgBIAAgCIAAgBIABgBIAAgBIABgBIABgBIABgBIABgBIABAAIABgBIACgBIABgBIAAgBIACAAIAAgBIABgBIACgBIABgBIABgBIABgBIACAAIABgBIACAAIACAAIABAAIACAAIABAAIABAAIADAAIABAAIABABIABAAIACABIABABIABABIACABIABAAIABABIABABIABABIABABIABABIAAABIABACIABABIABACIAAABIAAACIgBABIAAACIgBABIgBABIgBABIgBABIgBAAIAAABIgBAAIgCAAIgCABIgBAAIgBgBIgBAAIgBgBIgBAAIgBgBIgBgBIgCAAIgBgBIgBgBIgBAAIAAgBIgBAAIAAAAIgBABIgBABIgBAAIgCABIgBABIgBABIgBABIgBABIgBAAIgCABIgCAAIgCABIgBAAgAo2DHIgBAAIgBAAIgBgBIgCAAIgBgBIgBAAIgBgBIgBgBIAAgBIgBgBIAAgCIgBgBIAAgBIAAgCIABgBIAAgBIABgBIAAgBIABgBIABgBIABgBIABgBIABgBIABAAIABgBIABgBIABgBIAAAAIABgBIABgBIABgBIABgBIACAAIACgBIABgBIAGAAIAFAAIAFAAIAEAAIAEAAIABABIACAAIABABIABABIABABIABAAIAAABIACABIAAABIABABIABABIABABIABABIABABIAAABIABACIAAABIAAABIAAABIAAACIgBABIAAABIgBABIgBABIAAABIgCABIgBAAIgCABIgBAAIgBAAIgBAAIgCAAIgBgBIgBgBIgCAAIgBgBIgBgBIgBgBIgBgBIgBAAIAAgBIgBAAIgCAAIgCAAIgCAAIgBAAIgCAAIgBABIgCABIgBABIgBABIgBABIgBABIgBABIgBABIgBAAIgCABIgBAAIgCABIgBAAgAJHAiIgBAAIgCAAIgBgBIgBAAIgBgBIgBgBIgBgBIgBgBIAAgBIgBgCIAAgBIgBgBIAAgBIgBgCIgBgBIgBgBIgBgBIAAgBIgBgBIgBAAIgBgBIgBgBIAAgBIgCgBIAAAAIgBgBIgBgBIgCAAIgBAAIgCAAIgCABIgBAAIAAABIAAAAIgBABIAAACIgBABIAAABIgBABIgCABIgBAAIgCABIgBAAIgBAAIgCAAIAAAAIgCgBIgBAAIgBgBIgBgBIgBgBIgBgBIAAgBIgBgBIAAgBIAAgCIAAgBIAAgCIAAgBIABgCIAAgBIABgBIABgCIABAAIABAAIABgBIABgCIABgBIAAgBIACgBIABAAIABgBIACgBIACAAIADAAIAEgBIAFAAIADAAIADABIACAAIAAABIABAAIACABIABABIABABIABABIACABIABABIAAABIABAAIACABIABABIABABIABABIABABIABACIABABIABABIABABIABABIABABIABACIAAABIABACIAAABIAAACIABABIAAACIAAABIAAABIAAABIgBACIAAABIgBABIgBABIgBABIgBABIgCAAIgBABIgCAAgAkyggIgCAAIgCgBIgCAAIgBgBIgBgBIAAgBIAAgBIgBgBIgBgBIAAgBIgBgCIAAAAIgCgBIgBgBIgBAAIgBgBIgCAAIgCAAIgBABIgBABIgBABIgCABIgBABIgBAAIgBABIAAABIgBABIgCABIgBAAIgBABIgCAAIgBAAIgBAAIgBAAIgCgBIgBAAIgBgBIgBgBIgBgBIAAgBIgBgBIAAgBIgBgBIAAgCIAAgBIABgCIAAgBIAAgCIABgBIABgBIAAgBIABgBIACgBIABgBIACgBIABgBIABAAIABgBIABgBIABgBIABgBIACAAIABgBIADAAIADgBIAEAAIAEAAIAEAAIACABIABAAIABABIACAAIABABIACABIABABIABABIAAABIABAAIABABIABABIABABIABABIABACIABABIAAACIABABIAAACIABACIAAABIAAABIAAABIAAACIgBABIAAABIgBABIgBABIgBABIgBABIgCAAIgBABIgBAAIgBAAgAAlgsIgBAAIgBgBIgCAAIgBgBIgBAAIgBgBIgBgBIgBgBIAAgBIgBgCIAAgBIAAgBIAAgCIAAgCIAAgCIAAgBIABgCIAAgCIABgBIAAgBIACgCIABgBIACgBIAAgBIABgCIACgBIAAgBIACgBIABgBIACAAIADgBIACAAIADAAIAFAAIAEAAIAFAAIACAAIABAAIACABIABABIABAAIABABIABABIABABIAAABIACABIABABIABABIABABIABABIABABIABABIABABIAAACIABABIAAACIAAABIAAACIgBABIAAABIgBABIAAABIgBABIgCABIgBABIgBAAIgCAAIgBAAIgBAAIgBAAIgBgBIgCAAIgCgBIgBgBIgBAAIgBgBIgBgCIAAgBIgBgBIgBAAIgBgBIgCAAIgBAAIgCAAIgBAAIgBAAIgCAAIgCAAIAAAAIgBABIgBABIAAABIAAABIAAABIAAABIgBABIAAACIgBABIAAABIgBABIgBABIgBAAIgBABIgCAAIgBABIgBAAgArYiAIgBAAIgCgBIgCAAIgBgBIgBgBIgBgBIgBgBIAAAAIgBgBIgBgBIgBgCIAAgBIgBgBIgBgCIAAgBIAAgCIAAgCIAAgBIAAgBIgBgBIgBAAIgBABIgBABIgBAAIgBABIgCAAIgCABIgBAAIgCAAIgBAAIgCAAIgCAAIAAABIgBAAIgBACIAAABIAAABIAAABIgBABIAAACIAAABIgBABIgBABIgBABIgBAAIgBABIgCAAIgBABIgBAAIgBAAIgBgBIgCAAIgBgBIgBAAIgBgBIgBgBIgBgBIAAgBIgBgCIAAgBIAAgBIAAgCIAAgCIAAgBIAAgCIAAgCIABgBIABgBIAAgCIABgBIABgBIABgBIACgBIAAgBIABgBIABgBIABgBIABgBIACgBIACgBIABAAIACgBIABAAIACAAIABAAIADAAIACAAIAAgBIABgBIABgBIACgBIADgBIACAAIACAAIABAAIABAAIADAAIABAAIABABIACAAIABABIABABIACABIABACIACABIABABIABABIABABIAAABIABABIABABIABACIAAACIAAABIAAACIAAABIABACIAAABIABACIABABIABABIAAABIAAACIAAABIAAABIAAACIAAABIgBABIgBABIAAABIgBABIgCABIgCAAIgBABIgCAAgAMFkdIgBAAIgCgBIgCAAIgBgBIgBgBIgBgBIgIAAIgHAAIgHAAIgHAAIgIAAIgCAAIgCgBIgBAAIgBgBIgBgBIgBgBIAAgBIgBgBIAAgBIgBgBIAAgCIAAgBIABgBIAAgCIABgBIAAgBIABgBIABgBIABAAIABgBIACAAIAGgBIAHAAIAJAAIAIAAIAJAAIAGAAIACABIABAAIABABIABAAIACABIABABIABACIABABIABABIAAACIABABIAAABIAAACIAAABIAAABIgBABIAAACIgBABIgBABIgBABIgBAAIgCABIgBAAIgBABIgBAAg");
	this.shape_22.setTransform(196.6,204.725);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_15}]},211).to({state:[{t:this.shape_15}]},3).to({state:[{t:this.shape_16}]},23).to({state:[{t:this.shape_17}]},73).to({state:[{t:this.shape_18}]},2).to({state:[{t:this.shape_20},{t:this.shape_19}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[]},1).wait(134));

	// _ndMouths
	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#000000").s().p("AgGAHQgEgEACgFQACgFAGgBIAAgBQAFABACACIACAEIABADQAAABAAAAQAAABgBAAQAAABAAAAQAAABgBAAIgBACQgEADgDAAQgEAAgCgDg");
	this.shape_23.setTransform(194.7667,200.65);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#000000").s().p("AhoChQgEgCgCgFQgBgEADgEQADgEAFgBQAEABACACIADAFIAAADIgBADIgBADQgCADgEAAIgCAAIgDAAgABeiQQgEgEACgFQADgGAFgBIACAAQAEABACACIADAEIAAAEQAAABAAAAQAAABAAAAQAAABgBAAQAAAAAAABIgCABQgDAEgEAAQgEAAgDgEg");
	this.shape_24.setTransform(184.625,215.775);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#000000").s().p("AifFBQgFgBgBgFQgCgFAEgEQADgDAEgBQAFABACACIACAEIABAEIgBADIgCACQgCADgDAAIgDABIgCgBgAEBEIQgEgCgBgFQgCgEADgEQADgEAFgBQAEABADACIACAFIABADIgBADIgCADQgCADgEAAIgCAAIgDAAgAIoB+QgEgBgBgFQgCgFADgEQADgDAFgBQAEABACACIADAEIABAEIgBADIgCACQgCADgEAAIgCABIgDgBgAoMB2QgGgDAAgGQAAgEACgDQAEgDAEABIAAgBQADAAADADIACAEIABADIAAADIgDAEQgDADgDAAIgEgBgAgygJQgDgEABgFQADgGAGgBIABAAQAFABACACIACAEIAAAEQAAABAAAAQAAABAAAAQAAABAAAAQgBAAAAABIgBABQgEAEgEAAQgEAAgDgEgAFLigQgFgCgBgFQgCgEADgEQADgEAFgBQAFABACACIACAFIAAADIAAADIgCADQgCADgEAAIgCAAIgCAAgArCiwQgHgDABgGQAAgEADgDQADgDAEABIAAgBQADAAADADIACAEIABADIAAADIgDAEQgDADgDAAIgEgBgAK9jeQgFgCgBgFQgCgEADgEQADgEAFgBQAFABACACIACAFIAAADIgBADIgBADQgCADgEAAIgCAAIgCAAgAmjktQgEgCgBgFQgCgEADgEQADgEAFgBQAEABACACIADAFIABADIgBADIgCADQgCADgEAAIgCAAIgDAAg");
	this.shape_25.setTransform(190.65,206.275);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#000000").s().p("AgCAJQgFgBgBgFQgCgDADgEQADgEAEgBQAFABACACIACAFIABACIgBADIgCADQgCACgEAAIgBABIgCgBg");
	this.shape_26.setTransform(243.325,215.15);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#000000").s().p("AifFpQgFgBgBgFQgCgFAEgEQADgDAEgBQAFABACACIACAEIABAEIgBADIgCACQgCADgDAAIgDABIgCgBgAEBDgQgEgCgBgFQgCgEADgEQADgEAFgBQAEABADACIACAFIABADIgBADIgCADQgCADgEAAIgCAAIgDAAgAoMBOQgGgDAAgGQAAgEACgDQAEgDAEABIAAgBQADAAADADIACAEIABADIAAADIgDAEQgDADgDAAIgEgBgAiPgTQgFgEADgFQACgGAFgBIACAAQAEABACACIADAEIABAEQAAABgBAAQAAABAAAAQAAABAAAAQgBAAAAABIgCABQgDAEgEAAQgEAAgCgEgAFLjIQgFgCgBgFQgCgEADgEQADgEAFgBQAFABACACIACAFIAAADIAAADIgCADQgCADgEAAIgCAAIgCAAgArCjYQgHgDABgGQAAgEADgDQADgDAEABIAAgBQADAAADADIACAEIABADIAAADIgDAEQgDADgDAAIgEgBgAK9kGQgFgCgBgFQgCgEADgEQADgEAFgBQAFABACACIACAFIAAADIgBADIgBADQgCADgEAAIgCAAIgCAAgAmjlVQgEgCgBgFQgCgEADgEQADgEAFgBQAEABACACIADAFIABADIgBADIgCADQgCADgEAAIgCAAIgDAAg");
	this.shape_27.setTransform(190.65,210.275);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f("#000000").s().p("AifFpQgFgBgBgFQgCgFAEgEQADgDAEgBQAFABACACIACAEIABAEIgBADIgCACQgCADgDAAIgDABIgCgBgAEBDgQgEgCgBgFQgCgEADgEQADgEAFgBQAEABADACIACAFIABADIgBADIgCADQgCADgEAAIgCAAIgDAAgAoMBOQgGgDAAgGQAAgEACgDQAEgDAEABIAAgBQADAAADADIACAEIABADIAAADIgDAEQgDADgDAAIgEgBgAJAA6QgFgBgCgFQgBgFADgEQADgDAFgBQAFABACACIACAEIAAAEIgBADIgBACQgCADgEAAIgCABIgCgBgAi2AjQgEgEACgFQACgGAGgBIABAAQAFABACACIACAEIABAEQAAABAAAAQAAABAAAAQgBABAAAAQAAAAgBABIgBABQgDAEgFAAQgEAAgCgEgAEKh6QgEgCgBgFQgCgEADgEQADgEAFgBQAEABADACIACAFIABADIgBADIgCADQgCADgEAAIgCAAIgDAAgArCjYQgHgDABgGQAAgEADgDQADgDAEABIAAgBQADAAADADIACAEIABADIAAADIgDAEQgDADgDAAIgEgBgAK9kkQgFgCgBgFQgCgEADgEQADgEAFgBQAFABACACIACAFIAAADIgBADIgBADQgCADgEAAIgCAAIgCAAgAmjlVQgEgCgBgFQgCgEADgEQADgEAFgBQAEABACACIADAFIABADIgBADIgCADQgCADgEAAIgCAAIgDAAg");
	this.shape_28.setTransform(190.65,210.275);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f("#000000").s().p("AifFRQgFgBgBgFQgCgFAEgEQADgDAEgCQAFABACACIACAFIABADIgBAEIgCACQgCADgDAAIgDABIgCgBgAEBDHQgEgBgBgFQgCgFADgEQADgDAFgBQAEABADACIACAFIABADIgBADIgCADQgCACgEAAIgCABIgDgBgAoMA2QgGgDAAgGQAAgEACgDQAEgDAEABIAAgBQADAAADACIACAEIABAEIAAACIgDAFQgDADgDAAIgEgBgAiiAzQgFgEACgGQADgFAFgBIACAAQAEABACABIADAEIABAFQAAAAgBABQAAAAAAABQAAAAAAABQgBAAAAAAIgCACQgDADgEABQgEgBgCgDgAJAAiQgFgCgCgEQgBgFADgEQADgDAFgCQAFACACACIACAEIAAAEIgBADIgBACQgCADgEAAIgCAAIgCAAgAEKiTQgEgBgBgFQgCgEADgEQADgEAFgBQAEABADACIACAEIABAEIgBADIgCACQgCADgEAAIgCABIgDgBgArCjwQgHgDABgGQAAgFADgCQADgDAEABIAAgBQADAAADACIACAFIABADIAAACIgDAFQgDADgDAAIgEgBgAK9k8QgFgCgBgFQgCgFADgDQADgEAFgBQAFABACACIACAEIAAAEIgBADIgBACQgCADgEABIgCAAIgCAAgAmDk9QgEgCgCgEQgCgFADgEQADgEAFgBQAFACACACIACAEIABAEIgBADIgBACQgCADgFAAIgCAAIgCAAg");
	this.shape_29.setTransform(190.65,212.7);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f("#000000").s().p("AjUFRQgFgBgBgFQgCgFAEgEQADgDAEgCQAFABACACIACAFIABADIgBAEIgCACQgCADgDAAIgDABIgCgBgAEzDHQgEgBgCgFQgBgFACgEQAEgDAEgBQAFABACACIACAFIABADIgBADIgCADQgBACgFAAIgCABIgCgBgApBA2QgGgDAAgGQAAgEACgDQAEgDAEABIAAgBQADAAADACIACAEIABAEIAAACIgDAFQgDADgDAAIgEgBgAjXAzQgFgEACgGQADgFAFgBIACAAQAEABACABIADAEIABAFQAAAAgBABQAAAAAAABQAAAAAAABQgBAAAAAAIgCACQgDADgEABQgEgBgCgDgAIMgfQgFgBgCgFQgBgEADgEQADgEAFgBQAEABADACIACAEIAAAEIgBADIgBADQgCACgEAAIgCABIgCgBgADViTQgEgBgBgFQgCgEADgEQADgEAFgBQAEABADACIACAEIABAEIgBADIgCACQgCADgEAAIgCABIgDgBgArckSQgGgCAAgHQAAgEADgCQAEgEADABIAAgBQADABADACIADAEIABADIgBADIgDAEQgCADgEAAIgEgBgALWk9QgEgCgCgEQgBgFADgEQACgEAGgBQAEACACACIADAEIAAAEIgBADIgBACQgDADgDAAIgDAAIgCAAgAmyk9QgEgCgCgEQgBgFADgEQACgEAGgBQAEACACACIADAEIAAAEIgBADIgBACQgDADgDAAIgDAAIgCAAg");
	this.shape_30.setTransform(195.95,212.7);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f("#000000").s().p("AjUFmQgFgBgBgFQgCgFAEgEQADgDAEgCQAFABACACIACAFIABADIgBAEIgCACQgCADgDAAIgDABIgCgBgAEzDcQgEgBgCgFQgBgFACgEQAEgDAEgBQAFABACACIACAFIABADIgBADIgCADQgBACgFAAIgCABIgCgBgAimCQQgDgEABgGQADgFAGgBIABAAQAFABACABIACAEIAAAFQAAAAAAABQAAAAAAABQAAAAAAABQgBAAAAAAIgBACQgEADgEABQgEgBgDgDgApBBLQgGgDAAgGQAAgEACgDQAEgDAEABIAAgBQADAAADACIACAEIABAEIAAACIgDAFQgDADgDAAIgEgBgAIMgKQgFgBgCgFQgBgEADgEQADgEAFgBQAEABADACIACAEIAAAEIgBADIgBADQgCACgEAAIgCABIgCgBgADVh+QgEgBgBgFQgCgEADgEQADgEAFgBQAEABADACIACAEIABAEIgBADIgCACQgCADgEAAIgCABIgDgBgAmMjJQgFgBgBgFQgCgEADgFQADgDAFgBQAFABACACIACAFIAAADIAAADIgCADQgCACgEAAIgCABIgCgBgArckFQgGgDAAgGQAAgEADgDQAEgDADAAIAAgBQADABADADIADADIABAEIgBADIgDAEQgCADgEAAIgEgBgALWlSQgEgCgCgFQgBgEADgEQACgEAGAAQAEABACACIADAEIAAAEIgBACIgBADQgDADgDAAIgDAAIgCAAg");
	this.shape_31.setTransform(195.95,210.6);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f("#000000").s().p("AjcFvQgFgCgBgFQgCgEADgEQADgEAFgBQAFABACACIACAFIABADIgBADIgCADQgCADgEAAIgCAAIgCAAgAErDlQgFgBgBgFQgCgFADgEQADgDAFgBQAFABACACIACAEIABAEIgBADIgCACQgCADgEAAIgCABIgCgBgAiuCZQgEgEACgGQADgFAFgBIACgBQAEABACACIADAEIAAAFQAAAAAAABQAAAAAAABQAAAAgBAAQAAABAAAAIgCACQgDADgEAAQgEAAgDgDgApJBUQgHgDAAgGQAAgFADgCQAEgDADAAIAAgBQAEABADACIACAEIABAEIgBACIgCAFQgDACgDAAIgEAAgAIDgBQgEgBgCgFQgBgFADgEQADgDAFgBQAEABACACIADAEIAAAEIgBADIgBACQgCADgEAAIgCABIgDgBgADNh1QgEgBgCgFQgBgFADgEQADgDAFgBQAEABACACIADAEIAAAEIgBADIgBACQgCADgEAAIgCABIgDgBgAlCiJQgFgBgBgFQgCgFADgEQADgDAFgBQAFABACACIACAEIABAEIgBADIgCACQgCADgEAAIgCABIgCgBgArkj8QgGgDAAgGQAAgFADgCQADgDAEAAIAAgBQADABADACIACAEIABAEIAAACIgDAFQgCACgEAAIgEAAgALelbQgEgBgCgFQgBgFADgEQADgDAFgBQAEABACACIADAEIAAAEIgBADIgBACQgCADgEAAIgCABIgDgBg");
	this.shape_32.setTransform(196.775,209.725);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f("#000000").s().p("AjcFpQgFgCgBgFQgCgFADgEQADgDAFgBQAFABACACIACAEIABAEIgBADIgCACQgCAEgEAAIgCAAIgCAAgAErDfQgFgCgBgEQgCgFADgEQADgEAFgBQAFACACACIACAEIABAEIgBADIgCACQgCADgEAAIgCAAIgCAAgAh3DbQgEgDACgGQADgGAFgBIACAAQAEABACACIADAEIAAAFQAAAAAAAAQAAABAAAAQAAABgBAAQAAABAAAAIgCABQgDAEgEAAQgEAAgDgEgApJBNQgHgCAAgHQAAgEADgCQAEgEADABIAAgBQAEABADACIACAEIABADIgBADIgCAEQgDADgDAAIgEgBgAIDgHQgEgCgCgFQgBgEADgEQADgEAFAAQAEABACABIADAFIAAAEIgBACIgBADQgCADgEAAIgCAAIgDAAgADNh7QgEgBgCgGQgBgEADgEQADgDAFgBQAEABACABIADAFIAAADIgBADIgBADQgCADgEAAIgCABIgDgBgAjciPQgEgCgCgEQgBgFADgEQADgEAFAAQAEABACACIADAEIAAAEIgBACIgBADQgCADgEAAIgCAAIgDAAgArkkCQgGgEAAgFQAAgFADgDQADgDAEABIAAgBQADAAADADIACAEIABAEIAAACIgDAFQgCACgEAAIgEAAgALelUQgEgCgCgFQgBgFADgEQADgDAFgBQAEABACACIADAEIAAAEIgBADIgBACQgCAEgEAAIgCAAIgDAAg");
	this.shape_33.setTransform(196.775,210.35);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f("#000000").s().p("AjSFpQgFgCgBgFQgCgFADgEQADgDAFgBQAFABACACIACAEIAAAEIAAADIgCACQgCAEgEAAIgCAAIgCAAgAhtDbQgEgDACgGQADgGAFgBIACAAQAEABACACIADAEIAAAFQAAAAAAAAQAAABAAAAQgBABAAAAQAAABAAAAIgCABQgDAEgEAAQgEAAgDgEgAFYDBQgEgBgBgFQgCgEADgEQADgEAFgBQAFABABACIADAFIABADIgBADIgCADQgCACgEAAIgCABIgDgBgApABNQgGgCAAgHQAAgEADgCQADgEAEABIAAgBQADABADACIACAEIABADIAAADIgDAEQgCADgEAAIgEgBgAIug5QgFgBgCgFQgBgFADgEQADgDAFgCQAEABACACIADAFIAAADIgBAEIgBACQgCADgEAAIgCABIgCgBgABahdQgFgBgBgFQgCgFAEgEQADgDAEgCQAFABACACIACAFIABADIgBAEIgCACQgBADgEAAIgDABIgCgBgAjSiPQgEgCgCgEQgCgFADgEQAEgEAFAAQAEABACACIACAEIABAEIgBACIgBADQgDADgEAAIgCAAIgCAAgArtjoQgHgDAAgGQAAgEADgDQADgDAEABIAAgBQAEAAADACIABAEIABAEIAAACIgCAFQgDADgEAAIgDgBgALolUQgEgCgCgFQgCgFADgEQADgDAFgBQAFABACACIACAEIABAEIgBADIgBACQgDAEgEAAIgCAAIgCAAg");
	this.shape_34.setTransform(195.8,210.35);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f("#000000").s().p("AjSFpQgFgCgBgFQgCgFADgEQADgDAFgBQAFABACACIACAEIAAAEIAAADIgCACQgCAEgEAAIgCAAIgCAAgAhtDbQgEgDACgGQADgGAFgBIACAAQAEABACACIADAEIAAAFQAAAAAAAAQAAABAAAAQgBABAAAAQAAABAAAAIgCABQgDAEgEAAQgEAAgDgEgAFYDBQgEgBgBgFQgCgEADgEQADgEAFgBQAFABABACIADAFIABADIgBADIgCADQgCACgEAAIgCABIgDgBgApABNQgGgCAAgHQAAgEADgCQADgEAEABIAAgBQADABADACIACAEIABADIAAADIgDAEQgCADgEAAIgEgBgAIug5QgFgBgCgFQgBgFADgEQADgDAFgCQAEABACACIADAFIAAADIgBAEIgBACQgCADgEAAIgCABIgCgBgABahdQgFgBgBgFQgCgFAEgEQADgDAEgCQAFABACACIACAFIABADIgBAEIgCACQgBADgEAAIgDABIgCgBgAjyhlQgEgBgCgFQgBgFADgEQADgEAFgBQAEABACADIADAEIABADIgCAEIgBACQgCADgEAAIgCABIgDgBgArtjMQgHgEAAgFQAAgFADgDQADgDAEABIAAgBQAEAAADADIABAEIABAEIAAACIgCAFQgDACgEAAIgDAAgALolUQgEgCgCgFQgCgFADgEQADgDAFgBQAFABACACIACAEIABAEIgBADIgBACQgDAEgEAAIgCAAIgCAAg");
	this.shape_35.setTransform(195.8,210.35);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f("#000000").s().p("AjSFpQgFgCgBgFQgCgFADgEQADgDAFgBQAFABACACIACAEIAAAEIAAADIgCACQgCAEgEAAIgCAAIgCAAgAhtDbQgEgDACgGQADgGAFgBIACAAQAEABACACIADAEIAAAFQAAAAAAAAQAAABAAAAQgBABAAAAQAAABAAAAIgCABQgDAEgEAAQgEAAgDgEgAFYDBQgEgBgBgFQgCgEADgEQADgEAFgBQAFABABACIADAFIABADIgBADIgCADQgCACgEAAIgCABIgDgBgAoiCAQgGgEAAgFQAAgFADgDQAEgDADABIAAgBQADAAADADIADAEIABAEIgBACIgDAFQgCACgEAAIgEAAgAIug5QgFgBgCgFQgBgFADgEQADgDAFgCQAEABACACIADAFIAAADIgBAEIgBACQgCADgEAAIgCABIgCgBgABahdQgFgBgBgFQgCgFAEgEQADgDAEgCQAFABACACIACAFIABADIgBAEIgCACQgBADgEAAIgDABIgCgBgAjyhlQgEgBgCgFQgBgFADgEQADgEAFgBQAEABACADIADAEIABADIgCAEIgBACQgCADgEAAIgCABIgDgBgArtjMQgHgEAAgFQAAgFADgDQADgDAEABIAAgBQAEAAADADIABAEIABAEIAAACIgCAFQgDACgEAAIgDAAgALolUQgEgCgCgFQgCgFADgEQADgDAFgBQAFABACACIACAEIABAEIgBADIgBACQgDAEgEAAIgCAAIgCAAg");
	this.shape_36.setTransform(195.8,210.35);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f("#000000").s().p("AjSFpQgFgCgBgFQgCgFADgEQADgDAFgBQAFABACACIACAEIAAAEIAAADIgCACQgCAEgEAAIgCAAIgCAAgAhtDbQgEgDACgGQADgGAFgBIACAAQAEABACACIADAEIAAAFQAAAAAAAAQAAABAAAAQgBABAAAAQAAABAAAAIgCABQgDAEgEAAQgEAAgDgEgAFYDBQgEgBgBgFQgCgEADgEQADgEAFgBQAFABABACIADAFIABADIgBADIgCADQgCACgEAAIgCABIgDgBgAoiCAQgGgEAAgFQAAgFADgDQAEgDADABIAAgBQADAAADADIADAEIABAEIgBACIgDAFQgCACgEAAIgEAAgAIug5QgFgBgCgFQgBgFADgEQADgDAFgCQAEABACACIADAFIAAADIgBAEIgBACQgCADgEAAIgCABIgCgBgAkchNQgEgCgCgFQgBgEADgEQACgDAGgBQAEABACABIADAFIAAADIgBADIgBADQgDADgDAAIgDABIgCgBgABahdQgFgBgBgFQgCgFAEgEQADgDAEgCQAFABACACIACAFIABADIgBAEIgCACQgBADgEAAIgDABIgCgBgArtjMQgHgEAAgFQAAgFADgDQADgDAEABIAAgBQAEAAADADIABAEIABAEIAAACIgCAFQgDACgEAAIgDAAgALolUQgEgCgCgFQgCgFADgEQADgDAFgBQAFABACACIACAEIABAEIgBADIgBACQgDAEgEAAIgCAAIgCAAg");
	this.shape_37.setTransform(195.8,210.35);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_23}]},138).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_27},{t:this.shape_26}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},2).to({state:[]},59).to({state:[]},171).wait(68));

	// Mouths___All
	this.instance_38 = new lib.Tween174("synched",0);
	this.instance_38.setTransform(190.1,203.3);

	this.instance_39 = new lib.Tween175("synched",0);
	this.instance_39.setTransform(190.6,202.7);
	this.instance_39._off = true;

	this.instance_40 = new lib.Tween176("synched",0);
	this.instance_40.setTransform(181,205.55);
	this.instance_40._off = true;

	this.instance_41 = new lib.Tween177("synched",0);
	this.instance_41.setTransform(190.6,202.7);
	this.instance_41._off = true;

	this.instance_42 = new lib.Tween178("synched",0);
	this.instance_42.setTransform(190.45,203.85);
	this.instance_42._off = true;

	this.instance_43 = new lib.Tween179("synched",0);
	this.instance_43.setTransform(190.5,202.95);
	this.instance_43._off = true;

	this.instance_44 = new lib.Tween180("synched",0);
	this.instance_44.setTransform(188.75,202.05);
	this.instance_44._off = true;

	this.instance_45 = new lib.Tween181("synched",0);
	this.instance_45.setTransform(189.45,202.4);
	this.instance_45._off = true;

	this.instance_46 = new lib.Tween182("synched",0);
	this.instance_46.setTransform(190.3,202.75);
	this.instance_46._off = true;

	this.instance_47 = new lib.Tween183("synched",0);
	this.instance_47.setTransform(189.5,202.25);
	this.instance_47._off = true;

	this.instance_48 = new lib.Tween184("synched",0);
	this.instance_48.setTransform(189.7,202.65);
	this.instance_48._off = true;

	this.instance_49 = new lib.Tween185("synched",0);
	this.instance_49.setTransform(190.35,202.95);
	this.instance_49._off = true;

	this.instance_50 = new lib.Tween186("synched",0);
	this.instance_50.setTransform(189,202.8);
	this.instance_50._off = true;

	this.instance_51 = new lib.Tween187("synched",0);
	this.instance_51.setTransform(190.3,202.2);
	this.instance_51._off = true;

	this.instance_52 = new lib.Tween188("synched",0);
	this.instance_52.setTransform(190.35,202.95);
	this.instance_52._off = true;

	this.instance_53 = new lib.Tween189("synched",0);
	this.instance_53.setTransform(190.1,203.3);
	this.instance_53._off = true;

	this.instance_54 = new lib.Tween190("synched",0);
	this.instance_54.setTransform(190.6,202.7);
	this.instance_54._off = true;

	this.instance_55 = new lib.Tween191("synched",0);
	this.instance_55.setTransform(181,205.55);
	this.instance_55._off = true;

	this.instance_56 = new lib.Tween192("synched",0);
	this.instance_56.setTransform(190.6,202.7);
	this.instance_56._off = true;

	this.instance_57 = new lib.Tween193("synched",0);
	this.instance_57.setTransform(190.45,203.85);
	this.instance_57._off = true;

	this.instance_58 = new lib.Tween194("synched",0);
	this.instance_58.setTransform(190.5,202.95);
	this.instance_58._off = true;

	this.instance_59 = new lib.Tween195("synched",0);
	this.instance_59.setTransform(188.75,202.05);
	this.instance_59._off = true;

	this.instance_60 = new lib.Tween196("synched",0);
	this.instance_60.setTransform(189.45,202.4);
	this.instance_60._off = true;

	this.instance_61 = new lib.Tween197("synched",0);
	this.instance_61.setTransform(190.3,202.75);
	this.instance_61._off = true;

	this.instance_62 = new lib.Tween198("synched",0);
	this.instance_62.setTransform(189.5,202.25);
	this.instance_62._off = true;

	this.instance_63 = new lib.Tween199("synched",0);
	this.instance_63.setTransform(189.7,202.65);
	this.instance_63._off = true;

	this.instance_64 = new lib.Tween200("synched",0);
	this.instance_64.setTransform(190.35,202.95);
	this.instance_64._off = true;

	this.instance_65 = new lib.Tween201("synched",0);
	this.instance_65.setTransform(190.1,203.3);
	this.instance_65._off = true;

	this.instance_66 = new lib.Tween202("synched",0);
	this.instance_66.setTransform(190.6,202.7);
	this.instance_66._off = true;

	this.instance_67 = new lib.Tween203("synched",0);
	this.instance_67.setTransform(181,205.55);
	this.instance_67._off = true;

	this.instance_68 = new lib.Tween204("synched",0);
	this.instance_68.setTransform(190.6,202.7);
	this.instance_68._off = true;

	this.instance_69 = new lib.Tween205("synched",0);
	this.instance_69.setTransform(190.45,203.85);
	this.instance_69._off = true;

	this.instance_70 = new lib.Tween206("synched",0);
	this.instance_70.setTransform(181.75,202.95);
	this.instance_70._off = true;

	this.instance_71 = new lib.Tween207("synched",0);
	this.instance_71.setTransform(188.75,202.05);
	this.instance_71._off = true;

	this.instance_72 = new lib.Tween208("synched",0);
	this.instance_72.setTransform(189.45,202.4);
	this.instance_72._off = true;

	this.instance_73 = new lib.Tween209("synched",0);
	this.instance_73.setTransform(190.3,202.75);
	this.instance_73._off = true;

	this.instance_74 = new lib.Tween210("synched",0);
	this.instance_74.setTransform(189.5,202.25);
	this.instance_74._off = true;

	this.instance_75 = new lib.Tween211("synched",0);
	this.instance_75.setTransform(189.7,202.65);
	this.instance_75._off = true;

	this.instance_76 = new lib.Tween212("synched",0);
	this.instance_76.setTransform(190.35,202.95);
	this.instance_76._off = true;

	this.instance_77 = new lib.Tween213("synched",0);
	this.instance_77.setTransform(189,202.8);
	this.instance_77._off = true;

	this.instance_78 = new lib.Tween214("synched",0);
	this.instance_78.setTransform(190.3,202.2);
	this.instance_78._off = true;

	this.instance_79 = new lib.Tween215("synched",0);
	this.instance_79.setTransform(190.35,202.95);
	this.instance_79._off = true;

	this.instance_80 = new lib.Tween216("synched",0);
	this.instance_80.setTransform(190.1,203.3);
	this.instance_80._off = true;

	this.instance_81 = new lib.Tween217("synched",0);
	this.instance_81.setTransform(190.6,202.7);
	this.instance_81._off = true;

	this.instance_82 = new lib.Tween218("synched",0);
	this.instance_82.setTransform(181,205.55);
	this.instance_82._off = true;

	this.instance_83 = new lib.Tween219("synched",0);
	this.instance_83.setTransform(190.6,202.7);
	this.instance_83._off = true;

	this.instance_84 = new lib.Tween220("synched",0);
	this.instance_84.setTransform(190.45,203.85);
	this.instance_84._off = true;

	this.instance_85 = new lib.Tween221("synched",0);
	this.instance_85.setTransform(190.5,202.95);
	this.instance_85._off = true;

	this.instance_86 = new lib.Tween222("synched",0);
	this.instance_86.setTransform(188.75,202.05);
	this.instance_86._off = true;

	this.instance_87 = new lib.Tween223("synched",0);
	this.instance_87.setTransform(190.55,201.9);
	this.instance_87._off = true;

	this.instance_88 = new lib.Tween224("synched",0);
	this.instance_88.setTransform(189.65,202.15);
	this.instance_88._off = true;

	this.instance_89 = new lib.Tween225("synched",0);
	this.instance_89.setTransform(189.5,202.75);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f("#000000").s().p("AjMEZIgFgBQgDgCgBgCQADgFAJAAQAKgBAFADQABABAAAAQABAAAAABQABAAAAABQAAAAAAABQAAAAAAABQgBAAAAABQgBAAAAAAQgBABgBAAQgFACgGAAIgGgBgAEAERQgFgBgBgEQADgEAJAAQAJgBAGACQADACAAACQAAABAAAAQgBABAAAAQgBAAAAABQgBAAgBAAQgEADgGAAQgEAAgGgCgAHpCgQgFgBgBgDQADgDAEgBIAHgBIABAAQAIABADABQAEABAAADIgCACQgEADgJAAQgFAAgEgCgAnMCaQgGgCAAgDQADgEAIAAQAKgBAFADQABAAABABQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAABQgBAAAAABQAAAAgBAAQgBABgBAAQgEACgFAAIgKgCgAqjirQgGgBAAgEQADgEAJAAQAJgBAFACQADACAAACQAAABAAAAQAAABgBAAQAAAAgBABQAAAAgBAAQgFADgFAAQgFAAgFgCgAKSjBQgFgCAAgCQACgDAFgBIAFgBQAJAAAEACIADACIABADIgCACQgFACgFAAQgGAAgGgCgAGpjJQgEgBAAgDQACgDADgBIAHgBQAKgBAFADQABAAABABQAAAAABABQAAAAAAABQAAAAAAABIgCACQgCACgJABQgJAAgEgCgAnIkQQgDgBgBgDQADgFAIAAQAKgBAFADQABABABAAQAAABAAAAQABAAAAABQAAAAAAABQAAAAAAABQAAABAAAAQgBAAAAABQgBAAgBAAIgGABIgFABQgHAAgEgCg");
	this.shape_38.setTransform(189.5083,202.7625);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f("#000000").s().p("AEAEVQgCgBASgIIAFABQADACAAACQAAABAAAAQgBAAAAABQgBAAAAAAQgBABgBAAQgEACgGAAQgEAAgGgBgAHpCkQgFgBgBgDQADgDAEgBIAHgBIABAAQAIABADABQAEABAAADIgCACQgEADgJAAQgFAAgEgCgAnMCeQgGgCAAgDQADgEAIAAQAKgBAFADQABAAABABQAAAAABABQAAAAAAABQAAAAAAABQAAAAAAAAQgBABAAAAQAAABgBAAQgBAAgBABQgEABgFAAIgKgBgAqjinQgGgBAAgEQADgEAJAAQAJgBAFACQADACAAACQAAABAAAAQAAAAgBABQAAAAgBAAQAAABgBAAQgFACgFAAQgFAAgFgBgAKSi9QgFgCAAgCQACgDAFgBIAFgBQAJAAAEACIADACIABADIgCACQgFACgFAAQgGAAgGgCgAGpjFQgEgBAAgDQACgDADgBIAHgBQAKgBAFADQABAAABABQAAAAABABQAAAAAAABQAAAAAAABIgCACQgCACgJABQgJAAgEgCgAnIkMQgDgBgBgDQADgFAIAAQAKgBAFADQABAAABABQAAAAAAABQABAAAAABQAAAAAAABQAAAAAAABQAAAAAAABQgBAAAAAAQgBABgBAAIgGABIgFAAQgHAAgEgBg");
	this.shape_39.setTransform(189.5083,202.3942);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_38}]}).to({state:[{t:this.instance_39}]},1).to({state:[{t:this.instance_40}]},1).to({state:[{t:this.instance_41}]},1).to({state:[{t:this.instance_42}]},1).to({state:[{t:this.instance_43}]},1).to({state:[{t:this.instance_44}]},1).to({state:[{t:this.instance_45}]},1).to({state:[{t:this.instance_46}]},1).to({state:[{t:this.instance_47}]},1).to({state:[{t:this.instance_48}]},1).to({state:[{t:this.instance_49}]},1).to({state:[{t:this.instance_50}]},1).to({state:[{t:this.instance_51}]},1).to({state:[{t:this.instance_52}]},1).to({state:[{t:this.instance_53}]},1).to({state:[{t:this.instance_54}]},1).to({state:[{t:this.instance_55}]},1).to({state:[{t:this.instance_56}]},1).to({state:[{t:this.instance_57}]},1).to({state:[{t:this.instance_58}]},1).to({state:[{t:this.instance_59}]},1).to({state:[{t:this.instance_60}]},1).to({state:[{t:this.instance_61}]},1).to({state:[{t:this.instance_62}]},1).to({state:[{t:this.instance_63}]},1).to({state:[{t:this.instance_64}]},1).to({state:[{t:this.instance_65}]},1).to({state:[{t:this.instance_66}]},1).to({state:[{t:this.instance_67}]},1).to({state:[{t:this.instance_68}]},1).to({state:[{t:this.instance_69}]},1).to({state:[{t:this.instance_70}]},1).to({state:[{t:this.instance_71}]},1).to({state:[{t:this.instance_72}]},1).to({state:[{t:this.instance_73}]},1).to({state:[{t:this.instance_74}]},1).to({state:[{t:this.instance_75}]},1).to({state:[{t:this.instance_76}]},1).to({state:[{t:this.instance_77}]},1).to({state:[{t:this.instance_78}]},1).to({state:[{t:this.instance_79}]},1).to({state:[{t:this.instance_80}]},1).to({state:[{t:this.instance_81}]},1).to({state:[{t:this.instance_82}]},1).to({state:[{t:this.instance_83}]},1).to({state:[{t:this.instance_84}]},1).to({state:[{t:this.instance_85}]},1).to({state:[{t:this.instance_86}]},1).to({state:[{t:this.instance_87}]},1).to({state:[{t:this.instance_88}]},1).to({state:[{t:this.instance_89}]},1).to({state:[{t:this.shape_38}]},4).to({state:[{t:this.shape_38}]},22).to({state:[{t:this.shape_38}]},22).to({state:[{t:this.shape_39}]},40).to({state:[]},1).wait(310));
	this.timeline.addTween(cjs.Tween.get(this.instance_38).to({_off:true,x:190.6,y:202.7},1).wait(449));
	this.timeline.addTween(cjs.Tween.get(this.instance_39).to({_off:false},1).to({_off:true,x:181,y:205.55},1).wait(448));
	this.timeline.addTween(cjs.Tween.get(this.instance_40).wait(1).to({_off:false},1).to({_off:true,x:190.6,y:202.7},1).wait(447));
	this.timeline.addTween(cjs.Tween.get(this.instance_41).wait(2).to({_off:false},1).to({_off:true,x:190.45,y:203.85},1).wait(446));
	this.timeline.addTween(cjs.Tween.get(this.instance_42).wait(3).to({_off:false},1).to({_off:true,x:190.5,y:202.95},1).wait(445));
	this.timeline.addTween(cjs.Tween.get(this.instance_43).wait(4).to({_off:false},1).to({_off:true,x:188.75,y:202.05},1).wait(444));
	this.timeline.addTween(cjs.Tween.get(this.instance_44).wait(5).to({_off:false},1).to({_off:true,x:189.45,y:202.4},1).wait(443));
	this.timeline.addTween(cjs.Tween.get(this.instance_45).wait(6).to({_off:false},1).to({_off:true,x:190.3,y:202.75},1).wait(442));
	this.timeline.addTween(cjs.Tween.get(this.instance_46).wait(7).to({_off:false},1).to({_off:true,x:189.5,y:202.25},1).wait(441));
	this.timeline.addTween(cjs.Tween.get(this.instance_47).wait(8).to({_off:false},1).to({_off:true,x:189.7,y:202.65},1).wait(440));
	this.timeline.addTween(cjs.Tween.get(this.instance_48).wait(9).to({_off:false},1).to({_off:true,x:190.35,y:202.95},1).wait(439));
	this.timeline.addTween(cjs.Tween.get(this.instance_49).wait(10).to({_off:false},1).to({_off:true,x:189,y:202.8},1).wait(438));
	this.timeline.addTween(cjs.Tween.get(this.instance_50).wait(11).to({_off:false},1).to({_off:true,x:190.3,y:202.2},1).wait(437));
	this.timeline.addTween(cjs.Tween.get(this.instance_51).wait(12).to({_off:false},1).to({_off:true,x:190.35,y:202.95},1).wait(436));
	this.timeline.addTween(cjs.Tween.get(this.instance_52).wait(13).to({_off:false},1).to({_off:true,x:190.1,y:203.3},1).wait(435));
	this.timeline.addTween(cjs.Tween.get(this.instance_53).wait(14).to({_off:false},1).to({_off:true,x:190.6,y:202.7},1).wait(434));
	this.timeline.addTween(cjs.Tween.get(this.instance_54).wait(15).to({_off:false},1).to({_off:true,x:181,y:205.55},1).wait(433));
	this.timeline.addTween(cjs.Tween.get(this.instance_55).wait(16).to({_off:false},1).to({_off:true,x:190.6,y:202.7},1).wait(432));
	this.timeline.addTween(cjs.Tween.get(this.instance_56).wait(17).to({_off:false},1).to({_off:true,x:190.45,y:203.85},1).wait(431));
	this.timeline.addTween(cjs.Tween.get(this.instance_57).wait(18).to({_off:false},1).to({_off:true,x:190.5,y:202.95},1).wait(430));
	this.timeline.addTween(cjs.Tween.get(this.instance_58).wait(19).to({_off:false},1).to({_off:true,x:188.75,y:202.05},1).wait(429));
	this.timeline.addTween(cjs.Tween.get(this.instance_59).wait(20).to({_off:false},1).to({_off:true,x:189.45,y:202.4},1).wait(428));
	this.timeline.addTween(cjs.Tween.get(this.instance_60).wait(21).to({_off:false},1).to({_off:true,x:190.3,y:202.75},1).wait(427));
	this.timeline.addTween(cjs.Tween.get(this.instance_61).wait(22).to({_off:false},1).to({_off:true,x:189.5,y:202.25},1).wait(426));
	this.timeline.addTween(cjs.Tween.get(this.instance_62).wait(23).to({_off:false},1).to({_off:true,x:189.7,y:202.65},1).wait(425));
	this.timeline.addTween(cjs.Tween.get(this.instance_63).wait(24).to({_off:false},1).to({_off:true,x:190.35,y:202.95},1).wait(424));
	this.timeline.addTween(cjs.Tween.get(this.instance_64).wait(25).to({_off:false},1).to({_off:true,x:190.1,y:203.3},1).wait(423));
	this.timeline.addTween(cjs.Tween.get(this.instance_65).wait(26).to({_off:false},1).to({_off:true,x:190.6,y:202.7},1).wait(422));
	this.timeline.addTween(cjs.Tween.get(this.instance_66).wait(27).to({_off:false},1).to({_off:true,x:181,y:205.55},1).wait(421));
	this.timeline.addTween(cjs.Tween.get(this.instance_67).wait(28).to({_off:false},1).to({_off:true,x:190.6,y:202.7},1).wait(420));
	this.timeline.addTween(cjs.Tween.get(this.instance_68).wait(29).to({_off:false},1).to({_off:true,x:190.45,y:203.85},1).wait(419));
	this.timeline.addTween(cjs.Tween.get(this.instance_69).wait(30).to({_off:false},1).to({_off:true,x:181.75,y:202.95},1).wait(418));
	this.timeline.addTween(cjs.Tween.get(this.instance_70).wait(31).to({_off:false},1).to({_off:true,x:188.75,y:202.05},1).wait(417));
	this.timeline.addTween(cjs.Tween.get(this.instance_71).wait(32).to({_off:false},1).to({_off:true,x:189.45,y:202.4},1).wait(416));
	this.timeline.addTween(cjs.Tween.get(this.instance_72).wait(33).to({_off:false},1).to({_off:true,x:190.3,y:202.75},1).wait(415));
	this.timeline.addTween(cjs.Tween.get(this.instance_73).wait(34).to({_off:false},1).to({_off:true,x:189.5,y:202.25},1).wait(414));
	this.timeline.addTween(cjs.Tween.get(this.instance_74).wait(35).to({_off:false},1).to({_off:true,x:189.7,y:202.65},1).wait(413));
	this.timeline.addTween(cjs.Tween.get(this.instance_75).wait(36).to({_off:false},1).to({_off:true,x:190.35,y:202.95},1).wait(412));
	this.timeline.addTween(cjs.Tween.get(this.instance_76).wait(37).to({_off:false},1).to({_off:true,x:189,y:202.8},1).wait(411));
	this.timeline.addTween(cjs.Tween.get(this.instance_77).wait(38).to({_off:false},1).to({_off:true,x:190.3,y:202.2},1).wait(410));
	this.timeline.addTween(cjs.Tween.get(this.instance_78).wait(39).to({_off:false},1).to({_off:true,x:190.35,y:202.95},1).wait(409));
	this.timeline.addTween(cjs.Tween.get(this.instance_79).wait(40).to({_off:false},1).to({_off:true,x:190.1,y:203.3},1).wait(408));
	this.timeline.addTween(cjs.Tween.get(this.instance_80).wait(41).to({_off:false},1).to({_off:true,x:190.6,y:202.7},1).wait(407));
	this.timeline.addTween(cjs.Tween.get(this.instance_81).wait(42).to({_off:false},1).to({_off:true,x:181,y:205.55},1).wait(406));
	this.timeline.addTween(cjs.Tween.get(this.instance_82).wait(43).to({_off:false},1).to({_off:true,x:190.6,y:202.7},1).wait(405));
	this.timeline.addTween(cjs.Tween.get(this.instance_83).wait(44).to({_off:false},1).to({_off:true,x:190.45,y:203.85},1).wait(404));
	this.timeline.addTween(cjs.Tween.get(this.instance_84).wait(45).to({_off:false},1).to({_off:true,x:190.5,y:202.95},1).wait(403));
	this.timeline.addTween(cjs.Tween.get(this.instance_85).wait(46).to({_off:false},1).to({_off:true,x:188.75,y:202.05},1).wait(402));
	this.timeline.addTween(cjs.Tween.get(this.instance_86).wait(47).to({_off:false},1).to({_off:true,x:190.55,y:201.9},1).wait(401));
	this.timeline.addTween(cjs.Tween.get(this.instance_87).wait(48).to({_off:false},1).to({_off:true,x:189.65,y:202.15},1).wait(400));
	this.timeline.addTween(cjs.Tween.get(this.instance_88).wait(49).to({_off:false},1).to({_off:true,x:189.5,y:202.75},1).wait(399));

	// ER
	this.instance_90 = new lib.Tween20("synched",0);
	this.instance_90.setTransform(176.4,225.35,0.9999,0.9999,-9.2691,0,0,0.2,0.1);

	this.instance_91 = new lib.Tween20("synched",0);
	this.instance_91.setTransform(176.4,225.35,0.9999,0.9999,-9.2691,0,0,0.2,0.1);

	this.instance_92 = new lib.Tween18("synched",0);
	this.instance_92.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_93 = new lib.Tween22("synched",0);
	this.instance_93.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_94 = new lib.Tween24("synched",0);
	this.instance_94.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_95 = new lib.Tween26("synched",0);
	this.instance_95.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_96 = new lib.Tween36("synched",0);
	this.instance_96.setTransform(182.05,225.45,0.9999,0.9999,-9.2691,0,0,0.3,0.1);

	this.instance_97 = new lib.Tween18("synched",0);
	this.instance_97.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_98 = new lib.Tween22("synched",0);
	this.instance_98.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_99 = new lib.Tween24("synched",0);
	this.instance_99.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_100 = new lib.Tween26("synched",0);
	this.instance_100.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_101 = new lib.Tween36("synched",0);
	this.instance_101.setTransform(182.05,225.45,0.9999,0.9999,-9.2691,0,0,0.3,0.1);

	this.instance_102 = new lib.Tween20("synched",0);
	this.instance_102.setTransform(176.4,225.35,0.9999,0.9999,-9.2691,0,0,0.2,0.1);

	this.instance_103 = new lib.Tween18("synched",0);
	this.instance_103.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_104 = new lib.Tween22("synched",0);
	this.instance_104.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_105 = new lib.Tween24("synched",0);
	this.instance_105.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_106 = new lib.Tween26("synched",0);
	this.instance_106.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_107 = new lib.Tween36("synched",0);
	this.instance_107.setTransform(182.05,225.45,0.9999,0.9999,-9.2691,0,0,0.3,0.1);

	this.instance_108 = new lib.Tween20("synched",0);
	this.instance_108.setTransform(176.4,225.35,0.9999,0.9999,-9.2691,0,0,0.2,0.1);

	this.instance_109 = new lib.Tween18("synched",0);
	this.instance_109.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_110 = new lib.Tween22("synched",0);
	this.instance_110.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_111 = new lib.Tween24("synched",0);
	this.instance_111.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_112 = new lib.Tween26("synched",0);
	this.instance_112.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_113 = new lib.Tween36("synched",0);
	this.instance_113.setTransform(182.05,225.45,0.9999,0.9999,-9.2691,0,0,0.3,0.1);

	this.instance_114 = new lib.Tween228("synched",0);
	this.instance_114.setTransform(178.65,226);
	this.instance_114._off = true;

	this.instance_115 = new lib.Tween229("synched",0);
	this.instance_115.setTransform(178.65,226.05);
	this.instance_115._off = true;

	this.instance_116 = new lib.Tween173("synched",0);
	this.instance_116.setTransform(178.65,227.45);
	this.instance_116._off = true;

	this.instance_117 = new lib.Tween173("synched",0);
	this.instance_117.setTransform(178.65,227.45);

	this.instance_118 = new lib.Tween230("synched",0);
	this.instance_118.setTransform(178.65,227.45);

	this.instance_119 = new lib.Tween173("synched",0);
	this.instance_119.setTransform(179.05,228.6,1,1,6.7611,0,0,0.1,0.2);

	this.instance_120 = new lib.Tween173("synched",0);
	this.instance_120.setTransform(179.05,228.6,1,1,6.7611,0,0,0.1,0.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_91,p:{x:176.4,y:225.35}},{t:this.instance_90,p:{x:176.4,y:225.35}}]},148).to({state:[{t:this.instance_113},{t:this.instance_112},{t:this.instance_111},{t:this.instance_110},{t:this.instance_109},{t:this.instance_108},{t:this.instance_107},{t:this.instance_106},{t:this.instance_105},{t:this.instance_104},{t:this.instance_103},{t:this.instance_102},{t:this.instance_101,p:{x:182.05,y:225.45}},{t:this.instance_100,p:{x:175.7,y:226.8}},{t:this.instance_99,p:{x:175.7,y:226.8}},{t:this.instance_98,p:{x:175.7,y:226.8}},{t:this.instance_97,p:{x:175.7,y:226.8}},{t:this.instance_91,p:{x:176.4,y:225.35}},{t:this.instance_96,p:{x:182.05,y:225.45}},{t:this.instance_95,p:{x:175.7,y:226.8}},{t:this.instance_94,p:{x:175.7,y:226.8}},{t:this.instance_93,p:{x:175.7,y:226.8}},{t:this.instance_92,p:{x:175.7,y:226.8}},{t:this.instance_90,p:{x:176.4,y:225.35}}]},7).to({state:[{t:this.instance_114}]},141).to({state:[{t:this.instance_115}]},5).to({state:[{t:this.instance_117,p:{regX:0,regY:0,rotation:0,x:178.65,y:227.45}},{t:this.instance_116}]},3).to({state:[{t:this.instance_118}]},6).to({state:[{t:this.instance_116}]},2).to({state:[{t:this.instance_116}]},1).to({state:[{t:this.instance_116}]},1).to({state:[{t:this.instance_116}]},1).to({state:[{t:this.instance_116}]},1).to({state:[{t:this.instance_117,p:{regX:0.1,regY:0.2,rotation:6.7611,x:179.05,y:228.6}},{t:this.instance_116}]},1).to({state:[{t:this.instance_120},{t:this.instance_119},{t:this.instance_117,p:{regX:0.1,regY:0.2,rotation:6.7611,x:179.05,y:228.6}},{t:this.instance_116}]},4).to({state:[{t:this.instance_117,p:{regX:0,regY:0,rotation:0,x:175.3,y:227.15}},{t:this.instance_116}]},12).to({state:[{t:this.instance_117,p:{regX:0,regY:0,rotation:0,x:175.3,y:227.15}},{t:this.instance_116}]},1).to({state:[{t:this.instance_117,p:{regX:0,regY:0,rotation:0,x:175.3,y:227.15}},{t:this.instance_116}]},1).to({state:[{t:this.instance_101,p:{x:182.05,y:225.45}},{t:this.instance_100,p:{x:175.7,y:226.8}},{t:this.instance_99,p:{x:175.7,y:226.8}},{t:this.instance_98,p:{x:175.7,y:226.8}},{t:this.instance_97,p:{x:175.7,y:226.8}},{t:this.instance_91,p:{x:176.4,y:225.35}},{t:this.instance_96,p:{x:182.05,y:225.45}},{t:this.instance_95,p:{x:175.7,y:226.8}},{t:this.instance_94,p:{x:175.7,y:226.8}},{t:this.instance_93,p:{x:175.7,y:226.8}},{t:this.instance_92,p:{x:175.7,y:226.8}},{t:this.instance_90,p:{x:176.4,y:225.35}}]},8).to({state:[{t:this.instance_113},{t:this.instance_112},{t:this.instance_111},{t:this.instance_110},{t:this.instance_109},{t:this.instance_108},{t:this.instance_107},{t:this.instance_106},{t:this.instance_105},{t:this.instance_104},{t:this.instance_103},{t:this.instance_102},{t:this.instance_101,p:{x:182.05,y:225.45}},{t:this.instance_100,p:{x:175.7,y:226.8}},{t:this.instance_99,p:{x:175.7,y:226.8}},{t:this.instance_98,p:{x:175.7,y:226.8}},{t:this.instance_97,p:{x:175.7,y:226.8}},{t:this.instance_91,p:{x:176.4,y:225.35}},{t:this.instance_96,p:{x:182.05,y:225.45}},{t:this.instance_95,p:{x:175.7,y:226.8}},{t:this.instance_94,p:{x:175.7,y:226.8}},{t:this.instance_93,p:{x:175.7,y:226.8}},{t:this.instance_92,p:{x:175.7,y:226.8}},{t:this.instance_90,p:{x:176.4,y:225.35}}]},1).to({state:[{t:this.instance_101,p:{x:182.05,y:225.45}},{t:this.instance_100,p:{x:175.7,y:226.8}},{t:this.instance_99,p:{x:175.7,y:226.8}},{t:this.instance_98,p:{x:175.7,y:226.8}},{t:this.instance_97,p:{x:175.7,y:226.8}},{t:this.instance_91,p:{x:176.4,y:225.35}},{t:this.instance_96,p:{x:182.05,y:225.45}},{t:this.instance_95,p:{x:175.7,y:226.8}},{t:this.instance_94,p:{x:175.7,y:226.8}},{t:this.instance_93,p:{x:175.7,y:226.8}},{t:this.instance_92,p:{x:175.7,y:226.8}},{t:this.instance_90,p:{x:176.4,y:225.35}}]},24).to({state:[{t:this.instance_101,p:{x:182.05,y:225.45}},{t:this.instance_100,p:{x:175.7,y:226.8}},{t:this.instance_99,p:{x:175.7,y:226.8}},{t:this.instance_98,p:{x:175.7,y:226.8}},{t:this.instance_97,p:{x:175.7,y:226.8}},{t:this.instance_91,p:{x:176.4,y:225.35}},{t:this.instance_96,p:{x:182.05,y:225.45}},{t:this.instance_95,p:{x:175.7,y:226.8}},{t:this.instance_94,p:{x:175.7,y:226.8}},{t:this.instance_93,p:{x:175.7,y:226.8}},{t:this.instance_92,p:{x:175.7,y:226.8}},{t:this.instance_90,p:{x:176.4,y:225.35}}]},13).to({state:[{t:this.instance_113},{t:this.instance_112},{t:this.instance_111},{t:this.instance_110},{t:this.instance_109},{t:this.instance_108},{t:this.instance_107},{t:this.instance_106},{t:this.instance_105},{t:this.instance_104},{t:this.instance_103},{t:this.instance_102},{t:this.instance_101,p:{x:181.9,y:225.4}},{t:this.instance_100,p:{x:175.55,y:226.75}},{t:this.instance_99,p:{x:175.55,y:226.75}},{t:this.instance_98,p:{x:175.55,y:226.75}},{t:this.instance_97,p:{x:175.55,y:226.75}},{t:this.instance_91,p:{x:176.25,y:225.3}},{t:this.instance_96,p:{x:181.9,y:225.4}},{t:this.instance_95,p:{x:175.55,y:226.75}},{t:this.instance_94,p:{x:175.55,y:226.75}},{t:this.instance_93,p:{x:175.55,y:226.75}},{t:this.instance_92,p:{x:175.55,y:226.75}},{t:this.instance_90,p:{x:176.25,y:225.3}}]},68).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.instance_114).wait(296).to({_off:false},0).to({_off:true,y:226.05},5).wait(149));
	this.timeline.addTween(cjs.Tween.get(this.instance_115).wait(296).to({_off:false},5).to({_off:true,y:227.45},3).wait(146));
	this.timeline.addTween(cjs.Tween.get(this.instance_116).wait(301).to({_off:false},3).to({_off:true},6).wait(2).to({_off:false,regX:0.1,regY:0.1,rotation:29.9984,x:178.7,y:227.55},0).wait(1).to({rotation:14.9994,x:178.45,y:231.6},0).wait(1).to({rotation:29.9973,x:178.5},0).wait(1).to({rotation:21.7607,x:178.45,y:225.2},0).wait(1).to({regY:0.2,rotation:6.7611,y:225.3},0).wait(1).to({rotation:6.7611,x:179.05,y:228.6},0).wait(4).to({startPosition:0},0).wait(12).to({regX:0,regY:0,rotation:0,x:175.3,y:227.15},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).to({_off:true},8).wait(107));

	// Sparkle
	this.instance_121 = new lib.Tween19("synched",0);
	this.instance_121.setTransform(182.55,189.85);

	this.instance_122 = new lib.Tween20("synched",0);
	this.instance_122.setTransform(162.55,189.85);
	this.instance_122._off = true;

	this.instance_123 = new lib.Tween20("synched",0);
	this.instance_123.setTransform(186.55,191.45);

	this.instance_124 = new lib.Tween18("synched",0);
	this.instance_124.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_125 = new lib.Tween22("synched",0);
	this.instance_125.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_126 = new lib.Tween24("synched",0);
	this.instance_126.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_127 = new lib.Tween26("synched",0);
	this.instance_127.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_128 = new lib.Tween36("synched",0);
	this.instance_128.setTransform(182.05,225.45,0.9999,0.9999,-9.2691,0,0,0.3,0.1);

	this.instance_129 = new lib.Tween18("synched",0);
	this.instance_129.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_130 = new lib.Tween22("synched",0);
	this.instance_130.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_131 = new lib.Tween24("synched",0);
	this.instance_131.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_132 = new lib.Tween26("synched",0);
	this.instance_132.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_133 = new lib.Tween36("synched",0);
	this.instance_133.setTransform(182.05,225.45,0.9999,0.9999,-9.2691,0,0,0.3,0.1);

	this.instance_134 = new lib.Tween20("synched",0);
	this.instance_134.setTransform(176.4,225.35,0.9999,0.9999,-9.2691,0,0,0.2,0.1);

	this.instance_135 = new lib.Tween18("synched",0);
	this.instance_135.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_136 = new lib.Tween22("synched",0);
	this.instance_136.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_137 = new lib.Tween24("synched",0);
	this.instance_137.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_138 = new lib.Tween26("synched",0);
	this.instance_138.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_139 = new lib.Tween36("synched",0);
	this.instance_139.setTransform(182.05,225.45,0.9999,0.9999,-9.2691,0,0,0.3,0.1);

	this.instance_140 = new lib.Tween20("synched",0);
	this.instance_140.setTransform(176.4,225.35,0.9999,0.9999,-9.2691,0,0,0.2,0.1);

	this.instance_141 = new lib.Tween18("synched",0);
	this.instance_141.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_142 = new lib.Tween22("synched",0);
	this.instance_142.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_143 = new lib.Tween24("synched",0);
	this.instance_143.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_144 = new lib.Tween26("synched",0);
	this.instance_144.setTransform(175.7,226.8,0.9999,0.9999,-9.2691,0,0,0.1,0.1);

	this.instance_145 = new lib.Tween36("synched",0);
	this.instance_145.setTransform(182.05,225.45,0.9999,0.9999,-9.2691,0,0,0.3,0.1);

	this.instance_146 = new lib.Tween171("synched",0);
	this.instance_146.setTransform(178.65,226);

	this.instance_147 = new lib.Tween171("synched",0);
	this.instance_147.setTransform(178.65,226);

	this.instance_148 = new lib.Tween172("synched",0);
	this.instance_148.setTransform(178.65,226.05);

	this.instance_149 = new lib.Tween172("synched",0);
	this.instance_149.setTransform(178.65,226.05);

	this.instance_150 = new lib.Tween173("synched",0);
	this.instance_150.setTransform(178.65,227.45);
	this.instance_150._off = true;

	this.instance_151 = new lib.Tween173("synched",0);
	this.instance_151.setTransform(178.65,227.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_121}]}).to({state:[{t:this.instance_122}]},6).to({state:[{t:this.instance_122}]},3).to({state:[{t:this.instance_122}]},2).to({state:[{t:this.instance_122}]},4).to({state:[{t:this.instance_122}]},2).to({state:[{t:this.instance_122}]},2).to({state:[{t:this.instance_122}]},4).to({state:[{t:this.instance_122}]},3).to({state:[{t:this.instance_122}]},3).to({state:[{t:this.instance_122}]},4).to({state:[{t:this.instance_122}]},3).to({state:[{t:this.instance_122}]},3).to({state:[{t:this.instance_122}]},29).to({state:[{t:this.instance_122}]},6).to({state:[{t:this.instance_122}]},3).to({state:[{t:this.instance_122}]},6).to({state:[{t:this.instance_122}]},16).to({state:[{t:this.instance_122}]},20).to({state:[{t:this.instance_123,p:{rotation:0,x:186.55,y:191.45,regX:0,regY:0,scaleX:1,scaleY:1}},{t:this.instance_122}]},13).to({state:[{t:this.instance_123,p:{rotation:14.9992,x:175.95,y:190.15,regX:0,regY:0,scaleX:1,scaleY:1}},{t:this.instance_122}]},8).to({state:[{t:this.instance_123,p:{rotation:57.9981,x:176.55,y:199.2,regX:0.1,regY:-0.1,scaleX:1,scaleY:1}},{t:this.instance_122}]},2).to({state:[{t:this.instance_123,p:{rotation:29.6137,x:175.4,y:211.1,regX:0.1,regY:0.1,scaleX:0.9999,scaleY:0.9999}},{t:this.instance_122}]},3).to({state:[{t:this.instance_123,p:{rotation:-9.2691,x:176.4,y:225.35,regX:0.2,regY:0.1,scaleX:0.9999,scaleY:0.9999}},{t:this.instance_122}]},3).to({state:[{t:this.instance_145},{t:this.instance_144},{t:this.instance_143},{t:this.instance_142},{t:this.instance_141},{t:this.instance_140},{t:this.instance_139},{t:this.instance_138},{t:this.instance_137},{t:this.instance_136},{t:this.instance_135},{t:this.instance_134},{t:this.instance_133},{t:this.instance_132},{t:this.instance_131},{t:this.instance_130},{t:this.instance_129},{t:this.instance_123,p:{rotation:-9.2691,x:176.4,y:225.35,regX:0.2,regY:0.1,scaleX:0.9999,scaleY:0.9999}},{t:this.instance_128},{t:this.instance_127},{t:this.instance_126},{t:this.instance_125},{t:this.instance_124},{t:this.instance_122}]},7).to({state:[{t:this.instance_147},{t:this.instance_146}]},141).to({state:[{t:this.instance_149},{t:this.instance_148}]},5).to({state:[{t:this.instance_151,p:{rotation:0,regX:0,regY:0,x:178.65,y:227.45}},{t:this.instance_150}]},3).to({state:[{t:this.instance_151,p:{rotation:14.9992,regX:0,regY:0,x:178.65,y:227.45}},{t:this.instance_150}]},6).to({state:[{t:this.instance_150}]},2).to({state:[{t:this.instance_150}]},1).to({state:[{t:this.instance_150}]},1).to({state:[{t:this.instance_150}]},1).to({state:[{t:this.instance_150}]},1).to({state:[{t:this.instance_151,p:{rotation:6.7611,regX:0.1,regY:0.2,x:179.05,y:228.6}},{t:this.instance_150}]},1).to({state:[{t:this.instance_151,p:{rotation:0,regX:0,regY:0,x:175.3,y:227.15}},{t:this.instance_150}]},16).to({state:[{t:this.instance_133},{t:this.instance_132},{t:this.instance_131},{t:this.instance_130},{t:this.instance_129},{t:this.instance_123,p:{rotation:-9.2691,x:176.4,y:225.35,regX:0.2,regY:0.1,scaleX:0.9999,scaleY:0.9999}},{t:this.instance_128},{t:this.instance_127},{t:this.instance_126},{t:this.instance_125},{t:this.instance_124},{t:this.instance_122}]},10).to({state:[{t:this.instance_133},{t:this.instance_132},{t:this.instance_131},{t:this.instance_130},{t:this.instance_129},{t:this.instance_123,p:{rotation:-9.2691,x:176.4,y:225.35,regX:0.2,regY:0.1,scaleX:0.9999,scaleY:0.9999}},{t:this.instance_128},{t:this.instance_127},{t:this.instance_126},{t:this.instance_125},{t:this.instance_124},{t:this.instance_122}]},25).to({state:[{t:this.instance_133},{t:this.instance_132},{t:this.instance_131},{t:this.instance_130},{t:this.instance_129},{t:this.instance_123,p:{rotation:-9.2691,x:176.4,y:225.35,regX:0.2,regY:0.1,scaleX:0.9999,scaleY:0.9999}},{t:this.instance_128},{t:this.instance_127},{t:this.instance_126},{t:this.instance_125},{t:this.instance_124},{t:this.instance_122}]},13).wait(69));
	this.timeline.addTween(cjs.Tween.get(this.instance_121).to({_off:true,x:162.55},6).wait(444));
	this.timeline.addTween(cjs.Tween.get(this.instance_122).to({_off:false},6).to({x:161.05,y:188.2},3).to({x:184.55,y:192.8},2).to({x:185.05,y:194.65},4).to({x:186.55,y:191},2).to({x:184.45,y:193.65},2).to({x:162.85,y:190.15},4).to({x:160.55,y:191.35},3).to({x:162.95,y:189.85},3).to({x:184.45,y:192.8},4).to({x:186.55,y:194},3).wait(3).to({startPosition:0},0).wait(29).to({startPosition:0},0).to({x:184.55},6).wait(3).to({startPosition:0},0).wait(6).to({x:186.55,y:191.45},0).wait(16).to({startPosition:0},0).wait(20).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(8).to({rotation:14.9992,x:175.95,y:190.15},0).wait(2).to({regX:0.1,regY:-0.1,rotation:57.9981,x:176.55,y:199.2},0).wait(3).to({regY:0.1,scaleX:0.9999,scaleY:0.9999,rotation:29.6137,x:175.4,y:211.1},0).wait(3).to({regX:0.2,rotation:-9.2691,x:176.4,y:225.35},0).wait(7).to({rotation:-9.2691},0).to({_off:true},141).wait(47).to({_off:false},0).wait(25).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));
	this.timeline.addTween(cjs.Tween.get(this.instance_150).wait(304).to({_off:false},0).wait(6).to({rotation:14.9992},0).wait(2).to({regX:0.1,regY:0.1,rotation:29.9984,x:178.7,y:227.55},0).wait(1).to({rotation:14.9994,x:178.45,y:231.6},0).wait(1).to({rotation:29.9973,x:178.5},0).wait(1).to({rotation:21.7607,x:178.45,y:225.2},0).wait(1).to({regY:0.2,rotation:6.7611,y:225.3},0).wait(1).to({rotation:6.7611,x:179.05,y:228.6},0).wait(16).to({regX:0,regY:0,rotation:0,x:175.3,y:227.15},0).to({_off:true},10).wait(107));

	// Spesh_mouth
	this.instance_152 = new lib.Tween15("synched",0);
	this.instance_152.setTransform(194.05,198.55);

	this.instance_153 = new lib.Tween16("synched",0);
	this.instance_153.setTransform(174.45,198.55);
	this.instance_153._off = true;

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f("#000000").s().p("AgBAPQgGgBgCgFIgBgMIAAgEQABgEAEgCQACgBAFAAIAFACQADADABAGQABAJgFAFQgDAEgEAAIgBAAg");
	this.shape_40.setTransform(196.3841,200.9591);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f("#000000").s().p("AgRAJQgCgIAEgDIAMgJQADgCAEAAIAIABQAGADABAGQAAAGgFAEIgNAEIgHADIgCAAQgGAAgDgFg");
	this.shape_41.setTransform(196.7804,200.6317);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#000000").s().p("AgJAMQgCgEACgKQABgGACgDQACgEAEgBQAGAAACADQABACABAEQABAEgBAEIgBAHIgDAGQgDADgEAAQgFgBgDgEg");
	this.shape_42.setTransform(196.9556,200.325);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f("#000000").s().p("AAAAMIgCgDIgEgCQgEgBgEgEQgDgDABgFQADgHAGgCQAHgBAFADQAJAFADAKQABAGgDADQgCAFgFAAQgGAAgCgEg");
	this.shape_43.setTransform(196.7268,200.2025);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f("#000000").s().p("AgNANQgDgCgBgFQgBgEACgCQABgDAGgDIAHgFQAEgDADAAQAIgBAEAHQADAEgCAEQgBADgGAEQgJAGgFABIgEABQgDAAgDgCg");
	this.shape_44.setTransform(196.7365,200.4083);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#000000").s().p("AgNAKQgFgBgCgFQgCgDABgDQABgDAEgCIAIgDIAHgDQADgBAHAEQAIAFACADQAFAFgDAFQgDAFgFABIgKAAQgLgBgFgDg");
	this.shape_45.setTransform(197.1271,200.24);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f("#000000").s().p("AAAAXQgFgBgDgFIgBgFIgDgEQgGgHAFgGIAFgFIAGgHQADgEAEgBQAFgBADAEQAEAFgCAEIgEAHQgBADAAAIQABAIgDAEQgEADgEAAIAAAAg");
	this.shape_46.setTransform(196.8035,200.2428);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f("#000000").s().p("AAAALQgLgEgDgEQgEgEACgFQACgFAEgCQADgBALADQAFAAACABIAEAGIADAGQABAJgHACIgDABQgEAAgFgDg");
	this.shape_47.setTransform(197.8338,200.0582);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#000000").s().p("AAEAPIgGgCIgIgCQgEgCgCgCQgFgEACgEQABgFAFgCQADgCAGAAIAEgDIAGgBQAHAAADADQADADABAFQABAHgFAFQgEAGgGAAIgCAAg");
	this.shape_48.setTransform(196.8533,200.6817);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f("#000000").s().p("AAIASIgHgBIgHAAQgFAAgDgCQgFgCAAgGQAAgGAEgCIAEgCIAEgEIACgFQADgEAFgBQAFAAADACQACABADAEIAEAIIgCAIQgBAJgDACIgEABIgCAAg");
	this.shape_49.setTransform(196.825,199.995);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f("#000000").s().p("AgMAGQgEgCgCgDIAMgGIAMgBIAHABQAEABABADQgCAEgIADIgMABg");
	this.shape_50.setTransform(199.5,201.325);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#000000").s().p("AgFAKQgQgCgGgJIgBgDQAAgBAAAAQAAgBABAAQAAgBABAAQAAAAABAAQANgFALAGIABABIAEAAQALgEALAEQABAAAAAAQABAAAAABQABAAAAABQAAAAAAABIgBACQgFAHgKADIgLABIgHgBg");
	this.shape_51.setTransform(198.5313,201.3984);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f("#000000").s().p("AgQAIQgHgCgCgDIAKgEIAIgFQAFgCAFAAQAPAAAGAFIACACIgCACIgJACIgLAEQgFACgHAAIgIgBg");
	this.shape_52.setTransform(198.125,201.265);
	this.shape_52._off = true;

	this.instance_154 = new lib.Tween34("synched",0);
	this.instance_154.setTransform(198.1,201.25);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_152}]}).to({state:[{t:this.instance_153}]},6).to({state:[{t:this.instance_153}]},3).to({state:[{t:this.instance_153}]},2).to({state:[{t:this.instance_153}]},4).to({state:[{t:this.instance_153}]},4).to({state:[{t:this.instance_153}]},4).to({state:[{t:this.instance_153}]},6).to({state:[{t:this.instance_153}]},4).to({state:[{t:this.instance_153}]},3).to({state:[{t:this.instance_153}]},3).to({state:[{t:this.shape_40},{t:this.instance_153}]},8).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_51}]},4).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_52}]},14).to({state:[{t:this.shape_52}]},6).to({state:[{t:this.shape_52}]},16).to({state:[{t:this.instance_154}]},20).to({state:[]},19).wait(312));
	this.timeline.addTween(cjs.Tween.get(this.instance_152).to({_off:true,x:174.45},6).wait(444));
	this.timeline.addTween(cjs.Tween.get(this.instance_153).to({_off:false},6).wait(3).to({startPosition:0},0).to({x:196.45,y:202.35},2).wait(4).to({startPosition:0},0).wait(4).to({startPosition:0},0).to({x:174.85,y:198.85},4).wait(6).to({startPosition:0},0).to({x:196.35,y:201.8},4).wait(3).to({startPosition:0},0).wait(3).to({startPosition:0},0).wait(8).to({startPosition:0},0).to({_off:true},1).wait(402));
	this.timeline.addTween(cjs.Tween.get(this.shape_52).wait(63).to({_off:false},0).wait(36).to({_off:true},20).wait(331));

	// SpEB
	this.instance_155 = new lib.Tween17("synched",0);
	this.instance_155.setTransform(182.55,189.85);

	this.instance_156 = new lib.Tween18("synched",0);
	this.instance_156.setTransform(162.55,189.85);
	this.instance_156._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_155).to({_off:true,x:162.55},6).wait(444));
	this.timeline.addTween(cjs.Tween.get(this.instance_156).to({_off:false},6).wait(3).to({startPosition:0},0).to({x:184.55,y:193.65},2).wait(4).to({startPosition:0},0).wait(4).to({startPosition:0},0).to({x:162.95,y:190.15},4).wait(6).to({startPosition:0},0).to({x:184.45,y:193.1},4).wait(3).to({startPosition:0},0).wait(3).to({startPosition:0},0).wait(38).to({startPosition:0},0).wait(6).to({startPosition:0},0).wait(16).to({startPosition:0},0).wait(20).to({startPosition:0},0).wait(21).to({rotation:14.9992,x:174.35,y:191.35},0).to({regX:0.1,rotation:57.9981,x:174.65,y:199.1},2).to({regY:0.1,scaleX:0.9999,scaleY:0.9999,rotation:29.6137,x:173.95,y:211.7},3).to({rotation:-9.2691,x:175.7,y:226.8},3).to({_off:true},7).wait(295));

	// Special_Eyes
	this.instance_157 = new lib.Tween21("synched",0);
	this.instance_157.setTransform(182.55,189.85);

	this.instance_158 = new lib.Tween22("synched",0);
	this.instance_158.setTransform(162.55,189.85);
	this.instance_158._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_157).to({_off:true,x:162.55},6).wait(444));
	this.timeline.addTween(cjs.Tween.get(this.instance_158).to({_off:false},6).wait(3).to({startPosition:0},0).to({x:184.55,y:193.65},2).wait(4).to({startPosition:0},0).wait(4).to({startPosition:0},0).to({x:162.95,y:190.15},4).wait(6).to({startPosition:0},0).to({x:184.45,y:193.1},4).wait(3).to({startPosition:0},0).wait(3).to({startPosition:0},0).wait(38).to({startPosition:0},0).wait(6).to({startPosition:0},0).wait(16).to({startPosition:0},0).wait(20).to({startPosition:0},0).wait(21).to({rotation:14.9992,x:174.35,y:191.35},0).to({regX:0.1,rotation:57.9981,x:174.65,y:199.1},2).to({regY:0.1,scaleX:0.9999,scaleY:0.9999,rotation:29.6137,x:173.95,y:211.7},3).to({rotation:-9.2691,x:175.7,y:226.8},3).to({_off:true},7).wait(295));

	// SIE
	this.instance_159 = new lib.Tween23("synched",0);
	this.instance_159.setTransform(182.55,189.85);

	this.instance_160 = new lib.Tween24("synched",0);
	this.instance_160.setTransform(162.55,189.85);
	this.instance_160._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_159).to({_off:true,x:162.55},6).wait(444));
	this.timeline.addTween(cjs.Tween.get(this.instance_160).to({_off:false},6).wait(3).to({startPosition:0},0).to({x:184.55,y:193.65},2).wait(4).to({startPosition:0},0).wait(4).to({startPosition:0},0).to({x:162.95,y:190.15},4).wait(6).to({startPosition:0},0).to({x:184.45,y:193.1},4).wait(3).to({startPosition:0},0).wait(3).to({startPosition:0},0).wait(38).to({startPosition:0},0).wait(6).to({startPosition:0},0).wait(16).to({startPosition:0},0).wait(20).to({startPosition:0},0).wait(21).to({rotation:14.9992,x:174.35,y:191.35},0).to({regX:0.1,rotation:57.9981,x:174.65,y:199.1},2).to({regY:0.1,scaleX:0.9999,scaleY:0.9999,rotation:29.6137,x:173.95,y:211.7},3).to({rotation:-9.2691,x:175.7,y:226.8},3).to({_off:true},7).wait(295));

	// LM
	this.instance_161 = new lib.Tween25("synched",0);
	this.instance_161.setTransform(182.55,189.85);

	this.instance_162 = new lib.Tween26("synched",0);
	this.instance_162.setTransform(162.55,189.85);
	this.instance_162._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_161).to({_off:true,x:162.55},6).wait(444));
	this.timeline.addTween(cjs.Tween.get(this.instance_162).to({_off:false},6).wait(3).to({startPosition:0},0).to({x:184.55,y:193.65},2).wait(4).to({startPosition:0},0).wait(4).to({startPosition:0},0).to({x:162.95,y:190.15},4).wait(6).to({startPosition:0},0).to({x:184.45,y:193.1},4).wait(3).to({startPosition:0},0).wait(3).to({startPosition:0},0).wait(38).to({startPosition:0},0).wait(6).to({startPosition:0},0).wait(16).to({startPosition:0},0).wait(20).to({startPosition:0},0).wait(21).to({rotation:14.9992,x:174.35,y:191.35},0).to({regX:0.1,rotation:57.9981,x:174.65,y:199.1},2).to({regY:0.1,scaleX:0.9999,scaleY:0.9999,rotation:29.6137,x:173.95,y:211.7},3).to({rotation:-9.2691,x:175.7,y:226.8},3).to({_off:true},7).wait(295));

	// Blush
	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f("rgba(255,102,204,0.6)").s().p("AAxAQQgFgCgCgGQgCgFACgDQADgLAMAAQAGABAEADQADAEAAAFQAAAHgDADQgDAEgFABIgDAAQgEAAgDgBgAg/AKQgEgCgCgFQgBgDACgFIACgGIAGgEQAFgCAFACQAFACADAEQACAEAAAFQgBAFgDADQgEAEgFAAIgCAAQgEAAgEgCg");
	this.shape_53.setTransform(195.8679,199.2393);
	this.shape_53._off = true;

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f("rgba(255,102,153,0.6)").s().p("AA2AMQgIgBgBgIQAAgHAHgCIADgBQAGABACADIABADQABACgBADQgBAEgDACQgDACgCAAIgBgBgAg4AHQgEgBgCgDQgCgDABgDQABgEACgCQADgCADAAIABgBQAIAAABAIQABAEgEAEQgDADgEAAIgCAAg");
	this.shape_54.setTransform(195.7607,199.255);
	this.shape_54._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_53).wait(39).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(377));
	this.timeline.addTween(cjs.Tween.get(this.shape_54).wait(40).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(24).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(1).to({_off:false},0).to({_off:true},1).wait(376));

	// grey
	this.instance_163 = new lib.Layer49();
	this.instance_163.setTransform(155,173,0.1,0.1);

	this.instance_164 = new lib.Tween36("synched",0);
	this.instance_164.setTransform(182.55,189.85);
	this.instance_164._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_163).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_164).wait(119).to({_off:false},0).wait(21).to({rotation:14.9992,x:178.55,y:192.1},0).to({regX:0.1,regY:0.1,rotation:57.9981,x:177.3,y:203.1},2).to({regX:0.2,scaleX:0.9999,scaleY:0.9999,rotation:29.6137,x:178.85,y:213.95},3).to({regX:0.3,rotation:-9.2691,x:182.05,y:225.45},3).to({_off:true},7).wait(295));

	// GEB_copy_copy_copy_copy_copy_copy_copy
	this.instance_165 = new lib.GEB();
	this.instance_165.setTransform(193,207,0.1,0.1);

	this.instance_166 = new lib.Tween40("synched",0);
	this.instance_166.setTransform(207.45,218.4);
	this.instance_166._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_165).wait(60).to({x:189,y:202},0).wait(23).to({x:191},0).wait(16).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_166).wait(119).to({_off:false},0).to({x:206.35,y:220.05},20).wait(1).to({x:212.35},0).wait(1).to({x:218.75},0).wait(1).to({x:217.25,y:223.4},0).wait(1).to({x:218.45,y:221},0).wait(1).to({x:223.65},0).wait(2).to({x:227.25},0).wait(2).to({y:217.4},0).wait(6).to({startPosition:0},0).wait(142).to({startPosition:0},0).to({y:223.35},8).wait(25).to({startPosition:0},0).to({x:222.65,y:220.4},4).to({x:223.65},6).to({x:226.35},3).to({x:227.15,y:217.4},3).to({startPosition:0},5).to({x:226.35,y:220.4},4).to({x:224.1},3).wait(11).to({x:222.65},0).wait(13).to({startPosition:0},0).wait(69));

	// Geyebrow2_copy_copy_copy_copy_copy_copy_copy
	this.instance_167 = new lib.Geyebrow2();
	this.instance_167.setTransform(193,207,0.1,0.1);

	this.instance_168 = new lib.Tween42("synched",0);
	this.instance_168.setTransform(205.45,221.4);
	this.instance_168._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_167).wait(60).to({x:189,y:205},0).wait(39).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_168).wait(119).to({_off:false},0).to({y:223.05},20).wait(1).to({x:211.45},0).wait(1).to({x:217.85},0).wait(1).to({x:216.35,y:226.4},0).wait(1).to({x:217.55,y:224},0).wait(1).to({x:222.75},0).wait(2).to({x:226.35},0).wait(2).to({y:220.4},0).wait(6).to({startPosition:0},0).wait(214).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Geyebrow1_copy_copy_copy_copy_copy_copy_copy
	this.instance_169 = new lib.Geyebrow1();
	this.instance_169.setTransform(193,207,0.1,0.1);

	this.instance_170 = new lib.Tween44("synched",0);
	this.instance_170.setTransform(205.45,221.4);
	this.instance_170._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_169).wait(60).to({x:189,y:205},0).wait(39).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_170).wait(119).to({_off:false},0).to({y:223.05},20).wait(1).to({x:211.45},0).wait(1).to({x:217.85},0).wait(1).to({x:216.35,y:226.4},0).wait(1).to({x:217.55,y:224},0).wait(1).to({x:222.75},0).wait(2).to({x:226.35},0).wait(2).to({y:220.4},0).wait(6).to({startPosition:0},0).wait(214).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// G1E_copy_copy_copy_copy_copy_copy_copy
	this.instance_171 = new lib.G1E();
	this.instance_171.setTransform(193,207,0.1,0.1);

	this.instance_172 = new lib.Tween46("synched",0);
	this.instance_172.setTransform(205.45,221.4);
	this.instance_172._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_171).wait(60).to({x:189,y:205},0).wait(39).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_172).wait(119).to({_off:false},0).to({y:223.05},20).wait(1).to({x:211.45},0).wait(1).to({x:217.85},0).wait(1).to({x:216.35,y:226.4},0).wait(1).to({x:217.55,y:224},0).wait(1).to({x:222.75},0).wait(2).to({x:226.35},0).wait(2).to({y:220.4},0).wait(6).to({startPosition:0},0).wait(214).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// GIW_copy_copy_copy_copy_copy_copy_copy
	this.instance_173 = new lib.GIW();
	this.instance_173.setTransform(193,207,0.1,0.1);

	this.instance_174 = new lib.Tween48("synched",0);
	this.instance_174.setTransform(205.45,221.4);
	this.instance_174._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_173).wait(60).to({x:189,y:205},0).wait(39).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_174).wait(119).to({_off:false},0).to({y:223.05},20).wait(1).to({x:211.45},0).wait(1).to({x:217.85},0).wait(1).to({x:216.35,y:226.4},0).wait(1).to({x:217.55,y:224},0).wait(1).to({x:222.75},0).wait(2).to({x:226.35},0).wait(2).to({y:220.4},0).wait(6).to({startPosition:0},0).wait(214).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// MergedLayer_1
	this.instance_175 = new lib.GOutline();
	this.instance_175.setTransform(193,207,0.1,0.1);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f("#33CC33").s().p("Ah0B1QgwgxAAhEQAAhDAwgxQAxgwBDAAQBEAAAxAwQAwAxAABDQAABEgwAxQgxAwhEAAQhDAAgxgwg");
	this.shape_55.setTransform(210,223.5);

	this.instance_176 = new lib.Gumball1();
	this.instance_176.setTransform(193,207,0.1,0.1);

	this.instance_177 = new lib.Tween38("synched",0);
	this.instance_177.setTransform(209.75,223.75);

	this.instance_178 = new lib.Tween50("synched",0);
	this.instance_178.setTransform(210,223.5);

	this.instance_179 = new lib.Tween52("synched",0);
	this.instance_179.setTransform(209.45,223.4);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_176},{t:this.shape_55},{t:this.instance_175}]}).to({state:[{t:this.instance_176},{t:this.shape_55},{t:this.instance_175}]},59).to({state:[{t:this.instance_176},{t:this.shape_55},{t:this.instance_175}]},7).to({state:[{t:this.instance_176},{t:this.shape_55},{t:this.instance_175}]},11).to({state:[{t:this.instance_176},{t:this.shape_55},{t:this.instance_175}]},6).to({state:[{t:this.instance_176},{t:this.shape_55},{t:this.instance_175}]},16).to({state:[{t:this.instance_179,p:{x:209.45,y:223.4}},{t:this.instance_178,p:{x:210,y:223.5}},{t:this.instance_177,p:{x:209.75,y:223.75}}]},20).to({state:[{t:this.instance_179,p:{x:209.45,y:223.4}},{t:this.instance_178,p:{x:210,y:223.5}},{t:this.instance_177,p:{x:209.75,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:209.45,y:223.4}},{t:this.instance_178,p:{x:210,y:223.5}},{t:this.instance_177,p:{x:209.75,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:209.45,y:223.4}},{t:this.instance_178,p:{x:210,y:223.5}},{t:this.instance_177,p:{x:209.75,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:209.45,y:223.4}},{t:this.instance_178,p:{x:210,y:223.5}},{t:this.instance_177,p:{x:209.75,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:209.45,y:223.4}},{t:this.instance_178,p:{x:210,y:223.5}},{t:this.instance_177,p:{x:209.75,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:209.45,y:223.4}},{t:this.instance_178,p:{x:210,y:223.5}},{t:this.instance_177,p:{x:209.75,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:209.45,y:223.4}},{t:this.instance_178,p:{x:210,y:223.5}},{t:this.instance_177,p:{x:209.75,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:209.45,y:223.4}},{t:this.instance_178,p:{x:210,y:223.5}},{t:this.instance_177,p:{x:209.75,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:209.45,y:223.4}},{t:this.instance_178,p:{x:210,y:223.5}},{t:this.instance_177,p:{x:209.75,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:209.45,y:223.4}},{t:this.instance_178,p:{x:210,y:223.5}},{t:this.instance_177,p:{x:209.75,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:209.45,y:223.4}},{t:this.instance_178,p:{x:210,y:223.5}},{t:this.instance_177,p:{x:209.75,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:209.45,y:223.4}},{t:this.instance_178,p:{x:210,y:223.5}},{t:this.instance_177,p:{x:209.75,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:209.45,y:223.4}},{t:this.instance_178,p:{x:210,y:223.5}},{t:this.instance_177,p:{x:209.75,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:209.45,y:223.4}},{t:this.instance_178,p:{x:210,y:223.5}},{t:this.instance_177,p:{x:209.75,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:209.45,y:223.4}},{t:this.instance_178,p:{x:210,y:223.5}},{t:this.instance_177,p:{x:209.75,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:209.45,y:223.4}},{t:this.instance_178,p:{x:210,y:223.5}},{t:this.instance_177,p:{x:209.75,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:209.45,y:223.4}},{t:this.instance_178,p:{x:210,y:223.5}},{t:this.instance_177,p:{x:209.75,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:209.45,y:223.4}},{t:this.instance_178,p:{x:210,y:223.5}},{t:this.instance_177,p:{x:209.75,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:209.45,y:223.4}},{t:this.instance_178,p:{x:210,y:223.5}},{t:this.instance_177,p:{x:209.75,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:209.45,y:223.4}},{t:this.instance_178,p:{x:210,y:223.5}},{t:this.instance_177,p:{x:209.75,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:215.45,y:223.4}},{t:this.instance_178,p:{x:216,y:223.5}},{t:this.instance_177,p:{x:215.75,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:215.85,y:223.4}},{t:this.instance_178,p:{x:216.4,y:223.5}},{t:this.instance_177,p:{x:216.15,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:216.65,y:223.4}},{t:this.instance_178,p:{x:217.2,y:223.5}},{t:this.instance_177,p:{x:216.95,y:223.75}}]},1).to({state:[{t:this.instance_179,p:{x:217.85,y:221}},{t:this.instance_178,p:{x:218.4,y:221.1}},{t:this.instance_177,p:{x:218.15,y:221.35}}]},1).to({state:[{t:this.instance_179,p:{x:223.05,y:221}},{t:this.instance_178,p:{x:223.6,y:221.1}},{t:this.instance_177,p:{x:223.35,y:221.35}}]},1).to({state:[{t:this.instance_179,p:{x:226.65,y:221}},{t:this.instance_178,p:{x:227.2,y:221.1}},{t:this.instance_177,p:{x:226.95,y:221.35}}]},2).to({state:[{t:this.instance_179,p:{x:226.65,y:217.4}},{t:this.instance_178,p:{x:227.2,y:217.5}},{t:this.instance_177,p:{x:226.95,y:217.75}}]},2).to({state:[{t:this.instance_179,p:{x:226.65,y:217.4}},{t:this.instance_178,p:{x:227.2,y:217.5}},{t:this.instance_177,p:{x:226.95,y:217.75}}]},6).to({state:[{t:this.instance_179,p:{x:226.65,y:217.4}},{t:this.instance_178,p:{x:227.2,y:217.5}},{t:this.instance_177,p:{x:226.95,y:217.75}}]},214).to({state:[{t:this.instance_179,p:{x:226.65,y:217.4}},{t:this.instance_178,p:{x:227.2,y:217.5}},{t:this.instance_177,p:{x:226.95,y:217.75}}]},13).wait(69));

	// G_Outline_copy_copy_copy_copy_copy_copy
	this.instance_180 = new lib.GOutline();
	this.instance_180.setTransform(157,207,0.1,0.1);

	this.instance_181 = new lib.Tween54("synched",0);
	this.instance_181.setTransform(173.75,223.75);
	this.instance_181._off = true;

	this.instance_182 = new lib.Tween55("synched",0);
	this.instance_182.setTransform(195.35,300.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_180}]}).to({state:[{t:this.instance_180}]},59).to({state:[{t:this.instance_180}]},3).to({state:[{t:this.instance_180}]},1).to({state:[{t:this.instance_180}]},14).to({state:[{t:this.instance_180}]},6).to({state:[{t:this.instance_180}]},16).to({state:[{t:this.instance_181}]},20).to({state:[{t:this.instance_181}]},20).to({state:[{t:this.instance_181}]},1).to({state:[{t:this.instance_181}]},1).to({state:[{t:this.instance_182}]},14).to({state:[{t:this.instance_182}]},213).to({state:[{t:this.instance_182}]},13).wait(69));
	this.timeline.addTween(cjs.Tween.get(this.instance_180).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_181).wait(119).to({_off:false},0).to({startPosition:0},20).to({y:231.05},1).to({y:239.1},1).to({_off:true,x:195.35,y:300.45},14).wait(295));

	// GEB_copy_copy_copy_copy_copy_copy
	this.instance_183 = new lib.GEB();
	this.instance_183.setTransform(150,207,0.1,0.1);

	this.instance_184 = new lib.Tween56("synched",0);
	this.instance_184.setTransform(171.45,218.4);
	this.instance_184._off = true;

	this.instance_185 = new lib.Tween57("synched",0);
	this.instance_185.setTransform(192.05,301.1);
	this.instance_185._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_183).wait(62).to({x:154,y:205},0).wait(1).to({x:156,y:202},0).wait(20).to({x:155},0).wait(16).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_184).wait(119).to({_off:false},0).to({x:170.9,y:221.75},20).to({x:170.85,y:229.2},1).to({x:170.8,y:237.45},1).to({_off:true,x:192.05,y:301.1},14).wait(295));
	this.timeline.addTween(cjs.Tween.get(this.instance_185).wait(141).to({_off:false},14).wait(181).to({startPosition:0},0).wait(32).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Geyebrow1_copy_copy_copy_copy_copy_copy
	this.instance_186 = new lib.Geyebrow1();
	this.instance_186.setTransform(150,207,0.1,0.1);

	this.instance_187 = new lib.Tween58("synched",0);
	this.instance_187.setTransform(170.45,221.4);
	this.instance_187._off = true;

	this.instance_188 = new lib.Tween59("synched",0);
	this.instance_188.setTransform(192.05,301.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_186}]}).to({state:[{t:this.instance_186}]},59).to({state:[{t:this.instance_186}]},3).to({state:[{t:this.instance_186}]},1).to({state:[{t:this.instance_186}]},14).to({state:[{t:this.instance_186}]},6).to({state:[{t:this.instance_186}]},16).to({state:[{t:this.instance_187}]},20).to({state:[{t:this.instance_187}]},20).to({state:[{t:this.instance_187}]},1).to({state:[{t:this.instance_187}]},1).to({state:[{t:this.instance_188}]},14).to({state:[{t:this.instance_188}]},213).to({state:[{t:this.instance_188}]},13).wait(69));
	this.timeline.addTween(cjs.Tween.get(this.instance_186).wait(62).to({x:154,y:205},0).wait(37).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_187).wait(119).to({_off:false},0).to({y:223.05},20).to({y:230.45},1).to({y:238.6},1).to({_off:true,x:192.05,y:301.1},14).wait(295));

	// G1E_copy_copy_copy_copy_copy_copy
	this.instance_189 = new lib.G1E();
	this.instance_189.setTransform(150,207,0.1,0.1);

	this.instance_190 = new lib.Tween60("synched",0);
	this.instance_190.setTransform(170.45,221.4);
	this.instance_190._off = true;

	this.instance_191 = new lib.Tween61("synched",0);
	this.instance_191.setTransform(192.05,301.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_189}]}).to({state:[{t:this.instance_189}]},59).to({state:[{t:this.instance_189}]},3).to({state:[{t:this.instance_189}]},1).to({state:[{t:this.instance_189}]},14).to({state:[{t:this.instance_189}]},6).to({state:[{t:this.instance_189}]},16).to({state:[{t:this.instance_190}]},20).to({state:[{t:this.instance_190}]},20).to({state:[{t:this.instance_190}]},1).to({state:[{t:this.instance_190}]},1).to({state:[{t:this.instance_191}]},14).to({state:[{t:this.instance_191}]},213).to({state:[{t:this.instance_191}]},13).wait(69));
	this.timeline.addTween(cjs.Tween.get(this.instance_189).wait(62).to({x:154,y:205},0).wait(37).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_190).wait(119).to({_off:false},0).to({y:223.05},20).to({y:230.45},1).to({y:238.6},1).to({_off:true,x:192.05,y:301.1},14).wait(295));

	// GIW_copy_copy_copy_copy_copy_copy
	this.instance_192 = new lib.GIW();
	this.instance_192.setTransform(150,207,0.1,0.1);

	this.instance_193 = new lib.Tween62("synched",0);
	this.instance_193.setTransform(170.45,221.4);
	this.instance_193._off = true;

	this.instance_194 = new lib.Tween63("synched",0);
	this.instance_194.setTransform(192.05,301.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_192}]}).to({state:[{t:this.instance_192}]},59).to({state:[{t:this.instance_192}]},3).to({state:[{t:this.instance_192}]},1).to({state:[{t:this.instance_192}]},14).to({state:[{t:this.instance_192}]},6).to({state:[{t:this.instance_192}]},16).to({state:[{t:this.instance_193}]},20).to({state:[{t:this.instance_193}]},20).to({state:[{t:this.instance_193}]},1).to({state:[{t:this.instance_193}]},1).to({state:[{t:this.instance_194}]},14).to({state:[{t:this.instance_194}]},213).to({state:[{t:this.instance_194}]},13).wait(69));
	this.timeline.addTween(cjs.Tween.get(this.instance_192).wait(62).to({x:154,y:205},0).wait(37).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_193).wait(119).to({_off:false},0).to({y:223.05},20).to({y:230.45},1).to({y:238.6},1).to({_off:true,x:192.05,y:301.1},14).wait(295));

	// Red2
	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f("#FF3333").s().p("Ah0B1QgwgxAAhEQAAhDAwgxQAxgwBDAAQBEAAAxAwQAwAxAABDQAABEgwAxQgxAwhEAAQhDAAgxgwg");
	this.shape_56.setTransform(174,223.5);

	this.instance_195 = new lib.Tween64("synched",0);
	this.instance_195.setTransform(174,223.5);
	this.instance_195._off = true;

	this.instance_196 = new lib.Tween65("synched",0);
	this.instance_196.setTransform(195.6,300.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_56}]}).to({state:[{t:this.shape_56}]},59).to({state:[{t:this.shape_56}]},3).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_56}]},14).to({state:[{t:this.shape_56}]},6).to({state:[{t:this.shape_56}]},16).to({state:[{t:this.instance_195}]},20).to({state:[{t:this.instance_195}]},20).to({state:[{t:this.instance_195}]},1).to({state:[{t:this.instance_195}]},1).to({state:[{t:this.instance_196}]},14).to({state:[{t:this.instance_196}]},213).to({state:[{t:this.instance_196}]},13).wait(69));
	this.timeline.addTween(cjs.Tween.get(this.shape_56).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_195).wait(119).to({_off:false},0).to({startPosition:0},20).to({y:230.8},1).to({y:238.85},1).to({_off:true,x:195.6,y:300.2},14).wait(295));

	// Gumball_1_copy_copy_copy_copy_copy_copy
	this.instance_197 = new lib.Gumball1();
	this.instance_197.setTransform(157,207,0.1,0.1);

	this.instance_198 = new lib.Tween66("synched",0);
	this.instance_198.setTransform(173.45,223.4);
	this.instance_198._off = true;

	this.instance_199 = new lib.Tween67("synched",0);
	this.instance_199.setTransform(195.05,300.1);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_197}]}).to({state:[{t:this.instance_197}]},59).to({state:[{t:this.instance_197}]},3).to({state:[{t:this.instance_197}]},1).to({state:[{t:this.instance_197}]},14).to({state:[{t:this.instance_197}]},6).to({state:[{t:this.instance_197}]},16).to({state:[{t:this.instance_198}]},20).to({state:[{t:this.instance_198}]},20).to({state:[{t:this.instance_198}]},1).to({state:[{t:this.instance_198}]},1).to({state:[{t:this.instance_199}]},14).to({state:[{t:this.instance_199}]},213).to({state:[{t:this.instance_199}]},13).wait(69));
	this.timeline.addTween(cjs.Tween.get(this.instance_197).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_198).wait(119).to({_off:false},0).to({startPosition:0},20).to({y:230.7},1).to({y:238.75},1).to({_off:true,x:195.05,y:300.1},14).wait(295));

	// G_Outline_copy_copy_copy_copy_copy_copy
	this.instance_200 = new lib.GOutline();
	this.instance_200.setTransform(249,162,0.1,0.1);

	this.instance_201 = new lib.Tween68("synched",0);
	this.instance_201.setTransform(265.75,178.75);
	this.instance_201._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_200).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_201).wait(119).to({_off:false},0).to({startPosition:0},20).wait(1).to({y:176.2},0).wait(2).to({y:170.9},0).wait(2).to({x:273,y:169.85},0).wait(2).to({x:274.3,y:168.55},0).wait(3).to({y:164.55},0).wait(219).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Layer_10
	this.instance_202 = new lib.Tween70("synched",0);
	this.instance_202.setTransform(266.45,167.55);
	this.instance_202._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_202).wait(326).to({_off:false},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	// GEB_copy_copy_copy_copy_copy_copy
	this.instance_203 = new lib.GEB();
	this.instance_203.setTransform(242,162,0.1,0.1);

	this.instance_204 = new lib.Tween70("synched",0);
	this.instance_204.setTransform(260.45,176.4);
	this.instance_204._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_203).wait(65).to({x:239},0).wait(12).to({x:242},0).wait(6).to({x:244,y:160},0).wait(16).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_204).wait(119).to({_off:false},0).to({x:258.8,y:177.5},20).wait(1).to({y:175.45},0).wait(2).to({y:170.15},0).wait(2).to({x:266.05,y:169.1},0).wait(2).to({x:267.35,y:167.8},0).wait(3).to({y:163.8},0).wait(148).to({startPosition:0},0).to({x:266.45,y:167.55},7).to({_off:true},22).wait(5).to({_off:false,x:264.1},0).wait(37).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Geyebrow1_copy_copy_copy_copy_copy_copy
	this.instance_205 = new lib.Geyebrow1();
	this.instance_205.setTransform(242,162,0.1,0.1);

	this.instance_206 = new lib.Tween72("synched",0);
	this.instance_206.setTransform(258.45,178.4);
	this.instance_206._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_205).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_206).wait(119).to({_off:false},0).to({x:257.9},20).wait(1).to({y:176.35},0).wait(2).to({y:171.05},0).wait(2).to({x:265.15,y:170},0).wait(2).to({x:266.45,y:168.7},0).wait(3).to({y:164.7},0).wait(219).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// G1E_copy_copy_copy_copy_copy_copy
	this.instance_207 = new lib.G1E();
	this.instance_207.setTransform(242,162,0.1,0.1);

	this.instance_208 = new lib.Tween74("synched",0);
	this.instance_208.setTransform(258.45,178.4);
	this.instance_208._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_207).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_208).wait(119).to({_off:false},0).to({x:257.9},20).wait(1).to({y:176.35},0).wait(2).to({y:171.05},0).wait(2).to({x:265.15,y:170},0).wait(2).to({x:266.45,y:168.7},0).wait(3).to({y:164.7},0).wait(219).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// GIW_copy_copy_copy_copy_copy_copy
	this.instance_209 = new lib.GIW();
	this.instance_209.setTransform(242,162,0.1,0.1);

	this.instance_210 = new lib.Tween76("synched",0);
	this.instance_210.setTransform(258.45,178.4);
	this.instance_210._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_209).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_210).wait(119).to({_off:false},0).to({x:257.9},20).wait(1).to({y:176.35},0).wait(2).to({y:171.05},0).wait(2).to({x:265.15,y:170},0).wait(2).to({x:266.45,y:168.7},0).wait(3).to({y:164.7},0).wait(219).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Blue2
	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f("#3366CC").s().p("Ah0B1QgwgxAAhEQAAhDAwgxQAwgwBEAAQBEAAAwAwQAxAxAABDQAABEgxAxQgwAwhEAAQhEAAgwgwg");
	this.shape_57.setTransform(266,178.5);

	this.instance_211 = new lib.Tween78("synched",0);
	this.instance_211.setTransform(266,178.5);
	this.instance_211._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_57).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_211).wait(119).to({_off:false},0).to({startPosition:0},20).wait(1).to({y:176.45},0).wait(2).to({y:171.15},0).wait(2).to({x:273.25,y:170.1},0).wait(2).to({x:274.55,y:168.8},0).wait(3).to({y:164.8},0).wait(219).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Gumball_1_copy_copy_copy_copy_copy_copy
	this.instance_212 = new lib.Gumball1();
	this.instance_212.setTransform(249,162,0.1,0.1);

	this.instance_213 = new lib.Tween80("synched",0);
	this.instance_213.setTransform(265.45,178.4);
	this.instance_213._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_212).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_213).wait(119).to({_off:false},0).to({startPosition:0},20).wait(1).to({y:176.35},0).wait(2).to({y:171.05},0).wait(2).to({x:272.7,y:170},0).wait(2).to({x:274,y:168.7},0).wait(3).to({y:164.7},0).wait(219).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// G_Outline_copy_copy_copy_copy_copy
	this.instance_214 = new lib.GOutline();
	this.instance_214.setTransform(227,191,0.1,0.1);

	this.instance_215 = new lib.Tween82("synched",0);
	this.instance_215.setTransform(243.75,207.75);
	this.instance_215._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_214).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_215).wait(119).to({_off:false},0).to({startPosition:0},20).to({x:247.35,y:208},1).wait(1).to({y:204.4},0).wait(1).to({x:250.15},0).wait(2).to({x:251.75,y:199.2},0).wait(2).to({x:255.35},0).wait(2).to({y:195.2},0).wait(220).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// GEB_copy_copy_copy_copy_copy
	this.instance_216 = new lib.GEB();
	this.instance_216.setTransform(217,197,0.1,0.1);

	this.instance_217 = new lib.Tween27("synched",0);
	this.instance_217.setTransform(230.45,210.4);
	this.instance_217._off = true;

	this.instance_218 = new lib.Tween28("synched",0);
	this.instance_218.setTransform(231.45,213.4);

	this.instance_219 = new lib.Tween84("synched",0);
	this.instance_219.setTransform(235.45,211.4);
	this.instance_219._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_216}]}).to({state:[{t:this.instance_216}]},59).to({state:[{t:this.instance_216}]},5).to({state:[{t:this.instance_217}]},3).to({state:[{t:this.instance_218}]},5).to({state:[{t:this.instance_216}]},5).to({state:[{t:this.instance_216}]},6).to({state:[{t:this.instance_216}]},16).to({state:[{t:this.instance_219}]},20).to({state:[{t:this.instance_219}]},20).to({state:[{t:this.instance_219}]},1).to({state:[{t:this.instance_219}]},1).to({state:[{t:this.instance_219}]},1).to({state:[{t:this.instance_219}]},2).to({state:[{t:this.instance_219}]},2).to({state:[{t:this.instance_219}]},2).to({state:[{t:this.instance_219}]},150).to({state:[{t:this.instance_219}]},6).to({state:[{t:this.instance_219}]},26).to({state:[{t:this.instance_219}]},38).to({state:[{t:this.instance_219}]},13).wait(69));
	this.timeline.addTween(cjs.Tween.get(this.instance_216).wait(64).to({_off:true},3).wait(10).to({_off:false},0).wait(6).to({x:219,y:195},0).wait(16).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_217).wait(67).to({_off:false},0).to({_off:true,x:231.45,y:213.4},5).wait(378));
	this.timeline.addTween(cjs.Tween.get(this.instance_219).wait(119).to({_off:false},0).to({x:237.1,y:210.3},20).to({x:240.8,y:210.5},1).wait(1).to({y:206.9},0).wait(1).to({x:243.6},0).wait(2).to({x:245.2,y:201.7},0).wait(2).to({x:248.8},0).wait(2).to({y:197.7},0).wait(150).to({startPosition:0},0).to({x:248,y:200.35},6).wait(26).to({x:244.2},0).wait(38).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Geyebrow2_copy_copy_copy_copy_copy
	this.instance_220 = new lib.Geyebrow2();
	this.instance_220.setTransform(217,197,0.1,0.1);

	this.instance_221 = new lib.Tween86("synched",0);
	this.instance_221.setTransform(233.45,213.4);
	this.instance_221._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_220).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_221).wait(119).to({_off:false},0).to({x:236.25,y:211.2},20).to({x:240,y:211.35},1).wait(1).to({y:207.75},0).wait(1).to({x:242.8},0).wait(2).to({x:244.4,y:202.55},0).wait(2).to({x:248},0).wait(2).to({y:198.55},0).wait(220).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Geyebrow1_copy_copy_copy_copy_copy
	this.instance_222 = new lib.Geyebrow1();
	this.instance_222.setTransform(217,197,0.1,0.1);

	this.instance_223 = new lib.Tween88("synched",0);
	this.instance_223.setTransform(233.45,213.4);
	this.instance_223._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_222).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_223).wait(119).to({_off:false},0).to({x:236.25,y:211.2},20).to({x:240,y:211.35},1).wait(1).to({y:207.75},0).wait(1).to({x:242.8},0).wait(2).to({x:244.4,y:202.55},0).wait(2).to({x:248},0).wait(2).to({y:198.55},0).wait(220).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// G1E_copy_copy_copy_copy_copy
	this.instance_224 = new lib.G1E();
	this.instance_224.setTransform(217,197,0.1,0.1);

	this.instance_225 = new lib.Tween90("synched",0);
	this.instance_225.setTransform(233.45,213.4);
	this.instance_225._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_224).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_225).wait(119).to({_off:false},0).to({x:236.25,y:211.2},20).to({x:240,y:211.35},1).wait(1).to({y:207.75},0).wait(1).to({x:242.8},0).wait(2).to({x:244.4,y:202.55},0).wait(2).to({x:248},0).wait(2).to({y:198.55},0).wait(220).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// GIW_copy_copy_copy_copy_copy
	this.instance_226 = new lib.GIW();
	this.instance_226.setTransform(217,197,0.1,0.1);

	this.instance_227 = new lib.Tween92("synched",0);
	this.instance_227.setTransform(233.45,213.4);
	this.instance_227._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_226).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_227).wait(119).to({_off:false},0).to({x:236.25,y:211.2},20).to({x:240,y:211.35},1).wait(1).to({y:207.75},0).wait(1).to({x:242.8},0).wait(2).to({x:244.4,y:202.55},0).wait(2).to({x:248},0).wait(2).to({y:198.55},0).wait(220).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Purple2
	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f("#9933CC").s().p("Ah0B0QgwgwAAhEQAAhEAwgwQAxgwBDAAQBEAAAxAwQAwAwAABEQAABEgwAwQgxAxhEAAQhDAAgxgxg");
	this.shape_58.setTransform(244,207.5);

	this.instance_228 = new lib.Tween94("synched",0);
	this.instance_228.setTransform(244,207.5);
	this.instance_228._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_58).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_228).wait(119).to({_off:false},0).to({startPosition:0},20).to({x:247.6,y:207.75},1).wait(1).to({y:204.15},0).wait(1).to({x:250.4},0).wait(2).to({x:252,y:198.95},0).wait(2).to({x:255.6},0).wait(2).to({y:194.95},0).wait(220).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Gumball_1_copy_copy_copy_copy_copy
	this.instance_229 = new lib.Gumball1();
	this.instance_229.setTransform(227,191,0.1,0.1);

	this.instance_230 = new lib.Tween96("synched",0);
	this.instance_230.setTransform(243.45,207.4);
	this.instance_230._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_229).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_230).wait(119).to({_off:false},0).to({startPosition:0},20).to({x:247.05,y:207.65},1).wait(1).to({y:204.05},0).wait(1).to({x:249.85},0).wait(2).to({x:251.45,y:198.85},0).wait(2).to({x:255.05},0).wait(2).to({y:194.85},0).wait(220).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// G_Outline_copy_copy_copy_copy
	this.instance_231 = new lib.GOutline();
	this.instance_231.setTransform(210,158,0.1,0.1);

	this.instance_232 = new lib.Tween98("synched",0);
	this.instance_232.setTransform(226.75,174.75);
	this.instance_232._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_231).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_232).wait(119).to({_off:false},0).to({startPosition:0},20).wait(1).to({x:222.7,y:180.35},0).wait(1).to({x:217.45},0).wait(1).to({x:217.05,y:187.4},0).wait(2).to({x:215.05,y:186.9},0).wait(2).to({x:211.85},0).wait(2).to({x:201.75,y:191.55},0).wait(220).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Layer_11
	this.instance_233 = new lib.Tween100("synched",0);
	this.instance_233.setTransform(197.45,195.55);
	this.instance_233._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_233).wait(320).to({_off:false},0).wait(1).to({x:197.3976},0).wait(1).to({x:197.3452},0).wait(1).to({x:197.2928},0).wait(1).to({x:197.2404},0).wait(1).to({x:197.1881},0).wait(1).to({x:197.1357},0).wait(1).to({x:197.0833},0).wait(1).to({x:197.0309},0).wait(1).to({x:196.9785},0).wait(1).to({x:196.9261},0).wait(1).to({x:196.8737},0).wait(1).to({x:196.8213},0).wait(1).to({x:196.7689},0).wait(1).to({x:196.7165},0).wait(1).to({x:196.6642},0).wait(1).to({x:196.6118},0).wait(1).to({x:196.5594},0).wait(1).to({x:196.507},0).wait(1).to({x:196.4546},0).wait(1).to({x:196.4022},0).wait(1).to({x:196.3498},0).wait(1).to({x:196.2974},0).wait(1).to({x:196.245},0).wait(1).to({x:196.1926},0).wait(1).to({x:196.1403},0).wait(1).to({x:196.0879},0).wait(1).to({x:196.0355},0).wait(1).to({x:195.9831},0).wait(1).to({x:195.9307},0).wait(1).to({x:195.8783},0).wait(1).to({x:195.8259},0).wait(1).to({x:195.7735},0).wait(1).to({x:195.7211},0).wait(1).to({x:195.6688},0).wait(1).to({x:196.1138,y:194.875},0).wait(1).to({x:196.5589,y:194.2},0).wait(1).to({x:197.004,y:193.525},0).wait(1).to({x:197.4491,y:192.85},0).wait(1).to({x:197.6142,y:193.12},0).wait(1).to({x:197.7793,y:193.39},0).wait(1).to({x:197.9444,y:193.66},0).wait(1).to({x:198.1095,y:193.93},0).wait(1).to({x:198.2746,y:194.2},0).wait(1).to({x:198.4396,y:194.47},0).wait(1).to({x:198.6047,y:194.74},0).wait(1).to({x:198.7698,y:195.01},0).wait(1).to({x:198.9349,y:195.28},0).wait(1).to({x:199.1,y:195.55},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	// GEB_copy_copy_copy_copy
	this.instance_234 = new lib.GEB();
	this.instance_234.setTransform(211,158,0.1,0.1);

	this.instance_235 = new lib.Tween29("synched",0);
	this.instance_235.setTransform(226.45,174.4);
	this.instance_235._off = true;

	this.instance_236 = new lib.Tween30("synched",0);
	this.instance_236.setTransform(227.45,174.4);

	this.instance_237 = new lib.Tween100("synched",0);
	this.instance_237.setTransform(229.45,172.4);
	this.instance_237._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_234}]}).to({state:[{t:this.instance_234}]},59).to({state:[{t:this.instance_234}]},9).to({state:[{t:this.instance_235}]},4).to({state:[{t:this.instance_236}]},5).to({state:[{t:this.instance_234}]},6).to({state:[{t:this.instance_234}]},16).to({state:[{t:this.instance_237}]},20).to({state:[{t:this.instance_237}]},20).to({state:[{t:this.instance_237}]},1).to({state:[{t:this.instance_237}]},1).to({state:[{t:this.instance_237}]},1).to({state:[{t:this.instance_237}]},2).to({state:[{t:this.instance_237}]},2).to({state:[{t:this.instance_237}]},2).to({state:[{t:this.instance_237}]},151).to({state:[{t:this.instance_237}]},5).to({state:[]},16).wait(130));
	this.timeline.addTween(cjs.Tween.get(this.instance_234).wait(68).to({_off:true},4).wait(11).to({_off:false,x:213,y:156},0).wait(16).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_235).wait(72).to({_off:false},0).to({_off:true,x:227.45},5).wait(373));
	this.timeline.addTween(cjs.Tween.get(this.instance_237).wait(119).to({_off:false},0).to({x:225,y:175.2},20).wait(1).to({x:220.95,y:180.8},0).wait(1).to({x:215.7},0).wait(1).to({x:215.3,y:187.85},0).wait(2).to({x:213.3,y:187.35},0).wait(2).to({x:210.1},0).wait(2).to({x:200,y:192},0).wait(151).to({startPosition:0},0).to({x:199.1,y:195.55},5).to({_off:true},16).wait(130));

	// Geyebrow2_copy_copy_copy_copy
	this.instance_238 = new lib.Geyebrow2();
	this.instance_238.setTransform(211,158,0.1,0.1);

	this.instance_239 = new lib.Tween102("synched",0);
	this.instance_239.setTransform(227.45,174.4);
	this.instance_239._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_238).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_239).wait(119).to({_off:false},0).to({x:224.1,y:176.05},20).wait(1).to({x:220.05,y:181.65},0).wait(1).to({x:214.8},0).wait(1).to({x:214.4,y:188.7},0).wait(2).to({x:212.4,y:188.2},0).wait(2).to({x:209.2},0).wait(2).to({x:199.1,y:192.85},0).wait(220).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Geyebrow1_copy_copy_copy_copy
	this.instance_240 = new lib.Geyebrow1();
	this.instance_240.setTransform(211,158,0.1,0.1);

	this.instance_241 = new lib.Tween104("synched",0);
	this.instance_241.setTransform(227.45,174.4);
	this.instance_241._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_240).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_241).wait(119).to({_off:false},0).to({x:224.1,y:176.05},20).wait(1).to({x:220.05,y:181.65},0).wait(1).to({x:214.8},0).wait(1).to({x:214.4,y:188.7},0).wait(2).to({x:212.4,y:188.2},0).wait(2).to({x:209.2},0).wait(2).to({x:199.1,y:192.85},0).wait(220).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// G1E_copy_copy_copy_copy
	this.instance_242 = new lib.G1E();
	this.instance_242.setTransform(211,158,0.1,0.1);

	this.instance_243 = new lib.Tween106("synched",0);
	this.instance_243.setTransform(227.45,174.4);
	this.instance_243._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_242).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_243).wait(119).to({_off:false},0).to({x:224.1,y:176.05},20).wait(1).to({x:220.05,y:181.65},0).wait(1).to({x:214.8},0).wait(1).to({x:214.4,y:188.7},0).wait(2).to({x:212.4,y:188.2},0).wait(2).to({x:209.2},0).wait(2).to({x:199.1,y:192.85},0).wait(220).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// GIW_copy_copy_copy_copy
	this.instance_244 = new lib.GIW();
	this.instance_244.setTransform(211,158,0.1,0.1);

	this.instance_245 = new lib.Tween108("synched",0);
	this.instance_245.setTransform(227.45,174.4);
	this.instance_245._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_244).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_245).wait(119).to({_off:false},0).to({x:224.1,y:176.05},20).wait(1).to({x:220.05,y:181.65},0).wait(1).to({x:214.8},0).wait(1).to({x:214.4,y:188.7},0).wait(2).to({x:212.4,y:188.2},0).wait(2).to({x:209.2},0).wait(2).to({x:199.1,y:192.85},0).wait(220).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Green2
	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f("#33CC33").s().p("Ah0B0QgwgvAAhFQAAhEAwgwQAxgwBDAAQBEAAAxAwQAwAwAABEQAABFgwAvQgxAxhEAAQhDAAgxgxg");
	this.shape_59.setTransform(227.1,174.5);

	this.instance_246 = new lib.Tween110("synched",0);
	this.instance_246.setTransform(227.1,174.5);
	this.instance_246._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_59).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_246).wait(119).to({_off:false},0).to({startPosition:0},20).wait(1).to({x:223.05,y:180.1},0).wait(1).to({x:217.8},0).wait(1).to({x:217.4,y:187.15},0).wait(2).to({x:215.4,y:186.65},0).wait(2).to({x:212.2},0).wait(2).to({x:202.1,y:191.3},0).wait(220).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Gumball_1_copy_copy_copy_copy
	this.instance_247 = new lib.Gumball1();
	this.instance_247.setTransform(210,158,0.1,0.1);

	this.instance_248 = new lib.Tween112("synched",0);
	this.instance_248.setTransform(226.45,174.4);
	this.instance_248._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_247).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_248).wait(119).to({_off:false},0).to({startPosition:0},20).wait(1).to({x:222.4,y:180},0).wait(1).to({x:217.15},0).wait(1).to({x:216.75,y:187.05},0).wait(2).to({x:214.75,y:186.55},0).wait(2).to({x:211.55},0).wait(2).to({x:201.45,y:191.2},0).wait(220).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// G_Outline_copy_copy
	this.instance_249 = new lib.GOutline();
	this.instance_249.setTransform(100,163,0.1,0.1);

	this.instance_250 = new lib.Tween114("synched",0);
	this.instance_250.setTransform(116.75,179.75);
	this.instance_250._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_249).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_250).wait(119).to({_off:false},0).to({startPosition:0},20).wait(5).to({y:174.45},0).wait(3).to({x:111.95,y:179.25},0).wait(2).to({x:114.75,y:183.45},0).wait(2).to({x:117.15},0).wait(217).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// GEB_copy_copy
	this.instance_251 = new lib.GEB();
	this.instance_251.setTransform(101,163,0.1,0.1);

	this.instance_252 = new lib.Tween116("synched",0);
	this.instance_252.setTransform(119.45,179.4);
	this.instance_252._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_251).wait(83).to({x:103},0).wait(16).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_252).wait(119).to({_off:false},0).to({x:117.8},20).wait(5).to({y:174.1},0).wait(3).to({x:113,y:178.9},0).wait(2).to({x:115.8,y:183.1},0).wait(2).to({x:118.2},0).wait(145).to({startPosition:0},0).to({x:117.35,y:185.95},8).wait(64).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Geyebrow2_copy_copy
	this.instance_253 = new lib.Geyebrow2();
	this.instance_253.setTransform(101,163,0.1,0.1);

	this.instance_254 = new lib.Tween118("synched",0);
	this.instance_254.setTransform(117.45,179.4);
	this.instance_254._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_253).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_254).wait(119).to({_off:false},0).to({x:116.9},20).wait(5).to({y:174.1},0).wait(3).to({x:112.1,y:178.9},0).wait(2).to({x:114.9,y:183.1},0).wait(2).to({x:117.3},0).wait(217).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Geyebrow1_copy_copy
	this.instance_255 = new lib.Geyebrow1();
	this.instance_255.setTransform(101,163,0.1,0.1);

	this.instance_256 = new lib.Tween120("synched",0);
	this.instance_256.setTransform(117.45,179.4);
	this.instance_256._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_255).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_256).wait(119).to({_off:false},0).to({x:116.9},20).wait(5).to({y:174.1},0).wait(3).to({x:112.1,y:178.9},0).wait(2).to({x:114.9,y:183.1},0).wait(2).to({x:117.3},0).wait(217).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// G1E_copy_copy
	this.instance_257 = new lib.G1E();
	this.instance_257.setTransform(101,163,0.1,0.1);

	this.instance_258 = new lib.Tween122("synched",0);
	this.instance_258.setTransform(117.45,179.4);
	this.instance_258._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_257).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_258).wait(119).to({_off:false},0).to({x:116.9},20).wait(5).to({y:174.1},0).wait(3).to({x:112.1,y:178.9},0).wait(2).to({x:114.9,y:183.1},0).wait(2).to({x:117.3},0).wait(217).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// GIW_copy_copy
	this.instance_259 = new lib.GIW();
	this.instance_259.setTransform(101,163,0.1,0.1);

	this.instance_260 = new lib.Tween124("synched",0);
	this.instance_260.setTransform(117.45,179.4);
	this.instance_260._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_259).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_260).wait(119).to({_off:false},0).to({x:116.9},20).wait(5).to({y:174.1},0).wait(3).to({x:112.1,y:178.9},0).wait(2).to({x:114.9,y:183.1},0).wait(2).to({x:117.3},0).wait(217).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Green
	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f("#33CC33").s().p("Ah0B1QgwgwAAhFQAAhEAwgwQAxgwBDAAQBFAAAvAwQAxAwAABEQAABFgxAwQgvAwhFAAQhDAAgxgwg");
	this.shape_60.setTransform(117,179.5);

	this.instance_261 = new lib.Tween126("synched",0);
	this.instance_261.setTransform(117,179.5);
	this.instance_261._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_60).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_261).wait(119).to({_off:false},0).to({startPosition:0},20).wait(5).to({y:174.2},0).wait(3).to({x:112.2,y:179},0).wait(2).to({x:115,y:183.2},0).wait(2).to({x:117.4},0).wait(217).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Gumball_1_copy_copy
	this.instance_262 = new lib.Gumball1();
	this.instance_262.setTransform(100,163,0.1,0.1);

	this.instance_263 = new lib.Tween128("synched",0);
	this.instance_263.setTransform(116.45,179.4);
	this.instance_263._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_262).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_263).wait(119).to({_off:false},0).to({startPosition:0},20).wait(5).to({y:174.1},0).wait(3).to({x:111.65,y:178.9},0).wait(2).to({x:114.45,y:183.1},0).wait(2).to({x:116.85},0).wait(217).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// G_Outline_copy
	this.instance_264 = new lib.GOutline();
	this.instance_264.setTransform(133,148,0.1,0.1);

	this.instance_265 = new lib.Tween130("synched",0);
	this.instance_265.setTransform(149.75,164.75);
	this.instance_265._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_264).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_265).wait(119).to({_off:false},0).to({startPosition:0},20).wait(2).to({x:148.95},0).wait(2).to({x:153.35,y:169.45},0).wait(2).to({x:157.25,y:177.45},0).wait(1).to({x:166.05,y:183.55},0).wait(1).to({x:176},0).wait(2).to({x:165.9,y:190.2},0).wait(219).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// GEB_copy
	this.instance_266 = new lib.GEB();
	this.instance_266.setTransform(124,153,0.1,0.1);

	this.instance_267 = new lib.Tween132("synched",0);
	this.instance_267.setTransform(142.45,167.4);
	this.instance_267._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_266).wait(72).to({x:127,y:154},0).wait(1).to({x:130},0).wait(4).to({x:124,y:153},0).wait(6).to({x:126,y:151},0).wait(16).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_267).wait(119).to({_off:false},0).to({x:144.65,y:168.5},20).wait(2).to({x:143.85},0).wait(2).to({x:148.25,y:173.2},0).wait(2).to({x:152.15,y:181.2},0).wait(1).to({x:160.95,y:187.3},0).wait(1).to({x:170.9},0).wait(2).to({x:160.8,y:193.95},0).wait(149).to({startPosition:0},0).to({x:159.95,y:197.5},6).wait(64).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Geyebrow2_copy
	this.instance_268 = new lib.Geyebrow2();
	this.instance_268.setTransform(124,153,0.1,0.1);

	this.instance_269 = new lib.Tween134("synched",0);
	this.instance_269.setTransform(140.45,169.4);
	this.instance_269._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_268).wait(72).to({x:127,y:154},0).wait(5).to({x:124,y:153},0).wait(22).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_269).wait(119).to({_off:false},0).to({x:143.8},20).wait(2).to({x:143},0).wait(2).to({x:147.4,y:174.1},0).wait(2).to({x:151.3,y:182.1},0).wait(1).to({x:160.1,y:188.2},0).wait(1).to({x:170.05},0).wait(2).to({x:159.95,y:194.85},0).wait(219).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Geyebrow1_copy
	this.instance_270 = new lib.Geyebrow1();
	this.instance_270.setTransform(124,153,0.1,0.1);

	this.instance_271 = new lib.Tween136("synched",0);
	this.instance_271.setTransform(140.45,169.4);
	this.instance_271._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_270).wait(72).to({x:127,y:154},0).wait(5).to({x:124,y:153},0).wait(22).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_271).wait(119).to({_off:false},0).to({x:143.8},20).wait(2).to({x:143},0).wait(2).to({x:147.4,y:174.1},0).wait(2).to({x:151.3,y:182.1},0).wait(1).to({x:160.1,y:188.2},0).wait(1).to({x:170.05},0).wait(2).to({x:159.95,y:194.85},0).wait(219).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// G1E_copy
	this.instance_272 = new lib.G1E();
	this.instance_272.setTransform(124,153,0.1,0.1);

	this.instance_273 = new lib.Tween138("synched",0);
	this.instance_273.setTransform(140.45,169.4);
	this.instance_273._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_272).wait(72).to({x:127,y:154},0).wait(5).to({x:124,y:153},0).wait(22).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_273).wait(119).to({_off:false},0).to({x:143.8},20).wait(2).to({x:143},0).wait(2).to({x:147.4,y:174.1},0).wait(2).to({x:151.3,y:182.1},0).wait(1).to({x:160.1,y:188.2},0).wait(1).to({x:170.05},0).wait(2).to({x:159.95,y:194.85},0).wait(219).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// GIW_copy
	this.instance_274 = new lib.GIW();
	this.instance_274.setTransform(124,153,0.1,0.1);

	this.instance_275 = new lib.Tween140("synched",0);
	this.instance_275.setTransform(140.45,169.4);
	this.instance_275._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_274).wait(72).to({x:127,y:154},0).wait(5).to({x:124,y:153},0).wait(22).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_275).wait(119).to({_off:false},0).to({x:143.8},20).wait(2).to({x:143},0).wait(2).to({x:147.4,y:174.1},0).wait(2).to({x:151.3,y:182.1},0).wait(1).to({x:160.1,y:188.2},0).wait(1).to({x:170.05},0).wait(2).to({x:159.95,y:194.85},0).wait(219).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Purple
	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f("#993399").s().p("Ah0B0QgwgvAAhFQAAhEAwgwQAwgwBEAAQBFAAAvAwQAxAwAABEQAABFgxAvQgvAxhFAAQhEAAgwgxg");
	this.shape_61.setTransform(150,164.5);

	this.instance_276 = new lib.Tween142("synched",0);
	this.instance_276.setTransform(150,164.5);
	this.instance_276._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_61).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_276).wait(119).to({_off:false},0).to({startPosition:0},20).wait(2).to({x:149.2},0).wait(2).to({x:153.6,y:169.2},0).wait(2).to({x:157.5,y:177.2},0).wait(1).to({x:166.3,y:183.3},0).wait(1).to({x:176.25},0).wait(2).to({x:166.15,y:189.95},0).wait(219).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// Gumball_1_copy
	this.instance_277 = new lib.Gumball1();
	this.instance_277.setTransform(133,148,0.1,0.1);

	this.instance_278 = new lib.Tween144("synched",0);
	this.instance_278.setTransform(149.45,164.4);
	this.instance_278._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_277).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_278).wait(119).to({_off:false},0).to({startPosition:0},20).wait(2).to({x:148.65},0).wait(2).to({x:153.05,y:169.1},0).wait(2).to({x:156.95,y:177.1},0).wait(1).to({x:165.75,y:183.2},0).wait(1).to({x:175.7},0).wait(2).to({x:165.6,y:189.85},0).wait(219).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// G_Outline
	this.instance_279 = new lib.GOutline();
	this.instance_279.setTransform(124,191,0.1,0.1);

	this.instance_280 = new lib.Tween146("synched",0);
	this.instance_280.setTransform(140.75,207.75);
	this.instance_280._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_279).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_280).wait(119).to({_off:false},0).to({startPosition:0},20).wait(1).to({x:137.25,y:207.7},0).wait(4).to({x:134.05},0).wait(1).to({y:205.3},0).wait(2).to({x:136.85},0).wait(1).to({y:209},0).wait(2).to({x:138.85,y:213.75},0).wait(218).to({startPosition:0},0).wait(13).to({startPosition:0},0).wait(69));

	// GEB
	this.instance_281 = new lib.GEB();
	this.instance_281.setTransform(124,195,0.1,0.1);

	this.instance_282 = new lib.Tween148("synched",0);
	this.instance_282.setTransform(142.45,209.4);
	this.instance_282._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_281).wait(83).to({x:126,y:193},0).wait(16).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_282).wait(119).to({_off:false},0).to({x:139.1},20).wait(1).to({x:135.6,y:209.35},0).wait(4).to({x:132.4},0).wait(1).to({y:206.95},0).wait(2).to({x:135.2},0).wait(1).to({y:210.65},0).wait(2).to({x:137.2,y:215.4},0).wait(148).to({startPosition:0},0).to({x:136.35,y:220.4},6).wait(44).to({x:135.4,y:217.1},0).to({x:137.15,y:214.1},1).to({x:139.15,y:211.65},1).to({x:139.05,y:213.4},1).to({x:137.15,y:214.1},1).to({x:135.4},1).to({y:212.7},1).to({y:211.65},1).to({rotation:-8.2121,x:135.25,y:211.9},1).to({rotation:-15.6592,x:132.85,y:212.15},1).to({regX:0.1,regY:0.1,rotation:-23.8647,x:135.1,y:212.5},1).to({rotation:-14.87,x:135.25,y:212.15},1).to({regY:0.2,rotation:0.1285,x:135.55,y:211.8},1).to({rotation:15.1273,x:135.9,y:211.4},1).to({regX:0.2,rotation:21.5696,x:136.15,y:211.25},1).to({rotation:11.8276,x:135.9,y:211.5},1).to({scaleX:0.9999,scaleY:0.9999,rotation:2.6169,x:135.75,y:211.7},1).to({rotation:-12.3824,x:135.55,y:212.15},1).to({rotation:-22.5785,x:135.45,y:212.5},1).to({regX:0.3,regY:0.3,rotation:-7.5792,x:135.8,y:212.1},1).to({regX:0,regY:0,scaleX:1,scaleY:1,rotation:0,x:136.35,y:217.4},1).to({x:139.05,y:217.55},4).to({y:217.4},9).wait(69));

	// Geyebrow2
	this.instance_283 = new lib.Geyebrow2();
	this.instance_283.setTransform(124,195,0.1,0.1);

	this.instance_284 = new lib.Tween150("synched",0);
	this.instance_284.setTransform(140.45,211.4);
	this.instance_284._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_283).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_284).wait(119).to({_off:false},0).to({x:138.25},20).wait(1).to({x:134.75,y:211.35},0).wait(4).to({x:131.55},0).wait(1).to({y:208.95},0).wait(2).to({x:134.35},0).wait(1).to({y:212.65},0).wait(2).to({x:136.35,y:217.4},0).wait(198).to({x:135.4,y:214.1},0).wait(1).to({x:137.15},0).wait(7).to({rotation:-8.2121,x:137.35},0).wait(1).to({regX:0.1,regY:0.1,rotation:-15.6592,x:135.35},0).wait(1).to({rotation:-23.8647,x:137.7,y:214.05},0).wait(1).to({rotation:-14.87,x:137.6,y:214.1},0).wait(1).to({rotation:0.1285,x:137.3,y:214.2},0).wait(1).to({rotation:15.1273,x:136.95},0).wait(1).to({rotation:21.5696,x:136.8,y:214.15},0).wait(1).to({regX:0.2,rotation:11.8276,x:137.2,y:214.25},0).wait(1).to({regY:0.2,scaleX:0.9999,scaleY:0.9999,rotation:2.6169,x:137.45,y:214.35},0).wait(1).to({rotation:-12.3824,x:137.85,y:214.25},0).wait(1).to({regX:0.3,rotation:-22.5785,x:138.2,y:214.15},0).wait(1).to({rotation:-7.5792,x:137.95,y:214.3},0).wait(1).to({regX:0,regY:0,scaleX:1,scaleY:1,rotation:0,x:136.35,y:217.4},0).wait(13).to({startPosition:0},0).wait(69));

	// Geyebrow1
	this.instance_285 = new lib.Geyebrow1();
	this.instance_285.setTransform(124,195,0.1,0.1);

	this.instance_286 = new lib.Tween152("synched",0);
	this.instance_286.setTransform(140.45,211.4);
	this.instance_286._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_285).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_286).wait(119).to({_off:false},0).to({x:138.25},20).wait(1).to({x:134.75,y:211.35},0).wait(4).to({x:131.55},0).wait(1).to({y:208.95},0).wait(2).to({x:134.35},0).wait(1).to({y:212.65},0).wait(2).to({x:136.35,y:217.4},0).wait(198).to({x:135.4,y:214.1},0).wait(1).to({x:137.15},0).wait(7).to({rotation:-8.2121,x:137.35},0).wait(1).to({regX:0.1,regY:0.1,rotation:-15.6592,x:135.35},0).wait(1).to({rotation:-23.8647,x:137.7,y:214.05},0).wait(1).to({rotation:-14.87,x:137.6,y:214.1},0).wait(1).to({rotation:0.1285,x:137.3,y:214.2},0).wait(1).to({rotation:15.1273,x:136.95},0).wait(1).to({rotation:21.5696,x:136.8,y:214.15},0).wait(1).to({regX:0.2,rotation:11.8276,x:137.2,y:214.25},0).wait(1).to({regY:0.2,scaleX:0.9999,scaleY:0.9999,rotation:2.6169,x:137.45,y:214.35},0).wait(1).to({rotation:-12.3824,x:137.85,y:214.25},0).wait(1).to({regX:0.3,rotation:-22.5785,x:138.2,y:214.15},0).wait(1).to({rotation:-7.5792,x:137.95,y:214.3},0).wait(1).to({regX:0,regY:0,scaleX:1,scaleY:1,rotation:0,x:136.35,y:217.4},0).wait(13).to({startPosition:0},0).wait(69));

	// G1E
	this.instance_287 = new lib.G1E();
	this.instance_287.setTransform(124,195,0.1,0.1);

	this.instance_288 = new lib.Tween154("synched",0);
	this.instance_288.setTransform(140.45,211.4);
	this.instance_288._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_287).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_288).wait(119).to({_off:false},0).to({x:138.25},20).wait(1).to({x:134.75,y:211.35},0).wait(4).to({x:131.55},0).wait(1).to({y:208.95},0).wait(2).to({x:134.35},0).wait(1).to({y:212.65},0).wait(2).to({x:136.35,y:217.4},0).wait(198).to({x:135.4,y:214.1},0).wait(1).to({x:137.15},0).wait(7).to({rotation:-8.2121,x:137.35},0).wait(1).to({regX:0.1,regY:0.1,rotation:-15.6592,x:135.35},0).wait(1).to({rotation:-23.8647,x:137.7,y:214.05},0).wait(1).to({rotation:-14.87,x:137.6,y:214.1},0).wait(1).to({rotation:0.1285,x:137.3,y:214.2},0).wait(1).to({rotation:15.1273,x:136.95},0).wait(1).to({rotation:21.5696,x:136.8,y:214.15},0).wait(1).to({regX:0.2,rotation:11.8276,x:137.2,y:214.25},0).wait(1).to({regY:0.2,scaleX:0.9999,scaleY:0.9999,rotation:2.6169,x:137.45,y:214.35},0).wait(1).to({rotation:-12.3824,x:137.85,y:214.25},0).wait(1).to({regX:0.3,rotation:-22.5785,x:138.2,y:214.15},0).wait(1).to({rotation:-7.5792,x:137.95,y:214.3},0).wait(1).to({regX:0,regY:0,scaleX:1,scaleY:1,rotation:0,x:136.35,y:217.4},0).wait(13).to({startPosition:0},0).wait(69));

	// GIW
	this.instance_289 = new lib.GIW();
	this.instance_289.setTransform(124,195,0.1,0.1);

	this.instance_290 = new lib.Tween156("synched",0);
	this.instance_290.setTransform(140.45,211.4);
	this.instance_290._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_289).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_290).wait(119).to({_off:false},0).to({x:138.25},20).wait(1).to({x:134.75,y:211.35},0).wait(4).to({x:131.55},0).wait(1).to({y:208.95},0).wait(2).to({x:134.35},0).wait(1).to({y:212.65},0).wait(2).to({x:136.35,y:217.4},0).wait(198).to({x:135.4,y:214.1},0).wait(1).to({x:137.15},0).wait(7).to({rotation:-8.2121,x:137.35},0).wait(1).to({regX:0.1,regY:0.1,rotation:-15.6592,x:135.35},0).wait(1).to({rotation:-23.8647,x:137.7,y:214.05},0).wait(1).to({rotation:-14.87,x:137.6,y:214.1},0).wait(1).to({rotation:0.1285,x:137.3,y:214.2},0).wait(1).to({rotation:15.1273,x:136.95},0).wait(1).to({rotation:21.5696,x:136.8,y:214.15},0).wait(1).to({regX:0.2,rotation:11.8276,x:137.2,y:214.25},0).wait(1).to({regY:0.2,scaleX:0.9999,scaleY:0.9999,rotation:2.6169,x:137.45,y:214.35},0).wait(1).to({rotation:-12.3824,x:137.85,y:214.25},0).wait(1).to({regX:0.3,rotation:-22.5785,x:138.2,y:214.15},0).wait(1).to({rotation:-7.5792,x:137.95,y:214.3},0).wait(1).to({regX:0,regY:0,scaleX:1,scaleY:1,rotation:0,x:136.35,y:217.4},0).wait(13).to({startPosition:0},0).wait(69));

	// Blue
	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f("#0066CC").s().p("Ah0B0QgwgwAAhEQAAhEAwgwQAwgwBEAAQBFAAAvAwQAxAwAABEQAABEgxAwQgvAxhFAAQhEAAgwgxg");
	this.shape_62.setTransform(141,207.5);

	this.instance_291 = new lib.Tween158("synched",0);
	this.instance_291.setTransform(141,207.5);
	this.instance_291._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape_62).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_291).wait(119).to({_off:false},0).to({startPosition:0},20).wait(1).to({x:137.5,y:207.45},0).wait(4).to({x:134.3},0).wait(1).to({y:205.05},0).wait(2).to({x:137.1},0).wait(1).to({y:208.75},0).wait(2).to({x:139.1,y:213.5},0).wait(206).to({rotation:-8.2121,x:139.2,y:213.2},0).wait(1).to({rotation:-15.6592,x:136.95,y:212.95},0).wait(1).to({rotation:-23.8647,x:139.15,y:212.7},0).wait(1).to({regX:0.1,regY:0.1,rotation:-14.87,x:139.35,y:213.05},0).wait(1).to({rotation:0.1285,x:139.25,y:213.65},0).wait(1).to({rotation:15.1273,x:138.95,y:214.15},0).wait(1).to({rotation:21.5696,x:138.8,y:214.3},0).wait(1).to({regY:0.2,rotation:11.8276,x:139.05,y:214.1},0).wait(1).to({scaleX:0.9999,scaleY:0.9999,rotation:2.6169,x:139.25,y:213.8},0).wait(1).to({regX:0.2,rotation:-12.3824,x:139.55,y:213.25},0).wait(1).to({regY:0.3,rotation:-22.5785,x:139.6,y:212.95},0).wait(1).to({regY:0.4,rotation:-7.5792,y:213.65},0).wait(1).to({regX:0,regY:0,scaleX:1,scaleY:1,rotation:0,x:139.1,y:213.5},0).wait(13).to({startPosition:0},0).wait(69));

	// Gumball_1
	this.instance_292 = new lib.Gumball1();
	this.instance_292.setTransform(124,191,0.1,0.1);

	this.instance_293 = new lib.Tween160("synched",0);
	this.instance_293.setTransform(140.45,207.4);
	this.instance_293._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_292).wait(99).to({_off:true},20).wait(331));
	this.timeline.addTween(cjs.Tween.get(this.instance_293).wait(119).to({_off:false},0).to({startPosition:0},20).wait(1).to({x:136.95,y:207.35},0).wait(4).to({x:133.75},0).wait(1).to({y:204.95},0).wait(2).to({x:136.55},0).wait(1).to({y:208.65},0).wait(2).to({x:138.55,y:213.4},0).to({_off:true},29).wait(271));

	// bACKGROUN
	this.instance_294 = new lib.Background();
	this.instance_294.setTransform(0,0,0.1,0.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_294).wait(450));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(135.7,80.5,1988.3,2919.5);
// library properties:
lib.properties = {
	id: '25DDF026157345DCBB4154C3D3D8FC43',
	width: 400,
	height: 300,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/Background.jpg", id:"Background"},
		{src:"images/GOutline.png", id:"GOutline"},
		{src:"images/G1E.png", id:"G1E"},
		{src:"images/GBCrown.png", id:"GBCrown"},
		{src:"images/GEB.png", id:"GEB"},
		{src:"images/Geyebrow1.png", id:"Geyebrow1"},
		{src:"images/Geyebrow2.png", id:"Geyebrow2"},
		{src:"images/GIW.png", id:"GIW"},
		{src:"images/Glass.png", id:"Glass"},
		{src:"images/Gumball1.png", id:"Gumball1"},
		{src:"images/Hardware.png", id:"Hardware"},
		{src:"images/Layer2.png", id:"Layer2"},
		{src:"images/Layer22.png", id:"Layer22"},
		{src:"images/Layer23.png", id:"Layer23"},
		{src:"images/Layer24.png", id:"Layer24"},
		{src:"images/Layer49.png", id:"Layer49"},
		{src:"images/Layer5.png", id:"Layer5"},
		{src:"images/LM.png", id:"LM"},
		{src:"images/Saviour.png", id:"Saviour"},
		{src:"images/Saviour2.png", id:"Saviour2"},
		{src:"images/SIE.png", id:"SIE"},
		{src:"images/SpEB.png", id:"SpEB"},
		{src:"images/SpecialEyeball.png", id:"SpecialEyeball"},
		{src:"images/SpecialEyes.png", id:"SpecialEyes"},
		{src:"images/Title_Button.png", id:"Title_Button"},
		{src:"images/Title_Text.png", id:"Title_Text"},
		{src:"sounds/applause.mp3", id:"applause"},
		{src:"sounds/chewinggum73551mp3.mp3", id:"chewinggum73551mp3"},
		{src:"sounds/Footstepsmp3onlineaudioconvertcom.mp3", id:"Footstepsmp3onlineaudioconvertcom"},
		{src:"sounds/gasp81796mp3.mp3", id:"gasp81796mp3"},
		{src:"sounds/gasphoh104639mp3.mp3", id:"gasphoh104639mp3"},
		{src:"sounds/Gasp.mp3", id:"Gasp"},
		{src:"sounds/hmmmm.mp3", id:"hmmmm"},
		{src:"sounds/Machine.mp3", id:"Machine"},
		{src:"sounds/Machinemp3copy.mp3", id:"Machinemp3copy"},
		{src:"sounds/marbles63784mp3.mp3", id:"marbles63784mp3"},
		{src:"sounds/outdoor.mp3", id:"outdoor"},
		{src:"sounds/V1.mp3", id:"V1"},
		{src:"sounds/V3.mp3", id:"V3"},
		{src:"sounds/whimpering85279mp3.mp3", id:"whimpering85279mp3"},
		{src:"sounds/whimpering85279mp3mp3copy.mp3", id:"whimpering85279mp3mp3copy"},
		{src:"sounds/whoohoo.mp3", id:"whoohoo"},
		{src:"sounds/yayy.mp3", id:"yayy"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['25DDF026157345DCBB4154C3D3D8FC43'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;