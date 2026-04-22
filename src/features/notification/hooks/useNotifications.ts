// Hook for managing notification state.
import { useState } from "react";
import { initialNotifications } from "../data/notifications";
import type { NotificationFilter } from "../types";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState<NotificationFilter>("all");

  const filtered = notifications.filter((n) =>
    activeTab === "all" ? true : n.type === activeTab,
  );

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  return {
    notifications,
    filtered,
    activeTab,
    setActiveTab,
    markAsRead,
  };
};
