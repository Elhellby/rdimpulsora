import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

export const fetchExpenses = async () => {
  try {
    const response = await axios.get(`${API_URL}/expenses`);
    console.log('Fetched expenses:', response);
    return response.data;
  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

export const addExpense = async (expense) => {
  try {
    const response = await axios.post(`${API_URL}/expenses`, expense);
    return response.data;
  } catch (error) {
    console.error('Error adding expense:', error);
    throw error;
  }
};

export const updateExpense = async (id, expense) => {
  try {
    const response = await axios.put(`${API_URL}/expenses/${id}`, expense);
    return response.data;
  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    await axios.delete(`${API_URL}/expenses/${id}`);
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};