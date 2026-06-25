import { motion } from 'motion/react';
import { Car, CheckCircle2, Star, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Fleet() {
  const categories = [
    {
      name: "Small & Compact",
      description: "Perfect for city driving and parking.",
      examples: "Toyota Yaris, Mazda 2 or similar",
      image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Medium & Sedans",
      description: "Comfortable for daily commutes and families.",
      examples: "Toyota Corolla, Mazda 3 or similar",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "SUVs & Family",
      description: "Spacious and versatile for all needs.",
      examples: "Toyota RAV4, Mazda CX-5 or similar",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800"
    },
    {
      name: "Rideshare Ready",
      description: "Specialized vehicles meeting platform requirements.",
      examples: "Toyota Camry Hybrid, Kia Sportage or similar",
      image: "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?auto=format&fit=crop&q=80&w=800"
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
      <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">
        OUR <span className="text-[#0097B2]">FLEET</span>
      </h1>

      <p className="text-xl text-gray-400 leading-relaxed">
        A diverse fleet of modern replacement vehicles to suit every lifestyle and driving requirement.
      </p>
    </motion.div>
  </div>

  {/* Right Accent Shape */}
  <div className="absolute top-0 right-0 w-1/3 h-full bg-[#0097B2]/10 skew-x-[-20deg] translate-x-1/2"></div>
</section>

      {/* Fleet Categories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {categories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group relative rounded-3xl overflow-hidden shadow-xl"
              >
                <div className="aspect-video">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent flex flex-col justify-end p-8">
                  <h3 className="text-2xl font-heading font-bold text-white mb-2">{cat.name}</h3>
                  <p className="text-white/70 text-sm mb-4">{cat.description}</p>
                  <div className="flex items-center space-x-2 text-brand-blue bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-sm">
                    <Car size={16} />
                    <span className="text-xs font-bold uppercase tracking-wider">{cat.examples}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
              <h2 className="text-3xl font-heading font-bold text-brand-dark mb-4">What Our Clients Say</h2>
              <div className="w-20 h-1.5 bg-brand-blue mx-auto rounded-full"></div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  name: "Sarah J.",
                  text: "Excellent service and quick vehicle delivery. The process was smooth from start to finish.",
                  role: "Melbourne Resident"
                },
                {
                  name: "Michael T.",
                  text: "Crash Cover made a stressful situation easy. Highly recommended for not-at-fault drivers.",
                  role: "Rideshare Driver"
                }
              ].map((test, idx) => (
                <div key={idx} className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100">
                   <div className="flex text-yellow-400 mb-4">
                      {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                   </div>
                   <p className="text-gray-600 italic mb-8 leading-relaxed">"{test.text}"</p>
                   <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-400">
                         <User size={24} />
                      </div>
                      <div>
                         <p className="font-bold text-brand-dark">{test.name}</p>
                         <p className="text-xs text-gray-500 uppercase tracking-widest">{test.role}</p>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Fleet CTA */}
      <section className="py-24 bg-brand-blue text-white">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-8">Need a Specific Vehicle?</h2>
            <p className="text-xl mb-12 text-white/80 max-w-2xl mx-auto">We strive to provide a like-for-like replacement to ensure your routine remains uninterrupted.</p>
            <Link 
              to="/request" 
              className="bg-brand-dark text-white px-12 py-5 rounded-full text-xl font-black hover:bg-white hover:text-brand-dark transition-all shadow-2xl"
            >
              REQUEST VEHICLE
            </Link>
         </div>
      </section>
    </div>
  );
}
