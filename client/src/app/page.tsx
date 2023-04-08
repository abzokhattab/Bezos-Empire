"use client"; // this is a client component
import * as React from "react";

import axios from "axios";
import StickyHeadTable from "./components/Table";
import { useEffect, useState } from "react";
import Overview from "./components/Overview";
import ResponsiveAppBar from "./components/NavBar";
import CircularIndeterminate from "./components/Loading";

export interface Transaction {
  id: number;
  date: string;
  merchant_name: string;
  amount: number;
  isBezosRelated: boolean;
  category: string[];
}

export default function Home() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3005/api/transactions`)
      .then((response) => {
        setTransactions(response.data.transactions);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleBezosRelatedClick = React.useCallback(
    (transactionId: number, merchantName: string, isBezosRelated: boolean) =>
      () => {
        axios
          .post(`http://localhost:3005/api/transactions/${transactionId}`, {
            isBezosRelated,
          })
          .then((response) => {
            // update all transactions with the same merchant name
            const updatedMerchantTransactions = transactions.map(
              (transaction) =>
                transaction.merchant_name === merchantName
                  ? {
                      ...transaction,
                      isBezosRelated,
                    }
                  : transaction
            );
            setTransactions(updatedMerchantTransactions);
          })
          .catch((error) => {
            console.error(error);
          });
      },
    [transactions]
  );

  return transactions.length === 0 ? (
    <CircularIndeterminate />
  ) : (
    <div>
      <ResponsiveAppBar />
      <div
        style={{
          backgroundColor: "#f0f0f0",
          padding: "1rem",
          marginTop: "1rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            color: "#333",
            marginBottom: "1rem",
            textDecoration: "underline",
          }}
        >
          Transaction Table
        </h2>
        <StickyHeadTable
          transactions={transactions}
          handleBezosRelatedClick={handleBezosRelatedClick}
        />
        <br></br>
        <h2
          style={{
            fontSize: "1.5rem",
            color: "#333",
            marginBottom: "1rem",
            textDecoration: "underline",
          }}
        >
          Transaction Overview
        </h2>
        <Overview transactions={transactions} />
      </div>
    </div>
  );
}
