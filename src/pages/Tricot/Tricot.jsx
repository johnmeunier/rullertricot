import { useState } from "react";
import { Grid } from "./Grid";
import { colorFromAnImage } from "./Tricot.pure";
import "./Tricot.scss";

const App = () => {
  const [size, setSize] = useState(1);
  const [colors, setColors] = useState([["#fff"]]);

  const imageLoaded = async (image) => {
    const colorsGenerated = await colorFromAnImage(URL.createObjectURL(image));
    setColors(colorsGenerated);
  };

  return (
    <div className="App">
      <header>
        <label>
          <h3>size</h3>
          <input type="number" value={size} onChange={(e) => setSize(e.target.value / 1)} />
        </label>
        <label>
          <h3>File</h3>
          <input
            type="file"
            onChange={(e) => {
              imageLoaded(e.target.files[0]);
            }}
          />
        </label>
        Maille W : {colors[0].length / size}
        Maille H : {colors.length / size}
      </header>
      <div className="tool">
        <Grid colors={colors} size={size} />
      </div>
    </div>
  );
};

export default App;
