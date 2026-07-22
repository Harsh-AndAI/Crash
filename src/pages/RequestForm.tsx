import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle,AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RequestForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [documents, setDocuments] = useState({
    driverLicence: null as File | null,
    atFaultLicence: null as File | null,
    accidentPhotos: [] as File[],
  });
  const [formData, setFormData] = useState({
    // Customer Details
    fullName: "",
    dateOfBirth: "",
    driverLicenceNumber: "",
    address: "",
    mobileNumber: "",
    emailAddress: "",

    // Accident
    accidentDate: "",
    accidentLocation: "",

    // Vehicle
    vehicleMake: "",
    vehicleModel: "",
    vehicleRegistration: "",



  // At Fault Claim Details
  atFaultFullName: "",
  atFaultAddress: "",
  atFaultMobile: "",
  atFaultLicenceNumber: "",
  atFaultLicenceExpiry: "",
  atFaultInsurance: "",
  atFaultClaimNumber: "",
  atFaultEmail: "",

    // Usage
    ctvRegistration: false,

    // Repair Shop
    repairerDetails: "",
    timeOfAccident: "",
    accidentDescription: "",

  });

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    // const requestId = "";
    const form = new FormData();

    // ---------- TEXT FIELDS (Must match backend req.body mapping) ----------
    form.append("requestId", "AUTO");
    form.append("customer", formData.fullName);
    form.append("dateOfBirth", formData.dateOfBirth);
    form.append("address", formData.address);
    form.append("email", formData.emailAddress);
    form.append("phone", formData.mobileNumber);
    form.append("vehicleMake", formData.vehicleMake);
    form.append("vehicleModel", formData.vehicleModel);
    form.append("registration", formData.vehicleRegistration);
    form.append("accidentDate", formData.accidentDate);
    form.append("accidentLocation", formData.accidentLocation);
    form.append("driverLicenceNumber", formData.driverLicenceNumber);
    
    // At fault detail alignments
    form.append("atFaultFullName", formData.atFaultFullName);
    form.append("atFaultLicenceNumber", formData.atFaultLicenceNumber);
    form.append("atFaultLicenceExpiry", formData.atFaultLicenceExpiry);
    form.append("atFaultInsurance", formData.atFaultInsurance);
    form.append("atFaultClaimNumber", formData.atFaultClaimNumber);
    form.append("atFaultAddress", formData.atFaultAddress);
    form.append("atFaultMobile", formData.atFaultMobile);
    form.append("atFaultEmail", formData.atFaultEmail);

    form.append("ctvRegistration", formData.ctvRegistration ? "Yes" : "No");
    form.append("repairerDetails", formData.repairerDetails);
    form.append("timeOfAccident", formData.timeOfAccident);
    form.append("accidentDescription", formData.accidentDescription);
    form.append("updatedBy", "Customer");

    // ---------- FILES ----------
    if (documents.driverLicence) form.append("driverLicence", documents.driverLicence);
    if (documents.atFaultLicence) form.append("atFaultLicence", documents.atFaultLicence);
    documents.accidentPhotos.forEach(photo => {
      form.append("accidentPhotos", photo);
    });

    const response = await fetch(`${import.meta.env.VITE_API_URL}/add-request`, {
      method: "POST",
      body: form,
    });

    if (!response.ok) throw new Error("Failed to submit request");

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
                      <h3 className="text-2xl font-heading font-bold text-[#151515]">
                        Customer Details
                      </h3>

                      <p className="text-slate-500 mt-1">
                        Please enter your details.
                      </p>
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
  <label className="label-caps mb-2 block text-[8px]">
    Date of Birth *
  </label>

  <input
    required
    type="date"
    name="dateOfBirth"
    value={formData.dateOfBirth}
    onChange={handleChange}
    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515]"
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
                    <div>
  <label className="label-caps mb-2 block text-[8px]">
    AU Licence No. *
  </label>

  <input
    required
    name="driverLicenceNumber"
    value={formData.driverLicenceNumber}
    onChange={handleChange}
    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515]"
    placeholder="Licence Number"
  />
</div>

                    <div>
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
                    <div className="md:col-span-2">
  <label className="label-caps mb-2 block text-[8px]">
    Address *
  </label>

  <textarea
    required
    rows={3}
    name="address"
    value={formData.address}
    onChange={handleChange}
    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515]"
    placeholder="Street Address"
  />
</div>
                    {/* Driver Licence Image Upload */}
                    <div className="md:col-span-2 mt-2">
                      <label className="label-caps mb-2 block text-slate-700 font-semibold text-xs">
                        Driver Licence
                      </label>
                      <input
                        required
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
                  </div>
                </section>

                {/* Section 02: Vehicle Details */}
                <section className="bg-[#F8FCFD] rounded-3xl border border-slate-200 p-10">
