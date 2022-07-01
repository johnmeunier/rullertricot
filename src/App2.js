import { useRef, useState, useEffect } from "react";
import image from "./assets/petitkoko.png";
import "./App2.scss";

function ColorToHex(color) {
  var hexadecimal = color.toString(16);
  return hexadecimal.length == 1 ? "0" + hexadecimal : hexadecimal;
}

function ConvertRGBtoHex(red, green, blue) {
  return "#" + ColorToHex(red) + ColorToHex(green) + ColorToHex(blue);
}

const colorFromAnImage = (imagePath, width, height) => {
  return new Promise((resolve) => {
    const colors = [];
    const myImg = new Image();
    myImg.crossOrigin = "Anonymous";
    myImg.src = imagePath;
    myImg.onload = () => {
      const context = document.createElement("canvas").getContext("2d");
      context.drawImage(myImg, 0, 0);
      let count = 0;
      for (let i = 0; i < width; i++) {
        count += 1;
        colors.push([]);
        for (let j = 0; j < height; j++) {
          const {
            data: [r, g, b],
          } = context.getImageData(j, i, 1, 1);
          colors[i].push(ConvertRGBtoHex(r, g, b));
          count += 1;
          console.log(`${((count * 100) / (width * height)).toFixed(2)}%`);
        }
      }
      resolve(colors);
    };
  });
};

const App = () => {
  const [totalWidth, setTotalWidth] = useState(300);
  const [totalHeight, setTotalHeight] = useState(300);
  const [size, setSize] = useState(1);
  const [ready, setReady] = useState("NOT READY");

  const imageRef = useRef();

  const arrayOfMain = Array.from({ length: Math.ceil(totalWidth / size) });

  const imageLoaded = async () => {
    const height = imageRef.current.naturalHeight;
    const width = imageRef.current.naturalWidth;
    setTotalHeight(imageRef.current.naturalHeight);
    setTotalWidth(imageRef.current.naturalWidth);

    const colors = await colorFromAnImage(image, height, width);
    for (let i = 0; i < height - 1; i++) {
      for (let j = 0; j < width - 1; j++) {
        console.log(i, j);
        console.log(document.querySelector(`div[data-x="${i}"][data-y="${j}"]`));
        document.querySelector(`div[data-x="${i}"][data-y="${j}"]`).style.backgroundColor = colors[i][j];
      }
    }
    console.log("fini");
    setReady("READY !!!");
  };

  return (
    <div className="App">
      <header>
        <label>
          <h3>size</h3>
          <input type="number" value={size} onChange={(e) => setSize(e.target.value / 1)} />
        </label>
        Maille W : {totalWidth / size}
        Maille H : {totalHeight / size}
      </header>
      <h3>{ready}</h3>
      <div className="tool">
        <img src={image} onLoad={imageLoaded} ref={imageRef} alt="mainImage" />
        <div className="border" style={{ width: `${totalWidth}px`, height: `${totalHeight}px` }}>
          {arrayOfMain.map((_, i) => (
            <div className="line" key={`line-${i}`}>
              {arrayOfMain.map((_, j) => (
                <div
                  className="square"
                  data-x={i}
                  data-y={j}
                  key={`square-${i}-${j}`}
                  style={{ minWidth: size, minHeight: size, maxWidth: size, maxHeight: size }}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
