import React from "react";
import { useLocation } from "react-router-dom";
import ApiBox from "../components/ApiBox";
import ApiItems from "../components/ApiItems";

function UpdateHistory() {
  const location = useLocation();
  console.log("location state: ", location.state);
  const { message } = location.state || { message: "Default Message" };

  return (
    <div>
      <ApiBox></ApiBox>
      <ApiItems></ApiItems>
      {/*사이드바 */}
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
