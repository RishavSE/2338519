import React, { useEffect, useState } from "react";
import {
  Container,
  Pagination,
  Select,
  MenuItem,
  Box,
  Typography,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  TextField,
  Paper,
  Chip,
} from "@mui/material";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";
import WorkIcon from "@mui/icons-material/Work";

import NotificationCard from "../notificationcard";
import { getNotifications } from "../Services/notificationservice";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [type, setType] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(10);

  useEffect(() => {
    loadData();
  }, [page, limit, type]);

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getNotifications(page, limit, type);

      const items = data.notifications || data || [];

      if (!Array.isArray(items)) {
        throw new Error("Invalid API response format");
      }

      setNotifications(items);

      if (items.length < limit && page === 1) {
        setTotalPages(1);
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const filteredNotifications = notifications.filter((item) =>
    item.Message?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Dashboard Header */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          borderRadius: 4,
          background:
            "linear-gradient(135deg,#0f172a,#1e293b,#334155)",
          color: "white",
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <NotificationsActiveIcon sx={{ fontSize: 40 }} />

          <Box>
            <Typography variant="h3" fontWeight="bold">
              Notification Dashboard
            </Typography>

            <Typography sx={{ opacity: 0.8 }}>
              Manage and monitor all notifications
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Statistics Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(4,1fr)",
          },
          gap: 2,
          mb: 4,
        }}
      >
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            background:
              "linear-gradient(135deg,#2563eb,#3b82f6)",
            color: "white",
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            {notifications.length}
          </Typography>
          <Typography>Total</Typography>
        </Paper>

        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            background:
              "linear-gradient(135deg,#16a34a,#22c55e)",
            color: "white",
          }}
        >
          <WorkIcon />
          <Typography variant="h4" fontWeight="bold">
            {
              notifications.filter(
                (n) => n.Type === "Placement"
              ).length
            }
          </Typography>
          <Typography>Placements</Typography>
        </Paper>

        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            background:
              "linear-gradient(135deg,#f97316,#fb923c)",
            color: "white",
          }}
        >
          <SchoolIcon />
          <Typography variant="h4" fontWeight="bold">
            {
              notifications.filter(
                (n) => n.Type === "Result"
              ).length
            }
          </Typography>
          <Typography>Results</Typography>
        </Paper>

        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            background:
              "linear-gradient(135deg,#9333ea,#a855f7)",
            color: "white",
          }}
        >
          <EventIcon />
          <Typography variant="h4" fontWeight="bold">
            {
              notifications.filter(
                (n) => n.Type === "Event"
              ).length
            }
          </Typography>
          <Typography>Events</Typography>
        </Paper>
      </Box>

      {/* Filters */}
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          mb: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <TextField
            label="Search Notification"
            size="small"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            sx={{ minWidth: 250 }}
          />

          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Type</InputLabel>

            <Select
              value={type}
              label="Type"
              onChange={(e) => {
                setType(e.target.value);
                setPage(1);
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Placement">
                Placement
              </MenuItem>
              <MenuItem value="Result">
                Result
              </MenuItem>
              <MenuItem value="Event">
                Event
              </MenuItem>
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Limit</InputLabel>

            <Select
              value={limit}
              label="Limit"
              onChange={(e) => {
                setLimit(e.target.value);
                setPage(1);
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>

          <Chip
            color="primary"
            label={`${filteredNotifications.length} Notifications`}
          />
        </Box>
      </Paper>

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Loading */}
      {loading && (
        <Box textAlign="center" py={6}>
          <CircularProgress size={50} />
          <Typography mt={2}>
            Loading Notifications...
          </Typography>
        </Box>
      )}

      {/* Notifications */}
      {!loading && (
        <>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((item) => (
              <NotificationCard
                key={item.ID}
                notification={item}
              />
            ))
          ) : (
            <Paper
              sx={{
                p: 6,
                textAlign: "center",
                borderRadius: 4,
              }}
            >
              <Typography variant="h5">
                No Notifications Found
              </Typography>

              <Typography color="text.secondary">
                Try changing filters or search criteria.
              </Typography>
            </Paper>
          )}
        </>
      )}

      {/* Pagination */}
      {!loading &&
        filteredNotifications.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) =>
                setPage(value)
              }
              color="primary"
              size="large"
              shape="rounded"
            />
          </Box>
        )}
    </Container>
  );
};

export default Notifications;