function App() {
  return (
    <div className="container m-4 flex flex-col text-xl font-bold">
      <div className="font-Pretendard">
        <span className="font-Fira">API</span> Colors
      </div>
      <div className="container mt-4 flex space-x-4">
        <div className="font-Akshar w-20 rounded-3xl bg-get-color p-2 text-center">
          GET
        </div>
        <div className="font-Akshar w-20 rounded-3xl bg-post-color p-2 text-center">
          POST
        </div>
        <div className="font-Akshar w-20 rounded-3xl bg-put-color p-2 text-center">
          PUT
        </div>
        <div className="font-Akshar w-20 rounded-3xl bg-delete-color p-2 text-center">
          DELETE
        </div>
        <div className="font-Akshar w-20 rounded-3xl bg-patch-color p-2 text-center">
          PATCH
        </div>
      </div>
      <div className="mt-4 flex flex-col space-y-3">
        <div className="font-Pretendard">Pretendard font</div>
        <h1>h1 Pretendard 40px Bold</h1>
        <h2>h2 Pretendard 24px SemiBold</h2>
        <h3>h3 Pretendard 20px SemiBold</h3>
        <h4>h4 Pretendard 15px Medium</h4>
        <h5>h5 Pretendard 12px Regular</h5>
      </div>
    </div>
  );
}

export default App;
