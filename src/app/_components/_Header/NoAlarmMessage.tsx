import React from "react";
import Rabbit from "@/assets/images/rabbit.webp";
import Image from "next/image";

export default function NoAlarmMessage() {
  return (
    <div className="flex flex-col items-center justify-center py-[40px]">
      <div className="relative flex h-[180px] w-[110px] flex-col">
        <Image fill src={Rabbit} alt="토끼 이미지" className="absolute" />
      </div>
      <h3 className="flex">알림이 없습니다</h3>
    </div>
  );
}
