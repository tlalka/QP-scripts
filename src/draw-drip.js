
function createDrop() {
  var dropHouse = document.createElement("div");
  var dropBody = document.createElement("div");
  dropHouse.innerHTML = `
    <div class="toggle-btn"></div>
  <div class="drop">`;
  dropHouse.setAttribute("class", "toggle-buttons");

  dropBody.innerHTML = `
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <defs>
      <filter id="goo">
        <feGaussianBlur in="SourceGraphic" stdDeviation="15"/>
        <feColorMatrix in="blur" mode="matrix" values="1 .5 0 0 0  0 10 0 0 0  0 0 10 0 0  0 0 0 25 -10" result="goo" />
      </filter>
    </defs>
    </svg>`;
  container_block = document.getElementById("dropcontainer");
  container_block.appendChild(dropHouse);
  container_block.appendChild(dropBody);
}

function setDropLoc() {
  //only works for one drop right now
  drop1 = document.getElementsByClassName("toggle-btn")[0];
  drop1.style.top = marsY;
  drop1.style.left = marsX;
  drop1.style.width = marsR * 2;
  drop1.style.height = marsR * 2;
  drop2 = document.getElementsByClassName("drop")[0];
  drop2.style.top = marsY + marsR - 30; //smooth animation
  drop2.style.left = marsX;
}
