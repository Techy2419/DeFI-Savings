import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { Connect } from './pages/Connect';
import { SignIn } from './components/auth/SignIn';
import { useAuthStore } from './lib/firebase/store';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  return user ? <>{children}</> : <Navigate to="/signin" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="connect" element={
            <PrivateRoute>
              <Connect />
            </PrivateRoute>
          }>
            <Route path=":type" element={
              <PrivateRoute>
                <Connect />
              </PrivateRoute>
            } />
          </Route>
          <Route path="dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="settings" element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;