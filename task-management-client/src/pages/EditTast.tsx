/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import {
    getTaskByIdService,
    updateTaskService,
    type TaskPayload,
} from "../services/taskServices";

export default function EditTask() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState<TaskPayload>({
        title: "",
        description: "",
        status: "pending",
    });

    const [error, setError] = useState("");

    const { data: taskData, isLoading } = useQuery({
        queryKey: ["task", id],
        queryFn: () => getTaskByIdService(id!),
        enabled: !!id,
    });

    const updateMutation = useMutation({
        mutationFn: (updatedData: TaskPayload) => updateTaskService(id!, updatedData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks"] });
            navigate("/dashboard");
        },
        onError: (err: any) => {
            setError(err.response?.data?.message || "Failed to update task. Please try again.");
        },
    });

    useEffect(() => {
        if (taskData) {
            setFormData({
                title: taskData.title || "",
                description: taskData.description || "",
                status: taskData.status?.toLowerCase() || "pending",
            });
        }
    }, [taskData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError("");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateMutation.mutate(formData);
    };

    if (isLoading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
                <CircularProgress />
            </Box>
        );
    }

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
                    Edit Task
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
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
                        sx={{ mb: 3 }}
                        helperText="Edit the task title"
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
                        sx={{ mb: 3 }}
                        helperText="Update task details"
                    />

                    <FormControl fullWidth margin="normal" sx={{ mb: 4 }}>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            label="Status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="completed">Completed</MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => navigate("/dashboard")}
                            sx={{ px: 4 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            startIcon={<SaveIcon />}
                            disabled={updateMutation.isPending}
                            sx={{ px: 4 }}
                        >
                            {updateMutation.isPending ? (
                                <CircularProgress size={24} color="inherit" />
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}
