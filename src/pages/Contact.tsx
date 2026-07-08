import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
      <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
        <span className="text-white">CONTACT</span>{" "}
        <span className="text-[#0097B2]">US</span>
      </h1>

      <p className="text-xl text-gray-400 leading-relaxed">
        Our team is available to help with replacement vehicles, accident support and general enquiries.
      </p>
    </motion.div>
  </div>

  <div className="absolute top-0 right-0 w-1/3 h-full bg-[#0097B2]/10 skew-x-[-20deg] translate-x-1/2"></div>
</section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-12">
               <div>
                  <h2 className="text-2xl font-heading font-bold text-brand-dark mb-8">Get In Touch</h2>
                  <div className="space-y-8">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue shrink-0">
                        <Phone size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-brand-dark">Call Us</p>
                        <p className="text-sm text-gray-500">0495 00 44 55</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue shrink-0">
                        <Mail size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-brand-dark">Email Us</p>
                        <p className="text-gray-600">info@crashcover.com.au</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue shrink-0">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-brand-dark">Visit Us</p>
                        <p className="text-gray-600">81 Railway Avenue,</p>
                        <p className="text-sm text-gray-500">Werribee 3030 VIC</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue shrink-0">
                        <Clock size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-brand-dark">Hours</p>
                        <p className="text-gray-600">Available 24/7</p>
                        <p className="text-sm text-gray-500">For Emergency Assistance</p>
                      </div>
                    </div>
                  </div>
               </div>

               {/* Map Placeholder */}
<div className="aspect-video rounded-3xl overflow-hidden shadow-xl border border-slate-200">
  <iframe
    title="Crash Cover Location"
    src="https://www.google.com/maps?q=81+Railway+Avenue,+Werribee+VIC+3030&output=embed"
    width="100%"
    height="100%"
    allowFullScreen
    className="w-full h-full border-0"
  />
</div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="bg-gray-50 rounded-3xl p-8 md:p-12 border border-gray-100"
               >
                 {submitted ? (
                   <div className="text-center py-12">
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} />
                      </div>
                      <h3 className="text-2xl font-heading font-bold text-brand-dark mb-4">Message Sent!</h3>
                      <p className="text-gray-600">We'll get back to you as soon as possible.</p>
                      <button 
                        onClick={() => setSubmitted(false)}
                        className="mt-8 bg-brand-blue text-white px-8 py-3 rounded-xl font-bold"
                      >
                        Send Another Message
                      </button>
                   </div>
                 ) : (
                   <>
                    <div className="mb-10">
                      <h3 className="text-2xl font-heading font-bold text-brand-dark mb-2">Send us a message</h3>
                      <p className="text-gray-500">Fill out the form below and we'll reply shortly.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                          <input 
                            required
                            type="text"
                            className="w-full bg-white text-[#151515] placeholder:text-gray-400 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0097B2]/20 focus:border-[#0097B2] transition-all"
                            placeholder="Your Name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                          <input 
                            required
                            type="email"
                            className="w-full bg-white text-[#151515] placeholder:text-gray-400 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0097B2]/20 focus:border-[#0097B2] transition-all"
                            placeholder="example@email.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                        <input 
                          type="tel"
                          className="w-full bg-white text-[#151515] placeholder:text-gray-400 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0097B2]/20 focus:border-[#0097B2] transition-all"
                          placeholder="Your Phone"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                        <textarea 
                          required
                          rows={6}
                          className="w-full bg-white text-[#151515] placeholder:text-gray-400 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#0097B2]/20 focus:border-[#0097B2] transition-all resize-none"
                          placeholder="How can we help you?"
                        ></textarea>
                      </div>
                      <button 
                        type="submit"
                        className="w-full bg-brand-blue text-white py-4 rounded-xl font-black text-lg hover:bg-brand-dark transition-all shadow-xl shadow-brand-blue/20 flex items-center justify-center"
                      >
                        <Send className="mr-2" size={20} /> SEND MESSAGE
                      </button>
                    </form>
                   </>
                 )}
               </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

import { CheckCircle } from 'lucide-react';
