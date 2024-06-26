// import postSignIn from "@/apis/auth/postSignIn";
// import getProfiles from "@/apis/profile/getProfiles";
// import { UserInput } from "@/types/auth";

// function Home() {
//   const user: UserInput = {
//     email: "nape1203@gmail.com",
//     password: "im79517951",
//   };

//   const load = async () => {
//     const { list } = await getProfiles({ page: 1, name: "김" });
//     console.log(list);
//   };
//   load();

//   const load = async () => {
//     const list = await postSignIn(user);
//     console.log(list);
//   };
//   load();

  return (
    <div>
      <div className="flex px-12 text-xl text-primary-red-200">hihi</div>
    </div>
  );
}

export default Home;
