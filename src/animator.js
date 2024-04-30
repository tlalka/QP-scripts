class Animator {
    constructor(containerId, images, map, imagePath) {
      this.index = 0;
      this.path = imagePath;
      this.images = images;
      this.aniMap = map;
      this.imageContainer = document.getElementById(containerId);
      this.preloadedImages = this.images.map((image) => {
        let img = new Image();
        img.src = this.path + image + ".png";
        return img;
      });
    }

    changeImage() {
      let img = this.path + this.images[this.aniMap[this.index][0]] + ".png";
      let delay = this.aniMap[this.index][1];

      this.imageContainer.style.backgroundImage = `url('${img}')`;
      this.index = (this.index + 1) % this.aniMap.length;

      setTimeout(() => this.changeImage(), delay); // Use an arrow function to maintain the context of 'this'
    }

    start() {
      this.changeImage(); // Start the animation
    }
  }

  // Usage
  const umbraImages = [
    "umbra-base",
    "umbra-blink-1",
    "umbra-blink-2",
    "umbra-blink-3",
  ];
  const umbraMap = [
    [1, 120],
    [2, 120],
    [3, 180],
    [2, 60],
    [1, 60],
    [0, 2400],
  ];
  const animatorU = new Animator(
    "umbra-ani",
    umbraImages,
    umbraMap,
    "../src/imgs/ani/"
  );
  animatorU.start();

  // Usage
  const deziImages = [
    "dezi-base",
    "dezi-blink-1",
    "dezi-blink-2",
    "dezi-blink-3",
    "dezi-blink-4",
  ];
  const deziMap = [
    [0, 2400],
    [1, 80],
    [2, 80],
    [3, 80],
    [4, 180],
    [3, 40],
    [2, 40],
    [1, 40],
  ];
  const animatorD = new Animator(
    "dezi-ani",
    deziImages,
    deziMap,
    "../src/imgs/ani/"
  );
  animatorD.start();