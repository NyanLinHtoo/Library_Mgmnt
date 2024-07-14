import PropTypes from "prop-types";
import {
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";

function BookList({ books, onBorrow, userRole, isBorrowing }) {
  const columns = [
    { id: "title", label: "Title", minWidth: 200 },
    { id: "category", label: "Category", minWidth: 100 },
    ...(userRole === "User"
      ? [{ id: "borrow", label: "Borrow", minWidth: 170, align: "center" }]
      : []),
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Book List
      </Typography>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {books
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((book) => {
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={book.title}>
                    {columns.map((column) => {
                      const value = book[column.id];
                      if (column.id === "borrow" && userRole === "User") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {!book.isBorrowed && (
                              <Button
                                onClick={() => onBorrow(book._id)}
                                disabled={isBorrowing}>
                                {isBorrowing ? (
                                  <CircularProgress size={24} />
                                ) : (
                                  "Borrow"
                                )}
                              </Button>
                            )}
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={books.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      isBorrowed: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onBorrow: PropTypes.func,
  userRole: PropTypes.string.isRequired,
  isBorrowing: PropTypes.bool.isRequired,
};

export default BookList;
