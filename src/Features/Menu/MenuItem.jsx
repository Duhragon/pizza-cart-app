import { formatCurrency } from "../../Utilites/helpers";
import LinkButton from "../../UI/LinkButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewItem,
  deleteItem,
  getIfIncludes,
  getPizzaQty,
  getQuantity,
} from "../Cart/cartSlice";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();

  const quantity = useSelector(getPizzaQty(id));

  const verify = useSelector(getIfIncludes(id));

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addNewItem(newItem));
  }

  function handleDelete() {
    dispatch(deleteItem(id));
  }

  return (
    <li className="relative my-2 flex gap-4 rounded  border border-outline bg-secondary-bg p-2">
      <img
        src={imageUrl}
        alt={name}
        className={`my-auto h-20 rounded sm:h-24 ${
          soldOut ? "opacity-30 grayscale" : ""
        }`}
      />
      <div className="flex grow flex-col pt-1">
        <p
          className={`text-sm font-bold sm:text-base ${
            soldOut ? "opacity-60" : ""
          }`}
        >
          {name}
        </p>
        <p
          className={`text-xs capitalize italic sm:text-sm ${
            soldOut ? "opacity-60" : ""
          }`}
        >
          {ingredients.join(", ")}
        </p>
        <div
          className={`mt-auto ${
            soldOut
              ? "absolute left-0.5 top-9 rotate-315 text-sm  font-bold uppercase text-red-400 sm:left-0 sm:top-10 sm:text-lg"
              : "flex items-center justify-between"
          } `}
        >
          {!soldOut ? <p>{formatCurrency(unitPrice)}</p> : <p>[Sold out]</p>}
          {!soldOut && (
            <>
              {" "}
              {quantity && (
                <span className="ml-auto pr-3 text-sm font-semibold text-font-dark">
                  x{quantity}
                </span>
              )}
              <button
                onClick={verify ? handleDelete : handleAddToCart}
                className={`${
                  verify
                    ? "inline-block rounded border text-font-dark  transition-colors duration-100 hover:bg-outline focus:outline-none  focus:ring-1 focus:ring-font-dark"
                    : "button-style"
                } mt-1 p-1 text-sm sm:mt-0 sm:p-2`}
              >
                {verify ? "Remove item" : "Add to cart"}
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
