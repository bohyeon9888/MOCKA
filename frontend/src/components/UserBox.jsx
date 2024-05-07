export default function UserBox({ email, removeItem }) {
  return (
    <div className="flex h-9 w-full flex-row items-center justify-between">
      <div>{email}</div>
      <img
        className="size-6 cursor-pointer"
        src="./asset/invite/invite-delete.svg"
        onClick={removeItem}
      />
    </div>
  );
}
