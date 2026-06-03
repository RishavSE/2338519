const API_URL = "http://4.224.186.213/evaluation-service/notifications";

export const getNotifications = async (page = 1, limit = 10, type = "") => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzaGl2YXZlcm1hMzIxMS5hQGdtYWlsLmNvbSIsImV4cCI6MTc4MDQ4MTQwMCwiaWF0IjoxNzgwNDgwNTAwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYjVkNjQ2MGYtZDZjZS00ZTNjLWJhNDItMGUwMzJkMTIzZTc2IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2hpdmEgdmVybWEiLCJzdWIiOiJmZWNiMmViYy03N2I4LTRmNDgtYTM3Yi03OGM0ZTVkM2M4NGMifSwiZW1haWwiOiJzaGl2YXZlcm1hMzIxMS5hQGdtYWlsLmNvbSIsIm5hbWUiOiJzaGl2YSB2ZXJtYSIsInJvbGxObyI6IjIzMzg1MzgiLCJhY2Nlc3NDb2RlIjoibnd3c0t4IiwiY2xpZW50SUQiOiJmZWNiMmViYy03N2I4LTRmNDgtYTM3Yi03OGM0ZTVkM2M4NGMiLCJjbGllbnRTZWNyZXQiOiJDdmNxVnp1cWptbVdIZFZYIn0.8h4iSgMpb1xDha2QkGYp5tRoZcZtaBhosKAEsLHKyWo";

  const params = new URLSearchParams({
    page,
    limit,
  });

  if (type) {
    params.append("notification_type", type);
  }

  const response = await fetch(`${API_URL}?${params.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return response.json();
};