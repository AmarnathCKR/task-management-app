/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    Container,
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Alert,
    CircularProgress,
} from "@mui/material";
import { Save as SaveIcon } from "@mui/icons-material";
import { createTaskService, type TaskPayload } from "../services/taskServices";

export default function AddTask() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState<TaskPayload>({
        title: "",
        description: "",
        status: "pending",
    });

    const [error, setError] = useState("");

    const createMutation = useMutation({
        mutationFn: (taskData: TaskPayload) => createTaskService(taskData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            navigate("/dashboard");
        },
        onError: (err: any) => {
            setError(err.response?.data?.message || "Failed to create task. Please try again.");
        },
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createMutation.mutate(formData);
    };

    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 3, sm: 5 },
                    borderRadius: 4,
                }}
                className="fade-in"
            >
                <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
                    Create New Task
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} data-testid="add-task-error">
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Task Title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        margin="normal"
                        autoFocus
                        data-testid="task-title-input"
                        sx={{ mb: 3 }}
                        helperText="Enter a clear and concise title for your task"
                    />

                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        margin="normal"
                        multiline
                        rows={6}
                        data-testid="task-description-input"
                        sx={{ mb: 3 }}
                        helperText="Provide detailed information about the task"
                    />

                    <FormControl fullWidth margin="normal" sx={{ mb: 4 }}>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            data-testid="task-status-select"
                        >
                            <MenuItem value="pending" data-testid="status-option-pending">
                                Pending
                            </MenuItem>
                            <MenuItem value="completed" data-testid="status-option-completed">
                                Completed
                            </MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => navigate("/dashboard")}
                            data-testid="cancel-button"
                            sx={{ px: 4 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            startIcon={<SaveIcon />}
                            disabled={createMutation.isPending}
                            data-testid="save-task-button"
                            sx={{ px: 4 }}
                        >
                            {createMutation.isPending ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "Save Task"
                            )}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}
