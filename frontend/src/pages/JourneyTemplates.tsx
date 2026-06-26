import { Copy, Plus, Train } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const templates = [
  { id: 1, source: 'NDLS', dest: 'MMCT', class: '3A', quota: 'Tatkal', passCount: 2 },
  { id: 2, source: 'SBC', dest: 'MAS', class: 'CC', quota: 'Tatkal', passCount: 1 },
];

const JourneyTemplates = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Journey Templates</h1>
          <p className="text-gray-400 mt-1">Saved routes for rapid one-click booking preparation.</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="w-5 h-5" />
          <span>New Template</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((t) => (
          <motion.div 
            whileHover={{ scale: 1.02 }}
            key={t.id} 
            className="bg-gradient-to-br from-[#1A1A1A] to-[#141414] border border-gray-800 rounded-xl p-6 shadow-xl relative"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-500">
                  <Train className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">{t.source} → {t.dest}</h3>
                  <p className="text-sm text-gray-400">{t.passCount} Passengers • {t.class}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-bold uppercase rounded-full tracking-wider">
                {t.quota}
              </span>
            </div>
            
            <div className="flex space-x-3 mt-6 border-t border-gray-800 pt-6">
              <Link to="/productivity" className="flex-1 py-2 text-center bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors block">
                Activate Productivity Mode
              </Link>
              <button className="py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors text-gray-300">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JourneyTemplates;
