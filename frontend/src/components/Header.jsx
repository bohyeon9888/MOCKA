import React, { useState } from "react";
import { useModalStore } from "../store";
import InviteModal from "./modal/InviteModal";
import { Link } from "react-router-dom";

function Header() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { openModal } = useModalStore();

  const openInviteModal = () => {
    openModal("Invite Member", <InviteModal />);
  };

  const toggleMode = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <header className="bg-gray-700">
      <div className="mx-auto flex  h-11 flex-wrap items-center justify-between p-2">
        <div className="ml-11">
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.svg" className="h-4" alt="Mocka Logo" />
            <span className="text-h3 font-bold text-white">Mocka</span>
          </Link>
        </div>
        <div
          className="mr-3 hidden w-full md:block md:w-auto"
          id="navbar-default"
        >
          <ul className="flex items-center md:space-x-[14px]">
            <li onClick={openInviteModal}>
              <img
                src="/asset/header/header-invite.svg"
                className="h-[13px] cursor-pointer"
                alt="header-invite"
              />
            </li>
            <li>
              <img
                src="/asset/header/header-link.svg"
                className="h-[13px] cursor-pointer"
                alt="header-link"
              />
            </li>
            <li onClick={toggleMode} className="cursor-pointer">
              {isEditMode ? (
                <img
                  src="/asset/header/header-edit-mode.svg"
                  className="h-7 cursor-pointer pt-1"
                  alt="header-edit-mode"
                />
              ) : (
                <img
                  src="/asset/header/header-viewer-mode.svg"
                  className="h-7 cursor-pointer pt-1"
                  alt="header-edit-mode"
                />
              )}
            </li>
            <li>
              <img
                src="/asset/header/header-option.svg"
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

export default Header;
