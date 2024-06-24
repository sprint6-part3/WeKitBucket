import Link from "next/link";

function SignUp() {
  return (
    <form>
      <div>회원가입</div>
      <div>
        <label htmlFor="name">이름</label>
        <input id="name" placeholder="이름을 입력해주세요" />
      </div>
      <div>
        <label htmlFor="email">이메일</label>
        <input id="email" placeholder="이메일을 입력해주세요" />
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input id="password" type="password" placeholder="비밀번호를 입력해주세요" />
      </div>
      <div>
        <label htmlFor="password_confirmation">비밀번호 확인</label>
        <input id="password_confirmation" placeholder="비밀번호를 입력해주세요" />
      </div>
      <button type="submit">가입하기</button>
      <p>
        이미 회원이신가요?<Link href="./login">로그인하기</Link>
      </p>
    </form>
  );
}

export default SignUp;
