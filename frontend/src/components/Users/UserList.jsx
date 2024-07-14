import PropTypes from "prop-types";
import { Typography, Grid, Box, Pagination } from "@mui/material";
import { useState } from "react";
import UserCard from "./UserCard";

const UserList = ({ users }) => {
  const [page, setPage] = useState(1);
  const usersPerPage = 6;

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const displayedUsers = users.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Users List
      </Typography>
      <Grid container spacing={3}>
        {displayedUsers.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user._id}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={Math.ceil(users.length / usersPerPage)}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

UserList.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      borrowedBooks: PropTypes.arrayOf(
        PropTypes.shape({
          _id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default UserList;
