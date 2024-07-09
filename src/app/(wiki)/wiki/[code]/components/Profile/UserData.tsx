/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-shadow */
import { ChangeEvent } from "react";

interface UserDataProp {
  name: string;
  value: string;
  myEdit: boolean;
  onChange: (name: string, value: string) => void;
}

function UserData({ name, value, myEdit, onChange }: UserDataProp) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    onChange(id, value);
  };

  return (
    <div className="flex w-full">
      {myEdit ? (
        <>
          <label className="flex min-w-14 text-xs-regular2 text-gray-400 md:text-md-regular2 xl:min-w-16">{name}</label>
          <input
            className="flex rounded-[5px] bg-gray-50 text-xs-regular2 text-gray-500 outline-none focus:border-2 focus:border-primary-green-200 sm:w-[70%] md:ml-2 md:w-[70%] md:text-md-regular2 lg:ml-0 lg:w-3/4 xl:w-[68%] xl:min-w-16"
            placeholder={value}
            onChange={handleChange}
          />
        </>
      ) : (
        <>
          <p className="xs-regular2 flex-1 text-primary-gray-400">{name}</p>
          <p className="xs-regular2 text-primary-gray-800">{value}</p>
        </>
      )}
    </div>
  );
}

export default UserData;
