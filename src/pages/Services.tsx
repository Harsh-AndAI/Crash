import { motion } from 'motion/react';
import { Car, ShieldAlert, BadgeCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const services = [
    {
      title: "Accident Replacement Vehicles",
      description: "Replacement vehicles supplied to eligible not-at-fault drivers while their vehicle is being repaired or replaced.",
      details: [
        "Like-for-like replacement (subject to availability)",
        "Zero upfront cost for eligible drivers",
        "Comprehensive insurance coverage included",
        "Available for personal and rideshare use"
      ],
      icon: <Car size={32} />
    },
    {
      title: "Insurance Claim Assistance",
      description: "Professional support throughout the entire insurance claim process to minimize your stress and maximize efficiency.",
      details: [
        "Documentation assistance and review",
        "Coordination with at-fault insurers",
        "Expert advice on claim requirements",
        "Ongoing support until the claim is settled"
      ],
      icon: <ShieldAlert size={32} />
    },
    {
      title: "Accident Assistance",
      description: "Immediate guidance after an accident, including vehicle recovery coordination and repair management.",
      details: [
        "Towing coordination",
        "Smash repairer referrals",
        "Vehicle assessment guidance",
        "Initial consultation and advice"
      ],
      icon: <BadgeCheck size={32} />,
      badge: "Future Expansion"
    }
  ];

  return (
    <div className="pt-5 min-h-screen">
      {/* Header */}
{/* Header */}
<section className="bg-brand-dark py-24 relative overflow-hidden">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center max-w-3xl mx-auto"
    >
      <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
        Our <span className="text-[#0097B2]">Services</span>
      </h1>

      <p className="text-xl text-gray-400 leading-relaxed">
        Fast replacement vehicles, insurance claim assistance and accident
        support services for eligible not-at-fault drivers across Victoria.
      </p>
    </motion.div>
  </div>

  <div className="absolute top-0 right-0 w-1/3 h-full bg-[#0097B2]/10 skew-x-[-20deg] translate-x-1/2"></div>
</section>

      {/* Services List */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col lg:items-center gap-12 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue">
                      {service.icon}
                    </div>
                    {service.badge && (
                      <span className="bg-brand-dark text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                        {service.badge}
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl font-heading font-bold text-brand-dark mb-4">{service.title}</h2>
                  <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.details.map((detail, i) => (
                      <li key={i} className="flex items-start space-x-3">
                        <Truck className="text-brand-blue mt-1 shrink-0" size={18} />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-10">
                    <Link
                      to="/request"
                      className="inline-block bg-brand-dark text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-blue transition-all shadow-xl"
                    >
                      Enquire Now
                    </Link>
                  </div>
                </div>
                <div className="flex-1 relative">
                  <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden shadow-2xl">
                    <img 
                      src={
  idx === 0
    ? "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800"
    : idx === 1
    ? "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800"
    : "https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?auto=format&fit=crop&q=80&w=800"
}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute -z-10 -bottom-6 -right-6 w-32 h-32 bg-brand-blue/20 rounded-full blur-3xl"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-24 bg-gray-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-heading font-bold text-brand-dark mb-4">Service Areas</h2>
              <p className="text-gray-500">Currently serving Victoria, with nationwide expansion planned.</p>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {["Melbourne", "Geelong", "Western Suburbs"].map((area, idx) => (
                <motion.div
  whileHover={{
    y: -10,
    scale: 1.03
  }}
  transition={{ duration: 0.3 }}
  className="group relative overflow-hidden bg-white p-10 rounded-3xl shadow-lg border border-slate-200 hover:border-[#0097B2] hover:shadow-2xl transition-all duration-500 text-center"
>
                  <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#0097B2]/10 blur-3xl"></div>

                  <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-[#0097B2]/10 flex items-center justify-center group-hover:bg-[#0097B2] transition-all duration-300">

                    <Truck
                      size={26}
                      className="text-[#0097B2] group-hover:text-white"
                    />

                  </div>

                  <p className="text-2xl font-black text-brand-dark mb-2">
                    {area}
                  </p>

                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-bold">
                    Victoria, Australia
                  </p>
                </motion.div>
              ))}
           </div>
        </div>
      </section>
    </div>
  );
}
