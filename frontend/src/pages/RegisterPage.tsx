import React, { useEffect, useState } from "react";
import api from "../api"; // наш axios instance
import { createSocket } from "../wsClient"; // наша функція для створення WebSocket

export default function RegisterPage() {
   useEffect(() => {
    // приклад REST-запиту
    api.get("/health").then((res) => console.log("API health:", res.data));

    // приклад WebSocket
    const ws = createSocket(1, "dummy_token");
    return () => ws.close();
  }, []);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resp, setResp] = useState<any>(null);

  async function register(e: React.FormEvent) {
    e.preventDefault();

    try {
      const r = await api.post("/api/auth/register", {
        username,
        email,
        password,
      });

      if (r.status === 200 || r.status === 201) {
        setResp({ status: r.status, data: r.data });
        setTimeout(() => {
          window.location.href = "/login"; // або navigate('/login')
        }, 2000);
      } else {
        setResp({ status: r.status, data: r.data });
      }
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
          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Register
          </button>
        </form>

        {/* ❌ Повідомлення про помилку */}
        {resp && resp.status >= 400 && (
          <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
            ❌ Помилка {resp.status}:{" "}
            {resp.data?.error || JSON.stringify(resp.data)}
          </div>
        )}
        {/* ✅ Повідомлення про успіх */}
        {resp && resp.status >= 200 && resp.status < 300 && (
          <div className="mt-4 p-2 bg-green-100 text-green-700 rounded">
            ✅ Реєстрація успішна! Зараз перейдемо до логіну...
          </div>
        )}

        {/* 🔍 Відладочна відповідь */}
        {resp && (
          <pre className="mt-4 text-sm bg-gray-100 p-2 rounded overflow-x-auto">
            {JSON.stringify(resp, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};