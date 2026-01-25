import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import LanguageToggle from './components/LanguageToggle';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerDashboard from './pages/FarmerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import GovDashboard from './pages/GovDashboard';
import PriceTracking from './pages/PriceTracking';
import LoanSchemes from './pages/LoanSchemes';
import FarmTracking from './pages/FarmTracking';
import CommunityForum from './pages/CommunityForum';
import RemoteSensing from './pages/RemoteSensing';
import RemoteSensingData from './pages/RemoteSensingData';
import LanguageTest from './pages/LanguageTest';
import FBRRegistration from './pages/FBRRegistration';
import FertilizerMarket from './pages/FertilizerMarket';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <LanguageProvider>
      <BrowserRouter>
        <LanguageToggle />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register setUser={setUser} />} />
          <Route
            path="/dashboard"
            element={
              user ? (
                user.role === 'admin' ? <AdminDashboard user={user} /> :
                  user.role === 'gov' ? <GovDashboard user={user} /> :
                    <FarmerDashboard user={user} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/price-tracking" element={user ? <PriceTracking user={user} /> : <Navigate to="/login" />} />
          <Route path="/farm-tracking" element={user ? <FarmTracking user={user} /> : <Navigate to="/login" />} />
          <Route path="/forum" element={user ? <CommunityForum user={user} /> : <Navigate to="/login" />} />
          <Route path="/remote-sensing" element={user ? <RemoteSensingData user={user} /> : <Navigate to="/login" />} />
          <Route path="/remote-sensing-analysis" element={user ? <RemoteSensing user={user} /> : <Navigate to="/login" />} />
          <Route path="/fbr-registration" element={user ? <FBRRegistration user={user} /> : <Navigate to="/login" />} />
          <Route path="/fertilizer-market" element={user ? <FertilizerMarket user={user} /> : <Navigate to="/login" />} />
          <Route path="/loans" element={<LoanSchemes />} />
          <Route path="/language-test" element={<LanguageTest />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
