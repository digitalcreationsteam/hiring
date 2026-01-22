import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "src/common/API";

export default function CompleteProfile() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const sub = params.get("sub");
  const userId = params.get("userId");
  const linkedinId = sub || userId;
  const firstName = params.get("firstName");
  const lastName = params.get("lastName");

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔒 Guard
  if (!linkedinId) {
    navigate("/login", { replace: true });
    return null;
  }

  const submitEmail = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    try {
      setLoading(true);

      console.log("LINKEDIN ID SENT TO API:", linkedinId);

      const res = await API("POST", "/auth/linkedin/complete", {
        linkedinId: linkedinId,
        email,
        userId: linkedinId,
        firstName,
        lastName,
      });

      console.log("API RESPONSE:", res);

      localStorage.setItem("token", res.token);
      navigate("/demographics", { replace: true });
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[360px] p-6 border rounded-xl">
        <h2 className="text-lg font-semibold mb-3">Complete your profile</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={submitEmail}
          disabled={loading}
          className="w-full mt-3 bg-violet-600 text-white p-2 rounded"
        >
          {loading ? "Saving..." : "Continue"}
        </button>
      </div>
    </div>
  );
}