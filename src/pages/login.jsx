import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { baseUrl, publicUrl } from "../publicvariables";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");

  const { login, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("useEffect login", token);
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email != "" && password != "") {
      await loginCall();
    } else {
      seterror("please fill completely");
    }
  };

  const loginCall = async () => {
    try {
      const response = await axios.post(`${publicUrl}/login`, {
        email,
        password,
      });

      if (response.status == 200) {
        seterror("");
        console.log("response:", response);

        await login(response.data);
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.status == 401) {
        console.log("status:", err.response.status);
        const message = err?.response?.data?.message;
        seterror(message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <label
          htmlFor="email"
          className="block mb-2 font-semibold text-gray-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        />

        <label
          htmlFor="password"
          className="block mb-2 font-semibold text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
        />

        <label className="text-red-600">{error}</label>
        <button
          type="submit"
          className="w-full bg-blue-600 text-black py-2 rounded-md hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};
export default Login;
