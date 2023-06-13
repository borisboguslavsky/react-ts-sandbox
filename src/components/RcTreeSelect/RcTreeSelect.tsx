import TreeSelect, { SHOW_PARENT, TreeNode } from "rc-tree-select";
import { placeholderFonts } from "../FontTree/FontTreeData";
import { useState } from "react";

type FontTreeNode = {
	label: string;
	value: string;
	children?: FontTreeNode[];
};

const testData: FontTreeNode[] = [
	{
		label: "something",
		value: "something",
		children: [{ label: "subfont", value: "subfont" }],
	},
	{
		label: "another thing",
		value: "another thing",
		children: [{ label: "font 2", value: "font 2" }],
	},
];

export const RcTreeSelect = () => {
	const [tsOpen, setTsOpen] = useState(false);
	const [visible, setVisible] = useState(false);
	const [searchValue, setSearchValue] = useState("0-0-0-label");
	const [value, setValue] = useState("0-0-0-value1");
	const [lv, setLv] = useState({ value: "0-0-0-value", label: "spe label" });
	const [multipleValue, setMultipleValue] = useState([]);
	const [simpleSearchValue, setSimpleSearchValue] = useState("test111");

	const [treeData, setTreeData] = useState([
		{ key: 1, pId: 0, label: "test1", value: "test1" },
		{ key: 121, pId: 0, label: "test2", value: "test2" },
		{ key: 11, pId: 1, label: "test11", value: "test11" },
		{ key: 12, pId: 1, label: "test12", value: "test12" },
		{ key: 111, pId: 11, label: "test111", value: "test111" },
	]);

	const onDropdownVisibleChange = (visible: boolean) => {
		console.log(visible, value);
		if (Array.isArray(value) && value.length > 1 && value.length < 3) {
			window.alert("please select more than two item or less than one item.");
			return false;
		}
		return true;
	};

	const onChange = ({ value, ...rest }) => {
		console.log("onChange", value, ...rest);
		setValue({ value });
	};

	const onSelect = (...args) => {
		// use onChange instead
		console.log(args);
	};

	return (
		<div style={{ backgroundColor: "grey" }}>
			<TreeSelect
				open
				allowClear
				className="check-select"
				transitionName="rc-tree-select-dropdown-slide-up"
				choiceTransitionName="rc-tree-select-selection__choice-zoom"
				style={{ width: 300 }}
				// dropdownStyle={{ height: 200, overflow: 'auto' }}
				dropdownPopupAlign={{
					overflow: { adjustY: 0, adjustX: 0 },
					offset: [0, 2],
				}}
				onDropdownVisibleChange={onDropdownVisibleChange}
				placeholder={<i>Chinese Bullshit</i>}
				treeLine
				maxTagTextLength={10}
				value={value}
				autoClearSearchValue
				treeData={treeData}
				treeNodeFilterProp="title"
				treeCheckable
				showCheckedStrategy={SHOW_PARENT}
				onChange={onChange}
				onSelect={onSelect}
				maxTagCount="responsive"
				maxTagPlaceholder={(valueList) => {
					// console.log('Max Tag Rest Value:', valueList);
					return `${valueList.length} rest...`;
				}}
			/>
		</div>
	);
};
