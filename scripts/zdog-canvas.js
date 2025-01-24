// zdog-canvas.js

// NOTE: All of this code is done in the naive way, because it is lazy zzz.

const TAU = Zdog.TAU;
const PI = Zdog.TAU/2;

// --- colors --- //

var gray = '#82848D';
var cyan = '#58ACF2';
var blue = '#3E88C5';

// ---- canvas ---- //

var illo = new Zdog.Illustration({
    element: '.zdog-canvas',
    dragRotate: true,
    resize: false,
    zoom: 11/25,
});


// ---- agda's chicken  ---- //

let face = new Zdog.Shape({
    addTo: illo,
    path: [
        { x:  8, y: -24  },
        { x: -24, y:  16 },
        
        { x: -24, y:  16 },
        { x: -4,  y:  16 },

        { x: -4,  y:  16 },
        { x: -4,  y:  40 },
    ],
    translate: { z: -40 },
    closed: false,
    stroke: 16,
    color: gray,
});

let belly = new Zdog.Ellipse({
    addTo: illo,
    diameter: 88,
    quarters: 2,
    translate: { x: 40, y: 40, z: -40 },  
    rotate: { z: PI/2 },  
    stroke: 16,
    color: gray,
});


let tailfeather = new Zdog.Shape({
    addTo: illo,
    path: [
        { x:  -16, y: -16 },
        { x: -16, y:  2 },
    ],
    translate: { x: 100, y: 36, z: -40 },
    closed: false,
    stroke: 16,
    color: gray,
});


let tailfeatherup = new Zdog.Shape({
    addTo: illo,
    path: [
        { x: 8, y: -16 },
        { x: -16, y:  8 },
    ],
    translate: { x: 100, y: 8, z: -40  },
    closed: false,
    stroke: 16,
    color: gray,
});


let agda3 = new Zdog.Shape({
    addTo: illo,
    path: [
        { x:  12, y: -24 },
        { x: -24, y:  12 },
    ],
    translate: { x: 72, y: 4, z: -40 },
    closed: false,
    stroke: 16,
    color: gray,
});


// ---- flake ---- //

// TODO: Refactor this.
let lambda = new Zdog.Shape({
    addTo: illo,
    path: [
        { x:  -16, y: -24 },
        { x:   16, y:  24 },
        { x:    0, y:   0 },
        { x:  -16, y:  24 },
    ],
    translate: {z: 40},
    closed: false,
    stroke: 16,
    color: blue,
});

lambda.copy({
    translate: { x: 48, z: 40 },
    rotate: { z: -0.97 },
    color: cyan,
});

lambda.copy({
    translate: { x: 72, y: -40, z: 40 },
    rotate: { z: -2 },
    color: blue,
});

lambda.copy({
    translate: { x: 48, y: -80, z: 40 },
    rotate: { z: PI },
    color: cyan,
});

lambda.copy({
    translate: { x: 0, y: -80, z: 40 },
    rotate: { z: PI - 1 },
    color: blue,
});

lambda.copy({
    translate: { x: -24, y: -40, z: 40 },
    rotate: { z: PI - 2 },
    color: cyan,
});

// ----- animate : spin ----- //

// var isSpinning = true;
// var ticker = 0;
// var cycleCount = 180;

// function animate() {
//   spin();
//   illo.updateRenderGraph();
//   requestAnimationFrame( animate );
// }

// function spin() {
//   if ( !isSpinning ) {
//     return;
//   }
//   var progress = ticker/cycleCount;
//   var turn = Math.floor( progress % 4 );
//   var theta = Zdog.easeInOut( progress % 1, 3 ) * TAU;
//   if ( turn == 0 || turn == 2 ) {
//     illo.rotate.y = theta;
//   } else if ( turn == 1 ) {
//     illo.rotate.x = theta;
//   } else if ( turn == 3 ) {
//     illo.rotate.z = theta;
//   }
//   ticker++;
// }

// animate();


// ---- animate ---- //

var isSpinning = true;
var rotateSpeed = -TAU/120;
var xClock = 0;
var then = new Date() - 1/120;

function animate() {
    update();
    illo.renderGraph();
    requestAnimationFrame( animate );
}

animate();

// --- update -- //

function update() {
    var now = new Date();
    var delta = now - then;
    // auto rotate
    if ( isSpinning ) {
        var theta = rotateSpeed/120 * delta * -1;
        illo.rotate.y += theta;
        xClock += theta/4;
        illo.rotate.x = Math.sin( xClock ) * TAU/12;
    }

    illo.updateGraph();

    then = now;
}
