export default function LoginModal() {
  const googleLogin = () => {
    location.href = `${import.meta.env.VITE_BASE_URL}oauth/redirect/google`;
  };

  return (
    <div className="space-y-[30px] px-5">
      <div
        className="mt-[3px] flex h-[60px] w-[380px] cursor-pointer items-center justify-center space-x-[10px] rounded-full border-2 p-2"
        onClick={googleLogin}
      >
        <img className="size-[30px]" src="/asset/google.svg" />
        <div className="text-3 text-gray-500">Sign in using Google</div>
      </div>
      <div className="text-center text-4 leading-normal text-gray-500">
        <div>nice to meet you!</div>
        <div>Please sign in to use our services</div>
      </div>
    </div>
  );
}
