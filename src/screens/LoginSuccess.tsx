import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    // store token
    localStorage.setItem("token", token);

    // clean URL + redirect
    navigate("/demographics", { replace: true });
  }, [navigate]);

  return (
    <p className="mt-20 text-center text-sm text-gray-600">
      Logging you in…
    </p>
  );
}
