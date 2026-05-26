import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';

import SatisfactionSurveyPage from './pages/SatisfactionSurveyPage';
import LeaderLoginPage from './pages/LeaderLoginPage';
import LeaderDashboardPage from './pages/LeaderDashboardPage';
import LeaderViewProfilePage from './pages/LeaderViewProfilePage';
import CompleteProfilePageFull from './pages/CompleteProfilePageFull';
import ProfilePageComplete from './pages/ProfilePageComplete';
import NetworkingPage from './pages/NetworkingPage';
import ResourcesPage from './pages/ResourcesPage';
import JobsPage from './pages/JobsPage';
import SurveysPage from './pages/SurveysPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import DirectoryPage from './pages/DirectoryPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/satisfaction-survey" element={<SatisfactionSurveyPage />} />
        
        {/* Rutas de Líder */}
        <Route path="/leader/login" element={<LoginPage />} />
        <Route path="/leader/dashboard" element={<LeaderDashboardPage />} />
        <Route path="/leader/egresado/:cedula" element={<LeaderViewProfilePage />} />
        
        {/* Rutas de Admin */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route 
            path="complete-profile" 
            element={
              <ProtectedRoute allowIncomplete>
                <CompleteProfilePageFull />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="profile" 
            element={
              <ProtectedRoute>
                <ProfilePageComplete />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="networking" 
            element={
              <ProtectedRoute>
                <NetworkingPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="resources" 
            element={
              <ProtectedRoute>
                <ResourcesPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="jobs" 
            element={
              <ProtectedRoute>
                <JobsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="surveys" 
            element={
              <ProtectedRoute>
                <SurveysPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="directory" 
            element={
              <ProtectedRoute>
                <DirectoryPage />
              </ProtectedRoute>
            } 
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;