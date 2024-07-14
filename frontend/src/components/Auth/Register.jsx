import { useState } from "react";
import { TextField, Button, Typography, Container, Link } from "@mui/material";
import { register } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
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
