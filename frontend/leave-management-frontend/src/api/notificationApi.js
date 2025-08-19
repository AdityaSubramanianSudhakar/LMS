import api from "../utils/api";

export const getNotificationsByUserId = async (userId) => {
  const response = await api.get(`/notifications/user/${userId}`);
  return response.data;
};

export const getNotificationById = async (id) => {
  const response = await api.get(`/notifications/${id}`);
  return response.data;
};

export const createNotification = async (data) => {
  const response = await api.post("/notifications", data);
  return response.data;
};

export const deleteNotification = async (id) => {
  const response = await api.delete(`/notifications/${id}`);
  return response.data;
};
