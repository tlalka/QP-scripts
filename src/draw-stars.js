

  function makeStars() {
    let stars = [];
    //Random position and size of stars;
    for (let i = 0; i < starNum; i++) {
      let x = W * Math.random();
      let y = H * Math.random();
      let r = starSize * (Math.random() + .75);
      let step = 0;
      let speed = speedY * (Math.random() * (1 - 0.1) + 0.1);
      stars[i] = new Star(x, y, r, step, speed);
    }
    return stars;
  }

  class Star {
    constructor(x, y, r, step, speed) {
      this.x = x;
      this.y = y;
      this.r = r;
      this.step = step;
      this.speed = speed;
    }
  }

  function render() {
    ctxStars.clearRect(0, 0, W, H);

    //
    if (stepA >= 1) {
      stepAdir = 1;
    } else if (stepA <= 0.1) {
      stepAdir = 0;
    }
    //Alpha change
    if (stepAdir == 1) {
      stepA = stepA - speedA;
    } else {
      stepA = stepA + speedA;
    }

    for (let i = 0; i < starArray.length; i++) {
      if (starArray[i].step <= 0) {
        starArray[i].step = H;
      } else {
        starArray[i].step = starArray[i].step + starArray[i].speed;
      }

      ctxStars.beginPath();
      num = Math.abs(stepA + i / starArray.length - 1);
      fillstyle = "rgba(255, 255, 255," + String(num) + ")";
      ctxStars.fillStyle = fillstyle;
      newStarY = (starArray[i].y + starArray[i].step) % H;
      ctxStars.save();
      drawDiamond(starArray[i].x, newStarY, starArray[i].r, starArray[i].r * 2);
      ctxStars.fill();
      ctxStars.restore();
      //add center for extra glow
      ctxStars.arc(
        starArray[i].x,
        newStarY + starArray[i].r,
        starArray[i].r / 5,
        0,
        Math.PI * 2
      );
      ctxStars.fill();
    }
    //ctxStars.globalAlpha = stepA;
    ctxStars.shadowBlur = 5;
    ctxStars.shadowColor = "white";
    //console.log("run render");
  }

  function drawDiamond(x, y, width, height) {
    ctxStars.beginPath();
    ctxStars.moveTo(x, y);

    ctxStars.lineTo(x - width / 2, y + height / 2);
    ctxStars.lineTo(x, y + height);
    ctxStars.lineTo(x + width / 2, y + height / 2);
    ctxStars.closePath();
  }