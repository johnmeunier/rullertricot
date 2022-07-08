import { useRef, useState } from "react";
import image from "../../assets/koala.jpg";
import "./Gutter.scss";

const App = () => {
  const [totalWidth, setTotalWidth] = useState(300);
  const [totalHeight, setTotalHeight] = useState(300);
  const [mainSize, setMainSize] = useState(109);
  const [subdivisionNumber, setSubdivisionNumber] = useState(10);

  const imageRef = useRef();

  const arrayOfMain = Array.from({ length: Math.ceil(totalWidth / mainSize) });
  const arrayOfSub = Array.from({ length: subdivisionNumber });

  const imageLoaded = () => {
    setTotalHeight(imageRef.current.naturalHeight);
    setTotalWidth(imageRef.current.naturalWidth);
  };

  return (
    <div className="App">
      <label>
        <h3>Main Size</h3>
        <input type="number" value={mainSize} onChange={(e) => setMainSize(e.target.value / 1)} />
      </label>
      <label>
        <h3>Number of subdivision</h3>
        <input type="number" value={subdivisionNumber} onChange={(e) => setSubdivisionNumber(e.target.value / 1)} />
      </label>
      <div className="tool">
        <img src={image} onLoad={imageLoaded} ref={imageRef} alt="mainImage" />
        <div className="border" style={{ width: `${totalWidth}px`, height: `${totalHeight}px` }}>
          {arrayOfMain.map((_, i) => (
            <div className="line" key={`line-${i}`}>
              {arrayOfMain.map((_, i) => (
                <div className="square" key={`square-${i}`} style={{ minWidth: mainSize, minHeight: mainSize, maxWidth: mainSize, maxHeight: mainSize }}>
                  {arrayOfSub.map((_, i) => (
                    <div className="subLine" key={`subLine-${i}`}>
                      {arrayOfSub.map((_, i) => (
                        <div
                          className="subSquare"
                          key={`subSquare-${i}`}
                          style={{ width: (mainSize + 1) / subdivisionNumber, height: (mainSize + 1) / subdivisionNumber }}
                        ></div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
