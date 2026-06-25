import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { Clock, CheckCircle2, AlertCircle, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRequests() {
      if (!user) return;
      try {
        const q = query(
          collection(db, 'requests'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRequests(data);
      } catch (err) {
        console.error('Error fetching requests:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchRequests();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-amber-500';
      case 'approved': return 'text-emerald-500';
      case 'rejected': return 'text-red-500';
      case 'vehicle_delivered': return 'text-brand-blue';
      default: return 'text-slate-500';
    }
  };

  return (
    <div className="pt-32 pb-24 bg-brand-dark min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <div className="label-caps mb-4 text-brand-blue">Operational Status</div>
            <h1 className="text-6xl md:text-7xl font-black tracking-tighter uppercase leading-[0.8]">
              MY PORTAL<span className="text-brand-blue">.</span>
            </h1>
          </div>
          <Link to="/request" className="btn-primary">
            New Deployment
          </Link>
        </div>

        {loading ? (
          <div className="py-24 text-center">
             <div className="label-caps animate-pulse">Syncing Mission Data...</div>
          </div>
        ) : requests.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 p-24 text-center">
            <AlertCircle size={48} className="mx-auto mb-6 text-slate-700" />
            <h3 className="text-2xl font-black uppercase mb-4 tracking-tighter text-slate-500">No active deployments detected</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto font-medium">
              You haven't initiated any vehicle replacement protocols yet. If you've been in an accident, start the recovery cycle now.
            </p>
            <Link to="/request" className="text-brand-blue font-black uppercase text-xs tracking-widest hover:text-white transition-colors">
              Launch Recovery Protocol
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {requests.map((request) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-900 border border-slate-800 p-8 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-brand-blue transition-all"
              >
                <div className="flex items-center gap-8 w-full md:w-auto">
                  <div className="w-16 h-16 bg-slate-800 flex items-center justify-center font-black text-2xl text-slate-700 group-hover:text-brand-blue transition-all">
                    {request.status === 'approved' ? <CheckCircle2 /> : <Clock />}
                  </div>
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                       <span className={`label-caps text-[10px] ${getStatusColor(request.status)}`}>
                         {request.status.replace('_', ' ')}
                       </span>
                       <span className="text-slate-700 text-[10px] font-black tracking-widest">
                         REF: {request.id.slice(0, 8).toUpperCase()}
                       </span>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter">
                      {request.vehicleMake} {request.vehicleModel}
                    </h3>
                    <div className="flex gap-4 text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-2">
                      <span>REGO: {request.vehicleRegistration}</span>
                      <span className="text-slate-800">|</span>
                      <span>DATE: {request.accidentDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-slate-800 pt-6 md:pt-0">
                  <div className="hidden lg:block text-right">
                    <div className="label-caps text-slate-700 mb-1">Documentation</div>
                    <div className="flex gap-2">
                       <FileText size={14} className="text-brand-blue" />
                       <FileText size={14} className="text-slate-800" />
                       <FileText size={14} className="text-slate-800" />
                    </div>
                  </div>
                  <button className="flex items-center gap-4 group/btn">
                    <span className="label-caps group-hover/btn:text-white transition-colors">Details</span>
                    <div className="w-10 h-10 border border-slate-800 rounded-full flex items-center justify-center group-hover/btn:border-brand-blue group-hover/btn:bg-brand-blue transition-all">
                      <ChevronRight size={16} className="text-slate-500 group-hover/btn:text-white" />
                    </div>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
