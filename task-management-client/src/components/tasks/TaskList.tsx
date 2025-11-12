/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Box, Typography, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import TaskCard from "./TaskCard";
import { ROUTES } from "../../constants/routes";

interface TaskListProps {
    tasks: any[];
    onToggleStatus: (task: any) => void;
    onDelete: (id: string) => void;
    isAdmin: boolean;
}

export default function TaskList({
    tasks,
    onToggleStatus,
    onDelete,
    isAdmin,
}: TaskListProps) {
    const navigate = useNavigate();

    if (tasks.length === 0) {
        return (
            <Box
                sx={{
                    textAlign: "center",
                    py: 10,
                    bgcolor: "background.paper",
                    borderRadius: 3,
                    boxShadow: 1,
                }}
            >
                <Typography variant="h6" gutterBottom color="text.secondary">
                    No tasks yet
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Create your first task to get started
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => navigate(ROUTES.ADD_TASK)}
                >
                    Create Task
                </Button>
            </Box>
        );
    }

    return (
        <Grid container spacing={3}>
            {tasks.map((task) => (
                <Grid container size={{ xs: 12, sm: 6, md: 4, }} key={task._id}>
                    <TaskCard
                        task={task}
                        onToggleStatus={onToggleStatus}
                        onDelete={onDelete}
                        isAdmin={isAdmin}
                    />
                </Grid>
            ))}
        </Grid>
    );
}
