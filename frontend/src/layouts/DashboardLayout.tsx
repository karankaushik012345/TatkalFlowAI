import { Outlet, Link } from 'react-router-dom';
import { Home, Users, BookOpen, LogOut, CreditCard } from 'lucide-react';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import toast, { Toaster } from 'react-hot-toast';

const DashboardLayout = () => {
  useEffect(() => {
    // In a real app, grab token/userId from Redux or localStorage
    const socket = io('http://localhost:5000');
    
    socket.emit('join', 'dummy_user_id'); // Mock joining room
    
    socket.on('TATKAL_ALERT', (data) => {
      toast.success(data.message || 'Tatkal Window Opening Soon!', {
        icon: '🔔',
        style: {
          borderRadius: '10px',
          background: '#1A1A1A',
          color: '#fff',
          border: '1px solid #1e3a8a',
        },
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="flex h-screen bg-[#0D0D0D] text-white">
      <Toaster position="top-right" />
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 bg-[#141414] flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold tracking-tighter text-blue-500">TatkalFlow<span className="text-white">AI</span></h2>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link to="/" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
            <Home className="w-5 h-5 text-gray-400" />
            <span>Dashboard</span>
          </Link>
          <Link to="/passengers" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
            <Users className="w-5 h-5 text-gray-400" />
            <span>Passenger Vault</span>
          </Link>
          <Link to="/templates" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
            <BookOpen className="w-5 h-5 text-gray-400" />
            <span>Journey Templates</span>
          </Link>
          <Link to="/pricing" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors">
            <CreditCard className="w-5 h-5 text-gray-400" />
            <span>Pricing & Pro</span>
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button className="flex w-full items-center space-x-3 p-3 rounded-lg text-red-400 hover:bg-gray-800 transition-colors">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-16 border-b border-gray-800 flex items-center justify-end px-6">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">Pro Plan</span>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              U
            </div>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
