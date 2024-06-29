"use client";

import React, { useState } from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";

import Alarm from "@/assets/icons/alarmIcon.svg";

dayjs.locale("ko");
dayjs.extend(relativeTime);

/** 더미 데이터 시작 */
const pushAlarm = {
  totalCount: 2,
  list: [
    {
      createdAt: "2024-06-27T17:54:16.963Z",
      content: "민재님 지금 뭐하세요?",
      id: 1,
    },
    {
      createdAt: "2024-06-27T17:54:16.963Z",
      content: "예하님 지금 뭐하세요?",
      id: 2,
    },
  ],
};
/** 더미 데이터 끝 */

export default function MessageAlarm() {
  const [messages, setMessages] = useState(pushAlarm.list);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const removeMessage = (id: number) => {
    // e.stopPropagation();
    setMessages(messages.filter(m => m.id !== id));
  };

  const removeAllMessage = () => {
    // e.stopPropagation();
    setMessages([]);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <button onClick={toggleDropdown} aria-label="Alarm Button" className="relative">
      <div className="absolute bottom-auto top-[1%] h-[16px] w-[16px] rounded-[50%] bg-[red] text-center text-[8px] leading-[16px] text-[white]">
        {messages.length}
      </div>
      <Alarm width={32} height={32} />
      {isDropdownVisible && messages.length > 0 && (
        <ul
          style={{ zIndex: 3 }}
          className="absolute right-[-170%] top-[180%] flex w-[368px] max-w-[30em] flex-col rounded-2xl bg-white px-[1.5em] py-[1.125em] text-[1.25em] shadow-[0_0.125rem_0.5rem_rgba(0,0,0,0.3),0_0.0625rem_0.125rem_rgba(0,0,0,0.2)] before:absolute before:bottom-full before:right-[60px] before:h-0 before:w-0 before:border-[0.75rem] before:border-solid before:border-transparent before:border-b-white before:border-t-[none] before:drop-shadow-[0_-0.0625rem_0.0625rem_rgba(0,0,0,0.1)]"
        >
          <div className="space-between flex pb-[10px]">
            <h3 className="text-primary-black-200 flex flex-1 justify-start text-xl font-bold leading-7">알림</h3>
            <button onClickCapture={removeAllMessage} className="text-primary-black-200 text-xl font-bold leading-7">
              X
            </button>
          </div>
          {messages.map(m => (
            <li key={m.id} className="flex flex-col">
              <button
                onClickCapture={() => {
                  removeMessage(m.id);
                }}
                className="text-primary-gray-900 flex justify-end"
              >
                X
              </button>
              <div className="flex flex-col items-start justify-stretch text-left">
                <h3 className="text-primary-black-100 flex flex-1 text-sm font-normal leading-6">{m.content}</h3>
                <h3 className="text-primary-black-100 text-primary-gray-800 text-sm font-normal leading-6">
                  {dayjs(m.createdAt).fromNow(false)}
                </h3>
              </div>
            </li>
          ))}
        </ul>
      )}
    </button>
  );
}
