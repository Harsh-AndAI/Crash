import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle, FileText, Upload, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [documents, setDocuments] = useState({
    driverLicence: null as File | null,
    registration: null as File | null,
    insurance: null as File | null,
    atFaultLicence: null as File | null,
    repairQuote: null as File | null,
    accidentPhotos: [] as File[],
  });
  const [formData, setFormData] = useState({
    // Personal
    fullName: "",
    mobileNumber: "",
    emailAddress: "",

    // Accident
    accidentDate: "",
    accidentLocation: "",

    // Vehicle
    vehicleMake: "",
    vehicleModel: "",
    vehicleRegistration: "",

    // Insurance
    insuranceCompany: "",
    claimNumber: "",

    // Driver
    driverLicenceNumber: "",

    // Vehicle Condition
    atFaultFullName: "",
    atFaultLicence: "",
    atFaultAddress: "",
    atFaultInsurance: "",
    atFaultMobile: "",
    atFaultEmail: "",

    // Usage
    rideshareRequired: false,

    // Repair Shop
    repairShopName: "",
    repairShopPhone: "",
    repairShopAddress: "",

    // Notes
    notes: "",
  });

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const requestId = `REQ-${Date.now()}`;

    const form = new FormData();

    // ---------- TEXT ----------
    form.append("id", "");
    form.append("requestId", requestId);
    form.append("customer", formData.fullName);
    form.append("email", formData.emailAddress);
    form.append("phone", formData.mobileNumber);

    form.append("vehicleMake", formData.vehicleMake);
    form.append("vehicleModel", formData.vehicleModel);
    form.append("registration", formData.vehicleRegistration);

    form.append("accidentDate", formData.accidentDate);
    form.append("accidentLocation", formData.accidentLocation);

    form.append("insuranceCompany", formData.insuranceCompany);
    form.append("claimNumber", formData.claimNumber);

    form.append("driverLicenceNumber", formData.driverLicenceNumber);

    form.append("atFaultFullName", formData.atFaultFullName);
    form.append("atFaultLicence", formData.atFaultLicence);
    form.append("atFaultInsurance", formData.atFaultInsurance);
    form.append("atFaultAddress", formData.atFaultAddress);
    form.append("atFaultMobile", formData.atFaultMobile);
    form.append("atFaultEmail", formData.atFaultEmail);

    form.append(
      "rideshare",
      formData.rideshareRequired ? "Yes" : "No"
    );

    form.append("repairShopName", formData.repairShopName);
    form.append("repairShopPhone", formData.repairShopPhone);
    form.append("repairShopAddress", formData.repairShopAddress);

    form.append("status", "pending");
    form.append("notes", formData.notes);
    form.append("updatedBy", "Customer");

    // ---------- FILES ----------

    if (documents.driverLicence)
      form.append("driverLicence", documents.driverLicence);

    if (documents.registration)
      form.append("vehicleRegistration", documents.registration);

    if (documents.insurance)
      form.append("insuranceClaim", documents.insurance);

    if (documents.atFaultLicence)
      form.append("atFaultLicence", documents.atFaultLicence);

    if (documents.repairQuote)
      form.append("repairQuote", documents.repairQuote);

    documents.accidentPhotos.forEach(photo => {
      form.append("accidentPhotos", photo);
    });

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/add-request`,
      {
        method: "POST",
        body: form,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to submit request");
    }

    setSubmitted(true);
    window.scrollTo(0, 0);

  } catch (err: any) {

    setError(err.message);

  } finally {

    setLoading(false);

  }
};

  const handleFileChange = (
    key: keyof typeof documents,
    files: FileList | null
  ) => {
    if (!files) return;

    if (key === "accidentPhotos") {
      setDocuments(prev => ({
        ...prev,
        accidentPhotos: Array.from(files),
      }));
    } else {
      setDocuments(prev => ({
        ...prev,
        [key]: files[0],
      }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  if (submitted) {
    return (
      <div className="pt-5 min-h-screen bg-dark flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg w-full bg-white rounded-3xl shadow-2xl border border-slate-200 p-12 text-center"
        >
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-heading font-bold text-[#151515] mb-4">Your Request Has Been Received!</h2>
          <p className="text-slate-500 leading-relaxed mb-8">
            Thank you for submitting your request. Our team will review your details and contact you shortly to arrange your replacement vehicle.
          </p>
          <div className="space-y-4">
            <Link
              to="/"
              className="w-full block bg-[#0097B2] text-white py-4 rounded-xl font-bold hover:bg-[#007A90] transition-all"
            >
              Return Home
            </Link>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-4 text-[#0097B2] font-semibold hover:underline"
            >
              Submit Another Request
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-5">
      <div className="bg-white min-h-screen">
        <section className="bg-brand-dark py-24 relative overflow-hidden mb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                <span className="text-white">REQUEST</span>{" "}
                <span className="text-[#0097B2]">VEHICLE</span>
              </h1>
              <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
                Complete the form below and our team will arrange your replacement vehicle as quickly as possible.
              </p>
            </motion.div>
          </div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-[#0097B2]/10 skew-x-[-20deg] translate-x-1/2"></div>
        </section>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {error && (
            <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded flex items-center gap-3 text-red-500 text-xs font-bold uppercase tracking-widest">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="p-10 md:p-14 space-y-10">
              <div className="space-y-16">
                
                {/* Section 01: Personal Details */}
                <section className="bg-[#F8FCFD] rounded-3xl border border-slate-200 p-10">
                  <div className="flex items-end gap-4 mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-[#0097B2]/10 flex items-center justify-center text-[#0097B2] font-black text-xl">01</div>
                    <div>
                      <h3 className="text-2xl font-heading font-bold text-[#151515]">Personal Details</h3>
                      <p className="text-slate-500 mt-1">Enter your personal information.</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="label-caps mb-2 block text-[8px]">Full Name</label>
                      <input 
                        required
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl text-[#151515] placeholder:text-slate-600 focus:border-[#0097B2] focus:ring-2 focus:ring-[#0097B2]/20 transition-all px-4 py-3"
                        placeholder="FULL NAME"
                      />
                    </div>
                    <div>
                      <label className="label-caps mb-2 block text-[8px]">Mobile Number</label>
                      <input 
                        required
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl text-[#151515] placeholder:text-slate-600 focus:border-[#0097B2] focus:ring-2 focus:ring-[#0097B2]/20 transition-all px-4 py-3"
                        placeholder="0400 000 000"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label-caps mb-2 block text-[8px]">Email Address (Email)</label>
                      <input 
                        required
                        type="email"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl text-[#151515] placeholder:text-slate-600 focus:border-[#0097B2] focus:ring-2 focus:ring-[#0097B2]/20 transition-all px-4 py-3"
                        placeholder="EMAIL@DOMAIN.COM"
                      />
                    </div>
                  </div>
                </section>

{/* Section 02: Accident Details */}
<section className="bg-[#F8FCFD] rounded-3xl border border-slate-200 p-10">
  <div className="flex items-end gap-4 mb-10">
    <div className="w-14 h-14 rounded-2xl bg-[#0097B2]/10 flex items-center justify-center text-[#0097B2] font-black text-xl">02</div>
    <h3 className="label-caps text-brand-blue font-bold">Accident Details</h3>
  </div>
  
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      <label className="label-caps mb-2 block text-[8px]">Date of Accident</label>
      <input 
        required
        type="date"
        name="accidentDate"
        value={formData.accidentDate}
        onChange={handleChange}
        className="w-full bg-white border border-slate-200 rounded-xl text-[#151515] placeholder:text-slate-600 focus:border-[#0097B2] focus:ring-2 focus:ring-[#0097B2]/20 transition-all px-4 py-3"
      />
    </div>

    <div>
      <label className="label-caps mb-2 block text-[8px]">Where did the accident happen?</label>
      <input 
        required
        name="accidentLocation"
        value={formData.accidentLocation}
        onChange={handleChange}
        className="w-full bg-white border border-slate-200 rounded-xl text-[#151515] placeholder:text-slate-600 focus:border-[#0097B2] focus:ring-2 focus:ring-[#0097B2]/20 transition-all px-4 py-3"
        placeholder="SUBURB / INTERSECTION"
      />
    </div>

    <div>
      <label className="label-caps mb-2 block text-[8px]">Insurance Company</label>
      <input 
        name="insuranceCompany"
        value={formData.insuranceCompany}
        onChange={handleChange}
        className="w-full bg-white border border-slate-200 rounded-xl text-[#151515] placeholder:text-slate-600 focus:border-[#0097B2] focus:ring-2 focus:ring-[#0097B2]/20 transition-all px-4 py-3"
        placeholder="INSURANCE PROVIDER"
      />
    </div>

    <div>
      <label className="label-caps mb-2 block text-[8px]">Claim Number</label>
      <input 
        name="claimNumber"
        value={formData.claimNumber}
        onChange={handleChange}
        className="w-full bg-white border border-slate-200 rounded-xl text-[#151515] placeholder:text-slate-600 focus:border-[#0097B2] focus:ring-2 focus:ring-[#0097B2]/20 transition-all px-4 py-3"
        placeholder="CLAIM NUMBER"
      />
    </div>

    {/* Accident Photos - NOW OUTSIDE AND GIVEN FULL WIDTH */}
    <div className="md:col-span-2 mt-2">
      <label className="label-caps mb-2 block text-slate-700 font-semibold text-xs">
        Accident Photos
      </label>
      <input
        type="file"
        multiple
        accept=".jpg,.jpeg,.png,.heic,.heif"
        onChange={(e) => handleFileChange("accidentPhotos", e.target.files)}
        className="w-full bg-white text-slate-700 border border-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#0097B2]/10 file:text-[#0097B2] hover:file:bg-[#0097B2]/20 rounded-xl px-4 py-2.5"
      />
      {documents.accidentPhotos.length > 0 && (
        <p className="text-green-600 text-sm mt-2 font-medium">
          ✓ {documents.accidentPhotos.length} file(s) selected
        </p>
      )}
    </div>

    {/* Insurance Documents File Upload Field */}
    <div className="md:col-span-2 mt-2">
      <label className="label-caps mb-2 block text-slate-700 font-semibold text-xs">
        Insurance Documents
      </label>
      <input
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,.heic,.heif,.webp"
        onChange={(e) => handleFileChange("insurance", e.target.files)}
        className="w-full bg-white text-slate-700 border border-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#0097B2]/10 file:text-[#0097B2] hover:file:bg-[#0097B2]/20 rounded-xl px-4 py-2.5"
      />
      {documents.insurance && (
        <p className="text-green-600 text-sm mt-2 font-medium">
          ✓ {documents.insurance.name}
        </p>
      )}
    </div>

  </div>
</section>

                {/* Section 03: Vehicle Details */}
                <section className="bg-[#F8FCFD] rounded-3xl border border-slate-200 p-10">
                  <div className="flex items-end gap-4 mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-[#0097B2]/10 flex items-center justify-center text-[#0097B2] font-black text-xl">03</div>
                    <h3 className="label-caps text-brand-blue font-bold">Your Vehicle</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="label-caps mb-2 block text-[8px]">Vehicle Make</label>
                      <input 
                        required
                        name="vehicleMake"
                        value={formData.vehicleMake}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl text-[#151515] placeholder:text-slate-600 focus:border-[#0097B2] focus:ring-2 focus:ring-[#0097B2]/20 transition-all px-4 py-3"
                        placeholder="E.G. TOYOTA"
                      />
                    </div>
                    <div>
                      <label className="label-caps mb-2 block text-[8px]">Vehicle Model</label>
                      <input 
                        required
                        name="vehicleModel"
                        value={formData.vehicleModel}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl text-[#151515] placeholder:text-slate-600 focus:border-[#0097B2] focus:ring-2 focus:ring-[#0097B2]/20 transition-all px-4 py-3"
                        placeholder="E.G. HILUX"
                      />
                    </div>
                    <div>
                      <label className="label-caps mb-2 block text-[8px]">Registration Number</label>
                      <input 
                        required
                        name="vehicleRegistration"
                        value={formData.vehicleRegistration}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl text-[#151515] placeholder:text-slate-600 focus:border-[#0097B2] focus:ring-2 focus:ring-[#0097B2]/20 transition-all px-4 py-3"
                        placeholder="REGO NUMBER"
                      />
                    </div>
                    <div>
                      <label className="label-caps mb-2 block">Driver Licence Number</label>
                      <input
                        name="driverLicenceNumber"
                        value={formData.driverLicenceNumber}
                        onChange={handleChange}
                        placeholder="Licence Number"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515] placeholder:text-slate-600"
                      />
                    </div>

                    {/* Registration Certificate Upload */}
                    <div className="md:col-span-2 mt-2">
                      <label className="label-caps mb-2 block text-slate-700 font-semibold text-xs">
                        Registration Certificate
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.heic,.heif,.webp"
                        onChange={(e) => handleFileChange("registration", e.target.files)}
                        className="w-full bg-white text-slate-700 border border-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#0097B2]/10 file:text-[#0097B2] hover:file:bg-[#0097B2]/20 rounded-xl px-4 py-2.5"
                      />
                      {documents.registration && (
                        <p className="text-green-600 text-sm mt-2 font-medium">
                          ✓ {documents.registration.name}
                        </p>
                      )}
                    </div>

                    {/* Driver Licence Image Upload */}
                    <div className="md:col-span-2 mt-2">
                      <label className="label-caps mb-2 block text-slate-700 font-semibold text-xs">
                        Driver Licence Image
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.heic,.heif,.webp"
                        onChange={(e) => handleFileChange("driverLicence", e.target.files)}
                        className="w-full bg-white text-slate-700 border border-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#0097B2]/10 file:text-[#0097B2] hover:file:bg-[#0097B2]/20 rounded-xl px-4 py-2.5"
                      />
                      {documents.driverLicence && (
                        <p className="text-green-600 text-sm mt-2 font-medium">
                          ✓ {documents.driverLicence.name}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center space-x-4 pt-4 md:col-span-2">
                      <input 
                        type="checkbox"
                        id="rideshare"
                        name="rideshareRequired"
                        checked={formData.rideshareRequired}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-slate-300 text-[#0097B2] focus:ring-[#0097B2]"
                      />
                      <label htmlFor="rideshare" className="label-caps text-[8px]">Rideshare Infrastructure Required</label>
                    </div>
                  </div>
                </section>

                {/* Section 04: At-Fault Details */}
                <section className="bg-[#F8FCFD] rounded-3xl border border-slate-200 p-10">
                  <div className="flex items-end gap-4 mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-[#0097B2]/10 flex items-center justify-center text-[#0097B2] font-black text-xl">04</div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#151515]">At-Fault Claim Details</h3>
                      <p className="text-slate-500">Please provide the details of the at-fault driver and their insurer.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="label-caps mb-2 block">Full Name</label>
                      <input
                        name="atFaultFullName"
                        value={formData.atFaultFullName}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515] placeholder:text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="label-caps mb-2 block">Licence Number</label>
                      <input
                        name="atFaultLicence"
                        value={formData.atFaultLicence}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515] placeholder:text-slate-600"
                      />
                    </div>

                    {/* At-Fault Driver Licence File Upload Field */}
                    <div className="md:col-span-2 mt-2">
                      <label className="label-caps mb-2 block text-slate-700 font-semibold text-xs">
                        At-Fault Driver Licence
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.heic,.heif,.webp"
                        onChange={(e) => handleFileChange("atFaultLicence", e.target.files)}
                        className="w-full bg-white text-slate-700 border border-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#0097B2]/10 file:text-[#0097B2] hover:file:bg-[#0097B2]/20 rounded-xl px-4 py-2.5"
                      />
                      {documents.atFaultLicence && (
                        <p className="text-green-600 text-sm mt-2 font-medium">
                          ✓ {documents.atFaultLicence.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="label-caps mb-2 block">Address</label>
                      <input
                        name="atFaultAddress"
                        value={formData.atFaultAddress}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515] placeholder:text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="label-caps mb-2 block">Insurance & Claim No.</label>
                      <input
                        name="atFaultInsurance"
                        value={formData.atFaultInsurance}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515] placeholder:text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="label-caps mb-2 block">Mobile</label>
                      <input
                        name="atFaultMobile"
                        value={formData.atFaultMobile}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515] placeholder:text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="label-caps mb-2 block">Email</label>
                      <input
                        type="email"
                        name="atFaultEmail"
                        value={formData.atFaultEmail}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515] placeholder:text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="label-caps mb-2 block">Repair Shop Name</label>
                      <input
                        name="repairShopName"
                        value={formData.repairShopName}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515] placeholder:text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="label-caps mb-2 block">Repair Shop Phone</label>
                      <input
                        name="repairShopPhone"
                        value={formData.repairShopPhone}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515] placeholder:text-slate-600"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="label-caps mb-2 block">Repair Shop Address</label>
                      <textarea
                        rows={3}
                        name="repairShopAddress"
                        value={formData.repairShopAddress}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515] placeholder:text-slate-600"
                      />
                    </div>

                    {/* Repair Quote File Upload Field */}
                    <div className="md:col-span-2 mt-2">
                      <label className="label-caps mb-2 block text-slate-700 font-semibold text-xs">
                        Repair Quote / Assessment
                      </label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.heic,.heif,.webp"
                        onChange={(e) => handleFileChange("repairQuote", e.target.files)}
                        className="w-full bg-white text-slate-700 border border-slate-200 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#0097B2]/10 file:text-[#0097B2] hover:file:bg-[#0097B2]/20 rounded-xl px-4 py-2.5"
                      />
                      {documents.repairQuote && (
                        <p className="text-green-600 text-sm mt-2 font-medium">
                          ✓ {documents.repairQuote.name}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="label-caps mb-2 block">Additional Notes (Optional)</label>
                      <textarea
                        rows={4}
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Anything else you'd like us to know?"
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515] placeholder:text-slate-600"
                      />
                    </div>
                  </div>
                </section>

                {/* Submit */}
                <div className="pt-6">
                  <button 
                    disabled={loading}
                    type="submit"
                    className="w-full bg-[#0097B2] hover:bg-[#007A90] text-white py-4 rounded-xl font-bold text-lg transition-all shadow-xl shadow-[#0097B2]/20 flex items-center justify-center"
                  >
                    <Send className="mr-4" size={24} /> 
                    {loading ? 'UPLINKING DATA...' : 'SUBMIT REQUEST'}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}