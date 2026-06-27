import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import PassengerVault from './pages/PassengerVault';
import JourneyTemplates from './pages/JourneyTemplates';
import ProductivityMode from './pages/ProductivityMode';
import Pricing from './pages/Pricing';
import Auth from './pages/Auth';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/productivity" element={<PrivateRoute><ProductivityMode /></PrivateRoute>} />
        <Route path="/" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="passengers" element={<PassengerVault />} />
          <Route path="templates" element={<JourneyTemplates />} />
          <Route path="pricing" element={<Pricing />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
