
export const TASK_CONSTANTS = {

  QUERY_KEYS: {
    TASKS: ["tasks"],
    TASK: (id: string) => ["task", id],
  },
  ROUTES: {
    DASHBOARD: "/dashboard",
  },
  STATUS: {
    PENDING: "pending" as const,
    COMPLETED: "completed" as const,
  },

  ADD: {
    PAGE_TITLE: "Create New Task",
    TITLE_HELPER: "Enter a clear and concise title for your task",
    DESC_HELPER: "Provide detailed information about the task",
    BUTTON_SAVE: "Save Task",
    ERROR: "Failed to create task. Please try again.",
  },

  EDIT: {
    PAGE_TITLE: "Edit Task",
    TITLE_HELPER: "Edit the task title",
    DESC_HELPER: "Update task details",
    BUTTON_SAVE: "Save Changes",
    ERROR: "Failed to update task. Please try again.",
  },
  LABELS: {
    TITLE: "Task Title",
    DESCRIPTION: "Description",
    STATUS: "Status",
    STATUS_PENDING: "Pending",
    STATUS_COMPLETED: "Completed",
  },
  BUTTONS: {
    CANCEL: "Cancel",
  },
  TEST_IDS: {
    ERROR_ALERT: "add-task-error",
    INPUT_TITLE: "task-title-input",
    INPUT_DESCRIPTION: "task-description-input",
    SELECT_STATUS: "task-status-select",
    STATUS_PENDING: "status-option-pending",
    STATUS_COMPLETED: "status-option-completed",
    BUTTON_CANCEL: "cancel-button",
    BUTTON_SAVE: "save-task-button",
  },
};
