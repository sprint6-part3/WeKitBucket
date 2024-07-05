import React from "react";
import AddBoardComponent from "./AddBoardComponent";

function AddBoard() {
  return (
    <div className="mx-[20px] mt-[32px] flex flex-col justify-center">
      <main className="md:shadow-custom-all md-shadow-custom-all mx-auto w-full gap-3 md:w-[624px] md:gap-5 md:rounded-[10px] md:border-gray-300 md:px-[30px] md:pb-[30px] md:pt-[40px] xl:w-[1060px]">
        <AddBoardComponent />
      </main>
      <div className="center flex justify-center">
        <button className="mt-[32px] rounded-[10px] border border-green-500 px-[45px] py-[10px] text-sm-regular-14 text-green-500">
          목록으로
        </button>
      </div>
    </div>
  );
}

export default AddBoard;
