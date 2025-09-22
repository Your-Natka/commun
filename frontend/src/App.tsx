import React, { useState } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resp, setResp] = useState<any>(null);

  async function register(e: React.FormEvent) {
    e.preventDefault();

    const r = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await r.json();
    setResp({ status: r.status, data });
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow p-6 rounded">
        <h1 className="text-xl font-semibold mb-4">Register</h1>
        <form onSubmit={register} className="space-y-3">
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="w-full p-2 border rounded" />
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full p-2 border rounded" />
          <button className="w-full bg-blue-600 text-white py-2 rounded">Register</button>
        </form>

        {resp && (
          <pre className="mt-4 text-sm bg-gray-100 p-2 rounded">
            {JSON.stringify(resp, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}


export default App;
