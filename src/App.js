import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchExpensesAsync, deleteExpenseAsync, updateExpenseAsync, addExpense } from './slices/expensesSlice';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

function App() {
  const dispatch = useDispatch();
  const { items: expenses, loading } = useSelector((state) => state.expenses);
  const [selectedExpense, setSelectedExpense] = React.useState(null);

  useEffect(() => {
    dispatch(fetchExpensesAsync());
  }, [dispatch]);

  const handleAddExpense = (expense) => {
    dispatch(addExpense(expense));
  };

  const handleUpdateExpense = (id, updatedExpense) => {
    dispatch(updateExpenseAsync({ id, updatedExpense }));
    setSelectedExpense(null);
  };

  const handleDeleteExpense = (id) => {
    dispatch(deleteExpenseAsync(id));
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Expense Tracker</h1>
      <div className="row">
        <div className="col-md-6">
          <ExpenseForm
            onAddExpense={handleAddExpense}
            selectedExpense={selectedExpense}
            onUpdateExpense={handleUpdateExpense}
          />
        </div>
        <div className="col-md-6">
          {loading ? (
            <p className="text-center">Cargando...</p>
          ) : (
            <ExpenseList
              expenses={expenses}
              onSelectExpense={setSelectedExpense}
              onDeleteExpense={handleDeleteExpense}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;