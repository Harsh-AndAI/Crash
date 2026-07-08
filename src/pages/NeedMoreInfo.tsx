import { Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

export default function NeedMoreInfo() {
  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-[#07161C] via-[#0B2028] to-[#0F2D38] flex items-center justify-center px-4 overflow-auto">

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0097B2]/10 rounded-full blur-[180px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[180px]" />

      <div className="relative bg-white rounded-[36px] shadow-[0_30px_80px_rgba(0,0,0,.35)] p-12 md:p-16 max-w-2xl w-full text-center overflow-hidden">

        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#0097B2]/5 blur-3xl"></div>
        <img
  src="/logo.png"
  alt="Crash Cover"
  className="h-14 mx-auto mb-8"
/>
        {/* Icon */}
        <div className="w-24 h-24 mx-auto rounded-full bg-amber-100 flex items-center justify-center mb-8">
          <AlertTriangle
            size={52}
            className="text-amber-500"
          />
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-black text-[#151515] mb-6">
          GOOD NEWS!
        </h1>

        {/* Sub Heading */}
        <p className="text-2xl font-bold text-[#0097B2] mb-8">
          You might be eligible for a replacement vehicle.
        </p>

        {/* Description */}
        <p className="text-slate-600 text-lg leading-8 mb-12">
          Please provide a few more details about the accident so our
          team can assess your eligibility and continue your application.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-5">

          <Link
            to="/request"
            className="flex-1 bg-[#0097B2] hover:bg-[#007A90] text-white py-4 rounded-xl font-bold text-lg transition-all"
          >
            Continue & Provide Details →
          </Link>

          <Link
            to="/contact"
            className="flex-1 border-2 border-[#0097B2] text-[#0097B2] hover:bg-[#0097B2] hover:text-white py-4 rounded-xl font-bold text-lg transition-all"
          >
            Contact Us
          </Link>

        </div>

      </div>

    </div>
  );
}