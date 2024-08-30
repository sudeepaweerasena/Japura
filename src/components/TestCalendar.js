import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

const TestCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchApprovedEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/approved-events');
        const approvedEvents = response.data.map(event => ({
          title: event.event,
          start: event.eventDate,
          id: event.reqID,
          place: event.bookingPlace,
          time: event.bookingTime,
        }));
        setEvents(approvedEvents);
      } catch (error) {
        console.error('Error fetching approved events:', error);
      }
    };

    fetchApprovedEvents();
  }, []);

  const handleDateClick = (arg) => {
    const event = events.find(e => e.start === arg.dateStr);
    if (event) {
      setSelectedEvent(event);
    } else {
      setSelectedEvent(null);
    }
  };

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        dateClick={handleDateClick}
      />
      {selectedEvent ? (
        <div className="event-details">
          <h3>Booking Details:</h3>
          <p><strong>Date:</strong> {selectedEvent.start}</p>
          <p><strong>Event:</strong> {selectedEvent.title}</p>
          <p><strong>Place:</strong> {selectedEvent.place}</p>
          <p><strong>Time:</strong> {selectedEvent.time}</p>
        </div>
      ) : (
        <div className="no-event-selected">
          <p>Click on a date to see the booking details.</p>
        </div>
      )}
    </div>
  );
};

export default TestCalendar;
