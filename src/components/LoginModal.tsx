import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function LoginModal() {
  const { loginOpen, closeLogin, login } = useAuth();
  const [name, setName] = useState("");

  if (!loginOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <div className="flex justify-end gap-3">
          <button onClick={closeLogin} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>

          <button
            onClick={() => login(name)}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
