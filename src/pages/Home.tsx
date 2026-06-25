import { motion } from 'motion/react';
import { CheckCircle2, ShieldCheck, Phone, Car } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const steps = [
    {
      number: "1",
      title: "Contact Us",
      description: "Tell us about your accident and provide your vehicle details.",
      icon: <Phone className="text-white" size={24} />
    },
    {
      number: "2",
      title: "Get Approved",
      description: "We assess your eligibility and arrange approval quickly.",
      icon: <ShieldCheck className="text-white" size={24} />
    },
    {
      number: "3",
      title: "We Deliver",
      description: "We deliver a like-for-like replacement vehicle directly to you.",
      icon: <Car className="text-white" size={24} />
    },
    {
      number: "4",
      title: "Insurer Pays",
      description: "For eligible not-at-fault drivers, we recover costs from the at-fault insurer.",
      icon: <CheckCircle2 className="text-white" size={24} />
    }
  ];

  return (
    <div className="pt-12">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center bg-brand-dark overflow-hidden p-8 md:p-16">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-15%] right-[-10%] w-[800px] h-[800px] bg-brand-blue/10 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px]"></div>

        <div className="max-w-7xl mx-auto w-full relative z-10 flex">
          <div className="w-full lg:w-3/4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="label-caps mb-8 text-slate-500">Accident Replacement Vehicle Specialists</div>
              <h1 className="text-[14vw] lg:text-[112px] font-black leading-[0.85] tracking-tighter uppercase mb-12">
                FAST ACCIDENT<br/><span className="text-brand-blue">REPLACEMENT</span><br/><span className="text-brand-blue">VEHICLES</span>
              </h1>
              <p className="max-w-lg text-lg text-slate-400 leading-relaxed font-medium mb-12">
                Fast and reliable replacement vehicles for eligible not-at-fault drivers across Melbourne, keeping you moving while your vehicle is repaired.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <Link
                  to="/request"
                  className="btn-primary w-full sm:w-auto"
                >
                  Request a Vehicle
                </Link>

              </div>
            </motion.div>
          </div>
          
          {/* Side Artistic Text */}
          <div className="hidden lg:flex w-1/4 items-center justify-end overflow-hidden text-white">
            <div className="text-[340px] font-black text-slate-800/10 leading-none select-none origin-center rotate-90 translate-x-32 tracking-tighter">
              DRIVE
            </div>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        {/* <div className="absolute bottom-12 left-8 md:left-16 right-8 md:right-16 border-t border-slate-800 pt-8 hidden md:flex justify-between items-end z-10"> */}
<div className="absolute right-10 lg:right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-12 z-20">
  <div>
    <div className="label-caps text-slate-500 mb-2">
      Response Time
    </div>
    <div className="text-4xl font-light tracking-tighter text-white">
      02
      <span className="text-base text-brand-blue ml-1">hr</span>
    </div>
  </div>

  <div>
    <div className="label-caps text-slate-500 mb-2">
      Fleet Size
    </div>
    <div className="text-4xl font-light tracking-tighter text-white">
      500
      <span className="text-base text-brand-blue ml-1">+</span>
    </div>
  </div>

  <div>
    <div className="label-caps text-slate-500 mb-2">
      Customer Rating
    </div>
    <div className="text-4xl font-light tracking-tighter text-white">
      4.9
      <span className="text-base text-brand-blue ml-1">★</span>
    </div>
  </div>
</div>
        {/* </div> */}
      </section>

      {/* Steps Section */}
      <section className="py-32 bg-white text-brand-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="label-caps mb-4 text-brand-blue">
              How It Works
            </div>

            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
              HOW CRASH COVER WORKS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-slate-200">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                className="p-12 border-slate-200 border-r last:border-r-0 md:odd:border-r last:md:odd:border-r-0 lg:border-r last:lg:border-r-0 border-b lg:border-b-0 hover:bg-slate-50 transition-colors group"
              >
                <div className="text-[64px] font-black text-slate-100 group-hover:text-brand-blue/40 transition-colors mb-4 leading-none">
                  0{step.number}
                </div>
                <h3 className="text-xl font-black uppercase mb-4 tracking-tighter">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics / Stats Overlay Section */}
      <section className="py-32 bg-brand-dark relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-[40px] border-slate-900/50 rotate-12 -z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="label-caps mb-4 text-brand-blue">Why Choose Crash Cover</div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-12">
                YOUR TRUSTED<br/>MOBILITY PARTNER.<span className="text-brand-blue">.</span>
              </h2>
              <div className="space-y-12">
                 <div>
                    <div className="text-6xl font-light tracking-tighter mb-2">99.9<span className="text-2xl text-brand-blue ml-1">%</span></div>
                    <div className="label-caps text-slate-500">Fast Vehicle Allocation</div>
                 </div>
                 <div>
                    <div className="text-6xl font-light tracking-tighter mb-2">24<span className="text-2xl text-brand-blue ml-1">/7</span></div>
                    <div className="label-caps text-slate-500">Dedicated Customer Support</div>
                 </div>
                 <div className="pt-6">
                    <Link to="/about" className="btn-secondary">
                       Learn More
                    </Link>
                 </div>
              </div>
            </div>
            <div className="relative aspect-square">
               <div className="absolute inset-0 border border-slate-800 rotate-3"></div>
               <div className="absolute inset-0 border border-slate-800 -rotate-3"></div>
               <img 
                 src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800" 
                 alt="High Performance" 
                 className="w-full h-full object-cover filter grayscale"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Global CTA */}
      <section className="py-40 bg-brand-blue text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 select-none flex items-center justify-center pointer-events-none">
          <div className="text-[20vw] font-black rotate-[-10deg] tracking-tighter uppercase">CRASH COVER</div>
        </div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="label-caps text-white/60 mb-8 tracking-[0.4em]">Need a Replacement Vehicle?</div>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8] mb-16">
            LET'S GET YOU<br/>BACK ON THE ROAD.
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="tel:0495004455" 
              className="bg-white text-black px-12 py-6 font-black uppercase text-sm tracking-widest hover:bg-brand-dark hover:text-white transition-all shadow-2xl"
            >
              Call 0495 00 44 55
            </a>
            <Link 
              to="/request" 
              className="bg-brand-dark text-white px-12 py-6 font-black uppercase text-sm tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl"
            >
              Request a Vehicle
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
