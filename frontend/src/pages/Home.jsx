export default function Home() {
  const profile = JSON.parse(sessionStorage.profile);
  return (
    <div className="container flex flex-col">
      <div>로그인 성공</div>
      <div>{profile.nickname}</div>
      <img src={profile.profile} />
    </div>
  );
}
