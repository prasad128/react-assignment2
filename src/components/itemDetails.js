import React from "react";
import { ShoppingContext } from "../App";
import Item from "./item";
import { useHistory, useParams } from "react-router-dom";

const ItemsPage = () => {
  const { items, handleCart } = React.useContext(ShoppingContext);
  const { id } = useParams();
  const history = useHistory();
  const item = items[id];

  const handleClick = (item) => {
    handleCart(item);
    // const blog = { title, snippet, body };
    console.log(item);
    item = JSON.stringify(item);
    localStorage.setItem("Item", item);
    alert("Item added to the cart");
    history.push("/");
    console.log("Stored Item -", item);
  };

  return (
    <div className="mt-20">
      <Item item={item}>
        <button
          id="active"
          onClick={() => handleClick(item)}
          className="px-2 py-px text-sm text-gray-600 border-2 border-gray-600 rounded hover:bg-gray-600 hover:border-transparent hover:text-white focus:outline-none"
        >
          Add To Cart
        </button>
      </Item>
    </div>
  );
};

export default ItemsPage;
