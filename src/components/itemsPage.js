import React from "react";
import { Link } from "react-router-dom";
import { ShoppingContext } from "../App";
// import Item from "./item";

const ItemsPage = () => {
  const { items, handleCart } = React.useContext(ShoppingContext);

  return (
    <div className="px-6 sm:px-6 py-6 sm:py-6 grid grid-cols-1 gap-6 md:gap-6 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.id}>
          <Link to={`itemDetails/${item.id}`}>
            <div className="h-full max-w-sm mx-auto  hover:bg-gray-500 active:bg-gray-300  overflow-hidden rounded-lg p-1">
              <img
                src={item.url}
                className="object-cover object-center w-full h-48 rounded-lg shadow-md border"
                alt="json-photos"
              />
            </div>
          </Link>
          {/* <Item item={item}>
            <button
              id="active"
              onClick={() => handleCart(item)}
              className="text-sm text-gray-600 border-2 px-2 py-px hover:bg-gray-600 hover:border-transparent hover:text-white focus:outline-none rounded border-gray-600"
            >
              Add To Cart
            </button>
          </Item> */}
        </div>
      ))}
    </div>
  );
};

export default ItemsPage;
