// Daniel Shiffman
// http://codingtra.in
// Steering Text Paths
// Video: https://www.youtube.com/watch?v=4hA7G3gup-4

let font;
let textPoints = []; //current on showing text points array
let textList = ["Hey", "friends", "whatup"];
// let textList = ["Hey", "we", "are", "Sencity", "whatup"];
// let textList = ["最毕设","蔡雨利","新媒体编程","无限可能"];
let breakDownTexts = []; //array to hold sets of points for different text
const FONT_SIZE = 100;
let currentIndex = 0;

function preload() {
    font = loadFont('AvenirNextLTPro-Demi.otf');
    // font = loadFont('simhei.ttf');
}

function setup() {
    createCanvas(900, 300);
    background(0);


    for (let i = 0; i < textList.length; i++) {
      // let sampe_factor = map(textList[i].length, 3, 5, 0.20, .23);
        let sampe_factor = map(textList[i].length, 3, 7, 0.2, .24);
        let bbox = font.textBounds(textList[i],0,0,FONT_SIZE);
        let halfWidth = bbox.w/2;
        let xPos = width/2 - halfWidth;
        let yPos = height / 2;
        let currentBreakDown = font.textToPoints(textList[i], xPos, yPos, FONT_SIZE, {
            sampleFactor: sampe_factor
        });
        breakDownTexts.push(currentBreakDown);
    }


    // let randomIndex = int(random(breakDownTexts.length));
    for (let i = 0; i < breakDownTexts[currentIndex].length; i++) {
        let pt = breakDownTexts[currentIndex][i];
        let textPoint = new SteeringObject(pt.x, pt.y);
        textPoints.push(textPoint);
    }
    currentIndex++;
}

function draw() {
    background(51);
    for (var i = 0; i < textPoints.length; i++) {
        var v = textPoints[i];
        v.run();
        v.update();
        v.show();
    }
}


window.addEventListener("keydown",function(e){
  if(e.keyCode == 32){
    //press space key
    reset();
  }
});

function reset() {
    textPoints = [];
    // let randomIndex = int(random(breakDownTexts.length));
    if(currentIndex>=textList.length) currentIndex = 0;
    for (let i = 0; i < breakDownTexts[currentIndex].length; i++) {
        let pt = breakDownTexts[currentIndex][i];
        let textPoint = new SteeringObject(pt.x, pt.y);
        textPoints.push(textPoint);
    }
    currentIndex++;

}