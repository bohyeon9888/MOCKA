import React, { createContext, useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import updateQueryParam from "../utils/updateQueryParam";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialLanguage = searchParams.get("lang") || "ko"; // 기본 언어를 한국어로 설정
  const [language, setLanguage] = useState(initialLanguage);

  useEffect(() => {
    updateQueryParam({
      key: "lang",
      value: language,
      searchParams,
      setSearchParams,
    });
  }, [language, setSearchParams]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
