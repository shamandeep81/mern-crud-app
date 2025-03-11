import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Set your API base URL (adjust if needed)
const API_URL = 'http://localhost:5000/api';

// Async thunk to fetch customers
export const fetchCustomers = createAsyncThunk('customers/fetchCustomers', async () => {
  const response = await axios.get(`${API_URL}/customers`);
  return response.data;
});

// Async thunk to add a new customer
export const addCustomer = createAsyncThunk('customers/addCustomer', async (customer) => {
  const response = await axios.post(`${API_URL}/customers`, customer);
  return response.data;
});

// Async thunk to update a customer
export const updateCustomer = createAsyncThunk('customers/updateCustomer', async ({ id, data }) => {
  const response = await axios.put(`${API_URL}/customers/${id}`, data);
  return response.data;
});

// Async thunk to delete a customer
export const deleteCustomer = createAsyncThunk('customers/deleteCustomer', async (id) => {
  await axios.delete(`${API_URL}/customers/${id}`);
  return id;
});

const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    list: [],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.list = state.list.map((customer) =>
          customer._id === action.payload._id ? action.payload : customer
        );
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.list = state.list.filter((customer) => customer._id !== action.payload);
      });
  },
});

export default customerSlice.reducer;
