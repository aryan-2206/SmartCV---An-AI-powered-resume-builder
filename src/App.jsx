import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectChoice from "./pages/ProjectChoice";
import TemplateSelect from "./pages/TemplateSelect";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Resume builder flow */}
        <Route path="/" element={<ProjectChoice />} />
        <Route path="/project-choice" element={<ProjectChoice />} />
        <Route path="/templates/:resumeId" element={<TemplateSelect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
