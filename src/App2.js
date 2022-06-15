import { useRef, useState } from "react";
import image from "./assets/Koala_bleu jade_compressed.png";
import "./App2.scss";

const App = () => {
  const [totalWidth, setTotalWidth] = useState(300);
  const [totalHeight, setTotalHeight] = useState(300);
  const [size, setSize] = useState(3);

  const imageRef = useRef();

  const arrayOfMain = Array.from({ length: Math.ceil(totalWidth / size) });

  const imageLoaded = () => {
    setTotalHeight(imageRef.current.naturalHeight);
    setTotalWidth(imageRef.current.naturalWidth);
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
        <div className="border" style={{ width: `${totalWidth}px`, height: `${totalHeight}px` }}>
          {arrayOfMain.map((_, i) => (
            <div className="line" key={`line-${i}`}>
              {arrayOfMain.map((_, i) => (
                <div className="square" key={`square-${i}`} style={{ minWidth: size, minHeight: size, maxWidth: size, maxHeight: size }}></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
