import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getAllBooks = async () => {
  const response = await api.get("/books");
  return response.data;
};

export const addBook = async (bookData) => {
  const response = await api.post("/books", bookData);
  return response.data;
};

export const borrowBook = async (bookId) => {
  const response = await api.post(`/books/borrow/${bookId}`);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

export default api;
