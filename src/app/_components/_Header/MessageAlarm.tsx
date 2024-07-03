"use client";

import React, { Dispatch, SetStateAction, useEffect } from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import { useAlarm } from "@/context/AlarmContext";
import Alarm from "@/assets/icons/alarmIcon.svg";
import NoAlarmMessage from "./NoAlarmMessage";

dayjs.locale("ko");
dayjs.extend(relativeTime);

export default function MessageAlarm({
  toggle,
  setToggle,
}: {
  toggle: boolean;
  setToggle: Dispatch<SetStateAction<boolean[]>>;
}) {
  const { alarmMessages, getAlarmMessages, removeAlarmMessage, removeAllMessages } = useAlarm();
  const toggleDropdown = () => {
    setToggle([!toggle, false]);
  };

  useEffect(() => {
    getAlarmMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative">
      <button onClick={toggleDropdown} aria-label="Alarm Button" className="relative flex">
        {alarmMessages.length > 0 && (
          <div className="absolute bottom-auto top-[1%] h-[16px] w-[16px] rounded-[50%] bg-[red] text-center text-[8px] leading-[16px] text-[white]">
            {alarmMessages.length}
          </div>
        )}
        <Alarm width={32} height={32} />
      </button>
      {toggle && (
        <ul
          style={{ zIndex: 3 }}
          className="absolute right-[-170%] top-[150%] flex w-[368px] max-w-[30em] flex-col gap-y-5 rounded-2xl bg-primary-gray-100 px-[1.5em] py-[1.125em] text-[1.25em] shadow-[0_0.125rem_0.5rem_rgba(0,0,0,0.3),0_0.0625rem_0.125rem_rgba(0,0,0,0.2)] before:absolute before:bottom-full before:right-[60px] before:h-0 before:w-0 before:border-[0.75rem] before:border-solid before:border-transparent before:border-b-primary-gray-100 before:border-t-[none] before:drop-shadow-[0_-0.0625rem_0.0625rem_rgba(0,0,0,0.1)]"
        >
          <div className="space-between flex pb-[10px]">
            <h3 className="flex flex-1 justify-start text-xl font-bold leading-7 text-primary-black-200">{`알림 ${alarmMessages.length}개`}</h3>
            {alarmMessages.length > 0 && (
              <button onClickCapture={removeAllMessages} className="text-xl font-bold leading-7 text-primary-black-200">
                X
              </button>
            )}
          </div>
          {alarmMessages.length > 0 ? (
            <>
              {alarmMessages.map(m => (
                <li
                  key={m.id}
                  className="flex flex-col rounded-[8px] bg-white p-5 shadow-[0_0.125rem_0.5rem_rgba(0,0,0,0.3),0_0.0625rem_0.125rem_rgba(0,0,0,0.2)]"
                >
                  <button
                    onClickCapture={() => {
                      removeAlarmMessage(m.id);
                    }}
                    className="flex justify-end text-primary-gray-900"
                  >
                    X
                  </button>
                  <div className="flex flex-col items-start justify-stretch text-left">
                    <h3 className="flex max-w-[250px] flex-1 text-sm font-normal leading-6 text-primary-black-100">
                      {m.content}
                    </h3>
                    <h3 className="text-sm font-normal leading-6 text-primary-black-100 text-primary-gray-800">
                      {dayjs(m.createdAt).fromNow(false)}
                    </h3>
                  </div>
                </li>
              ))}
            </>
          ) : (
            <NoAlarmMessage />
          )}
        </ul>
      )}
    </div>
  );
}
