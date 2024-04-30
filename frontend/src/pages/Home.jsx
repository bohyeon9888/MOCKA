import React from "react";

function Home() {
  return (
    <div className="flex w-full ">
      <div className="ml-[60px] mr-[60px] mt-[60px] w-1/2 items-center justify-center p-4">
        <div className="">
          <h1 className="tracking-[-0.08em]">Mocka</h1>
          <h3 className="mt-3">
            Easily Create API Mockups and Servers from Documents.
          </h3>

          <div className="ml-3 mt-[50px] tracking-[-0.08em]">
            <h2>API Specification Writing</h2>
            <h3 className="ml-3 mt-3">
              Seamlessly draft API specifications within the platform.
            </h3>
            <h2 className="mt-10">Document-Based Mockup</h2>
            <h3 className="ml-3 mt-3">
              Automatically generate API mockups based on provided documents.
            </h3>
            <h2 className="mt-10">Basic Server Skeleton Generation</h2>
            <h3 className="ml-3 mt-3">
              Create a foundational structure for the server, including DTOs and
              controllers, tailored to the specified API.
            </h3>
            <h2 className="mt-10">Integrated Team Collaboration</h2>
            <h3 className="ml-3 mt-3">
              Provides team members collaboration between statements.
            </h3>
          </div>

          <div className="mt-7 flex justify-center">
            <button className="rounded-md bg-gray-500 px-6 py-3 font-bold text-white hover:bg-gray-600">
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div className="ml-[60px] mr-[60px] mt-[137px] w-1/2 p-4">미치겠네</div>
    </div>
  );
}

export default Home;
