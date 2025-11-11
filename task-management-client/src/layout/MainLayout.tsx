import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";

const MainLayout = () => {
  const themeCtx = useThemeContext();
  if (!themeCtx) return null;

  const { mode, toggleTheme } = themeCtx;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{
          borderBottom: "1px solid",
          borderColor: "divider",
          px: 2,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Task Manager
          </Typography>

          <IconButton onClick={toggleTheme} color="inherit">
            {mode === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Render nested route content here */}
      <Box sx={{ p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
