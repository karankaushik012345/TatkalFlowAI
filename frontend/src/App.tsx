import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import PassengerVault from './pages/PassengerVault';
import JourneyTemplates from './pages/JourneyTemplates';
import ProductivityMode from './pages/ProductivityMode';
import Pricing from './pages/Pricing';

const Login = () => <div className="p-6 flex items-center justify-center h-screen bg-[#0D0D0D] text-white"><h1 className="text-2xl font-bold">Login Page</h1></div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/productivity" element={<ProductivityMode />} />
        <Route path="/" element={<DashboardLayout />}>
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
