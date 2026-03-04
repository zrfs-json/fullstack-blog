# Fullstack Blog App

This is a fullstack blog application built using **React** on the
frontend and **Express** on the backend.\
It features a rich text editor (React Quill), article creation &
editing, and a REST API powered by Express and Sequelize.

------------------------------------------------------------------------

## Tech Stack

### Frontend

-   React.js\
-   React Router\
-   Axios\
-   React Quill\
-   Tailwind CSS

### Backend

-   Node.js\
-   Express.js\
-   Sequelize ORM\
-   MySQL\
-   dotenv

------------------------------------------------------------------------

## Project Structure

    fullstack-blog/
    ├── frontend/     # React client
    ├── backend/      # Express API server
    ├── README.md

------------------------------------------------------------------------

## Requirements

Make sure you have installed:

-   Node.js\
-   npm\
-   MySQL

Create a `.env` file inside the `backend` folder:

    DB_HOST=localhost
    DB_USER=root
    DB_PASS=yourpassword
    DB_NAME=blog_db
    PORT=3000

------------------------------------------------------------------------

## Installation

### Clone Repository

    git clone https://github.com/zrfs-json/fullstack-blog.git
    cd fullstack-blog

### Install Backend

    cd backend
    npm install

### Install Frontend

    cd ../frontend
    npm install

------------------------------------------------------------------------

## Running the App

### Start Backend

    cd backend
    npm run dev

Backend runs at: http://localhost:3000

### Start Frontend

    cd frontend
    npm run dev

Frontend runs at: http://localhost:5173

------------------------------------------------------------------------

## Features

-   Create, Read, Update, Delete articles\
-   Rich text editor using React Quill\
-   Auto image generation via Picsum\
-   Default likes & timestamps from backend\
-   REST API architecture

------------------------------------------------------------------------

## Future Improvements

-   Authentication system\
-   Draft & publish system\
-   Tags & categories\
-   Deployment setup

------------------------------------------------------------------------

Built for learning and portfolio purposes.
