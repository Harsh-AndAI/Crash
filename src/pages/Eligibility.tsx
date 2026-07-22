import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, X, ShieldCheck, CheckCircle  } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const progress = ((step + 1) / questions.length) * 100;
  const [eligible, setEligible] = useState(false);
  
const handleAnswer = (answer: string) => {
  const updated = [...answers, answer];
  setAnswers(updated);

  // CASE 1
  // If user selects YES for "Was the accident your fault?"
  // show Not Eligible immediately.
  if (step === 0 && answer === "Yes") {
    navigate("/eligibility/not-eligible");
    return;
  }

  // CASE 2
  // If user selects NO for
  // "Does the other party have car insurance?"
  // show Not Eligible immediately.
  if (step === 2 && answer === "No") {
    navigate("/eligibility/not-eligible");
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

  let result = "";

  if (fault === "No") {
    if (contact === "Yes" && insurance === "Yes")
      result = "eligible";

    else if (
      (contact === "Yes" && insurance === "Unsure") ||
      (contact === "No" && insurance === "Yes") ||
      (contact === "No" && insurance === "Unsure")
    )
      result = "more-info";

    else
      result = "not-eligible";
  }

  else if (fault === "Yes") {
    result = "not-eligible";
  }

  else {
    if (
      (contact === "Yes" && insurance !== "No") ||
      (contact === "No" && insurance === "Yes") ||
      (contact === "No" && insurance === "Unsure")
    )
      result = "more-info";
    else
      result = "not-eligible";
  }

  if (result === "eligible") {
    setEligible(true);
  } else if (result === "more-info") {
    navigate("/eligibility/more-info");
  } else {
    navigate("/eligibility/not-eligible");
  }
};

if (eligible) {
  return (
    <div className="fixed inset-0 z-[100] bg-gradient-to-br from-[#07161C] via-[#0B2028] to-[#0F2D38] flex items-center justify-center p-4 overflow-y-auto">

      <motion.div
initial={{ opacity: 0, scale: 0.92, y: 40 }}
animate={{ opacity: 1, scale: 1, y: 0 }}
transition={{ duration: 0.45 }}
className="bg-white rounded-[28px] shadow-[0_30px_80px_rgba(0,0,0,.35)] p-8 md:p-14 max-w-2xl w-full text-center my-8"
>

        <CheckCircle
          size={70}
          className="mx-auto text-green-500 mb-8"
        />

        <h1 className="text-3xl md:text-5xl font-black text-[#151515] mb-4">
          Congratulations!
        </h1>

        <p className="text-lg md:text-2xl font-semibold text-[#0097B2] mb-5">
          Your crash appears to be eligible.
        </p>

        <p className="text-slate-500 text-base md:text-lg leading-7 mb-8">
          Based on your answers, you're likely eligible for a replacement
          vehicle. Continue below to complete your application.
        </p>

        <button
          onClick={() => navigate("/request")}
          className="w-full md:w-auto bg-[#0097B2] hover:bg-[#007A90] text-white px-8 py-4 rounded-xl font-bold text-base md:text-lg transition-all"
        >
          Continue to Application →
        </button>

      </motion.div>

    </div>
  );
}

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-[#07161C] via-[#0B2028] to-[#0F2D38] flex items-center justify-center px-4 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0097B2]/10 rounded-full blur-[180px]" />
    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-[180px]" />

      <motion.div
        layout
        className="
relative
w-full
max-w-3xl
bg-white
rounded-[36px]
shadow-[0_30px_80px_rgba(0,0,0,.35)]
border
border-white/20
p-10 md:p-14
overflow-hidden
"
      >

        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#0097B2]/5 blur-3xl" />
                <p className="text-center text-[#0097B2] uppercase tracking-[0.3em] font-semibold text-sm mb-4">
  Eligibility Check
</p>
        <div className="mb-12">

          <div className="flex justify-between text-sm text-slate-500 mb-3">

            <span>
              Step {step + 1} of {questions.length}
            </span>

            <motion.span
  key={progress}
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="font-bold text-[#0097B2]"
>
  {Math.round(progress)}%
</motion.span>

          </div>

          <div className="h-3 rounded-full bg-slate-200 overflow-hidden">

            <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#0097B2] to-[#14B8D4]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                />

          </div>

        </div>

        <AnimatePresence mode="wait">

          <motion.div
    key={step}
    transition={{ duration: 0.45 }}
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -80 }}
          >
<div className="flex justify-center mb-8">
  <div className="w-20 h-20 rounded-full bg-[#0097B2]/10 flex items-center justify-center">
    <ShieldCheck className="text-[#0097B2]" size={36} />
  </div>
</div>
            <h4 className="
text-4xl md:text-5xl
leading-tight
font-black
tracking-tight
text-center
text-[#151515]
mb-8
">

              {questions[step].question}

            </h4>
            <p className="text-center text-slate-500 text-lg mb-10">
Answer a few quick questions to instantly check your eligibility for a replacement vehicle. It takes less than a minute.
</p>

            <div className="space-y-5">

              {questions[step].options.map((option) => (

                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
className="
group
relative
overflow-hidden
w-full
rounded-2xl
border
border-slate-200
bg-white
px-8
py-6
text-xl
font-bold
text-[#151515]
hover:border-[#0097B2]
hover:text-black
transition-all
duration-300
"
                >
                   <span className="absolute inset-0 bg-[#0097B2] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                  <div className="relative z-10 flex items-center justify-center gap-3">
  {option === "Yes" ? (
    <Check size={22} />
  ) : option === "No" ? (
    <X size={22} />
  ) : (
    <ShieldCheck size={22} />
  )}

  <span>{option}</span>
</div>
                </button>

              ))}

            </div>
{step > 0 && (
  <button
    onClick={() => {
      setAnswers((prev) => prev.slice(0, -1));
      setStep((prev) => prev - 1);
    }}
    className="mt-8 text-[#0097B2] font-semibold hover:underline"
  >
    ← Previous Question
  </button>
)}
    <div className="mt-12 pt-8 border-t border-slate-200 text-center">

<p className="text-slate-500 text-sm mb-4">
Not sure how to answer?
</p>

<a
href="tel:0495004455"
className="text-[#0097B2] font-semibold hover:underline"
>
Call our team for assistance
</a>

</div>
          </motion.div>

        </AnimatePresence>

      </motion.div>

    </div>
  );
}