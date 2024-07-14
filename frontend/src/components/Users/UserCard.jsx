import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Box,
} from "@mui/material";
import { Email as EmailIcon, Book as BookIcon } from "@mui/icons-material";

const UserCard = ({ user }) => (
  <Card
    elevation={3}
    sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
    <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
          {user.email[0].toUpperCase()}
        </Avatar>
        <Typography variant="h6" noWrap>
          {user.email}
        </Typography>
      </Box>
      <List dense>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <EmailIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Email"
            secondary={user.email}
            secondaryTypographyProps={{ noWrap: true }}
          />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <BookIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary="Borrowed Books"
            secondary={`${user.borrowedBooks.length} book(s)`}
          />
        </ListItem>
      </List>
      <Typography variant="subtitle2" mt={2} mb={1}>
        Borrowed Books:
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1} sx={{ mt: "auto" }}>
        {user.borrowedBooks.map((book) => (
          <Chip
            key={book._id}
            label={book.title}
            size="small"
            color="primary"
            variant="outlined"
          />
        ))}
      </Box>
    </CardContent>
  </Card>
);

UserCard.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    borrowedBooks: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default UserCard;
