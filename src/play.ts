var EACH_WIDTH = 50

var canvas: any = document.getElementById("canvas")
var ctx = canvas.getContext("2d")

var BLACK = "rgb(0,0,0)"
var WHITE = "rgb(255,255,255)"

var gradient = ctx.createLinearGradient(0, 0, EACH_WIDTH, 0)
gradient.addColorStop(0, BLACK)
gradient.addColorStop(1, WHITE)

var colorForBackground = function(background: number): string {
  if (background === 0) {
    return BLACK;
  } else if (background === 1) {
    return gradient;
  } else {
    return WHITE
  }
}


var colorForSpacePrimaryAlpha = function(space: number, primary: number, alpha: number): string {
  var red = 0
  var green = 0
  var blue = 0

  var MAX = 255
  var SQMAX = 255

  if (space === 0) { // RGB
    if (primary === 0) { red = MAX; }    // r
    if (primary === 1) { green = MAX; }  // g
    if (primary === 2) { blue = MAX; }   // b
  } else { // CMY
    if (primary === 0) { green = SQMAX; blue = SQMAX; } // c 
    if (primary === 1) { blue = SQMAX; red = SQMAX; }   // m 
    if (primary === 2) { red = SQMAX; green = SQMAX; }  // y 
  }

  var color = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")"
  return color
}

var render = function() {

  var r = Math.floor(Math.random() * 3)
  
  for (var background = 0; background < 3; background++) { ctx.save()
    ctx.translate(EACH_WIDTH * 2 * background, 0);

    ctx.beginPath() 
    ctx.fillStyle = colorForBackground(background)
    ctx.rect(0, 0, background * EACH_WIDTH * 2, EACH_WIDTH * 8)
    ctx.fill()
    
    for (var colorspace = 0; colorspace < 2; colorspace++) { ctx.save()
      ctx.translate(EACH_WIDTH / 2 + EACH_WIDTH * colorspace, 0)

      var MAX_ALPHA = 1.0
      for (var alpha = 0; alpha < MAX_ALPHA; alpha += MAX_ALPHA / 8) { ctx.save()
        ctx.translate(0, EACH_WIDTH / 2 + EACH_WIDTH * 8 * alpha / MAX_ALPHA)


        for (var p = 0; p < 3; p++) { ctx.save()
          
          var primary = (p + r) % 3
          
          var angle = primary * (2 / 3) * Math.PI
          ctx.rotate(angle)
          ctx.translate(0, -EACH_WIDTH / 6)

          ctx.beginPath()
          ctx.arc(0, 0, EACH_WIDTH / 4, 0, Math.PI * 2);
          ctx.fillStyle = colorForSpacePrimaryAlpha(colorspace, primary, alpha)
          ctx.fill()

        ctx.restore() }
      ctx.restore() }
    ctx.restore() } 
  ctx.restore() }
}

render()
//setInterval(render, 1000 / FPS)
