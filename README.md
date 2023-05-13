# Codemon

This project contains an API that manages products, including adding new products, getting all products, getting a product by ID, and updating the price of a product.

## Technologies Used

This project uses the following technologies:

- Node.js
- Express.js
- MongoDB

## Getting Started

To get started with this project, follow the instructions below:

1. Clone the repository to your local machine.
2. Install the required dependencies using the `npm install` command.
3. Create a `.env` file in the root directory of the project and add your MongoDB URI as `MONGO_URL`.
4. Run the server using the `npm start` command.

## API Routes

This project contains the following API routes:

- `POST /api/v1/products`: Adds all product data
- `GET /api/v1/products`: Gets all products
- `GET /api/v1/product/:id`: Gets a product by ID
- `PUT /api/v1/product/:id`: Updates the price of a product by ID

## Controllers

This project contains the following controllers:

- `addDataController`: Adds all product data
- `getAllProductsController`: Gets all products
- `getProductByIdController`: Gets a product by ID
- `UpdatePriceController`: Updates the price of a product by ID

## Models

This project contains a `productModel` model that defines the schema for a product.

## Middlewares

This project contains a `catchAsyncError` middleware that handles asynchronous errors, and an `ErrorHandler` middleware that handles all other errors.

## Contributors

- [Suraj Pattade](https://github.com/solar-flareop)
