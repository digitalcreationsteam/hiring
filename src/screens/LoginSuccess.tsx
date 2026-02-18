import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks"; // Add this
import { setNavigation } from "../store/slices/onboardingSlice"; // Add this
import API, { URL_PATH } from "../common/API"; // Add this

export default function LoginSuccess() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch(); // Add this
  const handledRef = useRef(false);

  useEffect(() => {
    if (handledRef.current) return;
    handledRef.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const userDataBase64 = params.get("user");
    const emailRequired = params.get("email_required");
    const provider = params.get("provider");
    const sub = params.get("sub");

    if (token) {
      // Store token
      localStorage.setItem("token", token);
      
      // Decode and store user data if available
      if (userDataBase64) {
        try {
          const decoded = decodeURIComponent(userDataBase64);
          const userData = JSON.parse(atob(decoded));
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("userId", userData.id || userData._id);
          localStorage.setItem("userEmail", userData.email);
          localStorage.setItem("userName", `${userData.firstname} ${userData.lastname}`);
        } catch (error) {
          console.error("Failed to decode user data:", error);
        }
      }

      // ✅ CRITICAL: Fetch navigation data after OAuth login
      const fetchNavigation = async () => {
        try {
          console.log("🔄 [LoginSuccess] Fetching navigation data...");
          const response = await API("GET", URL_PATH.getUserStatus);
          
          if (response?.success && response?.navigation) {
            console.log("✅ [LoginSuccess] Navigation received:", response.navigation);
            
            // Dispatch to Redux
            dispatch(setNavigation(response.navigation));
            
            // Navigate based on the user's actual progress
            const redirectRoute = response.navigation.nextRoute || "/dashboard";
            console.log("🔄 [LoginSuccess] Redirecting to:", redirectRoute);
            navigate(redirectRoute, { replace: true });
          } else {
            console.log("⚠️ [LoginSuccess] No navigation data, going to upload-resume");
            navigate("/upload-resume", { replace: true });
          }
        } catch (error) {
          console.error("❌ [LoginSuccess] Error fetching navigation:", error);
          navigate("/upload-resume", { replace: true });
        }
      };

      fetchNavigation();
      return;
    }

    if (emailRequired === "true" && provider === "linkedin" && sub) {
      navigate(`/complete-profile?sub=${sub}`, { replace: true });
      return;
    }

    navigate("/login", { replace: true });
  }, [navigate, dispatch]);

  // Show loading while fetching navigation
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Completing login...</p>
      </div>
    </div>
  );
}