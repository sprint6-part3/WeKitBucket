import { PropsWithChildren, ReactNode } from "react";

type MyProp = {
  dataProp: ReactNode;
};

function UserData({ dataProp, children }: PropsWithChildren<MyProp>) {
  return (
    <p className="flex w-full">
      <p className="flex-1 text-sm-regular-14 text-primary-gray-400">{children}</p>
      <p className="text-sm-regular-14 text-primary-gray-500">{dataProp}</p>
    </p>
  );
}

export default UserData;
