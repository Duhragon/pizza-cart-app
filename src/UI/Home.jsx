import CreateUser from "../Features/User/CreateUser";

function Home() {
  return (
    <div className=" mx-auto my-10 flex max-w-3xl flex-col items-center justify-around px-4 text-center font-semibold">
      <h1 className="space-y-2 text-right text-xl sm:text-2xl md:text-3xl">
        The best{" "}
        <span className="inline-block bg-input-outline p-2 font-extrabold uppercase text-highlight-font">
          pizza.
        </span>
        <br />
        Right out of the{" "}
        <span className="inline-block bg-input-outline p-2 font-extrabold uppercase text-highlight-font">
          oven.
        </span>
        <br />
        Straight to{" "}
        <span className="inline-block bg-input-outline p-2 font-extrabold uppercase text-highlight-font">
          you.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
