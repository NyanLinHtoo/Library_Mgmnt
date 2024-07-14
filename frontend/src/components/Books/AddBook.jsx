import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { addBook } from "../../services/api";
import PropTypes from "prop-types";

function AddBook({ onBookAdded }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addBook({ title, category });
      setTitle("");
      setCategory("");
      onBookAdded();
    } catch (error) {
      console.error("Failed to add book", error);
    }
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const menuItem = [
    "Crime",
    "Action and Adventure",
    "Science Fiction",
    "Allegories",
    "Fantasy",
    "Horror",
    "Mystery/Detective",
    "Thrillers",
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6">Add New Book</Typography>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Category"
          value={category}
          onChange={handleChange}
          margin="normal">
          {menuItem.map((item) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary" sx={{ mb: 3 }}>
        Add Book
      </Button>
    </form>
  );
}

AddBook.propTypes = {
  onBookAdded: PropTypes.func.isRequired,
};

export default AddBook;
