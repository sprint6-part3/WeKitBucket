import { PropsWithChildren, ReactNode } from "react";

type MyProp = {
  dataProp: ReactNode;
};

function UserData({ dataProp, children }: PropsWithChildren<MyProp>) {
  return (
    <p className="flex w-full">
      <p className="flex-1 text-sm leading-6 text-primary-gray-600">{children}</p>
      <p className="text-sm leading-6 text-primary-gray-800">{dataProp}</p>
    </p>
  );
}

export default UserData;
