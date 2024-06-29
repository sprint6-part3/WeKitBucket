import getUsersMe from "@/apis/user/getUsersMe";
import React from "react";

function page() {
  const load = async () => {
    const data = await getUsersMe();
    console.log(data);
  };
  load();

  return <div>test</div>;
}

export default page;
