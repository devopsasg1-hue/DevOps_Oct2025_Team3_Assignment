import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const result = await register(
      formData.email,
      formData.password,
      formData.username
    );

    setLoading(false);

    if (result.success) {
      alert("Registration successful! Please login.");
      navigate("/login");
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Register</h2>

        {error && <div className="register-error">{error}</div>}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="register-input-group">
            <label className="register-label">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="register-input"
              placeholder="Enter your username"
            />
          </div>

          <div className="register-input-group">
            <label className="register-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="register-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="register-input-group">
            <label className="register-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="register-input"
              placeholder="Enter your password"
            />
          </div>

          <div className="register-input-group">
            <label className="register-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="register-input"
              placeholder="Confirm your password"
            />
          </div>

          <button type="submit" disabled={loading} className="register-button">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="register-footer">
          Already have an account?{" "}
          <Link to="/login" className="register-link">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
