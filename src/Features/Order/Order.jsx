// Test ID: IIDSAT

// import { useParams } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { getMenu, getOrder } from "../../Services/apiRestaurant";
import OrderItem from "./OrderItem";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../Utilites/helpers";
import { useEffect, useState } from "react";
import UpdatePriority from "./UpdatePriority";
// import { useEffect, useState } from "react";

const order = {
  id: "ABCDEF",
  customer: "Jonas",
  phone: "123456789",
  address: "Arroios, Lisbon , Portugal",
  priority: true,
  estimatedDelivery: "2027-04-25T10:00:00",
  cart: [
    {
      pizzaId: 7,
      name: "Napoli",
      quantity: 3,
      unitPrice: 16,
      totalPrice: 48,
    },
    {
      pizzaId: 5,
      name: "Diavola",
      quantity: 2,
      unitPrice: 16,
      totalPrice: 32,
    },
    {
      pizzaId: 3,
      name: "Romana",
      quantity: 1,
      unitPrice: 15,
      totalPrice: 15,
    },
  ],
  position: "-9.000,38.000",
  orderPrice: 95,
  priorityPrice: 19,
};

function Order() {
  // const userName = useSelector
  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  const [fetch, setFetch] = useState([]);

  // useEffect(function () {
  //   if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
  // }, []);

  // const menus = await getMenu();
  // console.log(menus);
  // const [orderno, setOrderno] = useState(null);

  // const { orderId } = useParams();
  async function getMenuData() {
    const menuData = await getMenu();
    return setFetch(menuData);
  }

  useEffect(function () {
    if (fetch.length === 0) getMenuData();
  }, []);

  // useEffect(() => {
  //   async function fetchData() {
  //     const orderno = await getOrder(orderId);
  //     console.log(orderno);
  //     setOrderno(orderno);
  //   }
  //   fetchData();
  // }, [orderId]);
  // console.log(orderno);

  // if (!orderno) return;

  // const { id, status, priority, priorityPrice, orderPrice, estimatedDelivery, cart } = orderno;
  // const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    // <div className="mx-auto w-screen max-w-3xl  space-y-6 py-4 pl-2 pr-4">
    <div className="mx-auto flex w-screen max-w-3xl flex-col gap-6 py-4 pl-2 pr-4">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4">
        <h2 className="text-xl font-semibold ">Order #{id} status</h2>

        <div>
          {priority && (
            <span className=" font-bold uppercase tracking-widest text-red-400">
              Priority{" "}
            </span>
          )}
          <span className="font-bold uppercase tracking-widest text-green-400">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded border border-outline bg-secondary-bg px-4 py-6">
        <p className="text-lg font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-sm font-semibold text-font-dark">
          {" "}
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="flex flex-col gap-2" key={1}>
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            ingredients={
              fetch.find((el) => el.id === item.pizzaId)?.ingredients ?? []
            }
          />
        ))}
      </ul>

      {/* <div className="space-y-3 rounded border border-outline bg-secondary-bg px-4 py-6"> */}
      {/* <div className="mt-auto space-y-3 rounded border-8 border-dotted border-primary-bg bg-input-outline px-4 py-6"> */}
      <div className="mt-auto space-y-3 rounded bg-input-outline px-6 py-6  outline-dotted outline-[10px] outline-offset-[-6px] outline-primary-bg sm:outline-[13px] sm:outline-offset-[-7px]">
        <p className="font-semibold text-font-dark">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="font-semibold text-font-dark">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold sm:text-lg">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && <UpdatePriority order={order} />}
    </div>
  );
}

export async function loader({ params }) {
  const orderId = await getOrder(params.orderId);
  return orderId;
}

export default Order;
