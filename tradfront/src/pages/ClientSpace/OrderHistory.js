// src/pages/ClientSpace/OrderHistory.js
import React from 'react';
import './OrderHistory.css';

function OrderHistory() {
  const orderHistoryData = [
    { id: 1, date: '2024-02-24', status: 'Completed' },
    { id: 2, date: '2024-02-20', status: 'In Progress' },
  ];

  return (
    <div>
      <h2>Order History</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orderHistoryData.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistory;
