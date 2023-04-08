import * as React from "react";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { Transaction } from "../page";

export default function Table({
  transactions,
  handleBezosRelatedClick,
}: {
  transactions: Transaction[];
  handleBezosRelatedClick: any;
}) {
  type Row = typeof transactions[number];

  const columns = React.useMemo<GridColDef<Row>[]>(
    () => [
      { field: "date", headerName: "Date", flex: 1 },
      { field: "merchant_name", headerName: "Merchant", flex: 1 },
      { field: "category", headerName: "Category", flex: 1 },

      {
        field: "amount",
        headerName: "Amount",
        flex: 1,
      },
      {
        field: "isBezosRelated",
        headerName: "IsBezosCompany",
        flex: 1,
        type: "boolean",
      },
      {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        flex: 1,
        width: 80,
        getActions: (params) => [
          <GridActionsCellItem
            label="Mark as Bezos-related"
            onClick={handleBezosRelatedClick(
              params.row.id,
              params.row.merchant_name,
              true
            )}
            showInMenu
          />,
          <GridActionsCellItem
            label="Unmark as Bezos-related"
            onClick={handleBezosRelatedClick(
              params.row.id,
              params.row.merchant_name,
              false
            )}
            showInMenu
          />,
        ],
      },
    ],
    [handleBezosRelatedClick]
  );

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid rows={transactions} columns={columns} />
    </div>
  );
}
