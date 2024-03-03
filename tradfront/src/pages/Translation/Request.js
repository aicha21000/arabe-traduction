// Request.js
import React, { useState, useEffect } from 'react';
import './Request.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TranslationRequest() {
  const [userId, setUserId] = useState('');
  const [token, setToken] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId');

    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
    }
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    languageSource: '',
    languageTarget: '',
    document: null,
    additionalMessage: '',
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('user', userId);
      formDataToSend.append('languageSource', formData.languageSource);
      formDataToSend.append('languageTarget', formData.languageTarget);
      formDataToSend.append('document', formData.document);
      formDataToSend.append('additionalMessage', formData.additionalMessage);

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
      setShowForm(false); // Hide the form on successful submission
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
    // Optionally, you can reset the form data here if needed.
  };

  return (
    <div className="container">
      <h2>Translation Request</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {showForm && (
        <form onSubmit={handleSubmit}>
          <label>
            Langue source:
            <input type="text" name="languageSource" value={formData.languageSource} onChange={handleInputChange} required />
          </label>
          <label>
            Langue cible:
            <input type="text" name="languageTarget" value={formData.languageTarget} onChange={handleInputChange} required />
          </label>
          <label>
            Document à traduire (Word, Image, PDF uniquement):
            <input type="file" name="document" accept=".doc, .docx, .jpg, .jpeg, .png, .pdf" onChange={handleFileChange} required />
          </label>
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
    </div>
  );
}

export default TranslationRequest;