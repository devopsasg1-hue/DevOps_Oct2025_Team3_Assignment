import React from 'react'
import {useAuth} from "../contexts/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

const Header = () => {

    const { user, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };
    return (
        <nav className="header">
            <h1>DevOps</h1>
            <div>
                <span>{user?.username}</span>
                <button onClick={handleLogout} >
                    Logout
                </button>
            </div>
        </nav>
    )
}
export default Header
