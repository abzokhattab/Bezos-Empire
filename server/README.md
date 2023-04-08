# Bezos App

This is a simple Node.js application built using Express and MongoDB to demonstrate basic CRUD operations. The app allows you to view a list of `transactions` and update the `isBezosRelated` field of a transaction.

## Getting Started

To get started with this app, you'll need to follow these steps:

1.  Clone this repository

2.  Install the 0dependencies using `npm install`

3.  Create a `.env` file in the root directory with the following contents:
    `MONGODB_URI=mongodb://localhost:27017/bezos
PORT=3000`
4.  Seed the database with some data by running the following command:
    `npm run seed`

5.  Start the server by running the following command:
    `npm start
`
6.  Open your browser and go to `http://localhost:3000/api/transactions`

## API Endpoints

The following endpoints are available in this app:

### GET /api/transactions

This endpoint returns a list of all transactions in the database.

### POST /api/transactions/:id

This endpoint allows you to update the `isBezosRelated` field of a transaction. You need to provide the `id` of the transaction in the URL and the new value of `isBezosRelated` in the request body.

## Code Structure

The code is organized into the following directories:

- `init`: Contains a script to seed the database with some sample data.
- `src`: Contains the main application code.
  - `models`: Contains the Mongoose schema definition for the `Transaction` model.
  - `routes`: Contains the API endpoints.
  - `services`: Contains the code to establish a connection with the MongoDB database.
  - `index.ts`: The main entry point of the application.

## Contributing

If you find any issues or have suggestions for improvement, please feel free to open an issue or submit a pull request.

</div>
