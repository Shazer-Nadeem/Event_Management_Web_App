# Web Application for Event Management

## Project Overview
This project aims to develop a web application for managing various events, including student farewells, performances, menu management, task assignments, and attendance tracking. The application provides functionalities for both students and teachers, allowing them to register, log in, propose performances, manage event menus, assign tasks, create invitations, and track attendance efficiently.

## Table of Contents
1. [Introduction](#introduction)
2. [Project Objectives](#project-objectives)
3. [Technologies Used](#technologies-used)
4. [Features and Functionalities](#features-and-functionalities)
    - [Entity-Relationship Diagram (ERD)](#entity-relationship-diagram-erd)
    - [Relational Schema Diagram](#relational-schema-diagram)
    - [Table Descriptions](#table-descriptions)
5. [Description of the Project](#description-of-the-project)
6. [User Guide](#user-guide)

## Introduction
This section introduces the event management web application and its objectives, as well as the problem it addresses. The application is designed to streamline event organization by providing features for user registration, performance proposals, menu and task management, and attendance tracking.

## Project Objectives
The objectives of this project include:
- Developing a user-friendly web application for event management.
- Enabling user registration and login for students and teachers.
- Providing tools for proposing performances, managing menus, and creating invitations.
- Facilitating task assignments and attendance tracking for coordinated event management.

## Technologies Used
This section highlights the core technologies used to build the web application:
1. **Node.js**: Server-side JavaScript runtime.
2. **Express.js**: Web application framework for building the backend.
3. **MySQL**: Relational database management system.
4. **HTML/CSS**: For building the frontend user interface.
5. **JavaScript**: Enhances interactivity and handles frontend logic.
6. **EJS (Embedded JavaScript)**: Templating engine for rendering dynamic HTML.
7. **npm (Node Package Manager)**: Manages project dependencies.

## Features and Functionalities

### Entity-Relationship Diagram (ERD)
The ERD describes the data structure of the application, representing entities and their relationships. This model was used to design the database.

[ERD Link](https://drive.google.com/file/d/1HNOOk5nAqWVArSrO8FXfANvEaHEw0rft/view?usp=sharing)

[Draw.io File Link](https://drive.google.com/file/d/1fALlcIuVvEmCUii5qk1yp_Yzf1ERjzFg/view?usp=sharing)

### Relational Schema Diagram
The relational schema diagram defines the relationships between different tables, representing how data is structured and organized in the database.

### Table Descriptions
The following tables are used in the database to store data for event management:

- **Students Table**: Stores information about students.
- **Teams Table**: Records team data for different event roles.
- **Menu Table**: Manages the event menu options.
- **Performance Proposal Table**: Tracks submitted performance proposals.
- **Finalized Performance Table**: Records the finalized performances for events.
- **Rehearsal Table**: Manages the schedule for rehearsals.
- **Task Table**: Stores assigned tasks related to menu management and performances.
- **Teacher Table**: Contains information about teachers registered in the system.
- **Family Member Table**: Keeps details of family members for each teacher.
- **Invitation Table**: Stores data for event invitations created by users.
- **Attendance Table**: Records attendance for event participants.
- **Budget Table**: Manages event budget information.

## Description of the Project
This project is a Node.js application built using the Express.js framework. It acts as the backend for a web application that interacts with a MySQL database to handle various event-related functionalities. Here’s a step-by-step overview of how the web app operates:

- **Setting up Dependencies**: Uses npm packages like `Express`, `MySQL`, `Body-parser`, and `Path` to manage HTTP requests, interact with the database, and handle file paths.
- **Express App Configuration**: The app uses middleware to parse JSON and URL-encoded bodies, renders dynamic content using EJS, and serves static files.
- **Database Connection**: Connects to a MySQL database to handle user and event data.
- **User Registration and Login**: Allows users (students or teachers) to register and log in. User data is stored in the MySQL database.
- **Menu Management**: Users can add, view, and remove items from the event menu.
- **Performance Management**: Proposes and finalizes performances, and coordinates rehearsals.
- **Task Assignment**: Facilitates task assignments related to event management.
- **Attendance Tracking**: Allows teachers to mark student attendance during events.
- **Invitation Creation**: Users can create invitations for events and send them to recipients.
- **Error Handling**: Handles errors for database queries and HTTP requests.
- **Server Initialization**: The server listens for incoming requests on a specified port (port 8880).

## User Guide

### User Type Selection Page (`/`)
- **Description**: Users select their type (student or teacher) to proceed.
- **Inputs**: Radio buttons to choose between student and teacher.
- **Actions**: Redirects users to the appropriate login or registration page.

### Student Page (`/student-page`)
- **Description**: Redirects students to their respective login page.

### Teacher Page (`/teacher-page`)
- **Description**: Redirects teachers to the registration page.

### Teacher Registration Page (`/register-teacher`)
- **Description**: Allows teachers to register by providing their name, email, and password.
- **Inputs**:
  - Name: Teacher's name.
  - Email: Teacher's email address.
  - Password: Teacher's password.
  
### Family Member Information Page (`/family-member-info`)
- **Description**: Teachers can enter details about their family members.
  
### Login Page (`/login`)
- **Description**: Enables both students and teachers to log in by entering their name and password.

### Signup Page (`/signup`)
- **Description**: Allows students to sign up by providing their details.

### Menu Management Pages
- **Menu Page (`/menu-page`)**: Redirects to menu management options.
- **Performance Page (`/performance-page`)**: Redirects to performance-related options.
- **Invitation Page (`/invitation-page`)**: Allows users to create and send invitations by filling out the title, body, and recipient information.

---

Thank you for using the Event Management Web Application!
