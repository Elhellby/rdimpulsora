import React, { useState } from 'react';
import ExpenseItem from './ExpenseItem';
import '../styles/Expenses.css';

const ExpenseList = ({ expenses, onSelectExpense, onDeleteExpense }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = expenses.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  if (expenses.length === 0) {
    return <p className="text-center text-muted">No expenses found.</p>;
  }

  return (
    <div className="expense-list">
      <table className="table table-striped">
        <thead className="bg-primary text-white">
          <tr>
            <th>Usuario</th>
            <th>Categoría</th>
            <th>Monto</th>
            <th>Fecha</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((expense) => (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              onSelectExpense={onSelectExpense}
              onDeleteExpense={onDeleteExpense}
            />
          ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(totalPages)].map((_, index) => (
            <li
              key={index}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ExpenseList;