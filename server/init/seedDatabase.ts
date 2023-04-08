require("dotenv").config();

import Transaction, { ITransaction } from "../src/models/Transaction";
import db from "../src/services/DatabaseConnection";

db();

const seedData: ITransaction[] = require("./files/transactions.json");

// Save seed data to MongoDB
Transaction.create(seedData)
  .then(() => {
    console.log("Seed data loaded successfully");
    process.exit(0);
  })
  .catch((err: Error) => {
    console.error("Error loading seed data:", err);
    process.exit(1);
  });
