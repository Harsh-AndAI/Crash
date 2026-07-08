import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      question: "Who is eligible for a replacement vehicle?",
      answer: "Not-at-fault drivers involved in an accident where another identifiable party is at fault. This includes private vehicle owners and rideshare drivers."
    },
    {
      question: "Do I need to pay upfront?",
      answer: "No. Eligible customers generally have no upfront costs. We recover all costs directly from the at-fault driver's insurance company."
    },
    {
      question: "How quickly can I receive a vehicle?",
      answer: "We aim for same-day or next-day delivery once your eligibility is confirmed and assessment is complete."
    },
    {
      question: "What documents are required?",
      answer: "You'll need a valid AU Driver's License, your vehicle's registration details, accident details (including the at-fault party's information), and insurance/claim information."
    },
    {
      question: "How long can I keep the vehicle?",
      answer: "You can keep the replacement vehicle for the reasonable repair period of your own vehicle, or until a total loss settlement is reached."
    },
    {
      question: "What areas do you serve?",
      answer: "We currently provide services across Melbourne, Geelong, and the Western Suburbs of Victoria."
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
      <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
        <span className="text-white">FREQUENTLY ASKED</span>{" "}
        <span className="text-[#0097B2]">QUESTIONS</span>
      </h1>

      <p className="text-xl text-gray-400 leading-relaxed">
        Find answers to common questions about our replacement vehicles, eligibility and accident support services.
      </p>
    </motion.div>
  </div>

  {/* Right Accent Shape */}
  <div className="absolute top-0 right-0 w-1/3 h-full bg-[#0097B2]/10 skew-x-[-20deg] translate-x-1/2"></div>
</section>

      {/* FAQ List */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openIdx === idx ? 'border-brand-blue shadow-lg' : 'border-gray-200'}`}
              >
                <button 
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className={`text-lg font-bold ${openIdx === idx ? 'text-brand-blue' : 'text-brand-dark'}`}>
                    {faq.question}
                  </span>
                  {openIdx === idx ? <ChevronUp className="text-brand-blue" /> : <ChevronDown className="text-gray-400" />}
                </button>
                <AnimatePresence>
                  {openIdx === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-brand-blue/5 rounded-3xl p-10 text-center border border-brand-blue/10">
             <h3 className="text-2xl font-heading font-bold text-brand-dark mb-4">Still have questions?</h3>
             <p className="text-gray-600 mb-8">We're here to help you 24/7. Reach out to our mobility experts.</p>
             <Link 
               to="/contact"
               className="inline-block bg-brand-blue text-white px-10 py-4 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-xl shadow-brand-blue/20"
             >
               Contact Support
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
