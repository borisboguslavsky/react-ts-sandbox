import React, { useState } from "react";

import classes from "./Tree.module.css";

export interface TreeNode {
	name: string,
	children?: TreeNode[]
}

let DUMMY_DATA = {name: 'root', children: [
  {name: "node_modules", children: [
    {name: "subfolder", children: [
      {name: "subfile.3dr"},
      {name: "logfile.log"},  
    ]},
    {name: "other_file.txt"},
    {name: "last_file.exe"},
  ]},
  {name: "public", children: [
    {name: "index.html"},
    {name: "index.css"},
  ]},
  {name: "src", children: [
    {name: "components", children: [
      {name: "Tree.tsx"},
      {name: "Tree.module.css"},
    ]},
    {name: "Header.tsx"},
    {name: "Header.module.css"},
  ]},
  {name: "README.md"},
]}

const Node: React.FC<{node: TreeNode}> = (props) => {

	const [showChildren, setShowChildren] = useState<boolean>(false);

	const nodeCLickHandler = (event: React.MouseEvent): void => {
		event.stopPropagation()
		setShowChildren(bool => !bool)
	}

	const css = `${classes.node} ${props.node.children ? classes.folder : classes.file}`

	return(
		<li className={css} onClick={nodeCLickHandler}>
			<span>
				{props.node.children && !showChildren && '▶ '}
				{props.node.children && showChildren && '▼ '}
				{props.node.name}
			</span>
			{props.node.children && showChildren && 
				<ul style={{paddingLeft: "1rem"}}>
					{props.node.children!.map((child, index) => {
						return(
							<Node key={`${props.node.name}_${index}`} node={child} />
						)
					})}
				</ul>
			}
		</li>
	)
}

const Tree: React.FC = () => {
	return (
		<div>
			<ul className={classes.tree}>
				{<Node node={DUMMY_DATA} />}
			</ul>
		</div>
	);
};

export default Tree;
