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
import { TASK_CONSTANTS } from "../constants/tasksConstants";

export default function EditTask() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<TaskPayload>({
    title: "",
    description: "",
    status: TASK_CONSTANTS.STATUS.PENDING,
  });

  const [error, setError] = useState("");

  const { data: taskData, isLoading } = useQuery({
    queryKey: TASK_CONSTANTS.QUERY_KEYS.TASK(id!),
    queryFn: () => getTaskByIdService(id!),
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: (updatedData: TaskPayload) => updateTaskService(id!, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASK_CONSTANTS.QUERY_KEYS.TASKS });
      navigate(TASK_CONSTANTS.ROUTES.DASHBOARD);
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || TASK_CONSTANTS.EDIT.ERROR);
    },
  });

  useEffect(() => {
    if (taskData) {
      setFormData({
        title: taskData.title || "",
        description: taskData.description || "",
        status: taskData.status?.toLowerCase() || TASK_CONSTANTS.STATUS.PENDING,
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
          {TASK_CONSTANTS.EDIT.PAGE_TITLE}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={TASK_CONSTANTS.LABELS.TITLE}
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            margin="normal"
            autoFocus
            sx={{ mb: 3 }}
            helperText={TASK_CONSTANTS.EDIT.TITLE_HELPER}
          />

          <TextField
            fullWidth
            label={TASK_CONSTANTS.LABELS.DESCRIPTION}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            margin="normal"
            multiline
            rows={6}
            sx={{ mb: 3 }}
            helperText={TASK_CONSTANTS.EDIT.DESC_HELPER}
          />

          <FormControl fullWidth margin="normal" sx={{ mb: 4 }}>
            <InputLabel id="status-label">{TASK_CONSTANTS.LABELS.STATUS}</InputLabel>
            <Select
              labelId="status-label"
              label={TASK_CONSTANTS.LABELS.STATUS}
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <MenuItem value={TASK_CONSTANTS.STATUS.PENDING}>
                {TASK_CONSTANTS.LABELS.STATUS_PENDING}
              </MenuItem>
              <MenuItem value={TASK_CONSTANTS.STATUS.COMPLETED}>
                {TASK_CONSTANTS.LABELS.STATUS_COMPLETED}
              </MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate(TASK_CONSTANTS.ROUTES.DASHBOARD)}
              sx={{ px: 4 }}
            >
              {TASK_CONSTANTS.BUTTONS.CANCEL}
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
                TASK_CONSTANTS.EDIT.BUTTON_SAVE
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
