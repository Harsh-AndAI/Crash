import { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { LogIn, UserPlus, AlertCircle } from 'lucide-react';

export default function AuthPage({ mode }: { mode: 'login' | 'signup' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', user.uid), {
          email,
          fullName,
          role: 'customer',
          createdAt: new Date()
        });
      }
      navigate('/');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-gradient-to-br from-white via-[#F8FCFD] to-[#EAF8FB] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#0097B2]/15 rounded-full blur-3xl"></div>

<div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-200/30 rounded-full blur-3xl"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-[#0097B2]/10 p-10 relative z-10"
      >
        <div className="text-center mb-10">
          <img
              src="/logo.png"
              alt="Crash Cover"
              className="h-20 mx-auto mb-8"
            />
          <h2 className="text-4xl font-black text-[#151515] tracking-tight">
            {mode === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded flex items-center gap-3 text-red-500 text-xs font-bold uppercase tracking-widest">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'signup' && (
            <div>
              <label className="block text-sm font-semibold text-[#151515] mb-2">Subject Name</label>
              <input
                required
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-[#151515] placeholder:text-slate-400 shadow-sm outline-none transition-all duration-300 focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/15"
                placeholder="FULL NAME"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-[#151515] mb-2">Staff ID (Email)</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-[#151515] placeholder:text-slate-400 caret-[#0097B2] shadow-sm outline-none transition-all duration-300 focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/15"
                placeholder="Enter your staff email"
              />
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#151515] mb-2">Security Key (Password)</label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-4 text-[#151515] placeholder:text-slate-400 caret-[#0097B2] shadow-sm outline-none transition-all duration-300 focus:border-[#0097B2] focus:ring-4 focus:ring-[#0097B2]/15"
              placeholder="Enter your password"
            />
          </div>

          <button
            disabled={loading}
            type="submit"
            className="w-full py-4 rounded-xl bg-[#0097B2] text-white font-bold tracking-wide hover:bg-[#007A90] transition-all duration-300 shadow-lg hover:shadow-[#0097B2]/40 disabled:opacity-50"
          >
            {loading ? 'AUTHENTICATING...' : mode === 'login' ? 'SIGN IN' : 'REGISTER'}
          </button>
        </form>

        <div className="mt-8 text-center">
  {mode === "login" ? (
    <p className="text-sm text-slate-500">
      Don't have an account?{" "}
      <Link
        to="/signup"
        className="font-semibold text-[#0097B2] hover:underline"
      >
        Create Account
      </Link>
    </p>
  ) : (
    <>
      {/* Full Name Field (Only for Signup) */}
      <div className="mt-6"></div>

      <p className="text-sm text-slate-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-[#0097B2] hover:underline"
        >
          Sign In
        </Link>
      </p>
    </>
  )}
</div>
      </motion.div>
    </div>
  );
}
