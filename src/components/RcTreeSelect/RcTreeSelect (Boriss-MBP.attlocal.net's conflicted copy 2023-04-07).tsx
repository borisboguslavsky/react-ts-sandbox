import TreeSelect, { SHOW_PARENT } from "rc-tree-select";
import { placeholderFonts } from "../FontTree/FontTreeData";

const testData = {
	label: "1",
	value: 1,
	children: [
		{
			label: "2",
			value: 2,
		},
		{
			label: "3",
			value: 3,
		},
		{
			label: "4",
			value: 4,
		},
	],
};

export const RcTreeSelect = () => {
	return (
		<>
			<TreeSelect
				treeCheckable
				showSearch
				allowClear
				treeData={testData}
				showCheckedStrategy={SHOW_PARENT}
			/>
		</>
	);
};
