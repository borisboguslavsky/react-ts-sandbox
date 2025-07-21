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
            alignItems: "center",
            marginBottom: "1rem",
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
              <QuestionMarkIcon sx={{ opacity: 0.625 }} />
            </Button>
          )}
        </Box>
        {description &&
          showDescription &&
          (typeof description === "string" ? (
            <Typography variant="body2" sx={{ marginBottom: "2rem" }}>
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
            gap: "1rem",
          }}
        >
          {component()}
        </Box>
      </Paper>
    </Grid>
  );
};

export default Applet;
