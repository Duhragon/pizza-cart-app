import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../Services/apiRestaurant";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalPrice } from "../Cart/cartSlice";
import EmptyCart from "../Cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../Utilites/helpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationCrosshairs } from "@fortawesome/free-solid-svg-icons";
import { fetchAddress } from "../User/userSlice";
import Home from "../../UI/Home";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const {
    userName,
    address,
    position,
    status,
    error: addressError,
  } = useSelector((state) => state.user);
  const isLoading = status === "isloading";

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formError = useActionData();
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalPrice);
  const priorityPrice = totalPrice * 0.2 + totalPrice;
  const dispatch = useDispatch();

  if (!userName) return <Home />;
  if (!cart.length) return <EmptyCart />;

  return (
    // <div className="mx-auto px-4 py-6 md:flex md:flex-col md:items-center md:justify-center">
    <div className="mx-auto flex flex-col items-center justify-center px-4 py-6">
      <h2 className="mb-6 text-xl font-semibold sm:text-3xl">
        Ready to order? Let's go!
      </h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0 sm:text-lg md:text-xl">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input-ring grow"
            placeholder="fullname..."
            type="text"
            name="customer"
            defaultValue={userName}
            required
          />
        </div>

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0 sm:text-lg md:text-xl">
          <label className=" self-start sm:basis-40">Contact No</label>
          <div className="flex grow flex-col">
            <input
              placeholder="+91..."
              className="input-ring grow"
              type="tel"
              name="phone"
              required
            />
            {formError?.phone && (
              <p className="flex p-2 text-xs text-red-300 sm:justify-center">{`${formError.phone}`}</p>
            )}
          </div>
        </div>

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-0 sm:text-lg md:text-xl">
          <label className=" self-start sm:basis-40">Address</label>
          <div className="flex grow flex-col">
            <div className="flex grow">
              <input
                placeholder="address...."
                className="input-ring w-full rounded-r-none"
                type="text"
                name="address"
                required
                defaultValue={address}
              />

              {!position.latitude && !position.longitude && (
                <button
                  disabled={isLoading}
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                  className="bg rounded rounded-l-none bg-input-outline px-2 text-highlight-font"
                >
                  <FontAwesomeIcon icon={faLocationCrosshairs} />
                </button>
              )}
            </div>
            {status === "rejected" && (
              <p className="flex p-2 text-xs text-red-300 ">{`${addressError}`}</p>
            )}
          </div>
        </div>

        <div className="mb-8 flex items-center gap-4 ">
          <input
            className="h-5 w-5 accent-font-link
            focus:outline-none focus:ring-1 focus:ring-input-outline focus:ring-offset-2 focus:ring-offset-header-bg"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => {
              setWithPriority(e.target.checked);
            }}
          />
          <label className="font-medium sm:text-lg" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input
            className="input-ring"
            type="hidden"
            name="cart"
            value={JSON.stringify(cart)}
          />
          <input
            type="hidden"
            name="position"
            value={
              position.longitude && position.latitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />
          <button
            disabled={isSubmitting}
            className="button-style sm:px-3 sm:text-lg md:text-xl"
          >
            {isSubmitting
              ? "Placing order now"
              : `Order now ${formatCurrency(
                  withPriority ? priorityPrice : totalPrice,
                )}`}
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone = "Please provide a valid phone number.";
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
