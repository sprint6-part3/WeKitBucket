export default function AlarmModalHeader({
  onClose,
  removeAll,
  count,
}: {
  onClose: () => void;
  removeAll: () => void;
  count: number;
}) {
  const handleRemove = () => {
    if (count > 0) removeAll();
    onClose();
  };
  return (
    <div className="flex justify-between px-[20px] py-[20px] shadow-[0px_4px_20px_-24px_black]">
      <h3 className="flex flex-1 justify-start text-xl font-bold leading-7 text-primary-black-200">{`알림 ${count}개`}</h3>
      <button onClickCapture={handleRemove} className="text-xl font-bold leading-7 text-primary-black-200">
        &gt;
      </button>
    </div>
  );
}
