import { useState } from "react";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
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
  const provider = new GoogleAuthProvider();

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

  async function handleGoogleLogin() {
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error(e);
    }
  }

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
            <button
              onClick={handleGoogleLogin}
              className="flex cursor-pointer mt-4 items-center justify-between w-auto max-w-[400px] min-w-min h-10 px-3 bg-[#f2f2f2] rounded-[20px] font-roboto text-[14px] text-[#1f1f1f] font-medium tracking-[0.25px] transition-all duration-200 hover:shadow-[0_1px_2px_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] active:before:opacity-10 focus:before:opacity-10 relative overflow-hidden select-none"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-200 pointer-events-none before:content-[''] before:absolute before:inset-0 before:bg-[#001d35] before:opacity-0"></div>
              <div className="flex items-center h-full w-full relative">
                <div className="w-5 h-5 mr-3 min-w-5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </svg>
                </div>
                <span className="flex-grow overflow-hidden text-ellipsis">
                  Continue with Google
                </span>
              </div>
            </button>
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
            <button
              onClick={handleGoogleLogin}
              className="flex mt-4 cursor-pointer items-center justify-between w-auto max-w-[400px] min-w-min h-10 px-3 bg-[#f2f2f2] rounded-[20px] font-roboto text-[14px] text-[#1f1f1f] font-medium tracking-[0.25px] transition-all duration-200 hover:shadow-[0_1px_2px_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] active:before:opacity-10 focus:before:opacity-10 relative overflow-hidden select-none"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-200 pointer-events-none before:content-[''] before:absolute before:inset-0 before:bg-[#001d35] before:opacity-0"></div>
              <div className="flex items-center h-full w-full relative">
                <div className="w-5 h-5 mr-3 min-w-5">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    />
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    />
                    <path fill="none" d="M0 0h48v48H0z" />
                  </svg>
                </div>
                <span className="flex-grow overflow-hidden text-ellipsis">
                  Continue with Google
                </span>
              </div>
            </button>

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
  );
}
