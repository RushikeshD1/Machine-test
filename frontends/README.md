# Product and Category Master App

## Overview

This is a full-stack application built to manage products and categories in an e-commerce platform. The frontend is developed using Angular, the backend is powered by Node.js (Express), and MySQL is used as the database. This application provides functionalities to create, read, update, and delete products and categories.

- The **Category** feature allows managing different categories (e.g., electronics, clothing, etc.).
- The **Product** feature allows managing products and associates them with categories. When creating a product, you can pass a category name to associate it with an existing category.

---

## Technologies Used

- **Frontend**: Angular
- **Backend**: Node.js with Express.js
- **Database**: MySQL
- **Tools**: Postman (for API testing), npm, Angular CLI

---

## Features

- **Category Management**:CRUD operations for managing categories (Create, Read, Update, Delete).
- **Product Management**:
    -CRUD operations for managing products.
    -Products are linked to categories via the Category Name.
    -Products display Product ID, Product Name, Category ID, and Category Name.
-**Server-side Pagination**:
    -The product list supports pagination, fetching only a subset of products per page (e.g., 10 per page).
    -Pagination works efficiently by querying only the required records for the current page (e.g., fetching products from 90 to 100 on page 9).
-**Dynamic Category-Product Relationship**:
    -When creating a product, the category can be passed by name, and the system will automatically map it to the correct Category ID.
    -Ensures that products are always associated with the correct category.

---
