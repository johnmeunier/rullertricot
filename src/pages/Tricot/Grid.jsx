export const Grid = ({ colors, size }) => (
  <div className="border" style={{ width: `${colors[0].length * size}px`, height: `${colors.length * size}px` }}>
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
);
