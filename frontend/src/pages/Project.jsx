import { useSearchParams } from "react-router-dom";
import Viewer from "./Viewer";
import Tester from "./Tester";

export default function Project() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");

  return (
    <div className="relative flex h-full w-full flex-col overflow-y-scroll p-6 pb-[220px]">
      {mode === "test" ? <Tester /> : <Viewer />}
    </div>
  );
}
