import { useLocation } from "react-router-dom";

function UpdateHistory() {
  const location = useLocation();
  const { message } = location.state || { message: "Default Message" };

  return (
    <div>
      <div className="ml-[105px] mt-[132px] flex items-center">
        <a href="/">
          <img
            src="/asset/home/home-left-pointer.svg"
            className="mr-[30px] h-8 cursor-pointer"
            alt="home-left-pointer"
          />
        </a>
        <h1>{message}</h1>
      </div>
      <div className="ml-[155px] mt-[48px]">
        <h2 className="mb-[15px]">Basic Server Skeleton Generation</h2>
        <h3 className="">
          Create a foundational structure for the server, including DTOs and
          controllers, tailored to the specified API.
        </h3>
      </div>
    </div>
  );
}

export default UpdateHistory;
