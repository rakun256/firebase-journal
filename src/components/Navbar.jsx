import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Navbar() {
    const { user, logout } = useAuth();

    return (
        <nav className="px-4 py-2 bg-primary-light text-white flex justify-between items-center">
            <Link to="/" className="text-bg text-lg md:text-xl font-[700]">Firebase Journal</Link>
            <div>
                {user && <span>👋 {user.displayName || user.email}</span> }
                <button onClick={logout} className="ml-4 px-4 py-2 bg-primary hover:bg-primary-hover rounded-md cursor-pointer transition-all duration-200">Log Out</button>
            </div>
        </nav>
    );
}