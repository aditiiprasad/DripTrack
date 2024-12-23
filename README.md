# DripTrack
Wardrobe Manager


Overview

A full-stack MERN application designed to help users manage their wardrobe efficiently. It allows users to upload photos of their clothes, categorize them manually, track wardrobe usage, and sort items based on usage frequency. Each category is displayed in separate tabs for easier navigation.

Key Features

User Login:

Secure authentication system.

Wardrobe Management:

Users can upload photos of clothing items and categorize them manually (e.g., pants, shirts, winter wear).

Categories are displayed in separate tabs.

Usage Tracking:

Users can notify the app when an item is worn, which increments a usage counter.

Sorting by Usage:

Items can be sorted in ascending or descending order of usage frequency.

Tech Stack

Frontend:

React.js: For building dynamic user interfaces.

Redux: For state management.

Vite: For fast development and optimized builds.

Tailwind CSS: For responsive and modern design.

Backend:

Node.js: Server-side environment.

Express.js: Web framework for building APIs.

MongoDB: Database for storing wardrobe data.

Features Breakdown

1. User Login

Workflow:

Users can create an account or log in using their email and password.

Authentication tokens are used to secure sessions.

Implementation:

Frontend: Form for signup and login.

Backend: Authentication endpoints with JWT tokens.

Database:

Store user credentials securely.

2. Wardrobe Management

Workflow:

Users upload photos of their clothing items.

Manually categorize each item (e.g., shirt, pants, winter wear).

Categories are displayed in separate tabs for easier navigation.

Implementation:

Frontend: Form for uploading photos and selecting categories. Tabs are used to display categories, making it intuitive for users to navigate.

Backend:

API for storing clothing data.

Database:

Store image URLs and associated categories.

3. Usage Tracking

Workflow:

Users notify the app when they wear an item.

The app increments the "times worn" counter for the item.

Display a badge on each item showing usage count.

Implementation:

Frontend: Button to increment usage count for each item.

Backend:

API to update the usage count.

Database:

Track usage count for each item.

4. Sorting by Usage

Workflow:

Users can sort items by the "times worn" count in ascending or descending order.

Sorted results are displayed dynamically within their respective category tabs.

Implementation:

Frontend: Dropdown or toggle for sorting options.

Backend:

API to fetch sorted items from the database.

Database:

Query items by usage count.

System Architecture

Frontend: React application communicating with backend APIs.

Backend: Node.js server exposing REST APIs.

Database: MongoDB for structured wardrobe and user data.

Development Roadmap

Phase 1: Core Features

User Authentication (Signup/Login).

Image Upload and Manual Categorization with Tabs.

Phase 2: Advanced Features

Usage Tracking with Incremental Counter.

Sorting by Usage Count within Tabs.

API Endpoints

Authentication:

POST /api/auth/signup

POST /api/auth/login

Wardrobe:

POST /api/wardrobe/upload

GET /api/wardrobe

PUT /api/wardrobe/:id

DELETE /api/wardrobe/:id

Usage Tracking:

POST /api/wardrobe/:id/wear

Sorting:

GET /api/wardrobe?sort=usage&order=asc

GET /api/wardrobe?sort=usage&order=desc

Database Schema

Users:

{
  "id": "string",
  "name": "string",
  "email": "string",
  "password": "string",
  "wardrobe": ["item_id"]
}

Wardrobe Items:

{
  "id": "string",
  "user_id": "string",
  "image_url": "string",
  "category": "string",
  "times_worn": "number"
}

Deployment

Frontend: Deploy on platforms like Vercel or Netlify.

Backend: Host on AWS, Heroku, or Render.

Database: Use MongoDB Atlas for cloud storage.
