import { Paper, Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useState } from "react";

type AppletProps = {
  title: string;
  description?: string | React.ReactNode;
  component: () => JSX.Element;
};

const Applet = ({ title, description, component }: AppletProps) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper
        elevation={3}
        sx={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 2,
          }}
        >
          <Typography variant="h5">{title}</Typography>
          {description && (
            <Button
              onClick={() => setShowDescription((bool) => !bool)}
              sx={{
                minWidth: "unset",
                padding: "4px",
                border: `1px solid rgba(0, 0, 0, 0.125)`,
              }}
            >
              <QuestionMarkIcon />
            </Button>
          )}
        </Box>
        {description &&
          showDescription &&
          (typeof description === "string" ? (
            <Typography variant="caption" sx={{ marginBottom: 2 }}>
              {description}
            </Typography>
          ) : (
            description
          ))}
        <Box
          sx={{
            marginTop: "0.5rem",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {component()}
        </Box>
      </Paper>
    </Grid>
  );
};

export default Applet;
