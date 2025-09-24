import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Ласкаво просимо до Messenger!</h1>
      <div className="space-x-4">
        <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Register
        </Link>
        <Link to="/login" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Login
        </Link>
      </div>
    </div>
  );
}
