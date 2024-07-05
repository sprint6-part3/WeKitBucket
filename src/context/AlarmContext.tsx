"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from "react";

import GetNotificationOptions from "@/apis/notification/getNotifications";
import { IAlarmMessage } from "@/types/alarm";
import deleteNotifications from "@/apis/notification/deleteNotifications";

interface AlarmContextType {
  alarmMessages: IAlarmMessage[];
  getAlarmMessages: () => void;
  removeAlarmMessage: (id: number) => void;
  removeAllMessages: () => void;
}

const AlarmContext = createContext<AlarmContextType>({
  alarmMessages: [],
  getAlarmMessages: () => {},
  removeAlarmMessage: () => {},
  removeAllMessages: () => {},
});

function AlarmProvider({ children }: { children: ReactNode }) {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [alarmMessages, setAlarmMessages] = useState<IAlarmMessage[]>([]);
  const [page, setPage] = useState<number>(1);

  const getAlarmMessages = async () => {
    const { totalCount, list } = await GetNotificationOptions({ page, pageSize: 10 });
    if (list) setAlarmMessages(() => list);
    if (totalCount && totalCount / page > page + 1) setPage(() => page + 1);
    console.log(`${totalCount} ${list} ${alarmMessages}`);
  };

  const removeAlarmMessage = async (id: number) => {
    await deleteNotifications(id);
    setAlarmMessages(alarmMessages.filter(m => m.id !== id));
    console.log(`${id} ${alarmMessages}`);
  };

  const removeAllMessages = () => {
    alarmMessages.forEach(async m => {
      await deleteNotifications(m.id);
    });
    setAlarmMessages(alarmMessages.filter(v => v.id === 0));
  };

  const values = useMemo(
    () => ({ alarmMessages, getAlarmMessages, removeAlarmMessage, removeAllMessages }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [alarmMessages],
  );

  return <AlarmContext.Provider value={values}>{children}</AlarmContext.Provider>;
}

function useAlarm() {
  const context = useContext(AlarmContext);
  if (context === undefined) {
    throw new Error("useAuth는 AuthProvider 안에서 쓰세요");
  }
  return context;
}

export { AlarmProvider, useAlarm };
