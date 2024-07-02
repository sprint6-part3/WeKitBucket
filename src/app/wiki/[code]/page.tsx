import getProfilesCode from "@/apis/profile/getProfilesCode";

async function Wiki({ params }: { params: { code: string } }) {
  const { code } = params;
  const data = await getProfilesCode(code);
  console.log(data);

  return <div>code: {code}</div>;
}

export default Wiki;
