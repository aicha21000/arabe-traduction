// Request.js
import React, { useState, useEffect } from 'react';
import './Request.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Login from '../Auth/Login';

function TranslationRequest() {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [price, setPrice] = useState(25);
  const [deliveryTime, setDeliveryTime] = useState('normal');
  const [deliveryMethod, setDeliveryMethod] = useState('mail');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');

    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
      setIsAuthenticated(true);
    }
  }, []);
  const handleAuthentication = (authenticatedUserId, authenticatedToken) => {
    setUserId(authenticatedUserId);
    setToken(authenticatedToken);
    setIsAuthenticated(true);
  };



  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    languageSource: '',
    languageTarget: '',
    document: null,
    additionalMessage: '',
  });

  const handleDeliveryTimeChange = (e) => {
    setDeliveryTime(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      document: file,
    });
  };
  const handleDeliveryMethodChange = (e) => {
    setDeliveryMethod(e.target.value);
  };

  const handleNumberOfPagesChange = (e) => {
    const pages = parseInt(e.target.value, 10) || 1;
    setNumberOfPages(pages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('user', userId);
      formDataToSend.append('languageSource', formData.languageSource);
      formDataToSend.append('languageTarget', formData.languageTarget);
      formDataToSend.append('document', formData.document);
      formDataToSend.append('additionalMessage', formData.additionalMessage);
      formDataToSend.append('numberOfPages', numberOfPages);
      formDataToSend.append('deliveryTime', deliveryTime);
      formDataToSend.append('deliveryMethod', deliveryMethod);

      const response = await axios.post(
        'http://localhost:5000/translation/request',
        formDataToSend,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        }
      );

      setSuccessMessage('Translation request successful! Track your order on the dashboard.');
      setErrorMessage('');
      setShowForm(false);

      setConfirmationMessage('Thank you for your translation request! Check your email for confirmation.');

    } catch (error) {
      console.error('Translation request error:', error.response.data);
      console.log('Authorization Header:', `Bearer ${token}`);

      setErrorMessage('Error submitting translation request. Please try again.');
      setSuccessMessage('');
    }
  };

  const handleNewTranslation = () => {
    setShowForm(true);
    setSuccessMessage('');
    setErrorMessage('');
  };

  const calculateFinalPrice = () => {
    let basePricePerPage = 25;
    let additionalPrice = 0;

    if (deliveryTime === 'urgent_48h') {
      additionalPrice = 10;
    } else if (deliveryTime === 'very_urgent_24h') {
      additionalPrice = 20;
    }
    if (deliveryMethod === 'postal') {
      additionalPrice += 10;
    }

    const finalPrice = (numberOfPages * basePricePerPage) + additionalPrice;
    return finalPrice;
  };

  return (
    <div className="container">
      <h2>Translation Request</h2>
      {isAuthenticated ? (
        <React.Fragment>
          {confirmationMessage && <div className="confirmation-message">{confirmationMessage}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {showForm && (
            <form onSubmit={handleSubmit}>
              <label>
                Langue source:
                <select
                  name="languageSource"
                  value={formData.languageSource}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select a language</option>
                  <option value="arabic">Arabic</option>
                  <option value="french">French</option>
                </select>
              </label>
              <label>
                Langue cible:
                <select
                  name="languageTarget"
                  value={formData.languageTarget}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>Select a language</option>
                  <option value="arabic">Arabic</option>
                  <option value="french">French</option>
                </select>
              </label>
              <label>
                Number of Pages:
                <input
                  type="number"
                  name="numberOfPages"
                  value={numberOfPages}
                  onChange={handleNumberOfPagesChange}
                  min="1"
                />
              </label>
              <label>
                Document à traduire (Word, Image, PDF uniquement):
                <input type="file" name="document" accept=".doc, .docx, .jpg, .jpeg, .png, .pdf" onChange={handleFileChange} required />
              </label>
              <label>
                Delivery Method:
                <div>
                  <label>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="mail"
                      checked={deliveryMethod === 'mail'}
                      onChange={handleDeliveryMethodChange}
                    />
                    Mail (Free)
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="deliveryMethod"
                      value="postal"
                      checked={deliveryMethod === 'postal'}
                      onChange={handleDeliveryMethodChange}
                    />
                    Postal (+10 Euros)
                  </label>
                </div>
              </label>
              <label>
                Delivery Time:
                <div>
                  <label>
                    <input
                      type="radio"
                      name="deliveryTime"
                      value="normal"
                      checked={deliveryTime === 'normal'}
                      onChange={handleDeliveryTimeChange}
                    />
                    Normal (72h)
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="deliveryTime"
                      value="urgent_48h"
                      checked={deliveryTime === 'urgent_48h'}
                      onChange={handleDeliveryTimeChange}
                    />
                    Urgent (48h)
                  </label>
                </div>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="deliveryTime"
                      value="very_urgent_24h"
                      checked={deliveryTime === 'very_urgent_24h'}
                      onChange={handleDeliveryTimeChange}
                    />
                    Very Urgent (24h)
                  </label>
                </div>
              </label>
              <textarea
                name="additionalMessage"
                value={formData.additionalMessage}
                onChange={handleInputChange}
                required
                rows="4"
                placeholder="Enter additional message..."
              ></textarea>
              <p>Price: {calculateFinalPrice()} Euros</p>
              <button type="submit">Envoyer la demande</button>
            </form>
          )}

          {!showForm && (
            <div>
              <p>
                Track your order on the <Link to="/client-space">dashboard</Link>.
              </p>
              <p>Would you like to request another translation?</p>
              <button onClick={handleNewTranslation}>Request Another Translation</button>

            </div>
          )}
        </React.Fragment>
      ) : (
        // Render login/register components when not authenticated
        <React.Fragment>
          Please, create an accout to continue
          <Login onAuthentication={handleAuthentication} />
        </React.Fragment>
      )}
    </div>
  );
}

export default TranslationRequest;