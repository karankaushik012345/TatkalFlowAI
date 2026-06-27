import { Clock, Plus, Users, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '../app/store';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPassengers } from '../features/passengers/passengerSlice';
import { getTemplates } from '../features/templates/templateSlice';

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { passengers } = useSelector((state: RootState) => state.passengers);
  const { templates } = useSelector((state: RootState) => state.templates);

  useEffect(() => {
    dispatch(getPassengers());
    dispatch(getTemplates());
  }, [dispatch]);

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name || 'User'}</h1>
        <p className="text-gray-400 mt-1">Ready to book your next Tatkal ticket faster than ever?</p>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold text-gray-300 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/passengers">
            <motion.div whileHover={{ y: -4 }} className="bg-gradient-to-r from-blue-900/30 to-blue-800/10 border border-blue-800/50 rounded-2xl p-6 cursor-pointer flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1 flex items-center"><Users className="w-5 h-5 mr-2 text-blue-400"/> Manage Passengers</h3>
                <p className="text-sm text-gray-400">Add or edit your family & friends.</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          </Link>

          <Link to="/templates">
            <motion.div whileHover={{ y: -4 }} className="bg-gradient-to-r from-green-900/30 to-green-800/10 border border-green-800/50 rounded-2xl p-6 cursor-pointer flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg mb-1 flex items-center"><BookOpen className="w-5 h-5 mr-2 text-green-400"/> Create Journey</h3>
                <p className="text-sm text-gray-400">Setup a route and attach passengers.</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -4 }} className="bg-gradient-to-br from-blue-900/40 to-blue-900/10 border border-blue-800/50 rounded-2xl p-6 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-blue-400 font-semibold mb-2">Next Tatkal Window</h3>
            <div className="text-4xl font-black tracking-tighter text-white mb-2">10:00 AM</div>
            <p className="text-sm text-gray-300 flex items-center"><Clock className="w-4 h-4 mr-1"/> AC Classes open automatically</p>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
            <Clock className="w-32 h-32" />
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6">
          <h3 className="text-gray-400 font-medium mb-4 flex items-center"><Users className="w-4 h-4 mr-2"/> Saved Passengers</h3>
          <div className="flex items-end space-x-2">
            <span className="text-4xl font-bold text-white">{passengers.length}</span>
            <span className="text-sm text-gray-400 mb-1">Profiles ready</span>
          </div>
        </motion.div>

        <motion.div whileHover={{ y: -4 }} className="bg-[#1A1A1A] border border-gray-800 rounded-2xl p-6">
          <h3 className="text-gray-400 font-medium mb-4 flex items-center"><BookOpen className="w-4 h-4 mr-2"/> Saved Journeys</h3>
          <div className="flex items-end space-x-2">
            <span className="text-4xl font-bold text-white">{templates.length}</span>
            <span className="text-sm text-gray-400 mb-1">Templates ready</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
