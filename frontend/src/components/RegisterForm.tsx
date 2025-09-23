import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resp, setResp] = useState<any>(null);
  const navigate = useNavigate();

  async function register(e: React.FormEvent) {
    e.preventDefault();
    try {
      const r = await api.post("/api/auth/register", { username, email, password });
      setResp({ status: r.status, data: r.data });
      if (r.status === 200) navigate("/login"); // після успішної реєстрації на логін
    } catch (err: any) {
      setResp({
        status: err.response?.status || 500,
        data: err.response?.data || { error: "Server error" },
      });
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow p-6 rounded">
        <h1 className="text-xl font-semibold mb-4">Register</h1>
        <form onSubmit={register} className="space-y-3">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full p-2 border rounded"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full p-2 border rounded"
          />
          <button className="w-full bg-blue-600 text-white py-2 rounded">Register</button>
        </form>
        {resp && (
          <pre className="mt-4 text-sm bg-gray-100 p-2 rounded overflow-x-auto">
            {JSON.stringify(resp, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
