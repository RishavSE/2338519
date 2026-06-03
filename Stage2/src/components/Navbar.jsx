import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Badge,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Bell,
  LayoutDashboard,
  UserCircle2,
} from "lucide-react";

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 1,
        }}
      >
        {/* Logo Section */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <Bell size={30} color="#38bdf8" />

          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              letterSpacing: 1,
              background:
                "linear-gradient(90deg,#38bdf8,#818cf8,#c084fc)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Notification Portal
          </Typography>
        </Box>

        {/* Navigation */}
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            component={Link}
            to="/"
            startIcon={<LayoutDashboard size={18} />}
            sx={{
              color: "white",
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "12px",
              px: 2,
              transition: "0.3s",
              "&:hover": {
                background: "rgba(255,255,255,0.1)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Dashboard
          </Button>

          <Button
            component={Link}
            to="/"
            sx={{
              color: "white",
              minWidth: "auto",
              borderRadius: "50%",
            }}
          >
            <Badge badgeContent={8} color="error">
              <Bell size={22} />
            </Badge>
          </Button>

          <Avatar
            sx={{
              bgcolor: "#38bdf8",
              width: 40,
              height: 40,
              cursor: "pointer",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            <UserCircle2 size={22} />
          </Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;