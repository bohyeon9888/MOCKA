import { useState } from "react";
import dependencyList from "../../constants/dependencies";
import combineClassName from "../../utils/combineClassName";
import CheckBox from "../CheckBox";
import { useModalStore } from "../../store";

export default function DependencyModal() {
  const [selected, setSelected] = useState([]);
  const { state, closeModal } = useModalStore();
  const { dependencies, setDependencies } = state;

  const selectedClassName = "mb-1 text-[17px] text-green-600 font-medium";

  const switchItem = ({ id, name, description }) => {
    if (selected.some((item) => item.id === id)) {
      setSelected([...selected].filter((item) => item.id !== id));
    } else {
      setSelected([...selected, { id, name, description }]);
    }
  };

  const addDependencies = () => {
    setDependencies([...dependencies, ...selected]);
    closeModal();
  };

  const filteredList = dependencyList
    .map(({ name, values }) => {
      return {
        name,
        values: values.filter(
          ({ id }) => !dependencies.some((item) => item.id === id),
        ),
      };
    })
    .filter((category) => category.values.length > 0);

  return (
    <div className="flex flex-col overflow-hidden px-5">
      <div className="space-y-8 overflow-y-scroll py-2">
        {filteredList.map(({ name, values }) => (
          <div key={name}>
            <h2 className="mb-3 text-green-500">{name}</h2>
            <div className="flex flex-col space-y-2">
              {values.map(({ id, name, description }) => (
                <div
                  key={id}
                  className={combineClassName(
                    "flex cursor-pointer flex-row items-center space-x-3 rounded-[4px] p-2 hover:bg-gray-100",
                    selected.some((item) => item.id === id)
                      ? ""
                      : "opacity-60 hover:opacity-100",
                  )}
                  onClick={() => {
                    switchItem({ id, name, description });
                  }}
                >
                  <CheckBox
                    isChecked={selected.some((item) => item.id === id)}
                  />
                  <div className="flex flex-col">
                    <div
                      className={
                        selected.some((item) => item.id === id)
                          ? selectedClassName
                          : "mb-1 text-[17px] font-medium"
                      }
                    >
                      {name}
                    </div>
                    <div className="text-[14px] text-gray-700">
                      {description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        className="ml-auto mt-4 flex h-[30px] w-[85px] shrink-0 items-center justify-center rounded-[4px] bg-green-500 px-1 text-white"
        onClick={addDependencies}
      >
        <div className={selected.length > 0 ? "ml-1" : ""}>Add</div>
        {selected.length > 0 && (
          <div className="ml-1.5 flex size-[18px] items-center justify-center rounded-full bg-white text-[11px] font-medium text-green-500">
            {selected.length}
          </div>
        )}
      </button>
    </div>
  );
}
