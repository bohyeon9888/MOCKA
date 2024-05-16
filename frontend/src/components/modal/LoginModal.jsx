import { useLanguage } from "../../contexts/LanguageContext";

export default function LoginModal() {
  const { language } = useLanguage();

  const translations = {
    ko: {
      signIn: "로그인",
      signInWithGoogle: "Google로 로그인",
      niceToMeetYou: "만나서 반가워요!",
      signInMessage: "서비스를 이용하려면 로그인해주세요",
    },
    en: {
      signIn: "Sign in",
      signInWithGoogle: "Sign in using Google",
      niceToMeetYou: "Nice to meet you!",
      signInMessage: "Please sign in to use our services",
    },
  };

  const t = translations[language];

  const googleLogin = () => {
    location.href = `${import.meta.env.VITE_BASE_URL}oauth/redirect/google`;
  };

  return (
    <div className="space-y-[30px] px-10 pb-6">
      <div className="w-full text-center text-2 font-extrabold">{t.signIn}</div>
      <div
        className="mt-[3px] flex h-[60px] w-[380px] cursor-pointer items-center justify-center space-x-[10px] rounded-full border-2 p-2 text-gray-500 opacity-90 duration-300 hover:border-gray-700 hover:text-black hover:opacity-100"
        onClick={googleLogin}
      >
        <img className="size-[30px]" src="/asset/google.svg" />
        <div className="text-3">{t.signInWithGoogle}</div>
      </div>
      <div className="text-center text-4 leading-normal text-gray-500">
        <div>{t.niceToMeetYou}</div>
        <div>{t.signInMessage}</div>
      </div>
    </div>
  );
}
