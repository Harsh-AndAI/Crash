import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#151515] text-white pt-24 pb-12 border-t border-[#0097B2]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-8">
<img
  src="/logo1.png"
  alt="Crash Cover"
  className="h-20 w-auto object-contain"
/>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Global enterprise mobility infrastructure. Providing fast and reliable accident replacement vehicles across Australia.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 border border-[#0097B2]/30 flex items-center justify-center hover:border-[#0097B2] hover:bg-[#0097B2] hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-[#0097B2]/30 flex items-center justify-center hover:border-[#0097B2] hover:bg-[#0097B2] hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-[#0097B2]/30 flex items-center justify-center hover:border-[#0097B2] hover:bg-[#0097B2] hover:text-white transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Links Column */}
          <div>
            <div className="label-caps mb-8 text-slate-500">Products</div>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/how-it-works" className="hover:text-white transition-colors">Infrastructure</Link></li>
              <li><Link to="/fleet" className="hover:text-white transition-colors">Fleet</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Documentation</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <div className="label-caps mb-8 text-slate-500">Contact</div>
            <ul className="space-y-6 text-sm text-slate-400">
              <li className="flex items-start space-x-3">
                <div className="text-[#0097B2] font-black tracking-tighter mt-1 shrink-0 text-xs">TEL</div>
                <span className="font-bold">1300 CRASH COVER<br /><span className="text-[10px] text-slate-500">0495 00 44 55</span></span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="text-[#0097B2] font-black tracking-tighter mt-1 shrink-0 text-xs">MAIL</div>
                <span className="font-bold">info@crashcover.com.au</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="text-[#0097B2] font-black tracking-tighter mt-1 shrink-0 text-xs">LOC</div>
                <span className="font-bold">81 Railway Avenue,<br />Werribee 3030 VIC</span>
              </li>
            </ul>
          </div>

          {/* Status Column */}
{/* Why Choose Us */}
<div>
  <div className="label-caps mb-8 text-slate-500">Why Choose Us</div>

  <ul className="space-y-4 text-sm text-slate-300">
    <li className="flex items-center gap-3">
      <div className="w-2 h-2 rounded-full bg-[#0097B2]"></div>
      <span>24/7 Customer Support</span>
    </li>

    <li className="flex items-center gap-3">
      <div className="w-2 h-2 rounded-full bg-[#0097B2]"></div>
      <span>Fast Vehicle Replacement</span>
    </li>

    <li className="flex items-center gap-3">
      <div className="w-2 h-2 rounded-full bg-[#0097B2]"></div>
      <span>No Out-of-Pocket Costs*</span>
    </li>

    <li className="flex items-center gap-3">
      <div className="w-2 h-2 rounded-full bg-[#0097B2]"></div>
      <span>Servicing Melbourne & Victoria</span>
    </li>
  </ul>
</div>
        </div>

        <div className="mt-24 pt-8 border-t border-[#0097B2]/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] font-bold tracking-widest text-slate-600 uppercase">
          <p>&copy; {currentYear} Crash Cover. Designed for speed.</p>
          <div className="flex space-x-10">
            <Link to="/privacy" className="hover:text-[#0097B2] transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-[#0097B2] transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
