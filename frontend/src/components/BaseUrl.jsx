function BaseUrl({ baseUrl, setBaseUrl }) {
  const handleSaveClick = () => {
    localStorage.setItem("baseUrl", baseUrl); // 로컬 스토리지에 저장 (확인용)
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(baseUrl);
  };

  return (
    <div className="relative flex h-[34px] w-[300px] items-center">
      <div className="absolute left-[8px] top-[-3px] z-10 bg-white px-[2px]">
        <p className="text-[8px] font-semibold">Base URL</p>
      </div>
      <div className="relative flex w-full items-center">
        <input
          type="text"
          value={baseUrl}
          onChange={(e) => setBaseUrl(e.target.value)}
          className="h-[34px] w-full truncate rounded-[6px] border-[1px] border-gray-500 pl-[10px] pr-[50px] text-[12px]"
          placeholder="Please enter the base url"
        />
        <div className="absolute right-[10px] flex">
          <div className="cursor-pointer" onClick={handleSaveClick}>
            <img
              src="/asset/tester/tester-save.svg"
              className="mr-[10px] h-3"
              alt="tester-save"
            />
          </div>
          <div className="cursor-pointer" onClick={handleCopyClick}>
            <img src="/asset/tester/tester-copy.svg" className="h-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BaseUrl;
