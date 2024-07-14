import { useState } from "react";
import { TextField, Button, Typography, Container, Link } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail && !validateEmail(newEmail)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setIsLoading(true);
    try {
      const userData = await login(email, password);
      setUser(userData);
      navigate(
        userData.role === "Librarian"
          ? "/librarian-dashboard"
          : "/user-dashboard"
      );
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ mx: "auto", my: 32, boxShadow: 3, px: 5, py: 3 }}>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Welcome!
      </Typography>
      <form onSubmit={handleLogin}>
        <TextField
          fullWidth
          label="Email"
          value={email}
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={isLoading}
          sx={{ mt: 3 }}>
          Login
        </Button>
        <Typography variant="body1" sx={{ pt: 3 }}>
          Don’t have an account yet?{" "}
          <Link href="/register" underline="none">
            Register
          </Link>
        </Typography>
        <p></p>
      </form>
    </Container>
  );
}

export default Login;
