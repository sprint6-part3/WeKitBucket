/* eslint-disable jsx-a11y/label-has-associated-control */
import Camera from "@/assets/icons/camera.svg";
import Input from "./Modal/Input.tsx";
import Label from "./Modal/Label.tsx";
import { Editor, EditorMarkdown } from "./Editor";
import { EDITOR_TEXT } from "./EditorBasicText.tsx";

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
    <div className="w-84 mx-10 my-10 box-border w-auto rounded-[10px] bg-white shadow-custom-shadow">
      <form className="grid gap-4">
        <div className="relative flex w-full flex-col gap-5 xl:flex-col">
          <label htmlFor="file" className="grid h-[62px] justify-center">
            <Camera width="36" height="36" />
          </label>
          <input id="file" type="file" className="hidden" />
        </div>
        <div className="grid gap-4">
          <div className="w-67 flex gap-2">
            <Label htmlFor="city" className="content-center whitespace-nowrap text-sm-regular-14 text-primary-gray-400">
              거주도시
            </Label>
            <Input id="city" />
          </div>

          <div className="w-67 flex gap-2">
            <Label htmlFor="mbti" className="content-center whitespace-nowrap text-sm-regular-14 text-primary-gray-400">
              MBTI
            </Label>
            <Input id="mbti" />
          </div>

          <div className="w-67 flex gap-2">
            <Label htmlFor="job" className="content-center whitespace-nowrap text-sm-regular-14 text-primary-gray-400">
              직업
            </Label>
            <Input id="job" />
          </div>

          <div className="w-67 flex gap-2">
            <Label htmlFor="sns" className="content-center whitespace-nowrap text-sm-regular-14 text-primary-gray-400">
              SNS 계정
            </Label>
            <Input id="sns" />
          </div>
        </div>

        <div className="grid gap-4">
          <div className="w-67 flex gap-2">
            <Label
              htmlFor="birthday"
              className="content-center whitespace-nowrap text-sm-regular-14 text-primary-gray-400"
            >
              생일
            </Label>
            <Input id="birthday" />
          </div>

          <div className="w-67 flex gap-2">
            <Label
              htmlFor="nickname"
              className="content-center whitespace-nowrap text-sm-regular-14 text-primary-gray-400"
            >
              별명
            </Label>
            <Input id="nickname" />
          </div>

          <div className="w-67 flex gap-2">
            <Label
              htmlFor="bloodType"
              className="content-center whitespace-nowrap text-sm-regular-14 text-primary-gray-400"
            >
              혈액형
            </Label>
            <Input id="bloodType" />
          </div>

          <div className="w-67 flex gap-2">
            <Label
              htmlFor="nationality"
              className="content-center whitespace-nowrap text-sm-regular-14 text-primary-gray-400"
            >
              국적
            </Label>
            <Input id="nationality" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditForm;
