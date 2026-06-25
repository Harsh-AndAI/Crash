import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
// import logo from '.assests/logo.png'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, role } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = () => {
    signOut(auth);
    setIsOpen(false);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Fleet', path: '/fleet' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
  className={`fixed w-full z-50 transition-all duration-300 ${
    scrolled
  ? 'bg-white/95 backdrop-blur-xl border-b border-[#0097B2]/20 py-2 shadow-md'
  : 'bg-white/90 backdrop-blur-lg py-2'
  }`}
>
      <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-[280px_1fr_320px] items-center">
          <Link to="/" className="flex items-center">
            <img
            src="/logo.png"
            alt="Crash Cover"
            className="h-16 lg:h-18 w-auto object-contain"
          />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex justify-center items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`label-caps transition-colors hover:text-[#0097B2] ${
                  location.pathname === link.path ? 'text-[#0097B2] font-bold underline underline-offset-8 decoration-2' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
            </nav>
            
            {user ? (
              <div className="flex items-center space-x-6 border-l border-slate-800 pl-8 ml-2">
                <Link 
                  to={role === 'admin' ? '/admin' : '/dashboard'} 
                  className="label-caps flex items-center gap-2 text-[#0097B2] hover:text-[#6ED8E9]"
                >
                  <User size={14} />
                  {role === 'admin' ? 'Admin Panel' : 'My Portal'}
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="label-caps flex items-center gap-2 text-slate-500 hover:text-red-500 transition-colors"
                >
                  <LogOut size={14} />
                  Exit
                </button>
              </div>
            ) : (
              <div className="ml-auto flex items-center gap-6 border-l border-slate-300 pl-8">
                <Link to="/login" className="label-caps text-[#151515] hover:text-[#0097B2] transition-colors text-[8px]">Staff Access</Link>
                <Link
                  to="/request"
                  className="px-6 py-2 bg-[#0097B2] text-white border border-[#0097B2] rounded-md text-[10px] font-bold uppercase tracking-widest hover:bg-[#007A90] transition-all duration-300"
                >
                  Get a Vehicle
                </Link>
              </div>
            )}
          

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#151515] hover:text-[#0097B2] transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-[#0097B2]/20 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-4 label-caps border-b border-slate-900 ${
                    location.pathname === link.path  ? 'text-[#0097B2] font-bold' : 'text-[#151515]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {user ? (
                <>
                  <Link
                    to={role === 'admin' ? '/admin' : '/dashboard'}
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-4 label-caps border-b border-slate-900 text-[#0097B2]"
                  >
                    {role === 'admin' ? 'Admin Dashboard' : 'My Portal'}
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-4 label-caps text-red-500"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-4 label-caps border-b border-slate-900"
                  >
                    Login
                  </Link>
                  <Link
                    to="/request"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center bg-[#0097B2] text-white hover:bg-[#007A90] px-5 py-4 font-black uppercase text-xs tracking-widest mt-4"
                  >
                    Get a Vehicle
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
