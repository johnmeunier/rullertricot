const colorToHex = (color) => {
  var hexadecimal = color.toString(16);
  return hexadecimal.length === 1 ? "0" + hexadecimal : hexadecimal;
};

const convertRGBtoHex = (red, green, blue) => `#${colorToHex(red)}${colorToHex(green)}${colorToHex(blue)}`;

// const averageColor = (colors) => {
//   const sizeOfAChunk = 4;
//   const precision = colors.length / sizeOfAChunk;
//   let rSum = 0;
//   for (let i = 0; i < colors.length; i += sizeOfAChunk) {
//     rSum += colors[i];
//   }
//   let gSum = 0;
//   for (let i = 1; i < colors.length; i += sizeOfAChunk) {
//     gSum += colors[i];
//   }
//   let bSum = 0;
//   for (let i = 2; i < colors.length; i += sizeOfAChunk) {
//     bSum += colors[i];
//   }
//   return { r: rSum / precision, g: gSum / precision, b: bSum / precision };
// };

const repeat = (fn, times) => {
  Array.from({ length: times }, () => {
    fn();
  });
};

export const colorFromAnImage = (imagePath) => {
  return new Promise((resolve) => {
    const colors = [];
    const myImg = new Image();
    myImg.src = imagePath;
    myImg.onload = () => {
      const context = document.createElement("canvas").getContext("2d");
      context.drawImage(myImg, 0, 0);
      let count = 0;
      const precision = 8;
      for (let i = 0; i < myImg.width; i += precision) {
        count += 1 * precision;
        repeat(() => colors.push([]), precision);
        for (let j = 0; j < myImg.height; j += precision) {
          // const { data } = context.getImageData(j, i, 1, 1);
          // const { r, g, b } = averageColor(data);
          const {
            data: [r, g, b],
          } = context.getImageData(j, i, 1, 1);
          repeat(() => {
            for (let x = 0; x < precision; x++) {
              colors[i + x].push(convertRGBtoHex(r, g, b));
            }
          }, precision);
          count += 1 * precision;
          console.log(`${((count * 100) / (myImg.width * myImg.height)).toFixed(2)}%`);
        }
      }
      resolve(colors);
    };
  });
};
