// export interface FontFamily {
// 	label: string;
// 	name: string[];
// 	index: number;
// 	children: FontSingle[];
// }

// export interface FontSingle {
// 	label: string;
// 	name: string;
// 	family: string;
// 	index: number;
// 	parent: number;
// }

export interface FontNode {
	label: string;
	name: string | string[];
	index: number;
	children?: FontNode[];
	family?: string;
	parent?: number;
}

export const placeholderFonts: FontNode[] = [
	{
		label: "Adobe Caslon Pro",
		children: [
			{
				label: "Adobe Caslon Pro Bold",
				name: "ACaslonPro-Bold",
				family: "Adobe Caslon Pro",
				index: 0,
				parent: 0,
			},
			{
				label: "Adobe Caslon Pro Bold Italic",
				name: "ACaslonPro-BoldItalic",
				family: "Adobe Caslon Pro",
				index: 1,
				parent: 0,
			},
			{
				label: "Adobe Caslon Pro Italic",
				name: "ACaslonPro-Italic",
				family: "Adobe Caslon Pro",
				index: 2,
				parent: 0,
			},
		],
		name: ["ACaslonPro-Bold", "ACaslonPro-BoldItalic", "ACaslonPro-Italic"],
		index: 0,
	},
	{
		label: "Marlett",
		children: [
			{
				label: "Marlett Regular",
				name: "Marlett",
				family: "Marlett",
				index: 0,
				parent: 11,
			},
		],
		name: ["Marlett"],
		index: 11,
	},
	{
		label: "Yu Gothic UI",
		children: [
			{
				label: "Yu Gothic UI Bold",
				name: "YuGothicUI-Bold",
				family: "Yu Gothic UI",
				index: 0,
				parent: 21,
			},
			{
				label: "Yu Gothic UI Light",
				name: "YuGothicUI-Light",
				family: "Yu Gothic UI",
				index: 1,
				parent: 21,
			},
			{
				label: "Yu Gothic UI Regular",
				name: "YuGothicUI-Regular",
				family: "Yu Gothic UI",
				index: 2,
				parent: 21,
			},
		],
		name: ["YuGothicUI-Bold", "YuGothicUI-Light", "YuGothicUI-Regular"],
		index: 21,
	},
];
