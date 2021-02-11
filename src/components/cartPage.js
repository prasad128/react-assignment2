import React from "react";
import { ShoppingContext } from "../App";
import Item from "./item";
// import { motion } from "framer-motion";
import CountUp from "react-countup";

const CartPage = () => {
  const { state, handleRemove, handleCart } = React.useContext(ShoppingContext);

  const summarizedCart = (cart) => {
    const groupedItems = cart.reduce((summary, item) => {
      summary[item.id] = summary[item.id] || {
        ...item,
        count: 0,
      };
      summary[item.id].count++;
      return summary;
    }, {});
    return Object.values(groupedItems);
  };
  const items = summarizedCart(state.cart);
  const cartItems = items.map((item) => (
    <div key={item.id}>
      {
        <Item item={item}>
          <button
            onClick={() => handleRemove(item)}
            className="border px-2 focus:outline-none"
          >
            &ndash;
          </button>
          <span className="border px-3 py-1">{item.count}</span>
          <button
            onClick={() => handleCart(item)}
            className="border px-2 focus:outline-none"
          >
            +
          </button>
        </Item>
      }
    </div>
  ));

  const total = state.cart.reduce(
    (totalPrice, item) => totalPrice + item.price,
    0
  );

  const cartPageVariant = {
    hidden: {
      x: "100vw",
      // opacity: 0
    },
    visible: {
      x: 0,
      // opacity: 1
    },
    exit: {
      x: "-100vw",
      // opacity: 0
    },
  };

  const startTotal =
    total -
    (state.cart.length === 0
      ? total
      : state.cart[state.cart.length - 1] &&
        state.cart[state.cart.length - 1].price);
  console.log("Start", startTotal);

  return (
    // <div>CartPage</div>
    <div
      variants={cartPageVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div
        className={
          state.cart.length > 0
            ? "px-6 sm:px-6 py-6 sm:py-6 grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2"
            : ""
        }
      >
        {state.cart.length > 0 ? cartItems : <EmptyCart />}
      </div>

      {state.cart.length > 0 && (
        <div className="border-t-2 border-gray-400 text-right py-2 text-xl sm:text-2xl px-4 font-semibold text-gray-700">
          Total:{" "}
          <span>
            <CountUp start={startTotal} end={Math.round(total)} prefix="$" />
          </span>
        </div>
      )}
      {/* <div><CountUp>New Total</CountUp></div> */}
    </div>
  );
};

const EmptyCart = () => (
  <div className="px-4 text-center font-semibold text-gray-700 text-2xl md:text-3xl mt-6 sm:mt-8 md:mt-10">
    <h2>Your cart is empty.</h2>
    <h2>Why not add some expensive products to it.</h2>
  </div>
);

// const TotalDisplay = () => <div>Total</div>;

export default CartPage;
