# Inventory Management App

A simple full-stack inventory management application built with React, Node.js, Express, and PostgreSQL.

## Features
- View all products
- Add new products
- Edit existing products
- Delete products
- Automatic stock status calculation
- Backend validation
- REST API
- PostgreSQL database
- Docker and Docker Compose support

## Technologies
### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express
- PostgreSQL
- pg
- CORS

### DevOps
- Docker
- Docker Compose

## Project Structure
```text
inventory-management-app/
├── backend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── server.js
│   ├── db.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── src/
│   ├── public/
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

## Running the Application with Docker
Make sure Docker Desktop is installed and running.

From the project root directory, run:

docker compose up --build

The application will be available at:

Frontend: http://localhost:5173
Backend API: http://localhost:4000/products
PostgreSQL: localhost:5432

To stop the application, press Ctrl + C in the terminal running Docker Compose.

## API Endpoints
Method	Endpoint	    Description
GET	    /products	    Get all products
POST	/products	    Create a new product
PATCH	/products/:id	Update an existing product
DELETE	/products/:id	Delete a product

## Product Validation
The backend validates product data before creating or updating a product:

- Product name is required.
- Quantity must be 0 or greater.
- Price must be 0 or greater.

The product stock status is calculated automatically based on its quantity:

Quantity	Status
0	        out_of_stock
1–5	        low_stock
6 or more	in_stock

## Docker Services
The application consists of three Docker services:

- frontend — React/Vite application running on port 5173
- backend — Node.js/Express API running on port 4000
- postgres — PostgreSQL database running on port 5432

The backend connects to the PostgreSQL service through the Docker Compose network.

## Stopping the Application
To stop the running containers, press:

`Ctrl + C`

To start the application again:

`docker compose up`

If Dockerfile or Docker Compose configuration has been changed, rebuild the images with:

`docker compose up --build`