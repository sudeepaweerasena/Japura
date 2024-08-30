import React, { useState } from 'react';
import axios from 'axios';
import './FormComponent.css';

function FormComponent() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        faculty: '',
        studentID: '',
        email: '',
        eventDate: '',
        event: '',
        bookingPlace: '',
        bookingTime: '',
        deanApproved: 1,
        adminApproved: 1,
        sportleaderApproved: 1
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/submit', formData);
            alert('Request Submitted!');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Submission failed!');
        }
    };

    return (
        <div className="form-container2">
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
                <input type="text" name="faculty" value={formData.faculty} onChange={handleChange} placeholder="Faculty" />
                <input type="text" name="studentID" value={formData.studentID} onChange={handleChange} placeholder="Student ID" />
                <input type="email" className="email-full-width" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" />
                <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} placeholder="Date" />
                <input type="text" name="event" value={formData.event} onChange={handleChange} placeholder="Event" />
                <input type="text" name="bookingPlace" value={formData.bookingPlace} onChange={handleChange} placeholder="Booking Place" />
                <select name="bookingTime" value={formData.bookingTime} onChange={handleChange}>
                    <option value="">Select Time</option>
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default FormComponent;
