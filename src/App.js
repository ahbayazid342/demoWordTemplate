import './App.css';
import DocxEditor from './DocxEditor';
import FileUpload from './FileUpload';
import FormDetail from './FormDetail';
import FormList from './FormList';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<DocxEditor />}>
        </Route>
        <Route path="/fileUpload" element={<FileUpload />}>
        </Route>
        <Route path="/form/:id" element={<FormDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

