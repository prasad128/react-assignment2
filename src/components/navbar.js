import React from "react";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import { ShoppingContext } from "../App";
// import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useParams } from "react-router-dom";

const Navbar = () => {
  const { state } = React.useContext(ShoppingContext);
  const [active, setActive] = React.useState("items");
  const { id } = useParams();
  const itemClass = (tabName) =>
    `${
      active === tabName
        ? `block text-gray-900 text-lg sm:text-xl font-medium hover:text-gray-600 border-b-4 px-2 tracking-wide border-gray-600 focus:outline-none`
        : "block text-gray-900 text-lg sm:text-xl font-medium hover:text-gray-600 px-2 border-b-4 border-transparent tracking-wide focus:outline-none"
    }`;
  const total = state.cart.reduce(
    (totalPrice, item) => totalPrice + item.price,
    0
  );

  const startTotal =
    total -
    (state.cart.length === 0
      ? total
      : state.cart[state.cart.length - 1] &&
        state.cart[state.cart.length - 1].price);
  console.log("Start", startTotal);
  return (
    <div className="z-10 sticky top-0 left-0 right-0 flex justify-between items-center border-b-2 border-gray-400 px-6 sm:px-6 py-2 sm:pt-4 md:pt-8 max-w-md mx-auto sm:max-w-4xl bg-white bg-opacity-100">
      <button onClick={() => setActive("items")} className={itemClass("items")}>
        <Link to="/">Items</Link>
      </button>
      <div className="text-gray-900 flex items-center sm:text-lg">
        <div className="mr-px">
          <MdShoppingCart className="" />
        </div>
        <div className="flex items-center">
          <div>{state.cart.length} items</div>
          <div className="ml-1">
            (<CountUp start={startTotal} end={Math.round(total)} prefix="$" />)
          </div>
        </div>
      </div>
      {/* <CountUp start={total} end={Math.round(total)}/> */}
      <button onClick={() => setActive("cart")} className={itemClass("cart")}>
        <Link to="/cart">Cart</Link>
      </button>
    </div>
  );
};

export default Navbar;

// hover:bg-gray-500 active:bg-gray-300  overflow-hidden rounded-lg p-1 w-full max
