// Importer useState, useEffect et Link depuis 'react-router-dom'
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    if (userId) {
      axios.get(`http://localhost:5000/client-space/orders/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(response => {
          setOrders(response.data);
        })
        .catch(error => {
          console.error('Error fetching orders:', error.response.data);
        });
    }
  }, []);

  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/client-space/orders/${orderId}`);

      setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));

      setSuccessMessage(response.data.message);

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setErrorMessage(error.response.data.error);

      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  // Fonction pour télécharger le fichier associé à une commande
  const downloadFile = async (orderId, fileName) => {
    try {
      const response = await axios.get(`http://localhost:5000/client-space/orders/${orderId}/download`, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();

      setSuccessMessage('File downloaded successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error downloading file:', error.response.data);
      setErrorMessage('Error downloading the file. Please try again.');
    }
  };
  return (
    <div>
      <h2>Client Dashboard</h2>
      <h3>Commandes passées</h3>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && (
        <div className="error-message">
          {errorMessage}{' '}
          <Link to="/contact">Contactez-nous !</Link>
        </div>
      )}
      {orders.length === 0 ? (
        <p>Aucune commande passée.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order._id}>
              Order #{order._id} -
              <button onClick={() => cancelOrder(order._id)}>Cancel</button>
              {order.document && (
                <button onClick={() => downloadFile(order._id, order.document)}>
                  Download File
                </button>
              )}
            </li>
          ))}

        </ul>
      )}
    </div>
  );
}

export default Dashboard;
