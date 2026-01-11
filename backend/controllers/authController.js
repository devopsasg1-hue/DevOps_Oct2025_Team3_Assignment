const authModel = require("../models/authModel");

//register new user
async function register(req, res) {
  try {
    const { email, password, username, role } = req.body;

    //validation
    if (!email || !password || !username) {
      console.log("Validation failed: Missing fields");
      return res.status(400).json({
        error: "Email, password, and username are required",
      });
    }

    if (password.length < 6) {
      console.log("Validation failed: Password too short");
      return res.status(400).json({
        error: "Password must be at least 6 characters",
      });
    }

    console.log("Calling Supabase auth signup...");
    //register with Supabase Auth
    const { authUser, error: authError } = await authModel.registerUser(
      email,
      password
    );

    if (authError) {
      console.log("Supabase auth error:", authError);
      return res.status(400).json({
        error: authError.message || "Registration failed",
      });
    }

    //create user profile in database
    try {
      const userProfile = await authModel.createUserProfile(
        authUser.id,
        email,
        username,
        role || "user"
      );

      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: userProfile.userid,
          email: userProfile.email,
          username: userProfile.username,
          role: userProfile.role,
        },
      });
    } catch (profileError) {
      console.error("Profile creation error:", profileError);
      console.error("Profile error details:", profileError.message);
      return res.status(500).json({
        error: "Registration failed. Please try again.",
        details: profileError.message,
      });
    }
  } catch (error) {
    console.error("Registration error:", error);
    console.error("Error stack:", error.stack);
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
}

//login and logout
async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const { session, user, error } = await authModel.loginUser(email, password);

    if (error) {
      console.log("Login error:", error);
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const userProfile = await authModel.getUserProfile(user.id);

    res.json({
      message: "Login successful",
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
      user: {
        id: userProfile.userid,
        email: userProfile.email,
        username: userProfile.username,
        role: userProfile.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function logout(req, res) {
  try {
    const { error } = await authModel.logoutUser();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

async function getProfile(req, res) {
  try {
    const userProfile = await authModel.getUserProfile(req.user.id);

    res.json({
      user: {
        id: userProfile.userid,
        email: userProfile.email,
        username: userProfile.username,
        role: userProfile.role,
      },
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { register, login, logout, getProfile };
