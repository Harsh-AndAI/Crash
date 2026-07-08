import { motion } from 'motion/react';
import {  Star,  User,  Fuel,  Users,  CarFront} from "lucide-react";
import { fleetData } from "../data/fleetData";

export default function Fleet() {
const categories = fleetData;
  return (
    <div className="pt-5 min-h-screen">
      {/* Header */}
<section className="bg-brand-dark py-24 relative overflow-hidden">
  <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

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
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-10">
            {fleetData.flatMap(category => category.cars).map((car, idx) => (

<motion.div
  key={idx}
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  whileHover={{
    y: -10,
    scale: 1.03
  }}
  transition={{
    duration: 0.35
  }}
  className="group"
>

  <div className="
bg-white
rounded-[32px]
px-5
py-6
sm:px-8
sm:py-8
lg:px-10
lg:pt-10
lg:pb-8
h-full
flex
flex-col
shadow-lg
hover:shadow-2xl
transition-all
duration-300
border
border-slate-100
">

    <img
      src={car.image}
      alt={car.name}
      className="
h-[170px]
sm:h-[200px]
lg:h-[230px]
w-full
object-contain
mx-auto
transition-all
duration-500
group-hover:scale-110
"
    />

<h3
  className="
mt-8
mb-8
min-h-[70px]
sm:min-h-[80px]
lg:h-[90px]

flex
items-center
justify-center
text-center

text-xl
sm:text-2xl
lg:text-[30px]

leading-tight
leading-tight
font-black
uppercase
text-[#0A1445]
"
>

      {car.name}

    </h3>

<div
className="
mt-auto
bg-slate-50
rounded-2xl
sm:rounded-full

px-4
sm:px-8

py-4

flex
flex-wrap
justify-center
items-center

gap-4
sm:gap-8
"
>

      <div className="flex items-center gap-2 text-sm sm:text-base">

        <Fuel size={22} className="text-[#42B7E8]" />

        <span className="font-bold uppercase text-[#0A1445]">
          {car.fuel}
        </span>

      </div>

      <div className="flex items-center gap-2 text-sm sm:text-base">

        <Users size={22} className="text-[#42B7E8]" />

        <span className="font-bold uppercase text-[#0A1445]">
          {car.seats} Seats
        </span>

      </div>

      <div className="flex items-center gap-2 text-sm sm:text-base">

        <CarFront size={22} className="text-[#42B7E8]" />

        <span className="font-bold uppercase text-[#0A1445]">
          {car.doors === 5 ? "SUV" : "Sedan"}
        </span>

      </div>

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
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
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
    </div>
  );
}
