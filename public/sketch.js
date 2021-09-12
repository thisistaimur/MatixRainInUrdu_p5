var streams = [];
var fadeInterval = 1.6;
var fade;
var fadeAmount = 1;
var symbolSize = 20;
var urdu = [
  0x0627, 0x0628, 0x067e, 0x062a, 0x0679, 0x062b, 0x062c, 0x0686, 0x062d,
  0x062e, 0x062f, 0x0688, 0x0630, 0x0631, 0x0691, 0x0632, 0x0698, 0x0633,
  0x0634, 0x0635, 0x0636, 0x0637, 0x0638, 0x0639, 0x063a, 0x064a, 0x0641,
  0x0642, 0x06a9, 0x06af, 0x0644, 0x0645, 0x0646, 0x06ba, 0x0648, 0x06c1,
  0x06be, 0x06cc, 0x06d2, 0x0621,
];
var data = "یاد رکھیں ، میں جو کچھ پیش کر رہا ہوں وہ سچ ہے۔ سچ سے زیادہ کچھ نہیں۔";

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(0);
  var x = 0;
  for (var i = 0; i <= width / symbolSize; i++) {
    var stream = new Stream();
    stream.generateSymbols(x, random(-2000, 0));
    streams.push(stream);
    x += symbolSize;
  }

  //textFont("Consolas");
  textSize(symbolSize);
  alpha = 1;
  fade = 200

}

function draw() {
  background(0, 150);
  writeText();
  /* myButton = new Clickable();
  myButton.locate(width/2, height/2+200);
  myButton.draw();
  myButton.onPress = function(){  //When myButton is pressed
    streams.forEach(function (stream) {
      stream.render();
    });           
  } */
  //typeWriter(data, 1, width/2, height/2, 500);
  setInterval(function hideText() {
    if (fade > 255) fadeAmount = -10;
    fade += fadeAmount;
  }, 7000);
  streams.forEach(function (stream) {
    stream.render();
  });
}

function writeText() {
  fill(140, 255, 170, fade);
  textAlign(CENTER, CENTER);
  textSize(30);
  //fade = 120
  text("یاد رکھیں ، میں جو کچھ پیش کر رہا ہوں وہ سچ ہے۔ سچ سے زیادہ کچھ نہیں۔", width / 2, height / 2);
  //if (fade<0) fadeAmount=1;
  //if (fade>255) fadeAmount=-100;
  /*  let div = createDiv('آپ کو میٹرکس میں خوش آمدید۔"');
div.style('font-size', '20px');
div.position(width/2, height/2); */
}

function typeWriter(sentence, n, x, y, speed) {
  textAlign(CENTER, CENTER);
  textSize(30);
  if (n < sentence.length) {
    text(sentence.substring(0, n + 1), x, y);
    n++;
    setTimeout(function () {
      typeWriter(sentence, n, x, y, speed);
    }, speed);
  }
}

function hideText() {}

function Symbol(x, y, speed, first, opacity) {
  this.x = x;
  this.y = y;
  this.value;

  this.speed = speed;
  this.first = first;
  this.opacity = opacity;

  this.switchInterval = round(random(2, 25));

  this.setToRandomSymbol = function () {
    var charType = round(random(0, 5));
    if (frameCount % this.switchInterval == 0) {
      if (charType > 1) {
        // set it to Katakana
        this.value = String.fromCharCode(random(urdu));
      } else {
        // set it to numeric
        this.value = String.fromCharCode(0x0627 + floor(random(0, 37)));
      }
    }
  };

  this.rain = function () {
    this.y = this.y >= height ? 0 : (this.y += this.speed);
  };
}

function Stream() {
  this.symbols = [];
  this.totalSymbols = round(random(5, 35));
  this.speed = random(2, 6);

  this.generateSymbols = function (x, y) {
    var opacity = 255;
    var first = round(random(0, 4)) == 1;
    for (var i = 0; i <= this.totalSymbols; i++) {
      symbol = new Symbol(x, y, this.speed, first, opacity);
      symbol.setToRandomSymbol();
      this.symbols.push(symbol);
      opacity -= 255 / this.totalSymbols / fadeInterval;
      y -= symbolSize;
      first = false;
    }
  };

  this.render = function () {
    this.symbols.forEach(function (symbol) {
      if (symbol.first) {
        fill(140, 255, 170, symbol.opacity);
      } else {
        fill(0, 255, 70, symbol.opacity);
      }
      text(symbol.value, symbol.x, symbol.y);
      symbol.rain();
      symbol.setToRandomSymbol();
    });
  };
}
