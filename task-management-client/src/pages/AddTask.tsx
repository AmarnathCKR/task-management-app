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
import { TASK_CONSTANTS } from "../constants/tasksConstants";

export default function AddTask() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<TaskPayload>({
    title: "",
    description: "",
    status: TASK_CONSTANTS.STATUS.PENDING,
  });

  const [error, setError] = useState("");

  const createMutation = useMutation({
    mutationFn: (taskData: TaskPayload) => createTaskService(taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASK_CONSTANTS.QUERY_KEYS.TASKS });
      navigate(TASK_CONSTANTS.ROUTES.DASHBOARD);
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || TASK_CONSTANTS.ADD.ERROR);
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
          {TASK_CONSTANTS.ADD.PAGE_TITLE}
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} data-testid={TASK_CONSTANTS.TEST_IDS.ERROR_ALERT}>
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
            data-testid={TASK_CONSTANTS.TEST_IDS.INPUT_TITLE}
            sx={{ mb: 3 }}
            helperText={TASK_CONSTANTS.ADD.TITLE_HELPER}
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
            data-testid={TASK_CONSTANTS.TEST_IDS.INPUT_DESCRIPTION}
            sx={{ mb: 3 }}
            helperText={TASK_CONSTANTS.ADD.DESC_HELPER}
          />

          <FormControl fullWidth margin="normal" sx={{ mb: 4 }}>
            <InputLabel id="status-label">{TASK_CONSTANTS.LABELS.STATUS}</InputLabel>
            <Select
              labelId="status-label"
              label={TASK_CONSTANTS.LABELS.STATUS}
              name="status"
              value={formData.status}
              onChange={handleChange}
              data-testid={TASK_CONSTANTS.TEST_IDS.SELECT_STATUS}
            >
              <MenuItem value={TASK_CONSTANTS.STATUS.PENDING} data-testid={TASK_CONSTANTS.TEST_IDS.STATUS_PENDING}>
                {TASK_CONSTANTS.LABELS.STATUS_PENDING}
              </MenuItem>
              <MenuItem value={TASK_CONSTANTS.STATUS.COMPLETED} data-testid={TASK_CONSTANTS.TEST_IDS.STATUS_COMPLETED}>
                {TASK_CONSTANTS.LABELS.STATUS_COMPLETED}
              </MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate(TASK_CONSTANTS.ROUTES.DASHBOARD)}
              data-testid={TASK_CONSTANTS.TEST_IDS.BUTTON_CANCEL}
              sx={{ px: 4 }}
            >
              {TASK_CONSTANTS.BUTTONS.CANCEL}
            </Button>
            <Button
              type="submit"
              variant="contained"
              size="large"
              startIcon={<SaveIcon />}
              disabled={createMutation.isPending}
              data-testid={TASK_CONSTANTS.TEST_IDS.BUTTON_SAVE}
              sx={{ px: 4 }}
            >
              {createMutation.isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                TASK_CONSTANTS.ADD.BUTTON_SAVE
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
