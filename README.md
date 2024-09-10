# Company Management

## Overview

Company Management is a full-stack web application built using **React** and **Tailwind CSS** for the frontend, and **Django** for the backend, with **PostgreSQL** as the database. The project enables administrators to manage companies, HRs to manage employees, managers to view their department's employees, and employees to view their profiles.

Authentication is handled via **JWT (JSON Web Tokens)**, and custom roles and permissions ensure that only authorized users can access specific views. The application also uses **SMTP** to send email notifications where necessary.

## Features

- **Admin**: 
  - Add and manage companies.
  
- **HR**: 
  - Add and manage employees for the companies.

- **Manager**: 
  - View all employees in their respective departments.
  
- **Employee**: 
  - View their own profile information.

- **Custom Roles and Permissions**:
  - Access is restricted based on roles (Admin, HR, Manager, Employee), ensuring that only permitted users can view or modify specific data.

- **Authentication**:
  - Secure JWT-based authentication system.
  
- **Email Notifications**:
  - Emails are sent using SMTP where necessary.

## Tech Stack

### Frontend:
- **React**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Axios**: Used for making HTTP requests from React to the backend API.

### Backend:
- **Django**: A high-level Python web framework that enables rapid development.
- **Django Rest Framework (DRF)**: Used for building API endpoints.
- **PostgreSQL**: The database used for managing application data.
- **SMTP**: Used for sending email notifications.

### Authentication:
- **JWT (JSON Web Token)**: Used for secure authentication and maintaining user sessions.

Usage
Admin: After logging in, the admin can add and manage company records.
HR: HR users can add employees to the system.
Manager: Managers can view the employees in their department.
Employee: Employees can view and update their profile information.
