import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./UI/Home";
import Menu, { loader as menuLoader } from "./Features/Menu/Menu";
import Cart from "./Features/Cart/Cart";
import Order, { loader as orderLoader } from "./Features/Order/Order";
import CreateOrder, {
  action as createOrderAction,
} from "./Features/Order/CreateOrder";
import AppLayout from "./UI/AppLayout";
import Error from "../src/UI/Error";
import UserRouteGuard from "./UI/UserRouteGuard";
import { action as updateOrderPriority } from "../src/Features/Order/UpdatePriority";

const ProtectRoute = ({ component: Component, ...rest }) => (
  <UserRouteGuard>
    <Component {...rest} />
  </UserRouteGuard>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,

    children: [
      {
        path: "/",

        element: <Home />,
      },
      {
        path: "/menu",

        element: <ProtectRoute component={Menu} />,

        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <ProtectRoute component={Cart} />,
      },
      {
        path: "/order/:orderId",
        action: updateOrderPriority,
        element: <ProtectRoute component={Order} />,
        loader: orderLoader,
        errorElement: <Error />,
      },
      {
        path: "/order/new",
        element: <ProtectRoute component={CreateOrder} />,
        action: createOrderAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
