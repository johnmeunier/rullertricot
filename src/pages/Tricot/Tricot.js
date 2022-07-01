import { useRef, useState } from "react";
import { colorFromAnImage } from "./Tricot.pure";
import image from "../../assets/petitkoko.png";
import "./Tricot.scss";

const App = () => {
  const [totalWidth, setTotalWidth] = useState(300);
  const [totalHeight, setTotalHeight] = useState(300);
  const [size, setSize] = useState(1);
  const [colors, setColors] = useState([[]]);

  const imageRef = useRef();

  const imageLoaded = async () => {
    const height = imageRef.current.naturalHeight;
    const width = imageRef.current.naturalWidth;
    setTotalHeight(height);
    setTotalWidth(width);

    const colorsGenerated = await colorFromAnImage(image, height, width);
    setColors(colorsGenerated);
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
      <div className="tool">
        <img src={image} onLoad={imageLoaded} ref={imageRef} alt="mainImage" />
        <div className="border" style={{ width: `${totalWidth * size}px`, height: `${totalHeight * size}px` }}>
          {colors.map((line, i) => (
            <div className="line" key={`line-${i}`}>
              {line.map((c, j) => (
                <div
                  className="square"
                  data-x={i}
                  data-y={j}
                  key={`square-${i}-${j}`}
                  style={{ minWidth: size, minHeight: size, maxWidth: size, maxHeight: size, backgroundColor: c }}
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
