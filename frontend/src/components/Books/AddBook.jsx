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
import { toast } from "sonner";

function AddBook({ onBookAdded }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !category) {
      toast.error("Please fill in both title and category");
      return;
    }
    try {
      await addBook({ title, category });
      setTitle("");
      setCategory("");
      onBookAdded();
      toast.success("Book added successfully");
    } catch (error) {
      console.log("Failed to add book", error);
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
      <FormControl fullWidth sx={{ mt: 2, mb: 1 }}>
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          labelId="category-select-label"
          id="category-select"
          label="Category"
          value={category}
          onChange={handleChange}>
          {menuItem.map((item) => (
            <MenuItem value={item} key={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 2, mb: 3 }}>
        Add Book
      </Button>
    </form>
  );
}

AddBook.propTypes = {
  onBookAdded: PropTypes.func.isRequired,
};

export default AddBook;
