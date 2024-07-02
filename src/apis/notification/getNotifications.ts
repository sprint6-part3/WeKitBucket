import fetchInstance from "@/utils/fetchInstance";

interface RequestNotifications {
  list?: unknown[];
  totalCount?: number;
}
// 자유게시판 페이지
const getNotifications = async (options: { page?: number; pageSize?: number }) => {
  try {
    const data = await fetchInstance<RequestNotifications>(`notifications?${options}`, {
      method: "GET",
    });

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message || "Notifications list failed");
    } else {
      throw new Error("Notifications list failed");
    }
  }
};

export default getNotifications;
