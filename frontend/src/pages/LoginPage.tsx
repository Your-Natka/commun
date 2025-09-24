import React, { useContext, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [err, setErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);

      const res = await api.post("/api/auth/token", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const token = res.data.access_token;
      setToken(token); // збережеться і в localStorage
      navigate("/chat"); // 🚀 Перехід після логіну
    } catch (error: any) {
      setErr(error.response?.data?.detail || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={submit}
        className="w-full max-w-sm p-6 bg-white rounded shadow"
      >
        <h2 className="text-xl mb-4">Login</h2>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full mb-2 p-2 border rounded"
        />
        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>
        {err && <p className="text-red-500 mt-2">{err}</p>}
      </form>
    </div>
  );
}
