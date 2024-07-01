"use server";

import fetchInstance from "@/utils/fetchInstance";


const deleteNotifications = async (notificationsId: number) => {
  try {
    await fetchInstance(`notifications/${notificationsId}`, {
      method: "DELETE",
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Delete notifications failed");
    } else {
      throw new Error("Delete notifications failed");
    }
  }
};

export default deleteNotifications;

