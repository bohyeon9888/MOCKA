export default function LoginModal() {
  const googleLogin = () => {
    location.href = `${import.meta.env.VITE_BASE_URL}oauth/redirect/google`;
  };

  return (
    <div className="space-y-[30px] px-10 pb-6">
      <div className="w-full text-center text-2 font-extrabold">Sign in</div>
      <div
        className="mt-[3px] flex h-[60px] w-[380px] cursor-pointer items-center justify-center space-x-[10px] rounded-full border-2 p-2 text-gray-500 duration-200 hover:border-gray-500 hover:text-gray-600"
        onClick={googleLogin}
      >
        <img className="size-[30px]" src="/asset/google.svg" />
        <div className="text-3 ">Sign in using Google</div>
      </div>
      <div className="text-center text-4 leading-normal text-gray-500">
        <div>nice to meet you!</div>
        <div>Please sign in to use our services</div>
      </div>
    </div>
  );
}
