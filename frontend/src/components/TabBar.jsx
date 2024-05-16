import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useSearchParams } from "react-router-dom";
import Tab from "./Tab";

function DraggableTab({
  tabs,
  setTabs,
  type,
  index,
  id,
  title,
  selectedTab,
  groupId,
  setSelectedTab,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "tab",
    item: {
      tabs,
      setTabs,
      type,
      index,
      id,
      title,
      selectedTab,
      groupId,
      setSelectedTab,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: "tab",
    drop(item) {
      if (item.index !== index) {
        moveTab(item.index, index);
        // item.index = index;
      }
    },
  }));

  const handleTabClick = (id) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("apiId", id);
    newSearchParams.set("groupId", groupId);
    setSearchParams(newSearchParams);
  };

  const handleRemoveTab = (id) => {
    setTabs((prevTabs) => prevTabs.filter((tab) => tab.id != id));
    if (selectedTab == id && tabs.length > 1) {
      const remainingTabs = tabs.filter((tab) => tab.id != id);
      const remainingTab = remainingTabs[remainingTabs.length - 1];
      const newSearchParams = new URLSearchParams(searchParams);
      newSearchParams.set("apiId", remainingTab.id);
      newSearchParams.set("groupId", remainingTab.groupId);
      setSearchParams(newSearchParams);
    }
  };

  const moveTab = (dragIndex, hoverIndex) => {
    // setTabs((tabs) => {
    //   const dragTab = tabs[dragIndex];
    //   const newTabs = [...tabs];
    //   newTabs.splice(dragIndex, 1);
    //   newTabs.splice(hoverIndex, 0, dragTab);
    //   return newTabs;
    // });
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <Tab
        type={type}
        title={title}
        isSelected={selectedTab == id}
        onClick={() => handleTabClick(id)}
        onRemove={() => handleRemoveTab(id)}
      />
    </div>
  );
}

export default function TabBar({ tabs, setTabs, selectedTab, setSelectedTab }) {
  // const addTab = (type) => {
  //   const newId =
  //     tabs.length > 0 ? Math.max(...tabs.map((tab) => tab.id)) + 1 : 0;
  //   setTabs([...tabs, { type, id: newId }]);
  // };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex w-full flex-row bg-background-color">
        {tabs &&
          tabs.length > 0 &&
          tabs.map((tab, index) => (
            <DraggableTab
              key={tab.id}
              type={tab.type}
              index={index}
              id={tab.id}
              title={tab.title}
              tabs={tabs}
              groupId={tab.groupId}
              setTabs={setTabs}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          ))}
        {/* <button
          onClick={() => addTab("NEW_TAB")}
          className="ml-2 flex h-[36px] w-[154px] flex-shrink-0 items-center justify-center rounded bg-gray-300"
        >
          <h5>+ Add Tab</h5>
        </button> */}
      </div>
    </DndProvider>
  );
}
