import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
  const handleScroll = () => {
    const threshold = isHome ? 650 : 300;
    setScrolled(window.scrollY > threshold);
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, [isHome]);

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
  className={`
    fixed
    w-full
    z-50
    py-4
    transition-all
    duration-300
    ${
scrolled
  ? "bg-white border-slate-200"
  : "bg-transparent"
    }
  `}
>    
  <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
        {/* Layout fixed using flexbox to keep elements in perfect horizontal alignment */}
        <div className="flex justify-between items-center w-full gap-4">
          
          {/* Logo container with size scaled to a clean mid-range height */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={scrolled ? "/logo4.png" : "/logo.png"}
              alt="Crash Cover"
              className="h-20 lg:h-28 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav - Scaled down text sizing with optimized spacing */}
          <nav className="hidden md:flex justify-center items-center gap-6 lg:gap-8 mx-auto h-5">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`label-caps text-xs lg:text-sm tracking-wide transition-colors whitespace-nowrap
${
  location.pathname === link.path
    ? "text-[#0097B2] font-bold underline underline-offset-8 decoration-2"
    : scrolled
      ? "text-[#151515] hover:text-[#0097B2]"
      : "text-white hover:text-[#42B7E8]"
}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
            
          {/* Action Buttons Side Panel */}
<div className="hidden md:flex items-center border-l border-slate-300 pl-6 shrink-0">

<Link
  to="/eligibility"
  className="label-caps text-xs lg:text-sm bg-[#0097B2] text-white hover:bg-[#007A90] px-4 py-2 rounded font-bold"
>
  Check Eligibility
</Link>

</div>
          

          {/* Mobile Menu Button */}
          <div className="md:hidden ml-auto flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`transition-colors ${
  scrolled
    ? "text-[#151515]"
    : "text-white"
} hover:text-[#0097B2]`}
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
                  className={`block px-3 py-4 label-caps border-b border-slate-100 ${
                    location.pathname === link.path  ? 'text-[#0097B2] font-bold' : 'text-[#151515]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
<>
<Link
  to="/eligibility"
  className="label-caps text-xs lg:text-sm bg-[#0097B2] text-white hover:bg-[#007A90] px-4 py-2 rounded font-bold"
>
  Check Eligibility
</Link>
</>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}