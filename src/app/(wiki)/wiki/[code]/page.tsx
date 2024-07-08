import WikiFrame from "./components/WikiFrame";

function Wiki({ params }: { params: { code: string } }) {
  return (
    <div className="m-auto max-w-[1350px] overflow-auto">
      <WikiFrame params={params} />
    </div>
  );
}

export default Wiki;
