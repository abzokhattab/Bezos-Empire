import express, { Request, Response } from "express";
import Transaction, { ITransaction } from "../models/Transaction";

const router = express.Router();

router.get("/transactions", async (req: Request, res: Response) => {
  try {
    const transactions: ITransaction[] = await Transaction.find();

    res.json({
      transactions,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/transactions/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isBezosRelated } = req.body;

  try {
    // Find the transaction by ID
    const transaction: ITransaction = await Transaction.findOne({ id });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await Transaction.updateMany(
      { merchant_name: transaction.merchant_name },
      { isBezosRelated }
    );

    res.json({ message: "Transaction updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
