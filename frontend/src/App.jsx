import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import ReactDOM from "react-dom/client";

import AuthPage from "./components/Auth/AuthPage";

import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./components/Homepage";

const App = () => {
 

  return (
    <>
      <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage/>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
    </>
  );
};

export default App;
