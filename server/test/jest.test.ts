import mongoose from "mongoose";
import Transaction, { ITransaction } from "../src/models/Transaction";
import db from "../src/services/DatabaseConnection";

describe("Transaction model", () => {
  beforeAll(async () => {
    await db();
  });

  afterEach(async () => {
    await Transaction.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should create and save a transaction successfully", async () => {
    const transactionData: Partial<ITransaction> = {
      id: 1,
      date: new Date(),
      merchant_name: "Amazon",
      amount: 100,
      isBezosRelated: true,
      category: ["Online shopping", "Retail"],
    };

    const transaction = new Transaction(transactionData);
    const savedTransaction = await transaction.save();

    expect(savedTransaction.id).toBeDefined();
    expect(savedTransaction.date).toBeInstanceOf(Date);
    expect(savedTransaction.merchant_name).toBe(transactionData.merchant_name);
    expect(savedTransaction.amount).toBe(transactionData.amount);
    expect(savedTransaction.isBezosRelated).toBe(true);
    expect(savedTransaction.category).toEqual(
      expect.arrayContaining(transactionData.category)
    );
  });

  it("should not save a transaction without required fields", async () => {
    const transactionData: Partial<ITransaction> = {
      id: 1,
      amount: 100,
      isBezosRelated: true,
      category: ["Online shopping", "Retail"],
    };

    const transaction = new Transaction(transactionData);

    await expect(transaction.save()).rejects.toThrow(
      mongoose.Error.ValidationError
    );
  });

  it("should update isBezosRelated field when merchant name is one of Bezos-related merchants", async () => {
    const transactionData: Partial<ITransaction> = {
      id: 1,
      date: new Date(),
      merchant_name: "Amazon",
      amount: 100,
      isBezosRelated: false,
      category: ["Online shopping", "Retail"],
    };

    const transaction = new Transaction(transactionData);
    const savedTransaction = await transaction.save();

    expect(savedTransaction.isBezosRelated).toBe(true);
  });

  it("should not update isBezosRelated field when merchant name is not one of Bezos-related merchants", async () => {
    const transactionData: Partial<ITransaction> = {
      id: 1,
      date: new Date(),
      merchant_name: "Best Buy",
      amount: 100,
      isBezosRelated: false,
      category: ["Electronics", "Retail"],
    };

    const transaction = new Transaction(transactionData);
    const savedTransaction = await transaction.save();

    expect(savedTransaction.isBezosRelated).toBe(false);
  });
});
