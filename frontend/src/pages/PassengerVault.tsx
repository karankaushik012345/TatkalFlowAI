import { Copy, Plus, User, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const passengers = [
  { id: 1, name: 'Rahul Sharma', age: 45, gender: 'M', berth: 'LB', proof: 'Aadhar', srCitizen: false },
  { id: 2, name: 'Priya Sharma', age: 42, gender: 'F', berth: 'LB', proof: 'Aadhar', srCitizen: false },
];

const PassengerVault = () => {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Passenger Vault</h1>
          <p className="text-gray-400 mt-1">Manage and quickly copy details for Tatkal booking.</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          <Plus className="w-5 h-5" />
          <span>Add Passenger</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {passengers.map((p) => (
          <motion.div 
            whileHover={{ y: -4 }}
            key={p.id} 
            className="bg-[#1A1A1A] border border-gray-800 rounded-xl p-5 shadow-lg relative group"
          >
            <div className="absolute top-4 right-4">
              <button className="text-gray-400 hover:text-white transition-colors" title="Copy Details">
                <Copy className="w-5 h-5" />
              </button>
            </div>
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
                <span className="text-white">{p.berth}</span>
              </div>
              <div className="flex justify-between">
                <span>ID Proof:</span>
                <span className="text-white">{p.proof}</span>
              </div>
              <div className="flex justify-between">
                <span>Senior Citizen:</span>
                <span className="text-white">{p.srCitizen ? 'Yes' : 'No'}</span>
              </div>
            </div>

            <button className="mt-6 w-full py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2">
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
