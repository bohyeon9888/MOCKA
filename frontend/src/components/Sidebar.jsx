import React from "react";

function Sidebar() {
  return (
    <aside class="sidebar bottom-0 top-0 h-full w-[216px] overflow-y-auto bg-gray-100 p-2 text-center lg:left-0">
      <div class="text-xl text-gray-700">
        <div class="mt-1 flex justify-center p-5">
          <h5 class="text-center font-bold text-gray-700">PROJECT LIST</h5>
        </div>
        <div class="w-[170px]items-center my-2 h-[1px] bg-sidebar-division-color" />
      </div>
      <div class="mt-3 flex cursor-pointer items-center rounded-md p-2.5 px-4 text-white duration-300 hover:bg-gray-300">
        <img
          src="/public/asset/sidebar/sidebar-right-pointer.svg"
          className="h-3"
          alt="sidebar-right-pointer"
        />
        <span class="text-h5 ml-7 font-bold text-gray-700">RECENTS</span>
      </div>
      <div class="mt-3 flex cursor-pointer items-center rounded-md p-2.5 px-4 text-white duration-300 hover:bg-gray-300">
        <img
          src="/public/asset/sidebar/sidebar-right-pointer.svg"
          className="h-3"
          alt="sidebar-right-pointer"
        />
        <span class="text-h5 ml-7 font-bold text-gray-700">TEAMS</span>
      </div>
    </aside>
  );
}

export default Sidebar;
