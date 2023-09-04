import { useDispatch } from "react-redux";
import { formatCurrency } from "../../Utilites/helpers";
import { deleteItem } from "./cartSlice";
import UpdateItemQty from "./UpdateItemQty";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(deleteItem(pizzaId));
  }

  return (
    <li className="my-2 rounded border border-outline bg-secondary-bg p-2 sm:flex sm:items-center sm:justify-between md:text-lg">
      <p className="pt-1 sm:pt-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-4">
        <p>{formatCurrency(totalPrice)}</p>
        <UpdateItemQty pizzaId={pizzaId} quantity={quantity} />
        <button
          className="button-style text-sm sm:text-base"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default CartItem;
