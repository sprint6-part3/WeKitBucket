import React from "react";
import HeaderRight from "./_Header/HeaderRight";
import HeaderLeft from "./_Header/HeaderLeft";

function Header() {
  // const user = null;

  return (
    <div className="sticky top-0 z-10 flex justify-between gap-x-[40px] bg-white px-[20px] py-[15px] shadow-[0px_4px_20px_-24px_black] md:px-[20px] md:py-[15px] xl:px-[80px] xl:py-[25px]">
      <HeaderLeft />
      <HeaderRight />
    </div>
  );
}

export default Header;
