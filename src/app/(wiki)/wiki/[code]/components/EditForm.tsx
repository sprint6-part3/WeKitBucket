import Input from "./Modal/Input.tsx";
import Label from "./Modal/Label.tsx";

export interface EditProfileOption {
  nationality?: string;
  family?: string;
  bloodType?: string;
  nickname?: string;
  birthday?: string;
  sns?: string;
  job?: string;
  mbti?: string;
  city?: string;
  image?: string;
  content?: string;
}

function EditForm() {
  return (
    <form className="mb-[40px] mt-[50px]">
      <div className="grid gap-6">
        <div className="grid gap-[10px]">
          <Label htmlFor="city">거주도시</Label>
          <Input id="city" />
        </div>

        <div className="grid gap-[10px]">
          <Label htmlFor="mbti">MBTI</Label>
          <Input id="mbti" />
        </div>

        <div className="grid gap-[10px]">
          <Label htmlFor="job">직업</Label>
          <Input id="job" />
        </div>

        <div className="grid gap-[10px]">
          <Label htmlFor="sns">SNS 계정</Label>
          <Input id="sns" />
        </div>
      </div>

      <div className="grid gap-6">
        <div className="grid gap-[10px]">
          <Label htmlFor="birthday">생일</Label>
          <Input id="birthday" />
        </div>

        <div className="grid gap-[10px]">
          <Label htmlFor="nickname">별명</Label>
          <Input id="nickname" />
        </div>

        <div className="grid gap-[10px]">
          <Label htmlFor="bloodType">혈액형</Label>
          <Input id="bloodType" />
        </div>

        <div className="grid gap-[10px]">
          <Label htmlFor="nationality">국적</Label>
          <Input id="nationality" />
        </div>
      </div>
    </form>
  );
}

export default EditForm;
