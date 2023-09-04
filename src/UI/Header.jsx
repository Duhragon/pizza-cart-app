import { Link } from "react-router-dom";
import SearchOrder from "../Features/Order/SearchOrder";
import UserName from "../Features/User/UserName";

function Header() {
  return (
    <header className="flex items-center  justify-between bg-header-bg px-4 py-3 text-highlight-font sm:py-4  ">
      <Link
        to="/"
        className=" text-base font-semibold sm:text-lg sm:font-bold sm:tracking-widest  md:text-2xl"
      >
        React{" "}
        <span className="inline-block bg-input-outline p-2 font-extrabold uppercase text-highlight-font">
          Pizza
        </span>{" "}
        Cart
      </Link>
      <SearchOrder />
      <UserName />
      {/* <p className="text-font">Shubham</p> */}
    </header>
  );
}

export default Header;
