/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/axiosClient';

import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Chip,
  IconButton,
  Pagination,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle,
  RadioButtonUnchecked,
} from '@mui/icons-material';
import { format } from 'date-fns';
import type { RootState } from '../store';
import { ROUTES } from '../constants/routes';

export default function Dashboard() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useSelector((state: RootState) => state.auth);
  const [page, setPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean, taskId: string | null }>({ open: false, taskId: null });
  const pageSize = 9;


  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks', page],
    queryFn: async () => {
      const response = await axiosInstance.get('/tasks', {
        params: { page, limit: pageSize },
      });
      return response.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (taskId: string) => {
      await axiosInstance.delete(`/tasks/${taskId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setDeleteDialog({ open: false, taskId: null });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ taskId, status }: { taskId: string; status: string }) => {
      const response = await axiosInstance.put(`/tasks/${taskId}`, { status });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const handleDelete = (taskId: string) => {
    setDeleteDialog({ open: true, taskId });
  };

  const confirmDelete = () => {
    if (deleteDialog.taskId) {
      deleteMutation.mutate(deleteDialog.taskId);
    }
  };

  const toggleStatus = (task: any) => {
    const newStatus = task.status === 'pending' ? 'completed' : 'pending';
    updateStatusMutation.mutate({ taskId: task._id, status: newStatus });
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      {/* Top AppBar */}

      {/* Page Body */}
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
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

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            Failed to load tasks. Please try again.
          </Alert>
        )}

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress size={60} />
          </Box>
        ) : data?.tasks?.length === 0 ? (
          <Box
            sx={{
              textAlign: 'center',
              py: 10,
              bgcolor: 'background.paper',
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
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate(ROUTES.ADD_TASK)}>
              Create Task
            </Button>
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {data?.tasks?.map((task: any) => (
                <Grid size={{ xs: 1, sm: 6, md: 4 }} key={task._id}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      bgcolor: 'background.paper',
                      borderRadius: 3,
                      boxShadow: 1,
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant="h6"
                          fontWeight={600}
                          sx={{
                            textDecoration: task.status === 'completed' ? 'line-through' : 'none',
                            opacity: task.status === 'completed' ? 0.6 : 1,
                            wordBreak: 'break-word',
                          }}
                        >
                          {task.title}
                        </Typography>
                        <IconButton size="small" onClick={() => toggleStatus(task)}>
                          {task.status === 'completed' ? (
                            <CheckCircle color="success" />
                          ) : (
                            <RadioButtonUnchecked color="action" />
                          )}
                        </IconButton>
                      </Box>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {task.description}
                      </Typography>

                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          label={task.status === 'pending' ? 'Pending' : 'Completed'}
                          color={task.status === 'pending' ? 'warning' : 'success'}
                          size="small"
                        />
                        <Chip
                          label={format(new Date(task.createdAt), 'MMM dd, yyyy')}
                          variant="outlined"
                          size="small"
                        />
                      </Box>
                    </CardContent>

                    <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => navigate(`${ROUTES.EDIT_TASK}/${task._id}`)}
                      >
                        Edit
                      </Button>
                      {user?.role === 'admin' && (
                        <Button
                          size="small"
                          color="error"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(task._id)}
                        >
                          Delete
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {data?.total_pages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <Pagination
                  count={data.total_pages}
                  page={page}
                  onChange={(_e, value) => setPage(value)}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </>
        )}
      </Container>

      {/* Delete Confirmation */}
      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, taskId: null })}>
        <DialogTitle>Delete Task</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this task? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, taskId: null })}>
            Cancel
          </Button>
          <Button
            onClick={confirmDelete}
            color="error"
            variant="contained"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? <CircularProgress size={20} /> : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box >
  );
}
