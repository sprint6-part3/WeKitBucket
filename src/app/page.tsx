import postSignUp from "@/apis/Auth/postSignUp";
import { UserInput } from "@/types/auth";

function Home() {
  const user: UserInput = {
    email: "nape1204@gmail.com",
    name: "Neview",
    password: "im79517951",
    passwordConfirmation: "im79517951",
  };
  const load = async () => {
    await postSignUp(user);
  };
  load();

  return (
    <div>
      <div className="flex px-12 text-xl text-primary-red-200">hihi</div>
    </div>
  );
}

export default Home;
