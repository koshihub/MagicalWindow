
var bg;
var width = 400;
var height = 300;

var start = function() {
	bg = document.getElementById("background");

	var obj = new Snow();
	obj.play();
};

function Obj(image, x, y) {
	this.e = document.createElement("img");
	this.e.src = image;
	this.e.style.position = "absolute";
	this.e.style.left = x + "px";
	this.e.style.top = y + "px";
}
Obj.prototype = {
	append: function() {
		bg.appendChild(this.e);
	},
	remove: function() {
		bg.removeChild(this.e);
	}
};

function Snow() {
	this.background_color = "#010101";
	this.objects = [
		new Obj("./images/snow/light.png", 40, 80)
	];
	this.particle = document.createElement("div");
	this.particle.setAttribute("class", "snow particle");
}

Snow.prototype = {
	play: function() {
		bg.style.backgroundColor = this.background_color;

		for(var i=0; i<this.objects.length; i++) {
			this.objects[i].append();
		}

		setTimeout(function(self) {
			var e = self.particle.cloneNode(false);
			bg.appendChild(e);
			(function(e, x, y) {
				//x += Math.random()*2;
				y += 1;
				e.style.left = x + "px";
				e.style.top = y + "px";
				if( y < height ) {
					setTimeout(arguments.callee, 16, e, x, y);
				} else {
					bg.removeChild(e);
				}
			})(e, Math.random()*400, 0);
			setTimeout(arguments.callee, 100+Math.random()*800, self);
		}, 1, this);
	},
};

window.onload = start;