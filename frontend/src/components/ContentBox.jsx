export default function ContentBox({ title, description, children }) {
  return (
    <div className="flex flex-col space-y-3">
      <div className="leading-normal">
        <h3>{title}</h3>
        <p className="text-4 text-gray-500">{description}</p>
      </div>
      {children}
    </div>
  );
}
