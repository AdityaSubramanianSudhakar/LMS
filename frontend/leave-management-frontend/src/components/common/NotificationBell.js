import React, { useEffect, useState } from "react";
import { getNotificationsByUser } from "../../api/notificationApi";
import { isLoggedIn, getToken } from "../../utils/auth";

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchNotifications = async () => {
    if (!isLoggedIn()) return;
    try {
      const res = await getNotificationsByUser(getToken());
      setNotifications(res.data);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="notification-bell" style={{ position: "relative" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        🔔
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              background: "red",
              borderRadius: "50%",
              color: "white",
              fontSize: "0.7rem",
              padding: "2px 5px",
            }}
          >
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <div
          className="notification-dropdown"
          style={{
            position: "absolute",
            right: 0,
            marginTop: "0.5rem",
            background: "white",
            border: "1px solid #ccc",
            borderRadius: "4px",
            width: "250px",
            maxHeight: "300px",
            overflowY: "auto",
            zIndex: 100,
          }}
        >
          {notifications.length === 0 && (
            <div style={{ padding: "10px" }}>No notifications</div>
          )}
          {notifications.map((n) => (
            <div
              key={n.id}
              style={{
                padding: "10px",
                backgroundColor: n.read ? "white" : "#eef",
                borderBottom: "1px solid #ddd",
              }}
            >
              <div>{n.message}</div>
              <small>{new Date(n.timestamp).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
