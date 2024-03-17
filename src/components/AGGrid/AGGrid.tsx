import { Box, Button, TextField } from "@mui/material";
import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";
import React, { useState } from "react";
import { RowData, dataGridStore } from "./gridStore";

const FAIL_CHANCE = 0.2;

type FetchOptions = {
  guaranteeSuccess?: boolean;
  numberOfRows?: number;
};

const fetchData = async ({
  guaranteeSuccess = false,
  numberOfRows = 5,
}: FetchOptions): Promise<RowData[]> => {
  return new Promise((resolve, reject) => {
    const failChance = Math.random();

    if (guaranteeSuccess === false && failChance < FAIL_CHANCE) {
      reject((reason: string) => "FAILED");
    }

    const mockData: RowData[] = Array(numberOfRows)
      .fill(0)
      .map((_, i) => ({
        col1: (Math.random() * 100).toFixed(2),
        col2: (Math.random() * 100).toFixed(2),
        col3: (Math.random() * 100).toFixed(2),
        col4: (Math.random() * 100).toFixed(2),
        col5: (Math.random() * 100).toFixed(2),
      }));

    resolve(mockData);
  });
};

const AGGrid: React.FC = () => {
  const gridRef = React.useRef<AgGridReact<RowData>>(null);

  // Row Data: The data to be displayed.
  const [rowData, setRowData] = useState<RowData[]>();

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef<RowData, any>[]>([
    { field: "col1", flex: 1, minWidth: 100 },
    { field: "col2", flex: 1, minWidth: 100 },
    { field: "col3", flex: 1, minWidth: 100 },
    { field: "col4", flex: 1, minWidth: 100 },
    { field: "col5", flex: 1, minWidth: 100 },
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

  const onGridReady = (params: GridReadyEvent) => {
    dataGridStore.gridApi = params.api;
  };

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
      <Box
        sx={{
          display: "flex",
          gap: 1,
        }}
      >
        <Button variant={"outlined"} onClick={() => refetchRows({})}>
          Manual Re-Fetch
        </Button>
        <TextField label={"Update Interval"} size="small" />
      </Box>
      <Box height={"350px"}>
        <AgGridReact<RowData>
          ref={gridRef}
          rowData={rowData}
          columnDefs={colDefs}
          onGridReady={onGridReady}
          suppressColumnMoveAnimation={true}
          suppressColumnVirtualisation={true}
          suppressRowVirtualisation={false}
          suppressRowClickSelection={true}
        />
      </Box>
    </Box>
  );
};

export default AGGrid;
