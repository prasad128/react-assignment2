import React from "react";
// import { motion } from "framer-motion";
// import "../styles.css";
import { ShoppingContext } from "../App";

const Item = ({ item, children }) => {
  const { onRemoveOne, addToCart } = React.useContext(ShoppingContext);
  return (
    <div className="h-full max-w-sm mx-auto">
      <img
        src={item.url}
        className="object-cover object-center w-full h-48 rounded-lg shadow-md border"
        alt="json-photos"
      />
      <div className="relative px-4 -mt-12">
        <div className="px-4 pt-3 pb-3  rounded-lg shadow-lg border bg-white">
          <div className="text-gray-800 font-semibold text-lg">{item.name}</div>
          <div className="mt-1 text-base text-gray-900 leading-tight truncate">
            {item.description}
          </div>
          <div className="mt-6 flex justify-between items-center">
            <div className="text-gray-600 text-xl">${item.price}</div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
