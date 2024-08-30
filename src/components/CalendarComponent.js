import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CalendarComponent.css';

const CalendarComponent = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3004/api/bookings', {
                    params: {
                        month: currentDate.getMonth() + 1,
                        year: currentDate.getFullYear()
                    }
                });

                console.log('Fetched Events from Backend:', response.data);

                // Directly use the date from the backend without any further conversion
                setEvents(response.data.map(event => ({
                    ...event,
                    date: event.eventDate // Assuming eventDate is in YYYY-MM-DD format
                })));
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };
        fetchEvents();
    }, [currentDate]);

    const handlePreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    };

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

    const daysArray = Array.from({ length: daysInMonth(currentDate.getFullYear(), currentDate.getMonth()) }, (_, i) => i + 1);
    const emptyDays = Array.from({ length: firstDayOfMonth }, () => null);

    const handleDateClick = (day) => {
        const selectedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        console.log(`Clicked on Date: ${selectedDate}`);

        const eventOnDate = events.find(e => e.date === selectedDate);
        console.log(`Matched Event for ${selectedDate}:`, eventOnDate);

        setSelectedEvent(eventOnDate || { date: selectedDate, event: 'No Event', bookingPlace: 'N/A', bookingTime: 'N/A' });
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={handlePreviousMonth}>&lt;</button>
                <span>{`${currentDate.toLocaleString('default', { month: 'long' })} ${currentDate.getFullYear()}`}</span>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="days-of-week">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="day-name">{day}</div>
                ))}
            </div>
            <div className="calendar-grid">
                {emptyDays.map((_, index) => (
                    <div key={`empty-${index}`} className="day empty"></div>
                ))}
                {daysArray.map(day => {
                    const dateToCheck = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    console.log(`Rendering Date in Grid: ${dateToCheck}`);

                    const eventOnDate = events.find(e => e.date === dateToCheck);
                    console.log(`Event on Date ${dateToCheck}:`, eventOnDate);

                    return (
                        <div key={day}
                             className={`day ${eventOnDate ? 'approved' : ''}`}
                             onClick={() => handleDateClick(day)}>
                            {day}
                        </div>
                    );
                })}
            </div>
            <div className="event-details">
                {selectedEvent ? (
                    <div>
                        <p><strong>Date:</strong> {selectedEvent.date}</p>
                        <p><strong>Event:</strong> {selectedEvent.event}</p>
                        <p><strong>Place:</strong> {selectedEvent.bookingPlace}</p>
                        <p><strong>Time:</strong> {selectedEvent.bookingTime}</p>
                    </div>
                ) : <p>No event selected</p>}
            </div>
        </div>
    );
};

export default CalendarComponent;
