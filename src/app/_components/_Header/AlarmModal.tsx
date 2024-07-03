"use client";

import React, { useState } from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import NoAlarmMessage from "@/app/_components/_Header/NoAlarmMessage";
import AlarmModalHeader from "./AlarmModalHeader";
import ModalComponent from "./ModalComponent";

dayjs.locale("ko");
dayjs.extend(relativeTime);

/** 더미 데이터 시작 */
const pushAlarm = {
  totalCount: 3,
  list: [
    {
      createdAt: "2024-06-27T17:54:16.963Z",
      content: "민재 업고 튀어",
      id: 1,
    },
    {
      createdAt: "2024-06-27T17:54:16.963Z",
      content:
        "전 대체 무엇을 하고 있을까요? 지금 예하님의 뒤에 있을지도 모릅니다. 이런 민재님이 뒤에서 쳐다보고 계시네요.",
      id: 2,
    },

    {
      createdAt: "2024-06-27T17:54:16.963Z",
      content: "우리 강산 푸르게 푸르게",
      id: 3,
    },
  ],
};
/** 더미 데이터 끝 */

export default function AlarmModal({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState(pushAlarm.list);

  const removeMessage = (id: number) => {
    // e.stopPropagation();
    setMessages(messages.filter(m => m.id !== id));
  };

  const removeAllMessage = () => {
    // e.stopPropagation();
    setMessages([]);
  };

  return (
    <ModalComponent>
      <AlarmModalHeader onClose={onClose} removeAll={removeAllMessage} count={messages.length} />
      <ul style={{ zIndex: 2 }} className="flex flex-col gap-y-5 px-[1.5em] pt-[1.125em] text-[1.25em]">
        {messages.length > 0 ? (
          <>
            {messages.map(m => (
              <li
                key={m.id}
                className="flex flex-col rounded-[8px] bg-white p-5 shadow-[0_0.125rem_0.5rem_rgba(0,0,0,0.3),0_0.0625rem_0.125rem_rgba(0,0,0,0.2)]"
              >
                <button
                  onClickCapture={() => {
                    removeMessage(m.id);
                  }}
                  className="flex justify-end text-sm text-primary-gray-900"
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
    </ModalComponent>
  );
}
