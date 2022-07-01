import { useRef, useState } from "react";
import { Grid } from "./Grid";
import { colorFromAnImage } from "./Tricot.pure";
import image from "../../assets/petitkoko.png";
import "./Tricot.scss";

const App = () => {
  const [size, setSize] = useState(1);
  const [colors, setColors] = useState([["#fff"]]);

  const imageRef = useRef();

  const imageLoaded = async () => {
    const height = imageRef.current.naturalHeight;
    const width = imageRef.current.naturalWidth;

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
        Maille W : {colors[0].length / size}
        Maille H : {colors.length / size}
      </header>
      <div className="tool">
        <img src={image} onLoad={imageLoaded} ref={imageRef} alt="mainImage" id="mainImage" />
        <Grid colors={colors} size={size} />
      </div>
    </div>
  );
};

export default App;
