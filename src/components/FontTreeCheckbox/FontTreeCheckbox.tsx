import React from "react";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";
import {
	Button,
	Checkbox,
	FormControlLabel,
	List,
	ListItem,
} from "@mui/material";
import { FontNode } from "./FontTreeData";
import { largeFontSet } from "../FontTree/LargeFontSet";

export default function RecursiveTreeView() {
	const [selected, setSelected] = React.useState<string[]>([]);

	function getChildById(node: FontNode, id: string) {
		let array: string[] = [];

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
		const allNode: string[] = getChildById(nodes, nodes.label);
		let array = checked
			? [...selected, ...allNode]
			: selected.filter((value) => !allNode.includes(value));

		array = array.filter((v, i) => array.indexOf(v) === i);

		setSelected(array);
	}

	const renderTree = (node: FontNode) => {
		const isRoot = node.children && node.index === undefined;
		const isFamily = node.children && node.index !== undefined;
		const isFont = node.family !== undefined;

		// TODO: memoize root node count
		let nodeCount = "";
		if (isRoot && node.children) {
			nodeCount = ` (${node.children.reduce(
				(acc, cur) => acc + cur.children!.length,
				0
			)})`;
		} else if (isFamily) {
			nodeCount = node.children ? ` (${node.children.length})` : "";
		}
		const nodeLabel = `${node.label}${nodeCount}`;

		return (
			<TreeItem
				key={node.label}
				nodeId={node.label}
				label={
					<FormControlLabel
						control={
							<Checkbox
								checked={selected.some((item) => item === node.label)}
								onChange={(event) =>
									getOnChange(event.currentTarget.checked, node)
								}
								onClick={(e) => e.stopPropagation()}
							/>
						}
						label={<>{nodeLabel}</>}
						key={node.label}
					/>
				}
			>
				{Array.isArray(node.children)
					? node.children.map((subNode) => renderTree(subNode))
					: null}
			</TreeItem>
		);
	};

	return (
		<>
			<List
				sx={{
					height: "160px",
					padding: "12px",
					display: "flex",
					flexWrap: "wrap",
					gap: "8px",
					border: "1px solid #bebebe",
					borderRadius: "4px",
					justifyContent: "flex-start",
					alignItems: "flex-start",
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
			<TreeView
				defaultCollapseIcon={<ExpandMoreIcon />}
				defaultExpandIcon={<ChevronRightIcon />}
				sx={{ height: 300, overflowY: "auto" }}
				expanded={["Installed Fonts"]}
			>
				{renderTree(largeFontSet)}
			</TreeView>
		</>
	);
}
