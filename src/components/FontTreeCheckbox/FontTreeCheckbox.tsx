import React from "react";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Checkbox, FormControlLabel } from "@mui/material";
import { RenderTree, data } from "./sampleData";

export default function RecursiveTreeView() {
	const [selected, setSelected] = React.useState<string[]>([]);

	function getChildById(node: RenderTree, id: string) {
		let array: string[] = [];

		function getAllChild(nodes: RenderTree | null) {
			if (nodes === null) return [];
			array.push(nodes.id);
			if (Array.isArray(nodes.children)) {
				nodes.children.forEach((node) => {
					array = [...array, ...getAllChild(node)];
					array = array.filter((v, i) => array.indexOf(v) === i);
				});
			}
			return array;
		}

		function getNodeById(nodes: RenderTree, id: string) {
			if (nodes.id === id) {
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

	function getOnChange(checked: boolean, nodes: RenderTree) {
		const allNode: string[] = getChildById(data, nodes.id);
		let array = checked
			? [...selected, ...allNode]
			: selected.filter((value) => !allNode.includes(value));

		array = array.filter((v, i) => array.indexOf(v) === i);

		setSelected(array);
	}

	const renderTree = (nodes: RenderTree) => (
		<TreeItem
			key={nodes.id}
			nodeId={nodes.id}
			label={
				<FormControlLabel
					control={
						<Checkbox
							checked={selected.some((item) => item === nodes.id)}
							onChange={(event) =>
								getOnChange(event.currentTarget.checked, nodes)
							}
							onClick={(e) => e.stopPropagation()}
						/>
					}
					label={<>{nodes.name}</>}
					key={nodes.id}
				/>
			}
		>
			{Array.isArray(nodes.children)
				? nodes.children.map((node) => renderTree(node))
				: null}
		</TreeItem>
	);

	return (
		<TreeView
			defaultCollapseIcon={<ExpandMoreIcon />}
			defaultExpanded={["0", "3", "4"]}
			defaultExpandIcon={<ChevronRightIcon />}
		>
			{renderTree(data)}
		</TreeView>
	);
}