<div className="flex items-end gap-4 mb-10">
  <div className="w-14 h-14 rounded-2xl bg-[#0097B2]/10 flex items-center justify-center text-[#0097B2] font-black text-xl">
    02
  </div>

  <div>
    <h3 className="text-2xl font-heading font-bold text-[#151515]">
      Damaged Vehicle Details
    </h3>

    <p className="text-slate-500 mt-1">
      Please enter your damaged vehicle details.
    </p>
  </div>
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
                      <label className="label-caps mb-2 block text-[8px]">Registration Number *</label>
                      <input 
                        required
                        name="vehicleRegistration"
                        value={formData.vehicleRegistration}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl text-[#151515] placeholder:text-slate-600 focus:border-[#0097B2] focus:ring-2 focus:ring-[#0097B2]/20 transition-all px-4 py-3"
                        placeholder="REGO NUMBER"
                      />
                    </div>

                    <div className="md:col-span-2">
  <label className="label-caps mb-2 block text-[8px]">
    CTV Registration *
  </label>

  <select
    required
    name="ctvRegistration"
value={formData.ctvRegistration ? "Yes" : ""}
onChange={(e) =>
  setFormData(prev => ({
    ...prev,
    ctvRegistration: e.target.value === "Yes"
  }))
}
    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515]"
  >
    <option value="">Select</option>
    <option value="Yes">Yes</option>
    <option value="No">No</option>
  </select>
</div>
                  </div>
                </section>

                {/* Section 03: At-Fault Details */}
                <section className="bg-[#F8FCFD] rounded-3xl border border-slate-200 p-10">
                  <div className="flex items-end gap-4 mb-10">
                    <div className="w-14 h-14 rounded-2xl bg-[#0097B2]/10 flex items-center justify-center text-[#0097B2] font-black text-xl">03</div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#151515]">At-Fault Claim Details</h3>
                      <p className="text-slate-500">Please provide the details of the at-fault driver and their insurer.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="label-caps mb-2 block">Full Name *</label>
                      <input
                        required
                        name="atFaultFullName"
                        value={formData.atFaultFullName}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515] placeholder:text-slate-600"
                      />
                    </div>
                    
                     <div>
  <label className="label-caps mb-2 block">Licence No. *</label>
  <input
    required
    name="atFaultLicenceNumber" // <-- ADD THIS
    value={formData.atFaultLicenceNumber}
    onChange={handleChange}
    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515]"
  />
</div>

<div>
  <label className="label-caps mb-2 block">Expiry Date *</label>
  <input
    required
    type="date"
    name="atFaultLicenceExpiry" // <-- ADD THIS
    value={formData.atFaultLicenceExpiry}
    onChange={handleChange}
    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515]"
  />
</div>

                    <div>
                      <label className="label-caps mb-2 block">Address *</label>
                      <input
                        required
                        name="atFaultAddress"
                        value={formData.atFaultAddress}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515] placeholder:text-slate-600"
                      />
                    </div>
<div>
  <label className="label-caps mb-2 block">Insurance *</label>
  <input
    required
    name="atFaultInsurance" // <-- ADD THIS
    value={formData.atFaultInsurance}
    onChange={handleChange}
    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515]"
  />
</div>

<div>
  <label className="label-caps mb-2 block">Claim No. *</label>
  <input
    required
    name="atFaultClaimNumber" // <-- ADD THIS
    value={formData.atFaultClaimNumber}
    onChange={handleChange}
    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515]"
  />
</div>
                    <div>
                      <label className="label-caps mb-2 block">Mobile *</label>
                      <input
                        required
                        name="atFaultMobile"
                        value={formData.atFaultMobile}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515] placeholder:text-slate-600"
                      />
                    </div>
                    <div>
                      <label className="label-caps mb-2 block">Email *</label>
                      <input
                        required
                        type="email"
                        name="atFaultEmail"
                        value={formData.atFaultEmail}
                        onChange={handleChange}
                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515] placeholder:text-slate-600"
                      />
                    </div>

                                        {/* At-Fault Driver Licence File Upload Field */}
                    <div className="md:col-span-2 mt-2">
                      <label className="label-caps mb-2 block text-slate-700 font-semibold text-xs">
                        At-Fault Driver Licence *
                      </label>
                      <input
                        required
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
                  </div>
                </section>

{/* Section 04: Accident Details */}
<section className="bg-[#F8FCFD] rounded-3xl border border-slate-200 p-10">
<div className="flex items-end gap-4 mb-10">
  <div className="w-14 h-14 rounded-2xl bg-[#0097B2]/10 flex items-center justify-center text-[#0097B2] font-black text-xl">
    04
  </div>

  <div>
    <h3 className="text-2xl font-heading font-bold text-[#151515]">
      Accident Details
    </h3>

    <p className="text-slate-500 mt-1">
      Enter the accident details and upload photos.
    </p>
  </div>
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
  <label className="label-caps mb-2 block text-[8px]">
    Time of Accident *
  </label>

  <input
    required
    type="time"
    name="timeOfAccident"
    value={formData.timeOfAccident}
    onChange={handleChange}
    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515]"
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
  <label className="label-caps mb-2 block text-[8px]">
    Repairer Details *
  </label>

  <input
    required
    name="repairerDetails"
    value={formData.repairerDetails}
    onChange={handleChange}
    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515]"
    placeholder="Repairer Details"
  />
</div>
<div className="md:col-span-2">
  <label className="label-caps mb-2 block text-[8px]">
    Brief Description of the Collision *
  </label>

  <textarea
    required
    rows={6}
    name="accidentDescription"
    value={formData.accidentDescription}
    onChange={handleChange}
    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-[#151515]"
    placeholder="Describe how the accident occurred..."
  />
</div>
    {/* Accident Photos - NOW OUTSIDE AND GIVEN FULL WIDTH */}
    <div className="md:col-span-2 mt-2">
      <label className="label-caps mb-2 block text-slate-700 font-semibold text-xs">
        Accident Photos
      </label>
      <input
        required
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
                    {loading ? 'UPLOADING DATA...' : 'SUBMIT REQUEST'}
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