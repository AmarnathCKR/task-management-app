import { useState } from "react";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosClient";
import {
  Box,
  Container,
  Alert,
  CircularProgress,
  Pagination,
} from "@mui/material";
import type { RootState } from "../store";
import DashboardHeader from "../components/tasks/DashboardHeader";
import TaskList from "../components/tasks/TaskList";
import DeleteDialog from "../components/tasks/DeleteDialog";

export default function Dashboard() {
  const queryClient = useQueryClient();
  const { user } = useSelector((state: RootState) => state.auth);
  const [page, setPage] = useState(1);
  const [deleteDialog, setDeleteDialog] = useState({
    open: false,
    taskId: null as string | null,
  });
  const pageSize = 9;

  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks", page],
    queryFn: async () => {
      const res = await axiosInstance.get("/tasks", {
        params: { page, limit: pageSize },
      });
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => axiosInstance.delete(`/tasks/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setDeleteDialog({ open: false, taskId: null });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ taskId, status }: { taskId: string; status: string }) =>
      axiosInstance.put(`/tasks/${taskId}`, { status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <DashboardHeader />

        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            Failed to load tasks. Please try again.
          </Alert>
        )}

        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
            <CircularProgress size={60} />
          </Box>
        ) : (
          <TaskList
            tasks={data?.tasks || []}
            onToggleStatus={(task) =>
              updateStatusMutation.mutate({
                taskId: task._id,
                status: task.status === "pending" ? "completed" : "pending",
              })
            }
            onDelete={(id) => setDeleteDialog({ open: true, taskId: id })}
            isAdmin={user?.role === "admin"}
          />
        )}

        {data?.total_pages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Pagination
              count={data.total_pages}
              page={page}
              onChange={(_e, v) => setPage(v)}
              color="primary"
              size="large"
            />
          </Box>
        )}
      </Container>

      <DeleteDialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, taskId: null })}
        onConfirm={() => deleteDialog.taskId && deleteMutation.mutate(deleteDialog.taskId)}
        isLoading={deleteMutation.isPending}
      />
    </Box>
  );
}
