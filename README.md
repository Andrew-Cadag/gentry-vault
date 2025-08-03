The Gentry Vault
This project I built to create a full-stack inventory management system for a luxury watch business, Gentry Timepiece. This application is utilized for managing a detailed inventory of high-value timepieces.

--- Features ---
Secure Authentication: Full user registration and login system using JSON Web Tokens (JWT) for secure, session-based access.

Complete Inventory Management (CRUD): Full Create, Read, Update, and Delete functionality for the watch inventory.

Detailed Watch Entries: Each inventory item includes fields for:

Brand & Model

Reference Number

Price (formatted for Philippine Peso)

Condition (Brand New, Mint, Used)

Status (Available, Reserved, Sold) with color-coded display

Image URL with a fallback for missing images

Component-Based Frontend: The user interface is built with React and has been fully refactored into clean, reusable components for maintainability and scalability.

--- What I Used to Build It ---

Frontend: React.js, React Bootstrap

Backend: Node.js, Express.js

Database: MySQL (with XAMPP)

Authentication: JSON Web Tokens (JWT) & bcryptjs for password security

--- Running the Project Locally ---
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js installed on your machine.

XAMPP installed with the Apache and MySQL modules running.

Installation & Setup
Clone the repo

git clone https://github.com/Andrew-Cadag/gentry-vault.git
cd gentry-vault

Backend Setup

Navigate to the server directory: cd server

Install NPM packages: npm install

In phpMyAdmin, create a new database named gentry_vault and run the SQL queries from the project to create the users and watches tables.

Create a .env file in the server directory and add your database credentials and a secure JWT secret:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=gentry_vault
JWT_SECRET=your_super_secure_random_string

Start the server: npm start

Frontend Setup

Open a new terminal and navigate to the client directory: cd client

Install NPM packages: npm install

Start the client: npm start

Using the Application

The application will open on http://localhost:3001.

You will need to register your first user account by sending a POST request to the http://localhost:3000/auth/register endpoint using a tool like Postman.

You can then log in with those credentials on the web interface.

--- My Project Journey ---
This project was a fantastic learning experience. I started by designing a professional file structure and building out the backend API, ensuring all endpoints were secure and efficient. I then developed the React frontend, focusing on core functionality.

The most rewarding part was refactoring the entire frontend from a single App.js file into a clean, component-based architecture. This process made the code much easier to manage and was instrumental in adding the "Edit" feature smoothly. Debugging issues like SQL keyword conflicts and silent frontend failures taught me invaluable lessons about the full-stack development process.


--- Latest Update! (August 1, 2025) ---

Just finished a big UI/UX overhaul using React Bootstrap. I swapped out all the basic HTML for professional components like Cards, Forms, and Badges.

Also updated the fonts to a more luxury-inspired style (Playfair Display & Lato) to better match the business's brand
