export const ROUTES = {
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  DASHBOARD: '/dashboard',
  ADD_TASK: '/add-task',
  EDIT_TASK: '/edit-task/:taskId',
  ROOT: '/',
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
