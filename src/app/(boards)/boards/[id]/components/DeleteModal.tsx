import React from "react";

interface IDeleteModal {
  onClick: () => void;
}

function DeleteModal({ onClick }: IDeleteModal) {
  return (
    <div className="mt-[10px] grid gap-[10px]">
      <p className="text-center text-lg font-semibold leading-[1.4] text-primary-gray-500">정말 삭제하시겠습니까?</p>
      <p className="text-center leading-[1.7] text-primary-gray-400">삭제 후에는 복구할 수 없습니다.</p>
      <button
        type="button"
        onClick={onClick}
        className="ml-auto mt-5 h-10 w-[65px] rounded-[10px] bg-primary-green-200 text-sm font-semibold text-white"
      >
        확인
      </button>
    </div>
  );
}

export default DeleteModal;
