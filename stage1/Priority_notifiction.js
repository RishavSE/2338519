const PRIORITY_WEIGHT = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

function getPriorityScore(notification) {
  return PRIORITY_WEIGHT[notification.Type] || 0;
}

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNTc0MzQOL CJpYXQi0jE3NDM1NzQwNDQsImlzcyI6IkFmZm9yZG11ZCIsImp@aSI6ImQ5Y2JiNjk5LTZhMjctNDRh NS04ZDU5LThiMWJlZmE4MTZkYSIsInN1YiI6InJhbWtyaXNobmFAYWJjLmVkdSJ9LCJ1bWFpbCI6InJ hbWtyaXNobmFAYWJjLmVkdSIsIm5hbWUiOiJyYW0ga3Jpc2huYSIsInJvbGxObyI6ImFhMWJiIiwiYW NjZXNzQ29kZSI6InhnQXNOQyIsImNsaWVudElEIjoiZDljYmI2OTktNmEyNyOONGE1LThkNTktOGIXY mVmYTgxNmRhIiwiY2xpZW50U2VjcmV0IjoidFZKYWFhUkJTZVhjU1h1TSJ9.YApD98gq0IN_OWw7JMf muUfK1m4hLTm7AIcLDCLAzVg";
export async function getTopNotifications() {
  try {
    const response = await fetch(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      },
    );

    const responseData = await response.json();
    const notifications = responseData.notifications || responseData;
console.log("responseData =", responseData);
console.log("notifications =", notifications);
console.log("Is Array =", Array.isArray(notifications));
    const topNotifications = notifications
    .sort((a, b) => {
      const weightDiff = getPriorityScore(b) - getPriorityScore(a);
      
      if (weightDiff !== 0) return weightDiff;
      
      return new Date(b.Timestamp) - new Date(a.Timestamp);
    })
    .slice(0, 10);
    console.log(topNotifications);
  } catch (error) {
    console.error(
      "Error fetching notifications:",
      error.response?.data || error.message,
    );
  }
}

getTopNotifications();
