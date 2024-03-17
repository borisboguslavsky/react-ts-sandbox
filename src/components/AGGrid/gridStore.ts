import { GridApi, RowDataTransaction } from "ag-grid-community";

export type RowData = {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  col5: string;
};

interface IDataGridStore {
  gridApi?: Partial<GridApi<RowData>>;
}

class DataGridStore implements IDataGridStore {
  private api?: GridApi<RowData>;
  private transaction: RowDataTransaction<RowData> = {};

  get gridApi(): GridApi<RowData> | undefined {
    return this.api;
  }

  set gridApi(gridApi: GridApi<RowData> | undefined) {
    this.api = gridApi;
  }
}

export const dataGridStore = new DataGridStore();
