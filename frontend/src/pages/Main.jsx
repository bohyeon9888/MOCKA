export default function Main() {
  return (
    <div className="container h-screen">
      <a href="http://localhost:8081/api/oauth/redirect/google">로그인</a>
    </div>
  );
}

/**Home.jsx에 있던거 */

// import React from "react";
// import Method from "../components/Method.jsx";
// import NewController from "../components/button/NewController.jsx";
// import Button from "../components/button/Button.jsx";
// import Tab from "../components/Tab.jsx";
// import Project from "../components/button/Project.jsx";

// function Home() {
//   return (
//     <div className="flex w-full ">
//       <div className="ml-[60px] mr-[60px] mt-[60px] w-1/2 items-center justify-center p-4">
//         <div className="">
//           <h1 className="tracking-[-0.08em]">Mocka</h1>
//           <h3 className="mt-3">
//             Easily Create API Mockups and Servers from Documents.
//           </h3>

//           <div className="ml-3 mt-[50px] tracking-[-0.08em]">
//             <h2>API Specification Writing</h2>
//             <h3 className="ml-3 mt-3">
//               Seamlessly draft API specifications within the platform.
//             </h3>
//             <h2 className="mt-10">Document-Based Mockup</h2>
//             <h3 className="ml-3 mt-3">
//               Automatically generate API mockups based on provided documents.
//             </h3>
//             <h2 className="mt-10">Basic Server Skeleton Generation</h2>
//             <h3 className="ml-3 mt-3">
//               Create a foundational structure for the server, including DTOs and
//               controllers, tailored to the specified API.
//             </h3>
//             <h2 className="mt-10">Integrated Team Collaboration</h2>
//             <h3 className="ml-3 mt-3">
//               Provides team members collaboration between statements.
//             </h3>
//           </div>

//           <div className="mt-7 flex justify-center">
//             <button className="rounded-md bg-gray-500 px-6 py-3 font-bold text-white hover:bg-gray-600">
//               Get Started
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="ml-[60px] mr-[60px] mt-[10px] w-1/2 p-4">
//         <img
//           src="/public/asset/home/home-introduce.svg"
//           className="w-[430px]"
//           alt="home-introduce"
//         />
//       </div>

//       {/*컴포넌트 테스트*/}
//       {/* <Method type="PA"></Method> */}
//       {/* <NewController></NewController> */}
//       {/* <Button type="Generate"></Button> */}

//       {/* <Tab type="GET" isSelected="true" />
//       <Tab type="PATCH" isSelected="false" />
//       <Tab type="DELETE" /> */}
//     </div>
//   );
// }

// export default Home;
