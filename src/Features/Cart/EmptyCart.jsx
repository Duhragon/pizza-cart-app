import LinkButton from "../../UI/LinkButton";

function EmptyCart() {
  return (
    <div>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="mt-8 p-4 text-xl font-semibold md:text-2xl">
        Your cart's empty !!
      </h2>
    </div>
  );
}

export default EmptyCart;
