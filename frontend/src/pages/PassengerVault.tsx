import { useEffect, useState } from 'react';
import { Plus, User, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { getPassengers, createPassenger } from '../features/passengers/passengerSlice';
import type { AppDispatch, RootState } from '../app/store';

const PassengerVault = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { passengers, isLoading } = useSelector((state: RootState) => state.passengers);
  
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'M',
    berthPreference: 'LB',
    idProofNumber: '',
    isSeniorCitizen: false
  });

  useEffect(() => {
    dispatch(getPassengers());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createPassenger(formData)).then(() => {
      setShowModal(false);
      setFormData({ name: '', age: '', gender: 'M', berthPreference: 'LB', idProofNumber: '', isSeniorCitizen: false });
    });
  };

  const copyFormat = (p: any) => {
    const text = `${p.name},${p.age},${p.gender},${p.berthPreference}`;
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard: ' + text);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Passenger Vault</h1>
          <p className="text-gray-400 mt-1">Manage and quickly copy details for Tatkal booking.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Passenger</span>
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
              <h2 className="text-xl font-bold">New Passenger</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5"/></button>
            </div>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-black border border-gray-800 rounded px-4 py-2 text-white" />
              <input type="number" placeholder="Age" required value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="bg-black border border-gray-800 rounded px-4 py-2 text-white" />
              <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="bg-black border border-gray-800 rounded px-4 py-2 text-white">
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </select>
              <select value={formData.berthPreference} onChange={e => setFormData({...formData, berthPreference: e.target.value})} className="bg-black border border-gray-800 rounded px-4 py-2 text-white">
                <option value="LB">Lower</option>
                <option value="MB">Middle</option>
                <option value="UB">Upper</option>
                <option value="SU">Side Upper</option>
                <option value="SL">Side Lower</option>
              </select>
              <input type="text" placeholder="ID Proof Number" value={formData.idProofNumber} onChange={e => setFormData({...formData, idProofNumber: e.target.value})} className="bg-black border border-gray-800 rounded px-4 py-2 text-white" />
              <div className="flex items-center space-x-2">
                <input type="checkbox" checked={formData.isSeniorCitizen} onChange={e => setFormData({...formData, isSeniorCitizen: e.target.checked})} className="w-4 h-4" />
                <label>Senior Citizen</label>
              </div>
              <button type="submit" disabled={isLoading} className="md:col-span-2 bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-bold">
                {isLoading ? 'Saving...' : 'Save Passenger'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {passengers.length === 0 && !isLoading && (
          <p className="text-gray-500">No passengers found. Add one above.</p>
        )}
        {passengers.map((p: any) => (
          <motion.div 
            whileHover={{ y: -4 }}
            key={p._id} 
            className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-5 shadow-lg relative group"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center text-blue-500">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <span className="text-xs font-medium px-2 py-1 bg-gray-800 rounded text-gray-300">
                  {p.gender} • {p.age} yrs
                </span>
              </div>
            </div>
            
            <div className="space-y-2 mt-4 text-sm text-gray-400">
              <div className="flex justify-between">
                <span>Berth Pref:</span>
                <span className="text-white">{p.berthPreference}</span>
              </div>
              <div className="flex justify-between">
                <span>ID Proof:</span>
                <span className="text-white">{p.idProofNumber || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span>Senior Citizen:</span>
                <span className="text-white">{p.isSeniorCitizen ? 'Yes' : 'No'}</span>
              </div>
            </div>

            <button onClick={() => copyFormat(p)} className="mt-6 w-full py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Copy IRCTC Format</span>
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PassengerVault;
