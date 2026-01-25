import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  TrendingUp, 
  AccountBalance, 
  Dashboard,
  Person,
  Login,
  PersonAdd,
  Forum,
  Satellite,
  Grass,
  Receipt,
  LocalFlorist
} from '@mui/icons-material';

const menuItems = [
  { name: 'Home', path: '/', icon: <Home /> },
  { name: 'Dashboard', path: '/dashboard', icon: <Dashboard /> },
  { name: 'Farm Tracking', path: '/farm-tracking', icon: <Grass /> },
  { name: 'Price Tracking', path: '/price-tracking', icon: <TrendingUp /> },
  { name: 'Fertilizer Market', path: '/fertilizer-market', icon: <LocalFlorist /> },
  { name: 'Remote Sensing', path: '/remote-sensing', icon: <Satellite /> },
  { name: 'Community Forum', path: '/forum', icon: <Forum /> },
  { name: 'FBR Tax Registration', path: '/fbr-registration', icon: <Receipt /> },
  { name: 'Loan Schemes', path: '/loans', icon: <AccountBalance /> },
  { name: 'Login', path: '/login', icon: <Login /> },
  { name: 'Register', path: '/register', icon: <PersonAdd /> }
];

export default function Sidebar({ expanded, setExpanded }) {
  const location = useLocation();

  return (
    <>
      {/* Sidebar Placeholder - Always Visible */}
      <div 
        className="fixed left-0 top-0 h-full z-50 transition-all duration-300 shadow-2xl cursor-pointer"
        style={{ 
          width: expanded ? '280px' : '70px',
          backgroundColor: '#053D32'
        }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        {/* Collapsed State - Icons Only */}
        <div className={`h-full ${expanded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
          <div className="p-4 border-b border-green/30 flex justify-center">
            <span className="text-4xl">🌾</span>
          </div>
          <nav className="p-2 mt-4">
            <ul className="space-y-4">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link 
                      to={item.path}
                      className={`flex justify-center items-center p-3 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-green text-white' 
                          : 'text-green-light hover:bg-green/20 hover:text-white'
                      }`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Expanded State - Full Sidebar */}
        <div className={`h-full overflow-hidden absolute inset-0 ${expanded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}>
          {/* Logo/Brand */}
          <div className="p-6 border-b border-green/30">
            <h2 className="text-3xl font-bold text-white flex items-center gap-2">
              🌾 <span className="bg-gradient-to-r from-yellow to-green bg-clip-text text-transparent">AgroSmart</span>
            </h2>
            <p className="text-green-light text-sm mt-1">Farmer Marketplace</p>
          </div>

          {/* Navigation Menu - Scrollable with padding for footer */}
          <nav className="p-4 overflow-y-auto" style={{ height: 'calc(100vh - 200px)' }}>
            <ul className="space-y-2 pb-4">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link 
                      to={item.path}
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-green text-white shadow-lg' 
                          : 'text-green-light hover:bg-green/20 hover:text-white'
                      }`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="font-semibold text-lg">{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-green/30 bg-[#053D32]">
            <div className="bg-green/10 rounded-xl p-3">
              <p className="text-green-light text-xs">
                <strong className="text-white text-sm">Need Help?</strong><br />
                <a 
                  href="mailto:abdurrehmannex689@gmail.com" 
                  className="text-yellow hover:text-white transition-colors duration-200 font-semibold break-all"
                  style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}
                >
                  abdurrehmannex689@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
