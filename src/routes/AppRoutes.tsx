import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<div className="p-6"><h1>Search Page</h1></div>} />
      <Route path="/library" element={<div className="p-6"><h1>Library Page</h1></div>} />
      <Route path="/settings" element={<div className="p-6"><h1>Settings Page</h1></div>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
