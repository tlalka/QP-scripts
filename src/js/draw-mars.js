
  function drawMars() {
    //Draw Mars
    ctxMars.beginPath();
    ctxMars.arc(marsX, marsY, marsR, 0, 2 * Math.PI);
    ctxMars.fillStyle = marsC;
    ctxMars.fill();
  }

  function drawBack() {
    //Set Canvas and Background Color;
    let my_gradient = ctxBack.createRadialGradient(
      marsX,
      marsY,
      marsR * 0.95,
      marsX,
      marsY,
      marsR * 1.05
    );
    my_gradient.addColorStop(0, glowC);
    my_gradient.addColorStop(1, backC);
    ctxBack.fillStyle = my_gradient;
    ctxBack.fillRect(0, 0, W, H);
  }


