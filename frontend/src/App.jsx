import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import ApplicationForm from './pages/ApplicationForm';
import DocumentUpload from './pages/DocumentUpload';
import ReviewApplication from './pages/ReviewApplication';
import AppointmentBooking from './pages/AppointmentBooking';
import Confirmation from './pages/Confirmation';

function PrivateRoute({ children }) {
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="navbar">
          <div className="navbar-brand">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Passport Connect
          </div>
        </header>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/onboarding" element={
              <PrivateRoute><Onboarding /></PrivateRoute>
            } />
            <Route path="/dashboard" element={
              <PrivateRoute><Dashboard /></PrivateRoute>
            } />
            <Route path="/application/:id" element={
              <PrivateRoute><ApplicationForm /></PrivateRoute>
            } />
            <Route path="/application/:id/docs" element={
              <PrivateRoute><DocumentUpload /></PrivateRoute>
            } />
            <Route path="/application/:id/review" element={
              <PrivateRoute><ReviewApplication /></PrivateRoute>
            } />
            <Route path="/application/:id/book" element={
              <PrivateRoute><AppointmentBooking /></PrivateRoute>
            } />
            <Route path="/application/:id/confirmation" element={
              <PrivateRoute><Confirmation /></PrivateRoute>
            } />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
