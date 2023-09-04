import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../Services/apiRestaurant";
import MenuItem from "../Menu/MenuItem";

export async function loader() {
  const menuData = await getMenu();
  return menuData;
}

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className="mx-auto max-w-2xl divide-outline pr-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export default Menu;
