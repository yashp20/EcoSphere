import { useState } from "react";
import { useApi } from "../api/client.js";
import { useNavigate } from "react-router-dom";

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

  // --- VALIDATION ---
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
    if (step === 2)
      return updateError("monthlyKwh", validateMonthlyKwh, monthlyKwh);
    if (step === 3)
      return updateError("ownership", validateOwnership, ownership);
    if (step === 4) return updateError("sqft", validateSqft, sqft);
    return true;
  };

  // --- FORM SUBMIT ---
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

      console.log("🔥 Sending to results page:", res.data);

      navigate("/results", {
        state: {
          ...res.data,
          zip: zip, // <- FIX HERE
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

  return (
    <div
      className="w-full max-w-xl bg-white/50 backdrop-blur-xl shadow-xl rounded-3xl p-8 
                    border border-white/40 animate-fadeIn"
    >
      <h3 className="text-2xl font-bold text-green-700 mb-4">
        Step {step} of 4
      </h3>

      <div className="mt-6">
        {/* STEP 1: ZIP */}
        {step === 1 && (
          <label className="block space-y-2">
            <span className="font-medium">ZIP Code</span>
            <input
              value={zip}
              maxLength={5}
              inputMode="numeric"
              onChange={(e) => setZip(e.target.value)}
              className={`mt-1 w-full p-3 rounded-xl border ${
                errors.zip ? "border-red-500" : ""
              }`}
              placeholder="e.g. 94103"
            />
            {errors.zip && <p className="text-sm text-red-600">{errors.zip}</p>}
          </label>
        )}

        {/* STEP 2: Monthly Usage */}
        {step === 2 && (
          <label className="block space-y-2">
            <span className="font-medium">Monthly Usage (kWh)</span>
            <input
              value={monthlyKwh}
              type="number"
              onChange={(e) => setMonthlyKwh(e.target.value)}
              className={`mt-1 w-full p-3 rounded-xl border ${
                errors.monthlyKwh ? "border-red-500" : ""
              }`}
              placeholder="e.g. 750"
            />
            {errors.monthlyKwh && (
              <p className="text-sm text-red-600">{errors.monthlyKwh}</p>
            )}
          </label>
        )}

        {/* STEP 3: Ownership */}
        {step === 3 && (
          <label className="block space-y-2">
            <span className="font-medium">Home Ownership</span>
            <select
              value={ownership}
              onChange={(e) => setOwnership(e.target.value)}
              className={`mt-1 w-full p-3 rounded-xl border ${
                errors.ownership ? "border-red-500" : ""
              }`}
            >
              <option value="owner">Owner</option>
              <option value="renter">Renter</option>
            </select>
            {errors.ownership && (
              <p className="text-sm text-red-600">{errors.ownership}</p>
            )}
          </label>
        )}

        {/* STEP 4: Sq Ft + Battery */}
        {step === 4 && (
          <div className="space-y-4">
            <label className="block space-y-2">
              <span className="font-medium">Home Size (sq ft)</span>
              <input
                value={sqft}
                type="number"
                min={300}
                onChange={(e) => setSqft(e.target.value)}
                className={`mt-1 w-full p-3 rounded-xl border ${
                  errors.sqft ? "border-red-500" : ""
                }`}
                placeholder="e.g. 1800"
              />
              {errors.sqft && (
                <p className="text-sm text-red-600">{errors.sqft}</p>
              )}
            </label>

            <label className="block space-y-2">
              <span className="font-medium">Include a Battery?</span>
              <select
                value={battery ? "yes" : "no"}
                onChange={(e) => setBattery(e.target.value === "yes")}
                className="mt-1 w-full p-3 rounded-xl border"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </label>
          </div>
        )}
      </div>

      {submitError && (
        <p className="mt-4 text-sm text-red-600">{submitError}</p>
      )}

      {/* BUTTONS */}
      <div className="mt-8 flex justify-between">
        {step > 1 ? (
          <button
            onClick={back}
            className="px-6 py-3 bg-gray-300 text-gray-800 rounded-xl shadow-md hover:bg-gray-400"
          >
            Back
          </button>
        ) : (
          <div></div>
        )}

        {step < 4 ? (
          <button
            onClick={next}
            className="px-6 py-3 bg-green-500 text-white rounded-xl shadow-lg hover:bg-green-600"
          >
            Next
          </button>
        ) : (
          <button
            onClick={submitForm}
            className="px-6 py-3 bg-emerald-600 text-white rounded-xl shadow-lg hover:bg-emerald-700"
          >
            {isSubmitting ? "Loading…" : "Get Recommendation"}
          </button>
        )}
      </div>
    </div>
  );
}
