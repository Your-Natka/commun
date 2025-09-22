import { useState } from "react";

export default function RegisterForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");  // додаємо email
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://backend:8000/auth/register", {  // правильний хост
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }), // додаємо email
      });

      if (res.ok) {
        setMessage("Користувач зареєстрований!");
      } else {
        const data = await res.json();
        setMessage("Помилка: " + data.detail);
      }
    } catch (err) {
      setMessage("Помилка з'єднання з сервером");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Реєстрація</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">
        Зареєструватися
      </button>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </form>
  );
}
