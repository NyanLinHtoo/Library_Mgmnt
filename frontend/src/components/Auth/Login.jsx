import { useState } from "react";
import { TextField, Button, Typography, Container, Link } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
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
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
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
