import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export default function Login() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { showToast } = useToast();
  const navigate = useNavigate();

  if (user) return <Navigate to="/" replace />;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      showToast("Logged in successfully!", "success");
      navigate("/");
    } catch (e) {
      showToast(e.message, "error");
      setError(e.message);
    }
  };

  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:flex h-[100vh] w-[100%] flex-row items-center justify-around">
        <section className="bg-primary relative flex w-[75%] h-[100%] rounded-r-[25%] items-center justify-center text-bg text-center">
          <div className="flex flex-col items-center justify-center gap-8">
            <h1 className="xl:text-6xl lg:text-5xl md:text-4xl font-[700] transition-all duration-200">
              Firebase Journal
            </h1>
            <h2>Don't have an account?</h2>
            <Link
              to="/signup"
              className="px-8 py-2 rounded-md border-bg border-2 font-bold hover:scale-110 hover:bg-primary-light transition-all duration-200"
            >
              Sign Up
            </Link>
          </div>
        </section>
        <section className="relative flex w-[100%] h-[100%] items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-[700] mb-8">Log In</h1>
            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-4 transition-all duration-200"
            >
              {error && <p className="text-error text-center">{error}</p>}
              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-2 py-3 rounded-md lg:w-[300px] bg-input "
              />
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-2 py-3 rounded-md lg:w-[300px] bg-input "
              />
              <button
                type="submit"
                className="mt-3 px-4 py-3 bg-primary rounded-md font-bold text-bg cursor-pointer hover:bg-primary-hover"
              >
                Log In
              </button>
            </form>
          </div>
        </section>
      </div>

      {/* Mobile View */}
      <div className="flex md:hidden flex-col w-[100%] min-h-[100vh] justify-center items-center gap-8">
        <section>
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-3xl font-[600] text-text-secondary">
              Log In to
            </h2>
            <h1 className="text-4xl font-[700] transition-all duration-200">
              Firebase Journal
            </h1>
          </div>
        </section>
        <section className="relative flex w-[100%] h-[100%] items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-4 transition-all duration-200"
            >
              {error && <p className="text-error text-center">{error}</p>}
              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-2 py-3 rounded-md w-[300px] bg-input "
              />
              <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-2 py-3 rounded-md w-[300px] bg-input "
              />
              <button
                type="submit"
                className="mt-3 px-4 py-3 bg-primary rounded-md font-bold text-bg cursor-pointer hover:bg-primary-hover"
              >
                Log In
              </button>
            </form>
            <h2 className="mt-16">Don't have an account?</h2>
            <Link
              to="/signup"
              className="text-text-link font-bold hover:underline transition-all duration-200"
            >
              Sign Up
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
