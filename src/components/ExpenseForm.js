import React, { useState, useEffect } from 'react';
import AlertMessage from './AlertMessage';
import '../styles/Expenses.css';
import { updateExpense } from '../services/api'; // Importar la función para actualizar el gasto

const ExpenseForm = ({ onAddExpense, selectedExpense, onUpdateExpense }) => {
  const [user, setUser] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedExpense) {
      setUser(selectedExpense.user);
      setCategory(selectedExpense.category);
      setAmount(selectedExpense.amount);
      setDate(selectedExpense.date);
      setIsEditing(true);
    }
  }, [selectedExpense]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!user || !category || !amount || !date) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      setError('El monto debe ser un número mayor a 0.');
      return;
    }

    const expenseData = {
      user,
      category,
      amount: parseFloat(amount),
      date,
    };

    if (isEditing) {
      // Actualizar el registro existente
      try {
        await updateExpense(selectedExpense.id, expenseData);
        setSuccess('El registro se actualizó correctamente.');
        onUpdateExpense(selectedExpense.id, expenseData);
      } catch (error) {
        setError('Error al actualizar el registro.');
      }
    } else {
      // Agregar un nuevo registro
      onAddExpense(expenseData);
      setSuccess('El registro se guardó correctamente.');
    }

    setUser('');
    setCategory('');
    setAmount('');
    setDate('');
    setError('');
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded bg-light">
      <h2 className="mb-3">{isEditing ? 'Actualizar Gasto' : 'Nuevo Gasto'}</h2>
      {error && (
        <AlertMessage
          message={error}
          type="danger"
          onClose={() => setError('')}
        />
      )}
      {success && (
        <AlertMessage
          message={success}
          type="success"
          onClose={() => setSuccess('')}
        />
      )}
      <div className="mb-3">
        <label className="form-label">Usuario:</label>
        <input
          type="text"
          className="form-control"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Categoría:</label>
        <input
          type="text"
          className="form-control"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Monto:</label>
        <input
          type="number"
          className="form-control"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Fecha:</label>
        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary w-100">
        {isEditing ? 'Actualizar Gasto' : 'Agregar Gasto'}
      </button>
    </form>
  );
};

export default ExpenseForm;