import { Typography, Button, Container } from "@mui/material";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function ErrorPage404({
  title = "404",
  subtitle = "Oops! Page not found",
  description = "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
  imageUrl = "../../../../images/error-page/error404.png",
  imageAlt = "404 Error",
}) {
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <img
        src={imageUrl}
        alt={imageAlt}
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <Typography variant="h3" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {subtitle}
      </Typography>
      <Typography variant="body1" paragraph>
        {description}
      </Typography>
      <Button component={Link} to="/" variant="contained" color="primary">
        Go to Login
      </Button>
    </Container>
  );
}

ErrorPage404.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
};

export default ErrorPage404;
