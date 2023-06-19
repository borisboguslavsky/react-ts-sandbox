import {
	Box,
	Button,
	ToggleButtonGroup,
	ToggleButton,
	TextareaAutosize,
	FormLabel,
	TextField,
	CircularProgress,
} from "@mui/material";
import React from "react";
import {
	useQuery,
	useQueryClient,
	QueryClient,
	QueryClientProvider,
} from "react-query";

const BASE_URL = "https://swapi.dev/api";

const queryClient = new QueryClient();

const useStarWarsApi = (queryArg: QueryArg, number: number) => {
	return useQuery({
		queryKey: ["posts"],
		queryFn: async () => {
			await setTimeout(async () => {}, 1000);
			const URL = `${BASE_URL}/${queryArg}/${number}`;
			console.log(URL);
			const data = await fetch(URL);
			const json = await data.json();
			return json;
		},
		enabled: false,
	});
};

type QueryArg =
	| "films"
	| "people"
	| "planets"
	| "species"
	| "starships"
	| "vehicles";

const TanstackQuery = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<UI />
		</QueryClientProvider>
	);
};

export const UI = () => {
	const [queryArg, setQueryArg] = React.useState<QueryArg>("people");
	const [id, setId] = React.useState<number>(1);
	const { data, error, status, refetch } = useStarWarsApi(queryArg, id);

	return (
		<Box sx={{ display: "flex", flexDirection: "column", gap: "12px" }}>
			<Box
				sx={{ display: "flex", gap: "12px", justifyContent: "space-between" }}
			>
				<TextField
					type="number"
					label="id"
					value={id}
					size="small"
					onChange={(e) => setId(Number(e.target.value))}
					InputLabelProps={{ shrink: true }}
					sx={{ flex: 1 }}
				/>
				<Button variant="contained" sx={{ flex: 1 }} onClick={() => refetch()}>
					Fetch
				</Button>
			</Box>
			<Box>
				<ToggleButtonGroup
					value={queryArg}
					exclusive
					fullWidth
					size="small"
					onChange={(_event, newArg) => {
						setQueryArg(newArg);
					}}
				>
					<ToggleButton sx={{ borderBottomLeftRadius: 0 }} value="films">
						Films
					</ToggleButton>
					<ToggleButton value="people">People</ToggleButton>
					<ToggleButton sx={{ borderBottomRightRadius: 0 }} value="planets">
						Planets
					</ToggleButton>
				</ToggleButtonGroup>
				<ToggleButtonGroup
					value={queryArg}
					exclusive
					fullWidth
					size="small"
					sx={{ marginTop: "-1px" }}
					onChange={(_event, newArg) => {
						setQueryArg(newArg);
					}}
				>
					<ToggleButton sx={{ borderTopLeftRadius: 0 }} value="species">
						Species
					</ToggleButton>
					<ToggleButton value="starships">Starships</ToggleButton>
					<ToggleButton sx={{ borderTopRightRadius: 0 }} value="vehicles">
						Vehicles
					</ToggleButton>
				</ToggleButtonGroup>
			</Box>
			<FormLabel>Status:</FormLabel>
			<TextareaAutosize
				readOnly={true}
				value={status}
				minRows={1}
				style={{ padding: "8px" }}
			/>
			<FormLabel>Result:</FormLabel>
			{status === "loading" ? (
				<CircularProgress />
			) : (
				<TextareaAutosize
					readOnly={true}
					value={JSON.stringify(error ? error : data, null, 2)}
					minRows={20}
					maxRows={20}
					style={{ padding: "8px" }}
				/>
			)}
		</Box>
	);
};

export default TanstackQuery;
