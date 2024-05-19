import useModalStore from "../store/modal";

export default function ModalContainer({ title, children }) {
  const { closeModal } = useModalStore();

  return (
    <div className="absolute left-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-modal-background-color ">
      <div className="flex max-h-modal max-w-modal flex-col space-y-[15px] rounded-[15px] bg-white px-3 py-8 drop-shadow-xl">
        <div className="flex w-full items-center justify-between px-5">
          <h3>{title}</h3>
          <img
            className="size-[14px] cursor-pointer"
            src="/asset/modal/modal-close.svg"
            onClick={() => {
              closeModal();
            }}
          />
        </div>
        <>{children}</>
      </div>
    </div>
  );
}
