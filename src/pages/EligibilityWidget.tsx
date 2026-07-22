import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Check, X, ShieldCheck, CheckCircle  } from "lucide-react";

const questions = [
  {
    question: "Was the accident your fault?",
    options: ["Yes", "No", "Unsure"]
  },
  {
    question: "Do you have the other driver's contact details?",
    options: ["Yes", "No"]
  },
  {
    question: "Does the other party have car insurance?",
    options: ["Yes", "No", "Unsure"]
  }
];

export default function Eligibility() {

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const progress = ((step + 1) / questions.length) * 100;
  const [result, setResult] = useState<
  "eligible" | "not-eligible" | "more-info" | null
>(null);
  
const handleAnswer = (answer: string) => {
  const updated = [...answers, answer];
  setAnswers(updated);

  // CASE 1:
  // If user answers YES to "Was the accident your fault?"
  // immediately show Not Eligible.
  if (step === 0 && answer === "Yes") {
    setResult("not-eligible");
    return;
  }

  // CASE 2:
  // If user answers NO to
  // "Does the other party have car insurance?"
  // immediately show Not Eligible.
  if (step === 2 && answer === "No") {
    setResult("not-eligible");
    return;
  }

  // Continue to next question
  if (step < questions.length - 1) {
    setStep(step + 1);
    return;
  }

  const fault = updated[0];
  const contact = updated[1];
  const insurance = updated[2];

  const rules: Record<string, "eligible" | "not-eligible" | "more-info"> = {
    // Fault = No
    "No|Yes|Yes": "eligible",
    "No|Yes|No": "not-eligible",
    "No|Yes|Unsure": "more-info",
    "No|No|Yes": "more-info",
    "No|No|No": "not-eligible",
    "No|No|Unsure": "more-info",

    // Fault = Yes
    "Yes|Yes|Yes": "not-eligible",
    "Yes|Yes|No": "not-eligible",
    "Yes|Yes|Unsure": "not-eligible",
    "Yes|No|Yes": "not-eligible",
    "Yes|No|No": "not-eligible",
    "Yes|No|Unsure": "not-eligible",

    // Fault = Unsure
    "Unsure|Yes|Yes": "more-info",
    "Unsure|Yes|No": "more-info",
    "Unsure|Yes|Unsure": "more-info",
    "Unsure|No|Yes": "more-info",
    "Unsure|No|No": "not-eligible",
    "Unsure|No|Unsure": "more-info",
  };

  const key = `${fault}|${contact}|${insurance}`;
  setResult(rules[key]);
};

if (result) {
  return (
    <div
  className="
relative
grid
grid-cols-1
lg:grid-cols-[360px_1fr]
bg-white
rounded-2xl
lg:rounded-[32px]
overflow-hidden
shadow-[0_20px_50px_rgba(0,0,0,.18)]
"
>

      <div
className="
relative
overflow-hidden
bg-gradient-to-br
from-[#0097B2]
to-[#0A1445]
flex
items-center
justify-center
px-8
py-10
lg:p-12
text-white
"
>
  <div className="hidden lg:block absolute -top-16 -left-16 w-40 h-40 rounded-full bg-white/10" />

<div className="hidden lg:block absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-white/10" />
        <div className="text-center">

<div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white/10 border border-white/20 shadow-xl backdrop-blur flex items-center justify-center mx-auto mb-6">

    <ShieldCheck
        size={40}
        className="lg:w-[52px] lg:h-[52px]"
        strokeWidth={2.5}
    />

</div>

<h2 className="font-black text-3xl lg:text-4xl">
CHECK YOUR
</h2>

<h2 className="font-black text-3xl lg:text-4xl">
ELIGIBILITY
</h2>

<p className="text-white/80 text-sm tracking-widest uppercase mt-3">
Assessment Complete
</p>

</div>
      </div>

      <div
className="
flex
flex-col
justify-center
px-6
py-8
lg:px-14
lg:py-12
"
>

        {result === "eligible" && (
  <>
    <h2 className="text-3xl lg:text-5xl font-black text-green-600 mb-4">
      Congratulations!
    </h2>

    <p className="text-slate-600 text-lg leading-7 mb-8">
      Your crash is eligible to be covered!
    </p>

    <Link
      to="/request"
      className="w-fit bg-[#0097B2] text-white px-8 py-4 rounded-full font-bold"
    >
      Request Vehicle
    </Link>
  </>
)}
        {result === "more-info" && (
  <>
    <h2 className="text-3xl lg:text-5xl font-black text-[#0097B2] mb-4">
      Good News!
    </h2>

    <p className="text-slate-600 text-lg leading-7 mb-8">
      You might be eligible for a replacement vehicle.
      <br /><br />
      We just need a little more information about the accident before we can
      confirm your eligibility.
    </p>

<div className="flex flex-col sm:flex-row gap-4">
  <a
    href="tel:1300004487"
    className="bg-[#0097B2] text-white px-8 py-4 rounded-full font-bold hover:bg-[#007A90] transition text-center"
  >
    Call 1300 004 487
  </a>

  <Link
    to="/request"
    className="bg-[#0097B2] text-white px-8 py-4 rounded-full font-bold hover:bg-[#007A90] transition text-center"
  >
    Apply Now
  </Link>
</div>
  </>
)}
        {result === "not-eligible" && (
          <>
            <h2 className="text-3xl lg:text-5xl font-black text-red-600 mb-4">
              Not Eligible
            </h2>

            <p className="text-slate-500 mb-8">
              Unfortunately you don't qualify.
            </p>

            <Link
              to="/contact"
              className="w-fit bg-black text-white px-8 py-4 rounded-full font-bold"
            >
              Contact Us
            </Link>
          </>
        )}

      </div>
    </div>
  );
}

return (
  <motion.div
    layout
className="
relative
grid
grid-cols-1
lg:grid-cols-[360px_1fr]
bg-white
rounded-2xl
lg:rounded-[32px]
overflow-hidden
shadow-[0_20px_50px_rgba(0,0,0,.18)]
"
>

    <div className="
relative
overflow-hidden
bg-gradient-to-br
from-[#0097B2]
to-[#0A1445]
flex
items-center
justify-center
px-8
py-10
lg:p-12
text-white
" >
    <div className="hidden lg:block absolute -top-16 -left-16 w-40 h-40 rounded-full bg-white/10" />
    <div className="hidden lg:block absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-white/10" />
      <div className="text-center">

        <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-white/10 border border-white/20 shadow-xl backdrop-blur flex items-center justify-center mx-auto mb-6">
    <ShieldCheck size={40} className="lg:w-[52px] lg:h-[52px]" strokeWidth={2.5}/>
</div>

        <h2 className="font-black text-3xl lg:text-4xl">
          CHECK YOUR
        </h2>

        <h2 className="font-black text-3xl lg:text-4xl">
          ELIGIBILITY
        </h2>
      <p className=" text-white/80 text-sm tracking-widest uppercase">
        3 Questions • 30 Seconds
        </p>
      </div>

    </div>

    <div className="
flex
flex-col
lg:flex-row
items-center
lg:items-center
justify-between
gap-8
lg:gap-16
px-6
py-8
lg:px-14
lg:py-12
">
<div className="max-w-xl w-full text-center lg:text-left">

<p className="text-[#0097B2] uppercase tracking-[0.25em] font-bold mb-5">
Question {step + 1} of {questions.length}
</p>

<h2 className="
text-3xl
sm:text-4xl
lg:text-5xl
font-black
leading-tight
text-[#0A1445]
">
        {questions[step].question}
      </h2>
</div>
      <div className="flex flex-col gap-4 w-full lg:w-auto">

        {questions[step].options.map((option) => (

          <button
            key={option}
            onClick={() => handleAnswer(option)}
            className="
w-full
lg:w-56
h-14
lg:h-16
rounded-3xl
bg-slate-50
border
border-slate-200
text-[#0A1445]
font-bold
text-base
lg:text-lg
hover:bg-[#0097B2]
hover:text-white
hover:shadow-xl
transition-all
duration-300
"
          >
            {option}
          </button>

        ))}

      </div>

    </div>

  </motion.div>
);
}