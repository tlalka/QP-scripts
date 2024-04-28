
  //record an array of stars
  const starNum = 25;
  const starSize = 4;
  var stepA = 0.25;
  var stepAdir = 1;
  const speedA = 0.02;
  const speedY = -0.25; //only works in one way
  var starArray = [];

  //Get context and screen size;
  let W = document.getElementById("overlay").offsetWidth;
  let H = document.getElementById("overlay").offsetHeight;
  const ctxStars = stars.getContext("2d");
  const ctxMars = mars.getContext("2d");
  const ctxBack = bg.getContext("2d");
  stars.width = W;
  stars.height = H;
  mars.width = W;
  mars.height = H;
  bg.width = W;
  bg.height = H;

  //Get Mars center
  marsRet = getMarsCenter(W);
  marsR = marsRet[0];
  marsX = marsRet[1];
  marsY = marsRet[2];

  
  function getMarsCenter(W){
    marsR = W * .75;
    marsX = W / 2;
    marsY = marsR * 1.25;
    return [marsR, marsX, marsY];
  }

  function resizeCanvas() {
    H = document.getElementById("overlay").offsetHeight;
    document.getElementById("bg").style.height = H;
    document.getElementById("stars").style.height = H;
    document.getElementById("mars").style.height = H;
    document.getElementById("book-container").style.height = H;

    W = document.getElementById("overlay").offsetWidth;
    document.getElementById("bg").style.width = W;
    document.getElementById("stars").style.width = W;
    document.getElementById("mars").style.width = W;
    document.getElementById("book-container").style.width = W;

    stars.width = W;
    stars.height = H;
    mars.width = W;
    mars.height = H;
    bg.width = W;
    bg.height = H;

    //Get Mars center
    marsRet = getMarsCenter(W);
    marsR = marsRet[0];
    marsX = marsRet[1];
    marsY = marsRet[2];
    drawBack();
    drawMars();
    starArray = makeStars();
  }

  //resize as soon as possible to avoid items jumpting around
  document.addEventListener("DOMContentLoaded", () => {
    resizeCanvas();
});
  window.onload = function () {
    window.addEventListener("resize", resizeCanvas, false);
    drawBack();
    drawMars();
    starArray = makeStars();
    setInterval(render, 50);
    resizeCanvas();//sometime it loads incorrectly on mobile, so resize again
  };