import { useSelector } from "react-redux";
import LinkButton from "../../UI/LinkButton";

function EmptyCart() {
  // const userName = useSelector(userName);
  return (
    <div>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>
      <h2 className="mt-8 p-4 text-xl font-semibold md:text-2xl">
        Your cart's empty !!
        {/* <span className="inline-block bg-input-outline p-2 font-extrabold uppercase text-highlight-font">
          {userName}
        </span> */}
      </h2>
    </div>
  );
}

export default EmptyCart;
