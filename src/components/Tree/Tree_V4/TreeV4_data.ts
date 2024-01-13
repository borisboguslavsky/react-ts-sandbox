import { TreeData } from "react-dropdown-tree-select";

export const TreeV4_data: TreeData = {
  label: "root",
  value: "root",
  expanded: true,
  children: [
    {
      label: "a",
      value: "a",
      children: [
        {
          label: "a_1",
          value: "a_1",
        },
        {
          label: "a_2",
          value: "a_2",
        },
      ],
    },
    {
      label: "b",
      value: "b",
      children: [
        {
          label: "b_1",
          value: "b_1",
        },
        {
          label: "b_2",
          value: "b_2",
        },
      ],
    },
    {
      label: "c",
      value: "c",
    },
  ],
};
