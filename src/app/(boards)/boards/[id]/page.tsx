import React from "react";

function page({ params }: { params: { id: number } }) {
  console.log(params);

  return <div>상세페이지</div>;
}

export default page;
