import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {TextSubmitApp, UploadFilesPage} from "./toSpanish";

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <nav className="bg-gray-800 text-white p-4 space-x-4">
        <Link to="/" className="hover:underline">Text Submit</Link>
        <Link to="/upload" className="hover:underline">Upload Files</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TextSubmitApp />} />
        <Route path="/upload" element={<UploadFilesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
