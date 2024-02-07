import { Box, Button } from "@mui/material";
import { ColDef, GridApi } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";

const FAIL_CHANCE = 0.5;

type RowData = {
  make: string;
  model: string;
  price: number;
  electric: boolean;
};

type FetchOptions = {
  guaranteeSuccess?: boolean;
};

const fetchData = async ({ guaranteeSuccess = false }: FetchOptions): Promise<RowData[]> => {
  return new Promise((resolve, reject) => {
    const failChance = Math.random();
    if (guaranteeSuccess === false && failChance < FAIL_CHANCE) {
      reject("FAILED");
    }
    resolve([
      { make: "Tesla", model: "Model Y", price: 64950, electric: true },
      { make: "Ford", model: "F-Series", price: 33850, electric: false },
      { make: "Toyota", model: "Corolla", price: 29600, electric: false },
      { make: "Mazda", model: "CX-5", price: 29945, electric: false },
      { make: "Honda", model: "CRV", price: 27500, electric: false },
    ]);
  });
};

const AGGrid: React.FC = () => {
  const gridRef = React.useRef<AgGridReact<RowData>>(null);

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<RowData[]>();

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState<ColDef<RowData, any>[]>([
    { field: "make", flex: 1, minWidth: 150, suppressSizeToFit: true },
    { field: "model", flex: 1, minWidth: 150, suppressSizeToFit: true },
    { field: "price", flex: 1, minWidth: 150, suppressSizeToFit: true },
    { field: "electric", flex: 1, minWidth: 150, suppressSizeToFit: true },
  ]);

  const refetchRows = (fetchOptions?: FetchOptions) => {
    fetchData(fetchOptions || {})
      .then((d) => setRowData(d))
      .catch((e) => {
        console.log(e);
        setRowData([]);
      });
  };

  React.useEffect(() => {
    refetchRows({
      guaranteeSuccess: true,
    });
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        gap: 1,
      }}
      className={"ag-theme-quartz"}
    >
      <Button variant={"outlined"} onClick={() => refetchRows({})}>
        Fetch
      </Button>
      <Box height={"350px"}>
        <AgGridReact<RowData> ref={gridRef} rowData={rowData} columnDefs={colDefs} />
      </Box>
    </Box>
  );
};

export default AGGrid;
