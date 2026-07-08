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
    <div className="pt-5 min-h-screen">
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
              Helping eligible drivers across Victoria stay mobile with professional accident replacement vehicles and dedicated claims support.
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
                  Crash Cover provides accident replacement vehicles to eligible drivers across Victoria, ensuring minimal disruption while their vehicle is being repaired or assessed.
                </p>

                <p>
                  Working alongside repairers, insurers and accident management partners, we coordinate every stage of the replacement process, making it straightforward from first contact through to vehicle return.
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
                To simplify accident mobility by delivering professional replacement vehicle solutions with responsive service and expert claims assistance.
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
    To set the benchmark for accident mobility services through trusted partnerships, exceptional customer care and innovative replacement vehicle solutions.
  </p>
</motion.div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-dark mb-4">Our Commitments</h2>
            <div className="w-20 h-1.5 bg-brand-blue mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
  {
    title: "Fast Delivery",
    desc: "Rapid assessment and vehicle allocation to minimise downtime.",
    icon: <Clock3 size={28} />
  },
  {
    title: "Customer First",
    desc: "Delivering a smooth customer experience from accident to vehicle return.",
    icon: <HeartHandshake size={28} />
  },
  {
    title: "Claims Support",
    desc: "Providing professional assistance throughout every stage of the insurance claim.",
    icon: <FileCheck size={28} />
  },
  {
    title: "Growth",
    desc: "Growing our network to support more drivers across Australia.",
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
