# Event Management System

This is a web-based event management system that allows organizers to create, manage, and track events, while attendees can register, provide feedback, and rate events. The system includes various features such as authentication, event registration, feedback submission, and organizer dashboards.

## Features

### For Organizers:
1. **Create and Manage Events:**
   - Organizers can create new events with details such as title, date, time, location, and category.
   - Events are categorized as workshops, seminars, social gatherings, or other types of events.

2. **View Registered Attendees:**
   - Organizers can view the list of attendees for each event along with their dietary preferences and number of attendees.
   
3. **Manage Event Registrations:**
   - Organizers can edit or delete events they have created.

4. **View Feedback:**
   - Organizers can view feedback and ratings provided by attendees for each event.

### For Attendees:
1. **Register for Events:**
   - Attendees can RSVP for events by providing their dietary preferences and number of attendees.
   
2. **Update or Cancel RSVP:**
   - Attendees can update their RSVP details or cancel their registration.

3. **Submit Feedback and Rating:**
   - After attending an event, attendees can submit feedback and rate the event on a scale of 1 to 5.
   
4. **View Feedback:**
   - Once feedback is submitted, it is displayed on the attendee page for that event.

### Additional Features:
- **Email Notifications:**
   - Attendees receive confirmation emails after registering for an event.
   - Automated reminders are sent to attendees a week and a day before the event using `cron` jobs.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Frontend:** EJS (Embedded JavaScript Templates)
- **Database:** Sequelize ORM (with MySQL or PostgreSQL)
- **Session Management:** Express-Session
- **File Uploads:** Multer
- **Email Notifications:** Nodemailer
- **Task Scheduling:** Node-Cron

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sahilkkc01/Project
   cd event-management-system
