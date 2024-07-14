import { useNavigate } from "react-router";
import "./errstyle.css";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

const ErrorPage404 = ({ errStatus = 404 }) => {
  const navigate = useNavigate();

  const errorPageHandler = () => {
    navigate("/login");
  };

  return (
    <div className="error-container">
      <img src={`/images/error-page/error${errStatus}.png`} alt="Error" />
      <div className="text">
        {/* Make changes here when more error status codes are added */}
        <h1>
          {errStatus === 404
            ? "Ooops!...Page Not Found"
            : "Hey!... No Authorization Found"}
        </h1>

        <Button type="primary" onClick={errorPageHandler}>
          Go To Login
        </Button>
      </div>
    </div>
  );
};

ErrorPage404.propTypes = {
  errStatus: PropTypes.number,
};

ErrorPage404.defaultProps = {
  errStatus: 404,
};

export default ErrorPage404;
