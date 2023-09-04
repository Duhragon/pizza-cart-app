import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getTotalPrice, getTotalQuantity } from "./cartSlice";

function CartOverview() {
  const cart = useSelector((state) => state.cart.cart);
  const userName = useSelector((state) => state.user.userName);
  const quantity = useSelector(getTotalQuantity);
  const totalPrice = useSelector(getTotalPrice);

  const url =
    window.location.pathname === "/cart" ||
    window.location.pathname === "/order/new";

  // const quantity = cart.reduce((accV, prevV) => {
  //   return (accV += prevV.quantity);
  // }, 0);

  // const totalPrice = cart.reduce((accP, prevP) => {
  //   return (accP += prevP.totalPrice);
  // }, 0);

  return (
    <>
      {userName &&
        (cart.length === 0 ? (
          <div className=" mt-2 border-t border-outline">
            <p className="  bg-metal p-5  text-center font-semibold uppercase sm:text-lg md:text-xl">
              Your cart's empty!
            </p>
          </div>
        ) : (
          <div className=" mt-2 border-t border-outline">
            <div className=" mx-3 my-3 flex items-center justify-between rounded-md  border border-outline bg-secondary-bg px-2 py-2 text-sm uppercase sm:mx-4 sm:mb-4 sm:text-lg md:text-xl">
              <p
                className={`${
                  url ? "mx-auto py-2 sm:text-xl" : ""
                }  space-x-4 px-1  font-semibold  text-font-dark sm:space-x-6 sm:px-2`}
              >
                <span>
                  {`${quantity} ${quantity < 2 ? "pizza" : "pizzas"}`}:
                </span>
                <span>${totalPrice}</span>
              </p>
              {!url && (
                <Link
                  to="/cart"
                  // className="hover:bg-h-purple bg-purple border-outline focus:ring-font-dark  rounded border p-2 transition-colors duration-100 focus:outline-none focus:ring-1"
                  className="button-style md:text-xl"
                >
                  Open cart &rarr;
                </Link>
              )}
            </div>
          </div>
        ))}
    </>
  );
}

export default CartOverview;
