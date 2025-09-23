import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const RedirectAfterLogin = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  //   console.log("RedirectAfterLogin");
  //   console.log("token in Redirect after login", token);
  //   console.log("user in redirect after login", user);
  useEffect(() => {
    if (!token || !user) {
      console.log("no user or token");
      navigate("/login", { replace: true });
      return;
    }
    console.log("RedirectAfterLogin use effect");

    if (user.role === "admin") {
      navigate("/admin", { replace: true });
    } else {
      navigate("/dashboard", { replace: true });
    }
  }, [token, user, navigate]);

  return null;
};

export default RedirectAfterLogin;
