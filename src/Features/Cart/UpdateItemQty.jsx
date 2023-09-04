import { useDispatch } from "react-redux";
import { decreaseItemQty, increaseItemQty } from "./cartSlice";

function UpdateItemQty({ pizzaId, quantity }) {
  const dispatch = useDispatch();

  function handleIncrease() {
    dispatch(increaseItemQty(pizzaId));
  }
  function handleDecrease() {
    dispatch(decreaseItemQty(pizzaId));
  }

  return (
    <div className="ml-auto mr-3 sm:mr-0">
      <button
        onClick={handleDecrease}
        className={`${
          quantity === 0 ? "cursor-not-allowed" : ""
        } button-style mr-0.5 rounded-r-none text-sm sm:px-4 sm:text-base`}
      >
        -
      </button>
      <span className=" inline-block w-8 px-2 text-center sm:w-10">
        {quantity}
      </span>
      <button
        onClick={handleIncrease}
        className="button-style ml-0.5 rounded-l-none text-sm sm:px-4 sm:text-base "
      >
        +
      </button>
    </div>
  );
}

export default UpdateItemQty;
