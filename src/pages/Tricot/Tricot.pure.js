const colorToHex = (color) => {
  var hexadecimal = color.toString(16);
  return hexadecimal.length === 1 ? "0" + hexadecimal : hexadecimal;
};

const convertRGBtoHex = (red, green, blue) => `#${colorToHex(red)}${colorToHex(green)}${colorToHex(blue)}`;

export const colorFromAnImage = (imagePath) => {
  return new Promise((resolve) => {
    const colors = [];
    const myImg = new Image();
    myImg.crossOrigin = "Anonymous";
    myImg.src = imagePath;
    myImg.onload = () => {
      const context = document.createElement("canvas").getContext("2d");
      context.drawImage(myImg, 0, 0);
      let count = 0;
      for (let i = 0; i < myImg.width; i++) {
        count += 1;
        colors.push([]);
        for (let j = 0; j < myImg.height; j++) {
          const {
            data: [r, g, b],
          } = context.getImageData(j, i, 1, 1);
          colors[i].push(convertRGBtoHex(r, g, b));
          count += 1;
          console.log(`${((count * 100) / (myImg.width * myImg.height)).toFixed(2)}%`);
        }
      }
      resolve(colors);
    };
  });
};
