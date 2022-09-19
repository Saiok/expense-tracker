import axios from 'axios';

const BACKEND_URI =
  'https://react-native-course-7c95c-default-rtdb.firebaseio.com';

export async function storeExpense(expenseData) {
  const response = await axios.post(
    `${BACKEND_URI}/expenses.json`,
    expenseData
  );
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(`${BACKEND_URI}/expenses.json`);
  const expenses = [];

  for (const key in response.data) {
    const expenseObject = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description
    };
    expenses.push(expenseObject);
  }

  return expenses;
}

export function updateExpense(id, expenseData) {
  return axios.put(`${BACKEND_URI}/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(`${BACKEND_URI}/expenses/${id}.json`);
}
