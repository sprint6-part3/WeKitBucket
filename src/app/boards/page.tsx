"use client";

import Image from "next/image";
import Link from "next/link";
import LikeIcon from "@/assets/icons/like.svg";
import CameraIcon from "@/assets/icons/camera.svg";

function Board() {
  return (
    <div className="mx-auto mb-[57px] mt-10 grid gap-10 px-5">
      <section className="grid gap-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold leading-[1.3] text-primary-gray-500">베스트 게시글</h2>
          <Link
            href="/addboard"
            className="rounded-[10px] bg-primary-green-200 px-[20.5px] py-[10.5px] text-sm font-semibold leading-[1.7] text-white"
          >
            게시물 등록하기
          </Link>
        </div>
        <ul className="flex gap-4">
          <li className="shadow-custom-shadow flex h-[200px] w-[250px] flex-col overflow-hidden rounded-[10px]">
            <div className="flex-1">
              <div className="flex h-full items-center justify-center bg-primary-gray-100">
                <CameraIcon />
              </div>
            </div>
            <div className="grid px-5 py-[14px]">
              <h3 className="truncate font-semibold leading-[1.6]">게시물 제목입니다.라라라라라라라라ㅏ랄</h3>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <p className="text-xs leading-[1.5] text-primary-gray-400">박동욱</p>
                  <p className="text-xs leading-[1.5] text-primary-gray-400">2024.02.24.</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex h-4 w-4 items-center justify-center">
                    <LikeIcon width="12.67" height="11" />
                  </div>
                  <span className="text-xs leading-[1.2] text-primary-gray-400">135</span>
                </div>
              </div>
            </div>
          </li>
          <li className="shadow-custom-shadow flex h-[200px] w-[250px] flex-col overflow-hidden rounded-[10px]">
            <div className="flex-1">
              <div className="flex h-full items-center justify-center bg-primary-gray-100">
                <CameraIcon />
              </div>
            </div>
            <div className="grid px-5 py-[14px]">
              <h3 className="truncate font-semibold leading-[1.6]">게시물 제목입니다.라라라라라라라라ㅏ랄</h3>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <p className="text-xs leading-[1.5] text-primary-gray-400">박동욱</p>
                  <p className="text-xs leading-[1.5] text-primary-gray-400">2024.02.24.</p>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex h-4 w-4 items-center justify-center">
                    <LikeIcon width="12.67" height="11" />
                  </div>
                  <span className="text-xs leading-[1.2] text-primary-gray-400">135</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </section>
      <section className="max-w-[1200px]">
        <div className="flex flex-col items-center justify-center gap-5">
          <form className="">
            <button
              type="submit"
              className="rounded-[10px] bg-primary-green-200 px-[27.5px] py-[10.5px] text-sm font-semibold leading-[1.7] text-white"
            >
              검색
            </button>
          </form>
          <div></div>
        </div>
      </section>
    </div>
  );
}

export default Board;
