import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function NotEligible() {
  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-[#07161C] via-[#0B2028] to-[#0F2D38] flex items-center justify-center px-4 ">

  <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0097B2]/10 rounded-full blur-[180px]" />
  <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[180px]" />

      <div
className="
relative
bg-white
rounded-[36px]
shadow-[0_30px_80px_rgba(0,0,0,.35)]
p-14
max-w-2xl
w-full 
max-h-[88vh]
text-center
overflow-hidden
"
>

<div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-red-500/5 blur-3xl"></div>

        <div className="mx-auto w-24 h-24 rounded-full bg-red-100 flex items-center justify-center mb-8">

        <XCircle
        size={90}
        className="text-red-500"
        />

        </div>

        <h1 className="text-5xl font-black text-[#151515] mb-5">
        Unfortunately!
        </h1>

        <p className="text-2xl font-semibold text-red-500 mb-6">
        You may not be eligible for a replacement vehicle.
        </p>

        <p className="text-slate-500 text-lg leading-8 mb-10">

          Unfortunately, based on your answers, you may not currently qualify
          for a replacement vehicle.

          <br /><br />

          To be eligible you generally need to:

          <br /><br />

          • Be involved in a not-at-fault accident.

          <br />

          • Have the at-fault driver's details.

          <br />

          • The at-fault driver must have valid insurance.

          <br /><br />

          If you're unsure, our team can still review your accident and advise
          whether you may still qualify.

          </p>

        <div className="flex gap-5">

<Link
to="/contact"
className="flex-1 bg-[#0097B2] hover:bg-[#007A90] text-white py-4 rounded-xl font-bold text-lg transition-all"
>
Speak to Our Team
</Link>

<Link
to="/"
className="flex-1 border-2 border-[#0097B2] text-[#0097B2] hover:bg-[#0097B2] hover:text-white py-4 rounded-xl font-bold text-lg transition-all"
>
Back Home
</Link>

</div>

      </div>

    </div>
  );
}