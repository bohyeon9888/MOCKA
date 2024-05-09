import { useModalStore } from "../store";
import LoginModal from "../components/modal/LoginModal";

function Home() {
  const { openModal } = useModalStore();

  return (
    <div className="flex h-full w-full">
      <div className="flex w-1/2 items-center p-4">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div>
            <div className="ml-3 tracking-[-0.05em]">
              <h1 className="tracking-[-0.05em]">Mocka</h1>
              <h3 className="mt-3">
                Easily Create API Mockups and Servers from Documents.
              </h3>
            </div>
            <div className="ml-10 mt-[50px] tracking-[-0.05em]">
              <h2>API Specification Writing</h2>
              <div className="ml-3 mt-3 tracking-tight">
                Seamlessly draft API specifications within the platform.
              </div>
              <h2 className="mt-10">Document-Based Mockup</h2>
              <div className="ml-3 mt-3 tracking-tight">
                Automatically generate API mockups based on provided documents.
              </div>
              <h2 className="mt-10">Basic Server Skeleton Generation</h2>
              <div className="ml-3 mt-3 tracking-tight">
                Create a foundational structure for the server, including DTOs
                and controllers, tailored to the specified API.
              </div>
              <h2 className="mt-10">Integrated Team Collaboration</h2>
              <div className="ml-3 mt-3 tracking-tight">
                Provides team members collaboration between statements.
              </div>
            </div>
          </div>
          <div className="mt-7 flex justify-center">
            <button
              className="rounded-md bg-gray-500 px-6 py-3 font-bold text-white hover:bg-gray-600"
              onClick={() => {
                openModal("", <LoginModal />);
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
      <div className="flex w-1/2 items-center justify-center">
        <img
          src="/asset/home/home-introduce.svg"
          className="w-[430px]"
          alt="home-introduce"
        />
      </div>
    </div>
  );
}

export default Home;
