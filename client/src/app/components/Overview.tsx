import React from "react";
import { Chart } from "react-google-charts";
import { Transaction } from "../page";

const Overview = ({ transactions }: { transactions: Transaction[] }) => {
  function calculateBezosSpending(): number {
    const bezosSpending = transactions
      .filter((t) => t.isBezosRelated)
      .reduce((acc, curr) => acc + curr.amount, 0);

    return bezosSpending;
  }

  function calculateNonBezosSpending(): number {
    const nonBezosSpending = transactions
      .filter((t) => !t.isBezosRelated)
      .reduce((acc, curr) => acc + curr.amount, 0);

    return nonBezosSpending;
  }

  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      data={[
        ["Companies", "Money Spended"],
        ["Bezos Related Companies", calculateBezosSpending()],
        ["Others", calculateNonBezosSpending()],
      ]}
      options={{
        title: "Your Spendings Ratio",
      }}
    />
  );
};

export default Overview;
