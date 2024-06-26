import getArticles from "@/apis/article/getArticles";

function Home() {
  // const user: UserInput = {
  //   email: "nape1204@gmail.com",
  //   name: "Neview",
  //   password: "im79517951",
  //   passwordConfirmation: "im79517951",
  // };

  // const load = async () => {
  //   const { list } = await getProfiles({ page: 1, name: "김" });
  //   console.log(list);
  // };
  // load();

  const load = async () => {
    const { list } = await getArticles({ keyword: "8팀" });
    console.log(list);
  };
  load();

  return (
    <div>
      <div className="flex px-12 text-xl text-primary-red-200">hihi</div>
    </div>
  );
}

export default Home;
