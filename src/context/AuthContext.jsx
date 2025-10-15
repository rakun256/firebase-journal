import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import Loading from "../components/Loading";

const AuthContext = createContext();

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u || null);
      setLoading(false);
    });
    return unsub;
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("Çıkış başarılı");
    } catch (e) {
      console.error("Hata:", e);
    }
  };

  const value = useMemo(() => ({ user, logout }), [user]);

  if (loading) return <Loading />;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
