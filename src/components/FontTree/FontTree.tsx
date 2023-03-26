import { placeholderFonts } from "./FontTreeData";

import TreeView from "@mui/lab/TreeView";
import TreeItem from "@mui/lab/TreeItem";

const data = placeholderFonts;

export const FontTree = () => {
	return (
		<TreeView>
			{placeholderFonts.children.map((fontFamily, i) => {
				return fontFamily.children.map((font, j) => {
					return <TreeItem nodeId={`${i}_${j}`} label={font.label} />;
				});
			})}
		</TreeView>
	);
};
