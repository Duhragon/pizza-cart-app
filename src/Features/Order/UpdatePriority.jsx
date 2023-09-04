import { useFetcher } from "react-router-dom";
import { updateName } from "../User/userSlice";
import { updateOrder } from "../../Services/apiRestaurant";

function UpdatePriority({ order }) {
  const fetch = useFetcher();

  return (
    <fetch.Form method="PATCH">
      <button className="button-style  w-full">Prioritise</button>
    </fetch.Form>
  );
}

export default UpdatePriority;

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);

  return null;
}
