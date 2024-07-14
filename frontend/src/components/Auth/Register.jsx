import { useState } from "react";
import { TextField, Button, Typography, Container, Link } from "@mui/material";
import { register } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

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

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    try {
      await register(email, password);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{ mx: "auto", my: 32, boxShadow: 3, px: 5, py: 3 }}>
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        Register user
      </Typography>
      <form onSubmit={handleRegister}>
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
          sx={{ mt: 3 }}>
          {" "}
          Register
        </Button>
        <Typography variant="body1" sx={{ pt: 3 }}>
          Already have an account?{" "}
          <Link href="/login" underline="none">
            Login
          </Link>
        </Typography>
      </form>
    </Container>
  );
}

export default Register;
