import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AnalysisPage from "./pages/Analysis";
import Home from "./pages/Home";
import EducationalMaterials from "./pages/library";
import MapPage from "./pages/Map";
import FileUpload from "./pages/Upload";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage/>} />
        <Route path="/upload" element={<FileUpload/>} />
        <Route path="/analysis" element={<AnalysisPage/>} />
        <Route path="/library" element={<EducationalMaterials/>} />
      </Routes>
    </Router>
  );
}

export default App;
