import { List, ListItem, ListItemText } from "@mui/material";
import PropTypes from "prop-types";

const Profile = ({ users }) => {
  return (
    <List>
      {users.map((user) => (
        <ListItem key={user._id}>
          <ListItemText
            primary={user.email}
            secondary={`Borrowed Books: ${user.borrowedBooks.length}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

Profile.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      borrowedBooks: PropTypes.array.isRequired,
    })
  ).isRequired,
};

export default Profile;
