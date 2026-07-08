import { useParams, Link } from "react-router-dom";
import { fleetData } from "../data/fleetData";
import {Users,Fuel,DoorOpen,Briefcase} from "lucide-react";
import { motion } from "motion/react";

export default function FleetCategory() {

  const { id } = useParams();

  const category = fleetData.find((c) => c.id === id);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Category not found
      </div>
    );
  }

  return (

    <div className="bg-slate-50 min-h-screen">

      {/* Hero */}

      <div
        className="h-[320px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${category.image})` }}
      >

        <div className="absolute inset-0 bg-black/60"/>

        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center px-8">

          <Link
            to="/fleet"
            className="text-white mb-8"
          >
            ← Back to Fleet
          </Link>

          <h1 className="text-6xl font-black text-white mb-4">

            {category.name}

          </h1>

          <p className="text-white/80 text-xl">

            {category.description}

          </p>

        </div>

      </div>

      {/* Cars */}

      <div className="max-w-7xl mx-auto py-10 px-4">

        <div className="grid xl:grid-cols-2 gap-8">

          {category.cars.map((car, index) => (

<motion.div
    key={index}
    whileHover={{ y: -6 }}
    transition={{ duration: .25 }}
    className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200"
>

<div className="grid md:grid-cols-[320px_1fr]">

    {/* LEFT IMAGE */}

    <div className="h-[250px]">

        <img
            src={car.image}
            alt={car.name}
            className="w-full h-[250px] object-cover rounded-l-3xl"
        />

    </div>

    {/* RIGHT */}

    <div className="p-6 flex flex-col justify-between">

        <div>

            <div className="flex justify-between items-start">

                <div>

                    <h2 className="text-2xl font-black text-[#151515]">

                        {car.name}

                    </h2>
                </div>

                <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-bold">

                    Available

                </span>

            </div>

            <div className="grid grid-cols-3 gap-x-5 gap-y-3 mt-5 text-sm text-slate-600">

                <div className="flex items-center gap-3">
                    <Users size={18}/>
                    <span>{car.seats} Seats</span>
                </div>

                <div className="flex items-center gap-3">
                    <Fuel size={18}/>
                    <span>{car.fuel}</span>
                </div>

                <div className="flex items-center gap-3">
                    <DoorOpen size={18}/>
                    <span>{car.doors} Doors</span>
                </div>

                <div className="flex items-center gap-3">
                    <Briefcase size={18}/>
                    <span>{car.luggage}</span>
                </div>
            </div>

        </div>

        <div className="flex justify-between items-center mt-6  ">

            <span className="text-slate-500 font-semibold">

                Fleet ID #00{index + 1}

            </span>

            <div className="flex justify-end">

                <button
                    className="px-6 py-2.5 rounded-xl bg-[#0097B2] text-white hover:bg-[#007A90] transition font-semibold"
                >
                    View Vehicle
                </button>

            </div>

        </div>

    </div>

</div>

</motion.div>

))}

        </div>

      </div>

    </div>

  );

}