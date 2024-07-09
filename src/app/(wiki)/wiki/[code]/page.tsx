import WikiFrame from "./components/WikiFrame";

function Wiki({ params }: { params: { code: string } }) {
  return (
    <div className="m-auto max-w-[1350px] overflow-auto">
      <div className="px-4 py-7">
        <WikiFrame params={params} />
      </div>
    </div>
  );
}

export default Wiki;
