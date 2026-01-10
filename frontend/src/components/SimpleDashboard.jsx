import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../SimpleDashboard.css";

const SimpleDashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="simple-dashboard">
      <nav className="simple-navbar">
        <h1 className="simple-logo">DevOps</h1>
        <div className="simple-nav-right">
          <span className="simple-username">{user?.username}</span>
          <button onClick={handleLogout} className="simple-logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <div className="simple-content">
        <div className="simple-welcome-card">
          <h2>Welcome, {user?.username}</h2>
          <p>You have logged in.</p>

          <div className="simple-info-box">
            <div className="simple-info-item">
              <span className="simple-info-label">Email:</span>
              <span className="simple-info-value">{user?.email}</span>
            </div>
            <div className="simple-info-item">
              <span className="simple-info-label">Role:</span>
              <span className="simple-info-value">{user?.role}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleDashboard;
