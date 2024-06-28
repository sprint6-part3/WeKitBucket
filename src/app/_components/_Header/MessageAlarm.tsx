"use client";

import React, { useState } from "react";

import Alarm from "@/assets/icons/alarmIcon.svg";

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
    setMessages(messages.filter(m => m.id !== id));
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div>
      <button onClick={toggleDropdown} aria-label="Alarm Button">
        <div className="absolute bottom-auto top-[1%] h-[16px] w-[16px] rounded-[50%] bg-[red] text-center text-[8px] leading-[16px] text-[white]">
          {messages.length}
        </div>
        <Alarm width={32} height={32} />
      </button>

      {isDropdownVisible && messages.length > 0 && (
        <ul className="absolute right-[1%] z-[999] mt-2.5 flex h-auto w-[320px] flex-col items-center gap-y-5 rounded-lg pb-2.5 pt-2.5 shadow-[0px_4px_20px_0px_#00000014] after:left-auto after:right-[50px] after:top-[-15px] after:border-[0_15px_15px] after:shadow-[0px_4px_20px_0px_#00000014]">
          {messages.map(m => (
            <li key={m.id}>
              <button
                onClick={() => {
                  removeMessage(m.id);
                }}
              >
                X
              </button>
              <h3>{m.content}</h3>
              <h3>{m.createdAt}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
