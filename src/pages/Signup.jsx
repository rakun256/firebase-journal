import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (name) await updateProfile(userCredential.user, { displayName: name });
      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        name,
        email,
        createdAt: serverTimestamp(),
      });
      setName("");
      setEmail("");
      navigate("/");
    } catch (err) {
      console.log(err.code);
      let msg = "An error occured.";
      if (err.code === "auth/email-already-in-use")
        msg = "This email is already registered.";
      if (err.code === "auth/invalid-email") msg = "Invalid email format.";
      if (err.code === "auth/weak-password") msg = "Weak password.";
      if (err.code === "auth/network-request-failed")
        msg = "Network request failed.";
      setError(msg);
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
            <h2>Already have an account?</h2>
            <Link
              to="/login"
              className="px-8 py-2 rounded-md border-bg border-2 font-bold hover:scale-110 hover:bg-primary-light transition-all duration-200"
            >
              Log in
            </Link>
          </div>
        </section>
        <section className="relative flex w-[100%] h-[100%] items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-[700] mb-8">Sign Up</h1>
            <form
              onSubmit={handleSignup}
              className="flex flex-col gap-4 transition-all duration-200"
            >
              {error && <p className="text-error text-center">{error}</p>}
              <input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-2 py-3 rounded-md lg:w-[300px] bg-input "
              />
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
              <input
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="px-2 py-3 rounded-md lg:w-[300px] bg-input "
              />
              <button
                type="submit"
                className="mt-3 px-4 py-3 bg-primary rounded-md font-bold text-bg cursor-pointer hover:bg-primary-hover"
              >
                Sign Up
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
              Sign Up to
            </h2>
            <h1 className="text-4xl font-[700] transition-all duration-200">
              Firebase Journal
            </h1>
          </div>
        </section>
        <section className="relative flex w-[100%] h-[100%] items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <form
              onSubmit={handleSignup}
              className="flex flex-col gap-4 transition-all duration-200"
            >
              {error && <p className="text-error text-center">{error}</p>}
              <input
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-2 py-3 rounded-md w-[300px] bg-input "
              />
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
              <input
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="px-2 py-3 rounded-md w-[300px] bg-input "
              />
              <button
                type="submit"
                className="mt-3 px-4 py-3 bg-primary rounded-md font-bold text-bg cursor-pointer hover:bg-primary-hover"
              >
                Sign Up
              </button>
            </form>
            <h2 className="mt-16">Already have an account?</h2>
            <Link
              to="/login"
              className="text-text-link font-bold hover:underline transition-all duration-200"
            >
              Log in
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
