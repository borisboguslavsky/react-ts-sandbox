import React from "react";
import { TreeV2NodeData, TreeV2_data } from "./TreeV2_data";

const TreeNodeV2 = ({ node }: { node: TreeV2NodeData }) => {
  return (
    <li>
      <input type="checkbox" />
      {node.name}
      {node.children && node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <TreeNodeV2 node={child} key={child.name} />
          ))}
        </ul>
      )}
    </li>
  );
};

const TreeV2 = () => {
  return (
    <ul>
      {TreeV2_data.map((node) => (
        <TreeNodeV2 node={node} key={node.name} />
      ))}
    </ul>
  );
};

export default TreeV2;
