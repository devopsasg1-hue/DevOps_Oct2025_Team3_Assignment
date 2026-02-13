// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContext";
// import "../Login.css";
//
// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useAuth();
//
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };
//
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);
//
//     const result = await login(formData.email, formData.password);
//
//     setLoading(false);
//
//     if (result.success) {
//       navigate("/dashboard");
//     } else {
//       setError(result.error);
//     }
//   };
//
//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2 className="login-title">Login</h2>
//
//         {error && <div className="login-error">{error}</div>}
//
//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="login-input-group">
//             <label className="login-label">Email</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="login-input"
//               placeholder="Enter your email"
//             />
//           </div>
//
//           <div className="login-input-group">
//             <label className="login-label">Password</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="login-input"
//               placeholder="Enter your password"
//             />
//           </div>
//
//           <button type="submit" disabled={loading} className="login-button">
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>
//
//         <p className="login-footer">
//           Don't have an account?{" "}
//           <Link to="/register" className="login-link">
//             Register here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };
//
// export default Login;
