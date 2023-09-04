import { formatCurrency } from "../../Utilites/helpers";

function OrderItem({ item, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="space-y-2 rounded border border-outline bg-secondary-bg p-4">
      <div className="flex justify-between">
        <p className="text-sm sm:text-base">
          <span>{quantity}&times;</span> {name}
        </p>
        <p className="font-semibold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="capitalize italic text-font-dark">
        {ingredients.join(", ")}
      </p>
    </li>
  );
}

export default OrderItem;
