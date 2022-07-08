import { BrowserRouter, Routes, Route } from "react-router-dom";

import Gutter from "./pages/Gutter/Gutter";
import Tricot from "./pages/Tricot/Tricot";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/gutter" element={<Gutter />} />
      <Route path="/tricot" element={<Tricot />} />
    </Routes>
  </BrowserRouter>
);

export default App;
