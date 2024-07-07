import CreateWikiForm from "./_components/CreateWikiForm.tsx";

function MakeWiki() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[400px] items-center justify-center px-5 py-5">
      <div className="flex-1">
        <h2 className="text-center text-2xl font-semibold leading-[1.3] text-primary-gray-500">내 위키 만들기</h2>
        <CreateWikiForm />
      </div>
    </div>
  );
}
export default MakeWiki;
