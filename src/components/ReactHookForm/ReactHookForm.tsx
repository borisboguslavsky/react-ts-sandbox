import { TextField, Autocomplete, Checkbox, Button, Box, Chip } from "@mui/material"
import { useForm, Controller } from "react-hook-form";

interface FormValues {
	firstName: string;
	lastName: string;
  autocomplete: string[]
}

export const ReactHookForm = () => {
	const { handleSubmit, control } = useForm<FormValues>();

	const onSubmitFormHandler = (data: any) => {
		console.log(data);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmitFormHandler)}
			style={{
				display: "flex",
				flexDirection: "column",
				gap: "1rem",
			}}
		>
			<Controller
				name="firstName"
				control={control}
				defaultValue="Someone"
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<TextField
						label="First Name"
						value={value}
						onChange={onChange}
						InputLabelProps={{ shrink: true }}
					/>
				)}
			/>
			<Controller
				name="lastName"
				control={control}
				defaultValue="Someonerson"
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<TextField
						label="Last Name"
						value={value}
						onChange={onChange}
						InputLabelProps={{ shrink: true }}
					/>
				)}
			/>
			<Controller
				name="autocomplete"
				control={control}
				defaultValue={['A', 'B']}
				render={({ field: { onChange, value }, fieldState: { error } }) => (
					<Autocomplete
						multiple
						disablePortal
						autoHighlight
						options={["A", "B", "C"]}
						value={value}
						onChange={(event, newValue) => {
							onChange(newValue)
						}}
						renderInput={(params) => {
							return <TextField
								{...params}
								InputLabelProps={{ shrink: true }}
								label="Autocomplete"
								placeholder={'Select Values...'}
							/>
						}}
						renderTags={(value: readonly string[], getTagProps) => {
							return value.map((option: string, index: number) => {
								return <Chip
									variant={'filled'}
									label={option}
									{...getTagProps({index})}
								/>
							})
						}}
						renderOption={(props, option, state) => {
							return <li {...props}>
								<Checkbox checked={state.selected} />
								{option}
							</li>
						}}
					/>
				)}
			/>
			<Box sx={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
				<Button variant="outlined" onClick={() => console.log("Clear Form")}>
					Clear
				</Button>
				<Button type="submit" variant="contained">
					Submit
				</Button>
			</Box>
		</form>
	)
}

export default ReactHookForm