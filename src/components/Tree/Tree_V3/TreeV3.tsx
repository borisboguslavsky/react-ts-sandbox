import React from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import { TreeView } from "@mui/x-tree-view/TreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Box, Button, Checkbox, FormControlLabel, List, ListItem } from "@mui/material";
import { largeFontSet } from "./TreeV3_data";

export interface FontNode {
  label: string;
  name: string | string[];
  index: number;
  children?: FontNode[];
  family?: string;
  parent?: number;
}

/**
 * Reference CodeSandboxes:
 * https://codesandbox.io/s/treeview-with-styled-checkboxes-gi4rm?file=/src/App.tsx
 * https://codesandbox.io/s/strange-euclid-ywcjxt?file=/src/App.js
 */
const TreeV3 = () => {
  const [selected, setSelected] = React.useState<string[]>([]);

  //node is always the root "Parent"
  //id is id of node clicked
  function getChildById(node: FontNode, id: string) {
    let array: string[] = [];

    //returns an array of nodes ids: clicked node id and all children node ids
    function getAllChild(nodes: FontNode | null) {
      if (nodes === null) return [];
      array.push(nodes.label);
      if (Array.isArray(nodes.children)) {
        nodes.children.forEach((node) => {
          array = [...array, ...getAllChild(node)];
          array = array.filter((v, i) => array.indexOf(v) === i);
        });
      }
      return array;
    }

    //returns the node object that was selected
    function getNodeById(nodes: FontNode, id: string) {
      if (nodes.label === id) {
        return nodes;
      } else if (Array.isArray(nodes.children)) {
        let result = null;
        nodes.children.forEach((node) => {
          if (!!getNodeById(node, id)) {
            result = getNodeById(node, id);
          }
        });
        return result;
      }

      return null;
    }

    return getAllChild(getNodeById(node, id));
  }

  function getOnChange(checked: boolean, nodes: FontNode) {
    //gets all freshly selected or unselected nodes
    const allNode: string[] = getChildById(nodes, nodes.label);
    //combines newly selected nodes with existing selection
    //or filters out newly deselected nodes from existing selection
    let array = checked
      ? [...selected, ...allNode]
      : selected.filter((value) => !allNode.includes(value));

    setSelected(array);
  }

  const RenderTreeWithCheckboxes = (node: FontNode) => {
    return (
      <TreeItem
        key={node.label}
        nodeId={node.label}
        label={
          <FormControlLabel
            control={
              <Checkbox
                checked={selected.some((item) => item === node.label)}
                onChange={(event) => getOnChange(event.currentTarget.checked, node)}
                // onClick={(e) => e.stopPropagation()}
              />
            }
            label={<>{node.label}</>}
            key={node.label}
          />
        }
      >
        {Array.isArray(node.children)
          ? node.children.map((subNode) => RenderTreeWithCheckboxes(subNode))
          : null}
      </TreeItem>
    );
  };

  return (
    <Box>
      <Box
        sx={{
          minHeight: "200px",
          maxHeight: "200px",
          border: "1px solid #bebebe",
          borderRadius: "4px",
          borderBottomLeftRadius: "0px",
          borderBottomRightRadius: "0px",
          overflowY: "auto",
          padding: "12px",
        }}
      >
        <List
          sx={{
            padding: "0px",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            overflowY: "auto",
          }}
        >
          {selected.map((font) => (
            <ListItem
              key={font}
              sx={{
                padding: "0px",
                paddingLeft: "4px",
                bgcolor: "#e1e1e1",
                borderRadius: "4px",
                width: "inherit",
                display: "flex",
                gap: "4px",
              }}
            >
              {font}
              <Button sx={{ minWidth: "inherit" }} size={"small"}>
                <CloseIcon />
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box
        sx={{
          minHeight: "200px",
          maxHeight: "200px",
          border: "1px solid #bebebe",
          borderTop: "none",
          borderRadius: "4px",
          borderTopLeftRadius: "0px",
          borderTopRightRadius: "0px",
          overflowY: "auto",
          padding: "0px",
        }}
      >
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ overflowY: "auto" }}
          expanded={["Installed Fonts"]}
        >
          {RenderTreeWithCheckboxes(largeFontSet)}
        </TreeView>
      </Box>
    </Box>
  );
};

export default TreeV3;
