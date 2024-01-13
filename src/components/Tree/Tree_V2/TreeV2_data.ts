export type TreeV2NodeData = {
  name: string;
  parent: string | null;
  expanded: boolean;
  selected: boolean;
  children?: TreeV2NodeData[];
};

export const TreeV2_data: TreeV2NodeData[] = [
  {
    name: "root",
    parent: null,
    expanded: false,
    selected: false,
    children: [
      {
        name: "a",
        parent: "root",
        expanded: false,
        selected: false,
        children: [
          { name: "a1", parent: "a", expanded: false, selected: false },
          {
            name: "a2",
            parent: "a",
            expanded: false,
            selected: false,
            children: [
              { name: "a2a", parent: "a2", expanded: false, selected: false },
              {
                name: "a2b",
                parent: "a2",
                expanded: false,
                selected: false,
                children: [
                  { name: "a2b1", parent: "a2b", expanded: false, selected: false },
                  { name: "a2b2", parent: "a2b", expanded: false, selected: false },
                ],
              },
            ],
          },
          { name: "a3", parent: "a", expanded: false, selected: false },
        ],
      },
      {
        name: "b",
        parent: "root",
        expanded: false,
        selected: false,
        children: [
          {
            name: "b1",
            parent: "b",
            expanded: false,
            selected: false,
            children: [
              { name: "b1a", parent: "b1", expanded: false, selected: false },
              { name: "b1b", parent: "b1", expanded: false, selected: false },
              { name: "b1c", parent: "b1", expanded: false, selected: false },
              { name: "b1d", parent: "b1", expanded: false, selected: false },
            ],
          },
          {
            name: "b2",
            parent: "b",
            expanded: false,
            selected: false,
            children: [
              { name: "b2a", parent: "b2", expanded: false, selected: false },
              { name: "b2b", parent: "b2", expanded: false, selected: false },
            ],
          },
          {
            name: "b3",
            parent: "b",
            expanded: false,
            selected: false,
            children: [
              { name: "b3a", parent: "b3", expanded: false, selected: false },
              { name: "b3b", parent: "b3", expanded: false, selected: false },
              { name: "b3c", parent: "b3", expanded: false, selected: false },
            ],
          },
        ],
      },
    ],
  },
];
