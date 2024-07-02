import React from "react";

type PageItemProps = {
  children: number | string;
  isFirst: boolean;
  isLast: boolean;
};

function PageItem({ children, isFirst, isLast }: PageItemProps) {
  let additionalClasses = "";
  if (isFirst) {
    additionalClasses = "mr-1";
  } else if (isLast) {
    additionalClasses = "ml-1";
  }

  return (
    <div
      className={`flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl text-primary-gray-400 shadow-[0_4px_20px_rgba(0,0,0,0.08)] ${additionalClasses}`}
    >
      {children}
    </div>
  );
}

export default PageItem;
