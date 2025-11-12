import { Box, Typography, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export default function DashboardHeader() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 4,
      }}
    >
      <Box>
        <Typography variant="h6" fontWeight={700}>
          My Tasks
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage and organize your daily work efficiently
        </Typography>
      </Box>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        size="large"
        onClick={() => navigate(ROUTES.ADD_TASK)}
      >
        Add Task
      </Button>
    </Box>
  );
}
