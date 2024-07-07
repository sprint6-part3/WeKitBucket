import React, { ChangeEvent, memo } from "react";

const ProfileInfos = memo(
  ({
    label,
    value,
    id,
    onChange,
    editMyPage,
  }: {
    label: string;
    value: string;
    id: string;
    // eslint-disable-next-line no-shadow
    onChange: (name: string, value: string | File | null) => void;
    editMyPage: boolean;
  }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      // eslint-disable-next-line no-shadow
      const { id, value } = e.target;
      onChange(id, value);
    };

    return (
      <div className={`flex items-center ${editMyPage ? "justify-center md:mx-auto xl:mb-1" : ""} gap-2`}>
        {editMyPage ? (
          <>
            <label
              htmlFor={id}
              className="flex min-w-14 text-xs-regular2 text-gray-400 md:text-md-regular2 xl:min-w-16"
            >
              {label}
            </label>
            <input
              name="profileInput"
              id={id}
              maxLength={13}
              className="flex rounded-[5px] bg-slate-50 text-xs-regular2 text-gray-500 outline-none focus:border-2 focus:border-primary-green-200 sm:w-[70%] md:ml-2 md:w-[70%] md:text-md-regular2 lg:ml-0 lg:w-3/4 xl:w-[68%] xl:min-w-16"
              placeholder={value}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <p className="min-w-14 flex-none text-xs-regular2 text-gray-400 md:text-md-regular2 xl:min-w-16">{label}</p>
            <p className="text-xs-regular2 text-gray-500 md:text-md-regular2">{value}</p>
          </>
        )}
      </div>
    );
  },
);

ProfileInfos.displayName = "ProfileInfos";

export default ProfileInfos;
