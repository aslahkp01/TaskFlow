import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setInitialTheme } from './store/authSlice';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import Settings from './pages/Settings';
import VerifyOTP from './pages/VerifyOTP';
import Skeleton from './components/Skeleton';

const PrivateRoute = ({ children }) => {
  const { user, initialLoading } = useSelector((state) => state.auth);
  
  if (initialLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
      <Skeleton width="100%" height="60px" />
      <Skeleton width="100%" height="400px" />
    </div>
  );
  
  if (!user) return <Navigate to="/login" />;
  if (!user.onboarded) return <Navigate to="/onboarding" />;
  
  return children;
};

const OnboardingRoute = ({ children }) => {
  const { user, initialLoading } = useSelector((state) => state.auth);
  
  if (initialLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
      <Skeleton width="100%" height="60px" />
      <Skeleton width="100%" height="400px" />
    </div>
  );
  
  if (!user) return <Navigate to="/login" />;
  if (user.onboarded) return <Navigate to="/dashboard" />;
  
  return children;
};

const GuestRoute = ({ children }) => {
  const { user, initialLoading } = useSelector((state) => state.auth);
  
  if (initialLoading) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
      <Skeleton width="100%" height="60px" />
      <Skeleton width="100%" height="400px" />
    </div>
  );
  
  if (user) {
    if (!user.onboarded) return <Navigate to="/onboarding" />;
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitialTheme());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/login" 
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <GuestRoute>
              <Register />
            </GuestRoute>
          } 
        />
        <Route 
          path="/verify-otp" 
          element={
            <GuestRoute>
              <VerifyOTP />
            </GuestRoute>
          } 
        />
        <Route 
          path="/onboarding" 
          element={
            <OnboardingRoute>
              <Onboarding />
            </OnboardingRoute>
          } 
        />
        <Route 
          path="/settings" 
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
