import { Schema, Document, Model, model } from "mongoose";

// Define transaction schema
export interface ITransaction extends Document {
  id: number;
  date: Date;
  merchant_name: string;
  amount: number;
  isBezosRelated: boolean;
  category: string[];
}

const transactionSchema = new Schema<ITransaction>({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  merchant_name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  isBezosRelated: {
    type: Boolean,
    required: true,
    default: false,
  },
  category: {
    type: [String],
    required: true,
  },
});

// Creating indcies to speed up the process
transactionSchema.index({ id: 1 });
transactionSchema.index({ merchant_name: 1 });

function isBezosMerchant(merchant: string): boolean {
  const bezosMerchants = [
    "Amazon",
    "Washington Post",
    "Whole Foods",
    "Blue Origin",
  ];
  return bezosMerchants.includes(merchant);
}

transactionSchema.pre("save", function (next) {
  this.isBezosRelated = isBezosMerchant(this.merchant_name) ? true : false;
  next();
});

// Define the transaction model
const Transaction: Model<ITransaction> = model(
  "Transaction",
  transactionSchema
);

export default Transaction;
