export default function Home() {
  const profile = JSON.parse(sessionStorage.profile);
  return (
    <>
      <div>로그인 성공</div>
      <div className="container flex flex-col items-center">
        <img className="size-10" src={profile.profile} />
        <div>{profile.nickname}</div>
      </div>
    </>
  );
}
