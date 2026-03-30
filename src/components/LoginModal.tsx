import { useState } from "react";
import { useAuth } from "../features/auth/AuthContext";

export function LoginModal() {
  const { loginOpen, closeLogin, login, register } = useAuth();

  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!loginOpen) return null;

  async function handleSubmit() {
    if (isRegister) {
      await register(name, email, password);
    } else {
      await login(email, password);
    }
    closeLogin();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">
          {isRegister ? "Create Account" : "Login"}
        </h2>

        {isRegister && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full border px-3 py-2 rounded mb-3"
          />
        )}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border px-3 py-2 rounded mb-3"
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          className="w-full border px-3 py-2 rounded mb-4"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-red-600 text-white py-2 rounded mb-3 hover:bg-red-700"
        >
          {isRegister ? "Register" : "Login"}
        </button>

        <button
          onClick={() => setIsRegister(!isRegister)}
          className="text-sm text-blue-600 mb-3"
        >
          {isRegister ? "Already have an account?" : "Create new account"}
        </button>

        <button
          onClick={closeLogin}
          className="w-full bg-gray-300 py-2 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}
