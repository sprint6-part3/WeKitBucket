"use server";

import getComment from "@/apis/comment/getComment";

async function page() {
  // const password = {
  //   passwordConfirmation: "12341234",
  //   password: "12341234",
  //   currentPassword: "12341234",
  // };
  // const content = "stringd";
  const data = await getComment(103, { limit: 1 });
  console.log(data);
  return (
    <div>
      <div>test</div>
      {/* <Button /> */}
    </div>
  );
}

export default page;
