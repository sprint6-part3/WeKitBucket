/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import Caret from "@/assets/icons/caret.svg";

function Dropdown() {
  const sort = ["최신순", "좋아요순"];
  const [view, setView] = useState(false);

  const toggleDropdown = () => {
    setView(!view);
  };

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex w-full cursor-pointer items-center justify-between rounded-[10px] bg-primary-gray-100 px-5 py-[10.5px]"
      >
        <p className="text-sm leading-[1.7] text-primary-gray-500">{sort[0]}</p>
        <Caret width={7} height={4} />
      </button>
      {view && (
        <>
          <div className="fixed bottom-0 left-0 right-0 top-0" onClick={toggleDropdown} />
          <ul className="absolute mt-2 grid w-full gap-[5px] rounded-[10px] bg-white px-1 py-[6px] shadow-custom-shadow">
            {sort.map(value => (
              <li
                key={value}
                className="cursor-pointer px-4 py-[6px] text-sm leading-[1.7] text-primary-gray-500 hover:bg-primary-green-100"
              >
                {value}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default Dropdown;
