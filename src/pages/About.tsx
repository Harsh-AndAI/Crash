import { motion } from 'motion/react';
import { Target, Eye, Users, TrendingUp, ShieldCheck, Clock3, HeartHandshake, FileCheck, MapPinned } from 'lucide-react';

export default function About() {
  const values = [
    {
      title: "Reliability",
      description: "We deliver on our promises, ensuring you have a vehicle when you need it most.",
      icon: <Target className="text-brand-blue" />
    },
    {
      title: "Integrity",
      description: "Transparent processes with no hidden costs or surprises.",
      icon: <ShieldCheck className="text-brand-blue" />
    },
    {
      title: "Customer Focus",
      description: "Your mobility and satisfaction are our top priorities.",
      icon: <Users className="text-brand-blue" />
    },
    {
      title: "Efficiency",
      description: "Quick turnaround times for assessments and vehicle delivery.",
      icon: <TrendingUp className="text-brand-blue" />
    }
  ];

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-brand-dark py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">About <span className="text-[#0097B2]">Crash Cover</span></h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Melbourne's premier accident replacement vehicle specialist, keeping not-at-fault drivers on the road since our inception.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue/10 skew-x-[-20deg] translate-x-1/2"></div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <h2 className="text-3xl font-heading font-bold text-brand-dark mb-6">Who We Are</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Crash Cover is a Melbourne-based accident replacement vehicle provider helping eligible not-at-fault drivers stay on the road while their vehicles are being repaired.
                </p>

                <p>
                  Working closely with repairers, insurers and accident management partners, we deliver fast replacement vehicles with a simple, stress-free experience from start to finish.
                </p>
              </div>
            </motion.div>
            <div className="relative">
               <img 
                 src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800" 
                 alt="Team working" 
                 className="rounded-3xl shadow-2xl"
               />
               <div className="absolute -bottom-6 -left-6 bg-brand-blue p-10 rounded-2xl hidden md:block">
                  <p className="text-white font-heading font-bold text-2xl">Melbourne Based</p>
                  <p className="text-white/80">Serving VIC since day one</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission/Vision */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              whileHover={{ y: -5 }}
              className="group relative overflow-hidden bg-gradient-to-br from-white to-[#F4FBFC] p-12 rounded-3xl border border-[#0097B2]/20 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#0097B2] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <Target className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-heading font-bold text-brand-dark mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide fast, reliable, and hassle-free accident replacement vehicles while delivering outstanding customer service and support throughout the claims process.
              </p>
            </motion.div>

            <motion.div
  whileHover={{ y: -5 }}
  className="group relative overflow-hidden bg-gradient-to-br from-white to-[#F4FBFC] p-12 rounded-3xl border border-[#0097B2]/20 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
>
  {/* Background Glow */}
  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-[#0097B2]/10 blur-3xl"></div>

  {/* Icon */}
  <div className="w-16 h-16 rounded-2xl bg-[#0097B2] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
    <Eye className="text-white" size={32} />
  </div>

  <h3 className="text-2xl font-heading font-bold text-brand-dark mb-4">
    Our Vision
  </h3>

  <p className="text-gray-600 leading-relaxed">
    To become Australia's most trusted accident replacement vehicle provider by simplifying mobility solutions for not-at-fault drivers.
  </p>
</motion.div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark mb-4">Business Objectives</h2>
            <div className="w-20 h-1.5 bg-brand-blue mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
  {
    title: "Fast Delivery",
    desc: "Quick replacement vehicle allocation.",
    icon: <Clock3 size={28} />
  },
  {
    title: "Customer First",
    desc: "Reducing downtime and keeping you moving.",
    icon: <HeartHandshake size={28} />
  },
  {
    title: "Claims Support",
    desc: "Guidance throughout the insurance process.",
    icon: <FileCheck size={28} />
  },
  {
    title: "Growth",
    desc: "Expanding services across Victoria & Australia.",
    icon: <MapPinned size={28} />
  }
].map((obj, idx) => (
<div
  key={idx}
  className="group bg-white rounded-3xl border border-slate-200 p-8 shadow-lg hover:shadow-2xl hover:border-[#0097B2] hover:-translate-y-2 transition-all duration-500"
>
<div className="w-14 h-14 rounded-2xl bg-[#0097B2]/10 flex items-center justify-center mb-6 text-[#0097B2] group-hover:bg-[#0097B2] group-hover:text-white transition-all duration-300">
  {obj.icon}
</div>

  <h3 className="text-xl font-bold mb-3 text-brand-dark">
    {obj.title}
  </h3>

  <p className="text-slate-500 leading-relaxed">
    {obj.desc}
  </p>
</div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
