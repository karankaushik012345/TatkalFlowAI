import { Check, Shield } from 'lucide-react';
import { useState } from 'react';

const Pricing = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (plan: string, amount: number) => {
    setLoading(true);
    try {
      // 1. Fetch order from backend
      const res = await fetch('http://localhost:5000/api/v1/subscriptions/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assume token is stored here
        },
        body: JSON.stringify({ planId: plan, amount })
      });
      const data = await res.json();
      
      if (!data.success) throw new Error(data.message);

      // 2. Initialize Razorpay Checkout
      const options = {
        key: 'dummy_key_id', // Replace with real key in production
        amount: data.order.amount,
        currency: "INR",
        name: "TatkalFlowAI",
        description: `${plan} Subscription`,
        order_id: data.order.id,
        handler: async function (response: any) {
          // 3. Verify Payment on Backend
          const verifyRes = await fetch('http://localhost:5000/api/v1/subscriptions/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planId: plan
            })
          });
          
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            alert('Subscription Successful! You are now a Premium user.');
            window.location.href = '/';
          } else {
            alert('Payment verification failed.');
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#2563EB" // blue-600
        }
      };
      
      const rzp1 = new (window as any).Razorpay(options);
      rzp1.open();
      
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Simple, Transparent Pricing</h1>
        <p className="text-gray-400 max-w-xl mx-auto">Upgrade to the Pro plan to unlock Productivity Mode, real-time alerts, and unlimited passenger vaults.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Basic Plan */}
        <div className="bg-[#141414] border border-gray-800 p-8 rounded-2xl flex flex-col">
          <h3 className="text-2xl font-bold mb-2 text-white">Free Starter</h3>
          <p className="text-gray-400 mb-6">For occasional travelers.</p>
          <div className="text-4xl font-black mb-8 text-white">₹0<span className="text-lg text-gray-500 font-normal">/mo</span></div>
          <ul className="space-y-4 mb-8 flex-1">
            {['1 Journey Template', 'Up to 2 Passengers in Vault', 'Basic Copy-Paste Format', 'No Real-time Alerts'].map((feature, i) => (
              <li key={i} className="flex items-center text-gray-300">
                <Check className="w-5 h-5 text-gray-500 mr-3" />
                {feature}
              </li>
            ))}
          </ul>
          <button className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-700 rounded-xl text-white font-medium transition-colors border border-gray-700">
            Current Plan
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-gradient-to-b from-blue-900/40 to-[#141414] border border-blue-600/50 p-8 rounded-2xl flex flex-col relative overflow-hidden shadow-2xl shadow-blue-900/20">
          <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
            Most Popular
          </div>
          <h3 className="text-2xl font-bold mb-2 text-blue-400">Tatkal Pro</h3>
          <p className="text-gray-400 mb-6">For frequent travelers who need speed.</p>
          <div className="text-4xl font-black mb-8 text-white">₹199<span className="text-lg text-gray-500 font-normal">/mo</span></div>
          <ul className="space-y-4 mb-8 flex-1">
            {['Unlimited Journey Templates', 'Unlimited Passenger Vaults', 'Distraction-Free Productivity Mode', 'Real-time Desktop Alerts', 'Priority SMS Reminders via MSG91'].map((feature, i) => (
              <li key={i} className="flex items-center text-gray-200">
                <Check className="w-5 h-5 text-blue-500 mr-3" />
                {feature}
              </li>
            ))}
          </ul>
          <button 
            onClick={() => handleCheckout('Pro Monthly', 199)} 
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-xl text-white font-bold transition-colors flex justify-center items-center"
          >
            {loading ? 'Processing...' : 'Upgrade to Pro'}
          </button>
          <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
            <Shield className="w-3 h-3 mr-1" />
            Secured by Razorpay
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
