import { Link } from "react-router-dom";
import LinkButton from "../../UI/LinkButton";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice, getUser } from "./cartSlice";
import { formatCurrency } from "../../Utilites/helpers";



function Cart() {
  const cart = useSelector(getCart);
  const userName = useSelector(getUser);
  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }

  const totalPrice = useSelector(getTotalPrice);

  return (
    <div className="mx-auto w-screen max-w-3xl px-2 pl-2 pr-4">
      {cart.length > 0 && (
        <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      )}

      <h2 className="mt-8 p-4 text-xl font-semibold md:text-2xl">
        Your cart{cart.length === 0 ? "'s empty, " : ", "}
        <span className="inline-block bg-input-outline p-2 font-extrabold uppercase text-highlight-font">
          {userName}
        </span>
      </h2>

      <ul>
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className="space-x-3">
        <Link
          to={`${cart.length === 0 ? "/menu" : "/order/new"}`}
          className="button-style p-2 text-sm sm:text-base"
        >
          {cart.length === 0 ? (
            <span>&larr; Add items</span>
          ) : (
            `Place order ${formatCurrency(totalPrice)}`
          )}
        </Link>

        {cart.length > 0 && (
          <button
            className="inline-block rounded border-2 border-outline p-2 text-sm font-semibold text-metal transition-colors duration-100 hover:bg-secondary-bg hover:text-font-dark focus:outline-none focus:ring-1 focus:ring-font-dark disabled:cursor-not-allowed sm:text-base"
            onClick={handleClearCart}
          >
            Clear cart
          </button>
        )}
      </div>
    </div>
  );
}

export default Cart;
