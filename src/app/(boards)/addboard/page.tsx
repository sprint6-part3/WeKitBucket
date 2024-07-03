import React from "react";
import AddBoardComponent from "./AddBoardComponent";

function AddBoard() {
  return (
    <div className="center mx-[20px] my-[90px] flex-col">
      <main className="w-full flex-col gap-3 md:flex md:gap-5 md:px-[30px] md:py-[40px]">
        <AddBoardComponent />
      </main>
    </div>
  );
}

export default AddBoard;
