import React, { useState } from 'react';
import './Contact.css';
import axios from 'axios';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:5000/contact', formData);

            setFormData({
                name: '',
                email: '',
                message: '',
            });

            setIsSubmitted(true);

        } catch (error) {
            console.error('Error submitting contact form:', error.response.data);
        }
    };

    return (
        <div className="container">
            <h2>Contact Us</h2>
            {isSubmitted ? (
                <p>Thank you for your message! We'll get back to you soon.</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Email:
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label>
                        Message:
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
}

export default Contact;
