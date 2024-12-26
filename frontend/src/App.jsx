import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import ReactDOM from "react-dom/client";

import AuthPage from "./components/Auth/AuthPage";
import WardrobeUploadForm from "./components/WardrobeUploadForm";


const App = () => {
 

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/form" element={<WardrobeUploadForm />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
