import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PostsPage from './pages/PostsPage';
import { useSelector } from 'react-redux';
import { RootState } from './store/rootReducer';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = useSelector((s: RootState) => s.auth.accessToken);
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/posts" element={<PrivateRoute><PostsPage /></PrivateRoute>} />
        <Route path="/" element={<Navigate to="/posts" replace />} />
      </Routes>
  );
}