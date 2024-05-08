import React, { useState } from "react";

function header() {
  const [isEditMode, setIsEditMode] = useState(false);

  const toggleMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <header className="bg-gray-700">
      <div className="mx-auto flex  h-11 flex-wrap items-center justify-between p-2">
        <div className="ml-11">
          <a href="/" className="flex items-center space-x-2">
            <img src="/logo.svg" className="h-4" alt="Mocka Logo" />
            <span className="text-h3 font-bold text-white">Mocka</span>
          </a>
        </div>
        <div
          className="mr-3 hidden w-full md:block md:w-auto"
          id="navbar-default"
        >
          <ul className="flex md:space-x-8 ">
            <li>
              <img
                src="/public/asset/header/header-invite.svg"
                className="h-4 cursor-pointer"
                alt="header-invite"
              />
            </li>
            <li>
              <img
                src="/public/asset/header/header-link.svg"
                className="h-4 cursor-pointer"
                alt="header-link"
              />
            </li>
            <li onClick={toggleMode} className="cursor-pointer">
              {isEditMode ? (
                <img
                  src="/public/asset/header/header-edit-mode.svg"
                  className="h-5 cursor-pointer"
                  alt="header-edit-mode"
                />
              ) : (
                <img
                  src="/public/asset/header/header-viewer-mode.svg"
                  className="h-5 cursor-pointer"
                  alt="header-edit-mode"
                />
              )}
            </li>
            <li>
              <img
                src="/public/asset/header/header-option.svg"
                className="h-4 cursor-pointer"
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
