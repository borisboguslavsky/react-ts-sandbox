import DropdownTreeSelect, { DropdownTreeSelectProps } from "react-dropdown-tree-select";
import { TreeV4_data } from "./TreeV4_data";

const TreeV4 = () => {
  const onChange: DropdownTreeSelectProps["onChange"] = (currentNode, selectedNodes) => {
    console.log("onChange::", currentNode, selectedNodes);
  };
  const onAction: DropdownTreeSelectProps["onAction"] = (node, action) => {
    console.log("onAction::", action, node);
  };
  const onNodeToggle: DropdownTreeSelectProps["onNodeToggle"] = (currentNode) => {
    console.log("onNodeToggle::", currentNode);
  };

  return (
    <DropdownTreeSelect
      data={TreeV4_data}
      onChange={onChange}
      // onAction={onAction}
      // onNodeToggle={onNodeToggle}
      // inlineSearchInput={true}
      // showPartiallySelected={true}
      // disablePoppingOnBackspace={true}
      // keepOpenOnSelect={true}
      // keepChildrenOnSearch={true}
      // keepTreeOnSearch={true}
      // showDropdown={"always"}
    />
  );
};

export default TreeV4;
