import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  Tooltip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";

const NotificationCard = ({ notification, isHighPriority }) => {
  const [read, setRead] = useState(() => {
    return localStorage.getItem(`read_${notification.ID}`) === "true";
  });

  const handleToggleRead = () => {
    const newRead = !read;
    setRead(newRead);
    localStorage.setItem(`read_${notification.ID}`, newRead.toString());
  };

  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: "20px",
        overflow: "hidden",
        backdropFilter: "blur(12px)",
        background: read
          ? "rgba(255,255,255,0.03)"
          : "rgba(255,255,255,0.08)",
        border: isHighPriority
          ? "1px solid rgba(255,82,82,0.4)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: isHighPriority
          ? "0 8px 30px rgba(255,82,82,0.15)"
          : "0 8px 25px rgba(0,0,0,0.15)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: isHighPriority
            ? "0 15px 40px rgba(255,82,82,0.25)"
            : "0 15px 35px rgba(0,0,0,0.25)",
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box
            sx={{
              mt: 0.5,
              color: isHighPriority ? "#ff5252" : "#42a5f5",
            }}
          >
            <NotificationsActiveIcon />
          </Box>

          <Box>
            <Box
              display="flex"
              alignItems="center"
              flexWrap="wrap"
              gap={1}
              mb={1}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: read ? "#9e9e9e" : "#fff",
                }}
              >
                {notification.Message}
              </Typography>

              {isHighPriority && (
                <Chip
                  label="🔥 High Priority"
                  color="error"
                  size="small"
                  sx={{
                    fontWeight: 700,
                    borderRadius: "8px",
                  }}
                />
              )}

              <Chip
                label={read ? "Read" : "Unread"}
                color={read ? "success" : "warning"}
                size="small"
                sx={{
                  fontWeight: 600,
                  borderRadius: "8px",
                }}
              />
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: "#bdbdbd",
                mb: 1,
              }}
            >
              {new Date(notification.Timestamp).toLocaleString()}
            </Typography>

            <Chip
              label={notification.Type}
              size="small"
              sx={{
                borderRadius: "8px",
                fontWeight: 600,
                background:
                  "linear-gradient(135deg,#3b82f6,#8b5cf6)",
                color: "white",
              }}
            />
          </Box>
        </Box>

        <Tooltip
          title={read ? "Mark as Unread" : "Mark as Read"}
        >
          <IconButton
            onClick={handleToggleRead}
            sx={{
              background: read
                ? "rgba(76,175,80,0.15)"
                : "rgba(33,150,243,0.15)",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          >
            {read ? (
              <CheckCircleIcon color="success" />
            ) : (
              <RadioButtonUncheckedIcon color="primary" />
            )}
          </IconButton>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;