import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle, FileText, Upload, AlertCircle } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function RequestForm() {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    emailAddress: user?.email || '',
    accidentDate: '',
    accidentLocation: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleRegistration: '',
    rideshareRequired: false,
    insuranceCompany: '',
    claimNumber: '',
    repairerDetails: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    setError('');

    try {
      await addDoc(collection(db, 'requests'), {
        ...formData,
        userId: user?.uid || 'guest',
        status: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (err: any) {
      setError('System failure during deployment: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  if (submitted) {
    return (
      <div className="pt-20 min-h-screen bg-white flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-slate-200 p-12 text-center"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-heading font-bold text-[#151515] mb-4">Request Submitted Successfully!</h2>
          <p className="text-slate-500 leading-relaxed mb-8">
          Thank you for submitting your request. Our team will review your details and contact you shortly to arrange your replacement vehicle.
          </p>
          <div className="space-y-4">
            {user ? (
              <Link 
                to={role === 'admin' ? '/admin' : '/dashboard'}
                className="w-full block bg-[#0097B2] text-white py-4 rounded-xl font-bold hover:bg-[#007A90] transition-all"
              >
                Uplink to Dashboard
              </Link>
            ) : (
              <Link 
                to="/"
                className="w-full block bg-[#0097B2] text-white py-4 rounded-xl font-bold hover:bg-[#007A90] transition-all"
              >
                Return to Base
              </Link>
            )}
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-4 text-[#0097B2] font-semibold hover:underline"
            >
              Submit Another Request
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-20 bg-white min-h-screen">
      <section className="bg-brand-dark py-24 relative overflow-hidden mb-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center max-w-3xl mx-auto"
  >
<h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
  <span className="text-white">REQUEST</span>{" "}
  <span className="text-[#0097B2]">VEHICLE</span>
</h1>

<p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
  Complete the form below and our team will arrange your replacement vehicle as quickly as possible.
</p>
    </motion.div>

  </div>

  <div className="absolute top-0 right-0 w-1/3 h-full bg-[#0097B2]/10 skew-x-[-20deg] translate-x-1/2"></div>
</section>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded flex items-center gap-3 text-red-500 text-xs font-bold uppercase tracking-widest">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        >
          <form onSubmit={handleSubmit} className="p-10 md:p-14 space-y-10">
            <div className="space-y-16">
              {/* Personal Details */}
              <section className="bg-[#F8FCFD] rounded-3xl border border-slate-200 p-10">
                <div className="flex items-end gap-4 mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#0097B2]/10 flex items-center justify-center text-[#0097B2] font-black text-xl">01</div>
                  <div>
<h3 className="text-2xl font-heading font-bold text-[#151515]">
Personal Details
</h3>

<p className="text-slate-500 mt-1">
Enter your personal information.
</p>
</div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="label-caps mb-2 block text-[8px]">Legal Name</label>
                    <input 
                      required
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="bg-white
border
border-slate-200
rounded-xl
text-[#151515]
placeholder:text-slate-400
focus:border-[#0097B2]
focus:ring-2
focus:ring-[#0097B2]/20
transition-all
px-4
py-3"
                      placeholder="FULL NAME"
                    />
                  </div>
                  <div>
                    <label className="label-caps mb-2 block text-[8px]">Mobile Link</label>
                    <input 
                      required
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      className="bg-white
border
border-slate-200
rounded-xl
text-[#151515]
placeholder:text-slate-400
focus:border-[#0097B2]
focus:ring-2
focus:ring-[#0097B2]/20
transition-all
px-4
py-3"
                      placeholder="0400 000 000"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="label-caps mb-2 block text-[8px]">Data Channel (Email)</label>
                    <input 
                      required
                      type="email"
                      name="emailAddress"
                      value={formData.emailAddress}
                      onChange={handleChange}
                      className="bg-white
border
border-slate-200
rounded-xl
text-[#151515]
placeholder:text-slate-400
focus:border-[#0097B2]
focus:ring-2
focus:ring-[#0097B2]/20
transition-all
px-4
py-3"
                      placeholder="EMAIL@DOMAIN.COM"
                    />
                  </div>
                </div>
              </section>

              {/* Accident Details */}
              <section className="bg-[#F8FCFD] rounded-3xl border border-slate-200 p-10">
                <div className="flex items-end gap-4 mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#0097B2]/10 flex items-center justify-center text-[#0097B2] font-black text-xl">02</div>
                  <h3 className="label-caps text-brand-blue">Incident Metrics</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="label-caps mb-2 block text-[8px]">Timestamp</label>
                    <input 
                      required
                      type="date"
                      name="accidentDate"
                      value={formData.accidentDate}
                      onChange={handleChange}
                      className="bg-white
border
border-slate-200
rounded-xl
text-[#151515]
placeholder:text-slate-400
focus:border-[#0097B2]
focus:ring-2
focus:ring-[#0097B2]/20
transition-all
px-4
py-3"
                    />
                  </div>
                  <div>
                    <label className="label-caps mb-2 block text-[8px]">Geospatial Location</label>
                    <input 
                      required
                      name="accidentLocation"
                      value={formData.accidentLocation}
                      onChange={handleChange}
                      className="bg-white
border
border-slate-200
rounded-xl
text-[#151515]
placeholder:text-slate-400
focus:border-[#0097B2]
focus:ring-2
focus:ring-[#0097B2]/20
transition-all
px-4
py-3"
                      placeholder="SUBURB / INTERSECTION"
                    />
                  </div>
                  <div>
                    <label className="label-caps mb-2 block text-[8px]">Insurer ID</label>
                    <input 
                      name="insuranceCompany"
                      value={formData.insuranceCompany}
                      onChange={handleChange}
                      className="bg-white
border
border-slate-200
rounded-xl
text-[#151515]
placeholder:text-slate-400
focus:border-[#0097B2]
focus:ring-2
focus:ring-[#0097B2]/20
transition-all
px-4
py-3"
                      placeholder="INSURANCE PROVIDER"
                    />
                  </div>
                  <div>
                    <label className="label-caps mb-2 block text-[8px]">Claim Reference</label>
                    <input 
                      name="claimNumber"
                      value={formData.claimNumber}
                      onChange={handleChange}
                      className="bg-white
border
border-slate-200
rounded-xl
text-[#151515]
placeholder:text-slate-400
focus:border-[#0097B2]
focus:ring-2
focus:ring-[#0097B2]/20
transition-all
px-4
py-3"
                      placeholder="CLAIM NUMBER"
                    />
                  </div>
                </div>
              </section>

              {/* Vehicle Details */}
              <section className="bg-[#F8FCFD] rounded-3xl border border-slate-200 p-10">
                <div className="flex items-end gap-4 mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#0097B2]/10 flex items-center justify-center text-[#0097B2] font-black text-xl">03</div>
                  <h3 className="label-caps text-brand-blue">Damaged Asset Specifications</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="label-caps mb-2 block text-[8px]">Manufacturer</label>
                    <input 
                      required
                      name="vehicleMake"
                      value={formData.vehicleMake}
                      onChange={handleChange}
                      className="bg-white
border
border-slate-200
rounded-xl
text-[#151515]
placeholder:text-slate-400
focus:border-[#0097B2]
focus:ring-2
focus:ring-[#0097B2]/20
transition-all
px-4
py-3"
                      placeholder="E.G. TOYOTA"
                    />
                  </div>
                  <div>
                    <label className="label-caps mb-2 block text-[8px]">Model / Variant</label>
                    <input 
                      required
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleChange}
                      className="bg-white
border
border-slate-200
rounded-xl
text-[#151515]
placeholder:text-slate-400
focus:border-[#0097B2]
focus:ring-2
focus:ring-[#0097B2]/20
transition-all
px-4
py-3"
                      placeholder="E.G. HILUX"
                    />
                  </div>
                  <div>
                    <label className="label-caps mb-2 block text-[8px]">Identification Tag (Rego)</label>
                    <input 
                      required
                      name="vehicleRegistration"
                      value={formData.vehicleRegistration}
                      onChange={handleChange}
                      className="bg-white
border
border-slate-200
rounded-xl
text-[#151515]
placeholder:text-slate-400
focus:border-[#0097B2]
focus:ring-2
focus:ring-[#0097B2]/20
transition-all
px-4
py-3"
                      placeholder="REGO NUMBER"
                    />
                  </div>
                  <div className="flex items-center space-x-4 pt-4">
                    <input 
                      type="checkbox"
                      id="rideshare"
                      name="rideshareRequired"
                      checked={formData.rideshareRequired}
                      onChange={handleChange}
                      className="w-5 h-5 rounded border-slate-300 text-[#0097B2] focus:ring-[#0097B2] text-brand-blue focus:ring-brand-blue"
                    />
                    <label htmlFor="rideshare" className="label-caps text-[8px]">Rideshare Infrastructure Required</label>
                  </div>
                </div>
              </section>

              {/* Documentation Section */}
              <section className="bg-[#F8FCFD] rounded-3xl border border-slate-200 p-10">
                <div className="flex items-end gap-4 mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-[#0097B2]/10 flex items-center justify-center text-[#0097B2] font-black text-xl">04</div>
                  <h3 className="label-caps text-brand-blue">Evidence Uplink</h3>
                </div>
                <div className="bg-white border-2 border-dashed border-[#0097B2]/30 rounded-3xl p-12 text-center hover:border-[#0097B2] transition">
                  <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-blue transition-all">
                    <Upload className="text-slate-400 group-hover:text-white" size={24} />
                  </div>
                  <div className="label-caps text-white mb-2">Drag & Drop Documents</div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    Licence, Rego, Photos (Max 20MB / PDF, JPG, PNG)
                  </p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 bg-white border p-3 border border-slate-200 rounded-xl">
                    <FileText size={16} className="text-slate-600" />
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">driver_licence.pdf</span>
                    <span className="text-[8px] text-brand-blue font-bold ml-auto uppercase">READY</span>
                  </div>
                  <div className="flex items-center gap-3 bg-white border p-3 border border-slate-200 rounded-xl opacity-50">
                    <FileText size={16} className="text-slate-600" />
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">accident_photos.zip</span>
                    <span className="text-[8px] text-slate-600 font-bold ml-auto uppercase">PENDING</span>
                  </div>
                </div>
              </section>

              {/* Submit */}
              <div className="pt-6">
                <button 
                  disabled={loading}
                  type="submit"
                  className="w-full bg-[#0097B2] hover:bg-[#007A90] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-[#0097B2]/20 flex items-center justify-center"
                >
                  <Send className="mr-4" size={24} /> 
                  {loading ? 'UPLINKING DATA...' : 'SUBMIT REQUEST'}
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
