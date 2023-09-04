import { Outlet, useNavigation, useSearchParams } from "react-router-dom";
import CartOverview from "../Features/Cart/CartOverview";
import Header from "./Header";
import Loader from "./Loader";
import { useSelector } from "react-redux";
import Home from "./Home";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto] ">
      {isLoading && <Loader />}

      <Header />
      {/* <div className=""> */}
      {/* <main className=" flex max-w-3xl overflow-auto"> */}
      <main className=" max-w-screen mx-2 flex overflow-auto">
        <Outlet />
      </main>
      {/* </div> */}

      <CartOverview />
    </div>
  );
}

export default AppLayout;
