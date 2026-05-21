import { useState } from "react";
import { useApi } from "../api/client.js";
import { useNavigate } from "react-router-dom";

const STEP_LABELS = ["Location", "Energy Use", "Ownership", "Home Details"];

export default function WizardCard() {
  const [step, setStep] = useState(1);

  const [zip, setZip] = useState("");
  const [monthlyKwh, setMonthlyKwh] = useState("");
  const [ownership, setOwnership] = useState("owner");
  const [sqft, setSqft] = useState("");
  const [battery, setBattery] = useState(false);

  const [errors, setErrors] = useState({
    zip: "",
    monthlyKwh: "",
    ownership: "",
    sqft: "",
  });

  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const api = useApi();
  const navigate = useNavigate();

  const validateZip = (value) => {
    if (!value.trim()) return "ZIP code is required.";
    if (!/^\d{5}$/.test(value.trim())) return "Enter a 5-digit ZIP code.";
    return "";
  };

  const validateMonthlyKwh = (value) => {
    if (!value.trim()) return "Monthly usage is required.";
    const numeric = Number(value);
    if (Number.isNaN(numeric) || numeric <= 0)
      return "Enter a valid positive number.";
    return "";
  };

  const validateOwnership = (value) =>
    !value ? "Select an ownership status." : "";

  const validateSqft = (value) => {
    const n = Number(value);
    if (!value.trim()) return "Square footage is required.";
    if (isNaN(n) || n < 300 || n > 10000)
      return "Enter a valid home size (300–10,000 sq ft).";
    return "";
  };

  const updateError = (field, validator, value) => {
    const message = validator(value);
    setErrors((prev) => ({ ...prev, [field]: message }));
    return !message;
  };

  const isCurrentStepValid = () => {
    if (step === 1) return updateError("zip", validateZip, zip);
    if (step === 2) return updateError("monthlyKwh", validateMonthlyKwh, monthlyKwh);
    if (step === 3) return updateError("ownership", validateOwnership, ownership);
    if (step === 4) return updateError("sqft", validateSqft, sqft);
    return true;
  };

  async function submitForm() {
    if (!api) {
      alert("Secure connection still loading… try again.");
      return;
    }

    const validations = [
      updateError("zip", validateZip, zip),
      updateError("monthlyKwh", validateMonthlyKwh, monthlyKwh),
      updateError("ownership", validateOwnership, ownership),
      updateError("sqft", validateSqft, sqft),
    ];

    if (validations.includes(false)) return;

    try {
      setIsSubmitting(true);
      setSubmitError("");

      const body = {
        zip,
        monthly_kwh: Number(monthlyKwh),
        ownership,
        sqft: Number(sqft),
        dwelling: "house",
        battery,
      };

      const res = await api.post("/api/recommend", body);

      navigate("/results", {
        state: {
          ...res.data,
          zip: zip,
        },
      });
    } catch (err) {
      console.error(err);
      setSubmitError(
        "We couldn't fetch your recommendation. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const next = () => {
    if (isCurrentStepValid()) setStep((s) => s + 1);
  };
  const back = () => setStep((s) => s - 1);

  const inputClass = (field) =>
    `w-full px-4 py-3.5 rounded-xl border bg-white/80 backdrop-blur-sm text-gray-900 text-sm
     placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:border-emerald-400 transition-all
     ${errors[field] ? "border-red-300 ring-1 ring-red-200" : "border-gray-200/80"}`;

  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl shadow-emerald-100/20 border border-white/60 p-8 animate-fadeIn">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between mb-3">
          {STEP_LABELS.map((label, i) => (
            <span
              key={i}
              className={`text-xs font-semibold transition-colors
                ${i + 1 === step ? "text-emerald-700" : i + 1 < step ? "text-emerald-500" : "text-gray-300"}`}
            >
              {label}
            </span>
          ))}
        </div>
        <div className="w-full bg-emerald-100/50 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500 ease-out shadow-sm shadow-emerald-300/50"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <p className="text-sm text-gray-400 mb-1">Step {step} of 4</p>
      <h3 className="text-xl font-bold text-gray-900 mb-6">
        {STEP_LABELS[step - 1]}
      </h3>

      <div>
        {step === 1 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
            <input value={zip} maxLength={5} inputMode="numeric" onChange={(e) => setZip(e.target.value)}
              className={inputClass("zip")} placeholder="e.g. 94103" />
            {errors.zip && <p className="mt-2 text-sm text-red-500">{errors.zip}</p>}
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Usage (kWh)</label>
            <input value={monthlyKwh} type="number" onChange={(e) => setMonthlyKwh(e.target.value)}
              className={inputClass("monthlyKwh")} placeholder="e.g. 750" />
            <p className="mt-2 text-xs text-gray-400">Find this on your electricity bill.</p>
            {errors.monthlyKwh && <p className="mt-2 text-sm text-red-500">{errors.monthlyKwh}</p>}
          </div>
        )}

        {step === 3 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Home Ownership</label>
            <select value={ownership} onChange={(e) => setOwnership(e.target.value)} className={inputClass("ownership")}>
              <option value="owner">Owner</option>
              <option value="renter">Renter</option>
            </select>
            {errors.ownership && <p className="mt-2 text-sm text-red-500">{errors.ownership}</p>}
          </div>
        )}

        {step === 4 && (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Home Size (sq ft)</label>
              <input value={sqft} type="number" min={300} onChange={(e) => setSqft(e.target.value)}
                className={inputClass("sqft")} placeholder="e.g. 1800" />
              {errors.sqft && <p className="mt-2 text-sm text-red-500">{errors.sqft}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Include battery storage?</label>
              <div className="flex gap-3">
                <button type="button" onClick={() => setBattery(false)}
                  className={`flex-1 py-3.5 rounded-xl text-sm font-medium border transition-all
                    ${!battery
                      ? "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-300 text-emerald-700 shadow-sm"
                      : "bg-white/50 border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                  No
                </button>
                <button type="button" onClick={() => setBattery(true)}
                  className={`flex-1 py-3.5 rounded-xl text-sm font-medium border transition-all
                    ${battery
                      ? "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-300 text-emerald-700 shadow-sm"
                      : "bg-white/50 border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                  Yes (+$12,000)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {submitError && (
        <div className="mt-4 p-3 rounded-xl bg-red-50/80 border border-red-200/60">
          <p className="text-sm text-red-600">{submitError}</p>
        </div>
      )}

      <div className="mt-8 flex justify-between items-center">
        {step > 1 ? (
          <button onClick={back}
            className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-100/60 transition">
            Back
          </button>
        ) : (
          <div />
        )}

        {step < 4 ? (
          <button onClick={next}
            className="px-7 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold rounded-xl
                       shadow-md shadow-emerald-200/40 hover:shadow-lg hover:shadow-emerald-200/50 transition-all">
            Continue
          </button>
        ) : (
          <button onClick={submitForm} disabled={isSubmitting}
            className="px-7 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold rounded-xl
                       shadow-md shadow-emerald-200/40 hover:shadow-lg hover:shadow-emerald-200/50 transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? "Analyzing..." : "Get Recommendation"}
          </button>
        )}
      </div>
    </div>
  );
}
