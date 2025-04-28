import React from 'react';
import { formatDate } from '../utils/formats';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importar íconos de edición y eliminación

const ExpenseItem = ({ expense, onSelectExpense, onDeleteExpense }) => {
  return (
    <tr>
      <td>{expense.user}</td>
      <td>{expense.category}</td>
      <td>${expense.amount?.toFixed(2)}</td>
      <td>{formatDate(expense.date)}</td>
      <td>
        <FaEdit
          className="text-primary cursor-pointer me-3"
          style={{ fontSize: '1.2rem' }}
          onClick={() => onSelectExpense(expense)}
          title="Editar"
        />
        <FaTrash
          className="text-danger cursor-pointer"
          style={{ fontSize: '1.2rem' }}
          onClick={() => onDeleteExpense(expense.id)}
          title="Eliminar"
        />
      </td>
    </tr>
  );
};

export default ExpenseItem;