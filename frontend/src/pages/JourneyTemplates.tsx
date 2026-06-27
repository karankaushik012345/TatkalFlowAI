import { useEffect, useState } from 'react';
import { Plus, Train, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getTemplates, createTemplate } from '../features/templates/templateSlice';
import type { AppDispatch, RootState } from '../app/store';

const JourneyTemplates = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { templates, isLoading } = useSelector((state: RootState) => state.templates);
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    sourceStationCode: '',
    destinationStationCode: '',
    travelClass: '3A',
    quota: 'Tatkal',
    passengers: [] // Ideally select from passenger list, but for now we'll just send empty to backend
  });

  useEffect(() => {
    dispatch(getTemplates());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createTemplate(formData)).then(() => {
      setShowModal(false);
      setFormData({ sourceStationCode: '', destinationStationCode: '', travelClass: '3A', quota: 'Tatkal', passengers: [] });
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Journey Templates</h1>
          <p className="text-gray-400 mt-1">Saved routes for rapid one-click booking preparation.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>New Template</span>
        </button>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-8 bg-[#141414] border border-gray-800 rounded-xl p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">New Journey Template</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Source Station Code (e.g. NDLS)" required value={formData.sourceStationCode} onChange={e => setFormData({...formData, sourceStationCode: e.target.value})} className="bg-black border border-gray-800 rounded px-4 py-2 text-white uppercase" />
              <input type="text" placeholder="Destination Station Code (e.g. MMCT)" required value={formData.destinationStationCode} onChange={e => setFormData({...formData, destinationStationCode: e.target.value})} className="bg-black border border-gray-800 rounded px-4 py-2 text-white uppercase" />
              <select value={formData.travelClass} onChange={e => setFormData({...formData, travelClass: e.target.value})} className="bg-black border border-gray-800 rounded px-4 py-2 text-white">
                <option value="1A">1A - First AC</option>
                <option value="2A">2A - Second AC</option>
                <option value="3A">3A - Third AC</option>
                <option value="SL">SL - Sleeper</option>
                <option value="CC">CC - Chair Car</option>
              </select>
              <select value={formData.quota} onChange={e => setFormData({...formData, quota: e.target.value})} className="bg-black border border-gray-800 rounded px-4 py-2 text-white">
                <option value="Tatkal">Tatkal</option>
                <option value="Premium Tatkal">Premium Tatkal</option>
                <option value="General">General</option>
              </select>
              <button type="submit" disabled={isLoading} className="md:col-span-2 bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-bold">
                {isLoading ? 'Saving...' : 'Save Template'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.length === 0 && !isLoading && (
          <p className="text-gray-500">No templates found. Create one above.</p>
        )}
        {templates.map((t: any) => (
          <motion.div 
            whileHover={{ scale: 1.02 }}
            key={t._id} 
            className="bg-gradient-to-br from-[#1A1A1A] to-[#141414] border border-gray-800 rounded-xl p-6 shadow-xl relative"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-500">
                  <Train className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-xl uppercase">{t.sourceStationCode} → {t.destinationStationCode}</h3>
                  <p className="text-sm text-gray-400">{t.passengers?.length || 0} Passengers • {t.travelClass}</p>
                </div>
              </div>
              <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-xs font-bold uppercase rounded-full tracking-wider">
                {t.quota}
              </span>
            </div>
            
            <div className="flex space-x-3 mt-6 border-t border-gray-800 pt-6">
              <Link to={`/productivity?templateId=${t._id}`} className="flex-1 py-2 text-center bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors block">
                Activate Productivity Mode
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JourneyTemplates;
