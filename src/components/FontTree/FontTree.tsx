import { useState } from "react";
import { placeholderFonts } from "./FontTreeData";

import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Button, Paper } from "@mui/material";
import { minHeight } from "@mui/system";

export const FontTree = () => {
	const [expanded, setExpanded] = useState<string[]>([]);
	const [selected, setSelected] = useState<string[]>([]);

	const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
		setExpanded(nodeIds);
	};

	const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
		setSelected(nodeIds);
	};

	const handleExpandClick = () => {
		setExpanded((oldExpanded) =>
			oldExpanded.length === 0
				? placeholderFonts.children.map((fontFamily, i) => i.toString())
				: []
		);
	};

	const handleSelectClick = () => {
		setSelected((oldSelected) =>
			oldSelected.length === 0
				? placeholderFonts.children.map((fontFamily, i) => i.toString())
				: []
		);
	};
	return (
		<>
			<Paper
				sx={{
					minHeight: "120px",
					padding: "12px",
					display: "flex",
					flexWrap: "wrap",
					gap: "8px",
					flex: 0,
					"& span": {
						padding: "6px",
						bgcolor: "#e1e1e1",
						borderRadius: "4px",
					},
				}}
				elevation={3}
			>
				{selected.map((font) => (
					<span key={font}>{font}</span>
				))}
			</Paper>
			<TreeView
				aria-label="controlled"
				defaultCollapseIcon={<ExpandMoreIcon />}
				defaultExpandIcon={<ChevronRightIcon />}
				expanded={expanded}
				selected={selected}
				onNodeToggle={handleToggle}
				onNodeSelect={handleSelect}
				multiSelect
			>
				{placeholderFonts.children.map((fontFamily, i) => {
					return (
						<TreeItem
							key={`fontTreeFamily_${i}`}
							// nodeId={`${i}`}
							nodeId={`${fontFamily.label}`}
							label={fontFamily.label}
						>
							{fontFamily.children.map((font, j) => {
								return (
									<TreeItem
										key={`fontTreeSubFont_${i}_${j}`}
										// nodeId={`${i}_${j}`}
										nodeId={font.label}
										label={font.label}
									/>
								);
							})}
						</TreeItem>
					);
				})}
			</TreeView>
			<Box sx={{ mb: 1 }}>
				<Button onClick={handleExpandClick}>
					{expanded.length === 0 ? "Expand all" : "Collapse all"}
				</Button>
				<Button onClick={handleSelectClick}>
					{selected.length === 0 ? "Select all" : "Unselect all"}
				</Button>
			</Box>
		</>
	);
};
