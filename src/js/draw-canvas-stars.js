
  //record an array of stars
  const starNum = 25;
  const starSize = 4;
  var stepA = 0.25;
  var stepAdir = 1;
  const speedA = 0.02;
  const speedY = 0.25; //only works in one way
  var starArray = [];

  //Get context and screen size;
  var W = document.getElementById("book-container").offsetWidth;
  var H = document.getElementById("book-container").offsetHeight;
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
    marsR = W * 2;
    marsX = W / 2;
    marsY = -marsR * 0.99;
    return [marsR, marsX, marsY];
  }

  function resizeCanvas() {
    W = document.getElementById("book-container").offsetWidth;
    H = document.getElementById("book-container").offsetHeight;
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
    starArray = makeStars();
  }

  //resize as soon as possible to avoid items jumpting around
  document.addEventListener("DOMContentLoaded", () => {
    resizeCanvas();
});
  window.onload = function () {
    window.addEventListener("resize", resizeCanvas, false);
    drawBack();
    starArray = makeStars();
    setInterval(render, 50);
    resizeCanvas();//sometime it loads incorrectly on mobile, so resize again
  };