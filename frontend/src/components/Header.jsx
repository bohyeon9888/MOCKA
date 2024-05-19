import { useState, useEffect } from "react";
import { useModalStore, useProjectStore } from "../store";
import InviteModal from "./modal/InviteModal";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import HeaderProjectEditModal from "./modal/HeaderProejctEditModal";
import HeaderLanguageModal from "./modal/HeaderLanguageModal";
import updateQueryParam from "../utils/updateQueryParam";
import { useLanguage } from "../contexts/LanguageContext";
import combineClassName from "../utils/combineClassName";

function Header() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isTestMode, setIsTestMode] = useState(
    searchParams.get("mode") === "test",
  );
  const { openModal } = useModalStore();
  const { project } = useProjectStore();
  const navigate = useNavigate();
  const [showHeaderProjectEditModal, setShowHeaderProjectEditModal] =
    useState(false); // 옵션버튼
  const [showHeaderLanguageModal, setShowHeaderLanguageModal] = useState(false); // 언어 버튼
  const { language } = useLanguage();

  const translations = {
    ko: {
      inviteMember: "멤버 초대",
    },
    en: {
      inviteMember: "Invite Member",
    },
  };

  const t = translations[language];

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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // 모달이 열려있고, 클릭한 요소가 모달 내부가 아니라면 모달을 닫음
      if (
        showHeaderLanguageModal &&
        !event.target.closest("#header-language-modal")
      ) {
        setShowHeaderLanguageModal(false);
      }
    };

    if (showHeaderLanguageModal) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showHeaderLanguageModal]); // 옵션 상태 변경될때마다 업데이트

  const openInviteModal = () => {
    openModal(t.inviteMember, <InviteModal />, {
      projectId: project.projectId,
    });
  };

  const toggleHeaderProjectEditModal = (event) => {
    event.stopPropagation();
    setShowHeaderProjectEditModal(!showHeaderProjectEditModal);
  };

  const toggleHeaderLanguageModal = (event) => {
    event.stopPropagation();
    setShowHeaderLanguageModal(!showHeaderLanguageModal);
  };

  const toggleMode = () => {
    setIsTestMode(!isTestMode);
    updateQueryParam({
      key: "mode",
      value: !isTestMode ? "test" : "view",
      searchParams,
      setSearchParams,
    });
  };

  useEffect(() => {
    setIsTestMode(searchParams.get("mode") === "test");
  }, [searchParams]);

  return (
    <header className="bg-gray-700">
      <div className="mx-auto flex h-11 flex-wrap items-center justify-between p-2">
        <div className="ml-11">
          <Link
            to={`/?lang=${language}`}
            className="flex items-center space-x-2"
          >
            <img src="/logo.svg" className="h-4" alt="Mocka Logo" />
            <span className="text-h3 font-bold text-white">Mocka</span>
          </Link>
        </div>
        <div className="flex items-center md:space-x-[14px]">
          {/* {project ? ( */}
          <>
            <img
              onClick={toggleHeaderLanguageModal}
              src="/asset/header/header-language.svg"
              className="h-[15px] cursor-pointer"
              alt="header-language"
            />
            <ul
              className={combineClassName(
                "ml-2 flex items-center space-x-2 overflow-hidden duration-200 md:space-x-[14px]",
                project ? "w-[130px]" : "w-0",
              )}
            >
              <li onClick={openInviteModal}>
                <img
                  src="/asset/header/header-invite.svg"
                  className="h-[13px] cursor-pointer"
                  alt="header-invite"
                />
              </li>
              <li
                onClick={() => {
                  navigate(`/initializer/${project.projectId}`);
                }}
              >
                <img
                  src="/asset/header/header-download.svg"
                  className="h-[15px] cursor-pointer"
                  alt="header-link"
                />
              </li>
              <li onClick={toggleMode} className="cursor-pointer">
                {isTestMode ? (
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
                  className="h-4 cursor-pointer px-2"
                  alt="header-option"
                />
              </li>
            </ul>
          </>
          {/* ) : (
            <>
              <ul className="flex items-center space-x-2">
                <li>
                  <img
                    onClick={toggleHeaderLanguageModal}
                    src="/asset/header/header-language.svg"
                    className="h-4 cursor-pointer"
                    alt="header-language"
                  />
                </li>
              </ul>
            </>
          )} */}
          {showHeaderLanguageModal && (
            <div
              style={{
                position: "absolute",
                right: project ? "150px" : "12px",
                top: "30px",
              }}
              id="header-language-modal"
              className="z-20"
            >
              <HeaderLanguageModal
                setShowHeaderLanguageModal={setShowHeaderLanguageModal}
              />
            </div>
          )}
          {showHeaderProjectEditModal && (
            <div
              style={{ position: "absolute", right: "10px", top: "30px" }}
              id="header-option-modal"
              className="z-20"
            >
              <HeaderProjectEditModal
                setShowHeaderProjectEditModal={setShowHeaderProjectEditModal}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
