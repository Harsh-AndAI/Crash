import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

import { db } from '../lib/firebase';
import { collection, query, getDocs, orderBy, updateDoc, doc } from 'firebase/firestore';
import { Clock, CheckCircle2, XCircle, MoreHorizontal, User, Car, Filter, Search, ClipboardList, CircleAlert } from 'lucide-react';

export default function AdminDashboard() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    async function fetchAllRequests() {
      try {
        const q = query(collection(db, 'requests'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        setRequests(data);
      } catch (err) {
        console.error('Error fetching admin requests:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchAllRequests();
  }, []);

  const handleUpdateStatus = async (requestId: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'requests', requestId), {
        status: newStatus,
        updatedAt: new Date()
      });
      setRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: newStatus } : r));
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const filteredRequests = filter === 'all' 
    ? requests 
    : requests.filter(r => r.status === filter);

    const stats = [
      {
        label: "Pending",
        count: requests.filter(r => r.status === "pending").length,
        color: "text-yellow-600",
        icon: <Clock size={24} />
      },
      {
        label: "Approved",
        count: requests.filter(r => r.status === "approved").length,
        color: "text-green-600",
        icon: <CheckCircle2 size={24} />
      },
      {
        label: "Fleet Out",
        count: requests.filter(r => r.status === "vehicle_delivered").length,
        color: "text-[#0097B2]",
        icon: <Car size={24} />
      },
      {
        label: "Total",
        count: requests.length,
        color: "text-[#151515]",
        icon: <ClipboardList size={24} />
      }
    ];

  return (
    <div className="pt-32 pb-24 bg-gradient-to-br from-white via-[#F7FCFD] to-[#EAF8FB] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <div className="uppercase tracking-[0.3em] text-[#0097B2] text-xs mb-3">
ADMIN PANEL
</div>

<h1 className="text-5xl md:text-7xl font-black text-[#151515] mb-4">
Dashboard
<span className="text-[#0097B2]">.</span>
</h1>

<p className="text-slate-400 text-lg">
Manage customer requests, replacement vehicles and claim approvals.
</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat) => (
                            <div
                              key={stat.label}
                              className="bg-gradient-to-br from-white to-[#F7FCFD] rounded-3xl border border-[#0097B2]/10 shadow-lg p-8 hover:shadow-[0_20px_45px_rgba(0,151,178,0.18)] hover:-translate-y-2 transition-all duration-300"
                            >

                            <div className="flex justify-between items-start">

                            <div>
                            <p className="text-sm text-slate-400 mb-3">
                            {stat.label}
                            </p>

                            <p className={`text-5xl font-bold ${stat.color}`}>
                            {stat.count}
                            </p>
                            </div>

                            <div className="w-14 h-14 rounded-2xl bg-[#0097B2]/10 flex items-center justify-center text-[#0097B2]">
                            {stat.icon}
                            </div>

                            </div>

                            </div>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6 border-b border-[#0097B2]/10 pb-8">
          <div className="flex gap-4">
             {['all', 'pending', 'approved', 'vehicle_delivered', 'completed'].map(f => (
                <button 
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-xl px-5 py-3 text-sm font-semibold border transition-all ${filter === f ? 'bg-[#0097B2] bg-gradient-to-r from-[#0097B2]to-[#18B8D4]text-white border-white' : 'border-[#0097B2]/10 text-slate-400 hover:border-slate-600'}`}
                >
                  {f === 'all' ? 'Universal' : f.replace('_', ' ')}
                </button>
             ))}
          </div>
          <div className="relative w-full md:w-64">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#0097B2]" size={16} />
             <input 
               type="text" 
               placeholder="Search customer..." 
               className="w-full bg-gradient-to-br from-white to-[#F7FCFD] rounded-xl border border-[#0097B2]/10 pl-12 pr-4 py-3 text-[#151515] placeholder:text-slate-400 focus:border-[#0097B2] focus:ring-2 focus:ring-[#0097B2]/20 outline-none pl-12 pr-4 py-3 text-sm text-[10px] focus:border-brand-blue outline-none"
             />
          </div>
        </div>

        {loading ? (
          <div className="py-24 text-center">
             <div className="text-sm animate-pulse">Accessing Encrypted Records...</div>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-white to-[#F7FCFD] rounded-3xl shadow-xl border border-[#0097B2]/10 border border-[#0097B2]/10 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <motion.tr
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3 }} className="border-b border-[#0097B2]/10 bg-[#F8FCFD]">
                  <th className="p-6 text-sm text-[8px] text-slate-400">Request ID</th>
                  <th className="p-6 text-sm text-[8px] text-slate-400">Customer</th>
                  <th className="p-6 text-sm text-[8px] text-slate-400">Vehicle</th>
                  <th className="p-6 text-sm text-[8px] text-slate-400">Status</th>
                  <th className="p-6 text-sm text-[8px] text-slate-400">Actions</th>
                </motion.tr>
              </thead>
              <tbody>
                {filteredRequests.map((r) => (
                  <tr key={r.id} className="border-b border-[#0097B2]/10/50 hover:bg-[#F8FCFD] transition-colors">
                    <td className="p-6">
                      <div className="text-[#151515] font-mono text-[10px] tracking-widest">{r.id.slice(0, 8).toUpperCase()}</div>
                      <div className="text-slate-600 text-[8px] font-bold uppercase mt-1">INIT: {new Date(r.createdAt?.seconds * 1000).toLocaleDateString()}</div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="px-4 py-2 rounded-xl bg-[#0097B2]/10 rounded-xl flex items-center justify-center">
                          <User size={14} className="text-slate-400" />
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase text-[#151515]">{r.fullName}</div>
                          <div className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">{r.mobileNumber}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#0097B2]/10 flex items-center justify-center">
                        <Car className="text-[#0097B2]" size={18}/>
                        </div>
                        <div>
                          <div className="text-xs font-black uppercase text-[#151515]">{r.vehicleMake} {r.vehicleModel}</div>
                          <div className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">{r.vehicleRegistration}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                    {r.status === "pending" && (
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                    Pending
                    </span>
                    )}
                    {r.status === "approved" && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                    Approved
                    </span>
                    )}
                    {r.status === "vehicle_delivered" && (
                    <span className="bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full text-xs font-semibold">
                    Delivered
                    </span>
                    )}
                    {r.status === "completed" && (
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                    Completed
                    </span>
                    )}
                    {r.status === "rejected" && (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                    Rejected
                    </span>
                    )}
                    </td>
                    <td className="p-6">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleUpdateStatus(r.id, 'approved')}
                          className="px-4 py-2 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center hover:bg-emerald-500 hover:text-[#151515] transition-all"
                          title="Approve"
                        >
                          <CheckCircle2 size={14} />
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(r.id, 'vehicle_delivered')}
                          className="px-4 py-2 rounded-xl bg-brand-blue/10 text-brand-blue border border-brand-blue/20 flex items-center justify-center hover:bg-brand-blue hover:text-[#151515] transition-all"
                          title="Deliver"
                        >
                          <Car size={14} />
                        </button>
                        <button 
                          onClick={() => handleUpdateStatus(r.id, 'rejected')}
                          className="px-4 py-2 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center hover:bg-red-500 hover:text-[#151515] transition-all"
                          title="Reject"
                        >
                          <XCircle size={14} />
                        </button>
                        <button className="px-4 py-2 rounded-xl bg-slate-100 text-slate-400 border border-slate-700 flex items-center justify-center hover:bg-[#0097B2] hover:text-white hover:text-black transition-all">
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
