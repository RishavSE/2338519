import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Paper,
  Chip,
} from "@mui/material";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { getNotifications } from "../services/notificationService";
import NotificationCard from "./NotificationCard";

const PriorityNotifications = () => {
  const [priority, setPriority] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPriority();
  }, []);

  const loadPriority = async () => {
    try {
      const data = await getNotifications(1, 5);

      const sorted = [...data.notifications]
        .sort((a, b) => b.priority - a.priority)
        .slice(0, 5);

      setPriority(sorted);
    } catch (error) {
      console.error("Failed to load notifications", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: "1000px", mx: "auto", mt: 4 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: "20px",
          background:
            "linear-gradient(135deg, #1e293b, #334155)",
          color: "white",
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <PriorityHighIcon
            sx={{
              fontSize: 35,
              color: "#ff5252",
            }}
          />

          <Box>
            <Typography
              variant="h4"
              fontWeight="bold"
            >
              Top Priority Notifications
            </Typography>

            <Typography variant="body2">
              Important updates requiring attention
            </Typography>
          </Box>

          <Box flexGrow={1} />

          <Chip
            label={`${priority.length} Notifications`}
            color="error"
            sx={{ fontWeight: 600 }}
          />
        </Box>
      </Paper>

      {/* Loading */}
      {loading && (
        <Box textAlign="center" mt={5}>
          <CircularProgress />
        </Box>
      )}

      {/* Empty State */}
      {!loading && priority.length === 0 && (
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: "16px",
          }}
        >
          <Typography variant="h6">
            No Priority Notifications Found
          </Typography>
        </Paper>
      )}

      {/* Notifications */}
      {!loading &&
        priority.map((item) => (
          <NotificationCard
            key={item.ID || item.id}
            notification={item}
            isHighPriority={true}
          />
        ))}
    </Box>
  );
};

export default PriorityNotifications;