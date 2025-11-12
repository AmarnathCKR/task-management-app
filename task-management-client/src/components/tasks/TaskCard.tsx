/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  IconButton,
  Button,
} from "@mui/material";
import {
  CheckCircle,
  RadioButtonUnchecked,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

interface TaskCardProps {
  task: any;
  onToggleStatus: (task: any) => void;
  onDelete: (id: string) => void;
  isAdmin: boolean;
}

export default function TaskCard({
  task,
  onToggleStatus,
  onDelete,
  isAdmin,
}: TaskCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: 1,
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={600}
            sx={{
              textDecoration: task.status === "completed" ? "line-through" : "none",
              opacity: task.status === "completed" ? 0.6 : 1,
              wordBreak: "break-word",
            }}
          >
            {task.title}
          </Typography>
          <IconButton size="small" onClick={() => onToggleStatus(task)}>
            {task.status === "completed" ? (
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
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {task.description}
        </Typography>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Chip
            label={task.status === "pending" ? "Pending" : "Completed"}
            color={task.status === "pending" ? "warning" : "success"}
            size="small"
          />
          <Chip
            label={format(new Date(task.createdAt), "MMM dd, yyyy")}
            variant="outlined"
            size="small"
          />
        </Box>
      </CardContent>

      <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button
          size="small"
          startIcon={<EditIcon />}
          onClick={() => navigate(`${ROUTES.EDIT_TASK}/${task._id}`)}
        >
          Edit
        </Button>
        {isAdmin && (
          <Button
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => onDelete(task._id)}
          >
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
