import { useEffect, useState } from 'react';
import { Copy, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductivityMode = () => {
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes for demo
  const [copiedField, setCopiedField] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  return (
    <div className="fixed inset-0 bg-[#000000] z-50 text-white flex flex-col p-6 overflow-y-auto">
      <header className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
        <div className="flex items-center space-x-4">
          <Link to="/templates" className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-blue-500">Productivity Mode Active</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-400 font-medium">Tatkal Window Starts In:</span>
          <span className={`text-3xl font-black font-mono tracking-widest ${timeLeft < 60 ? 'text-red-500' : 'text-green-500'}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Journey Info */}
        <div className="lg:w-1/3 space-y-6">
          <div className="bg-[#141414] border border-gray-800 p-6 rounded-2xl">
            <h2 className="text-xl font-bold mb-4 text-gray-300">Journey Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-black p-3 rounded-lg border border-gray-800">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Source Station Code</div>
                  <div className="font-mono text-lg font-bold">NDLS</div>
                </div>
                <button onClick={() => handleCopy('NDLS', 'source')} className="text-blue-500 hover:text-blue-400">
                  {copiedField === 'source' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
              <div className="flex justify-between items-center bg-black p-3 rounded-lg border border-gray-800">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Destination Station Code</div>
                  <div className="font-mono text-lg font-bold">MMCT</div>
                </div>
                <button onClick={() => handleCopy('MMCT', 'dest')} className="text-blue-500 hover:text-blue-400">
                  {copiedField === 'dest' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Passenger List */}
        <div className="lg:w-2/3">
          <div className="bg-[#141414] border border-gray-800 p-6 rounded-2xl h-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-300">Passenger Manifest</h2>
              <button onClick={() => handleCopy('Rahul Sharma,45,M,LB', 'all_passengers')} className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold">
                <Copy className="w-4 h-4" />
                <span>Copy Master String</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'Rahul Sharma', age: 45, gender: 'M', berth: 'LB' },
                { name: 'Priya Sharma', age: 42, gender: 'F', berth: 'LB' }
              ].map((p, idx) => (
                <div key={idx} className="flex justify-between items-center bg-black border border-gray-800 p-4 rounded-xl">
                  <div className="grid grid-cols-4 gap-8 w-full text-sm">
                    <div>
                      <div className="text-gray-500 text-xs mb-1">Name</div>
                      <div className="font-semibold">{p.name}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs mb-1">Age</div>
                      <div className="font-semibold">{p.age}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs mb-1">Gender</div>
                      <div className="font-semibold">{p.gender}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs mb-1">Berth</div>
                      <div className="font-semibold">{p.berth}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductivityMode;
