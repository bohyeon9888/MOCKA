import React from "react";

function header() {
  return (
    <header className="bg-gray-700">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-2">
        <a href="홈화면으로 이동할꺼야" className="flex items-center space-x-2">
          <img src="/logo.svg" className="h-5" alt="Mocka Logo" />
          <span className="text-h3 font-bold text-white">Mocka</span>
        </a>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex md:space-x-8 ">
            <li>
              <img
                src="/public/asset/header/header-invite.svg"
                className="h-5"
                alt="header-invite"
              />
            </li>
            <li>
              <img
                src="/public/asset/header/header-link.svg"
                className="h-5"
                alt="header-link"
              />
            </li>
            <li>
              <img
                src="/public/asset/header/header-edit-mode.svg"
                className="h-5"
                alt="header-edit-mode"
              />
            </li>
            <li>
              <img
                src="/public/asset/header/header-option.svg"
                className="h-5"
                alt="header-option"
              />
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default header;
