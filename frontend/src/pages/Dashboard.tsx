import { Clock, AlertCircle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, User</h1>
        <p className="text-gray-400 mt-1">Your next Tatkal booking window is approaching.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -4 }} className="bg-gradient-to-br from-blue-900/40 to-blue-900/10 border border-blue-800/50 rounded-2xl p-6 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-blue-400 font-semibold mb-2">Next Tatkal Window</h3>
            <div className="text-4xl font-black tracking-tighter text-white mb-2">10:00 AM</div>
            <p className="text-sm text-gray-300 flex items-center"><Clock className="w-4 h-4 mr-1"/> AC Classes opens in 14h 23m</p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
            <Clock className="w-32 h-32" />
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6">
          <h3 className="text-gray-400 font-medium mb-4 flex items-center"><ShieldCheck className="w-4 h-4 mr-2"/> Readiness Score</h3>
          <div className="flex items-end space-x-2">
            <span className="text-4xl font-bold text-green-400">85%</span>
            <span className="text-sm text-gray-400 mb-1">Excellent</span>
          </div>
          <div className="w-full bg-gray-800 h-2 rounded-full mt-4">
            <div className="bg-green-400 h-2 rounded-full" style={{ width: '85%' }}></div>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6">
          <h3 className="text-gray-400 font-medium mb-4 flex items-center"><AlertCircle className="w-4 h-4 mr-2"/> Active Alerts</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-lg">
              <span className="text-sm font-medium">NDLS → MMCT (3A)</span>
              <span className="text-xs text-blue-400">In 14h</span>
            </div>
            <div className="flex justify-between items-center bg-gray-800/50 p-3 rounded-lg">
              <span className="text-sm font-medium">SBC → MAS (CC)</span>
              <span className="text-xs text-blue-400">Tomorrow</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
