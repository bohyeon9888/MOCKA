import { useState } from "react";
import combineClassName from "../utils/combineClassName";

export default function Switch({ defaultValue, changeHandler }) {
  const [state, setState] = useState(!!defaultValue);
  const commonTrackClassName =
    "w-[44px] h-6 rounded-full transition-all cursor-pointer relative";
  const commonThumbClassName =
    "absolute bg-white size-[20px] rounded-full transition-all top-1/2 -translate-y-1/2 shadow";

  const onClassName = {
    track: "bg-gray-600 justify-start",
    thumb: "left-[22px]",
  };
  const offClassName = {
    track: "bg-gray-300 justify-end",
    thumb: "left-0.5",
  };

  const onClickHandler = () => {
    if (changeHandler) changeHandler(!state);
    setState(!state);
  };

  return (
    <div
      className={combineClassName(
        commonTrackClassName,
        state ? onClassName.track : offClassName.track,
      )}
      onClick={onClickHandler}
    >
      <div
        className={combineClassName(
          commonThumbClassName,
          state ? onClassName.thumb : offClassName.thumb,
        )}
      />
    </div>
  );
}
