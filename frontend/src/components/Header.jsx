import React, { useState, useEffect } from "react";
import { useModalStore } from "../store";
import InviteModal from "./modal/InviteModal";
import { Link } from "react-router-dom";
import HeaderProjectEditModal from "./modal/HeaderProejctEditModal";

function Header() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { openModal } = useModalStore();
  const [showHeaderProjectEditModal, setShowHeaderProjectEditModal] =
    useState(false); //옵션버튼

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // 모달이 열려있고, 클릭한 요소가 모달 내부가 아니라면 모달을 닫음
      if (
        showHeaderProjectEditModal &&
        !event.target.closest("#header-option-modal")
      ) {
        setShowHeaderProjectEditModal(false);
      }
    };

    if (showHeaderProjectEditModal) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showHeaderProjectEditModal]); // 옵션 상태 변경될때마다 업데이트

  const openInviteModal = () => {
    openModal("Invite Member", <InviteModal />);
  };

  const toggleHeaderProjectEditModal = (event) => {
    event.stopPropagation();
    setShowHeaderProjectEditModal(!showHeaderProjectEditModal);
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
            <li onClick={toggleHeaderProjectEditModal}>
              <img
                src="/asset/header/header-option.svg"
                className="h-4 cursor-pointer"
                alt="header-option"
              />
            </li>
          </ul>
        </div>
        {showHeaderProjectEditModal && (
          <div
            style={{ position: "absolute", right: "0px", top: "40px" }}
            id="header-option-modal"
          >
            <HeaderProjectEditModal />
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
