import React from "react";
// import "./styles.css";
import Navbar from "./components/navbar";
import ItemsPage from "./components/itemsPage";
import ItemDetails from "./components/itemDetails";
import CartPage from "./components/cartPage";
import { Route, Switch, useLocation } from "react-router-dom";
import { items } from "./static-data";
import { useImmerReducer } from "use-immer";
// import { AnimatePresence } from "framer-motion";

export const ShoppingContext = React.createContext();
const appState = {
  cart: [],
};

const reducer = (draft, action) => {
  switch (action.type) {
    case "addToCart":
      return void draft.cart.push(action.payload);
    case "removeFromCart":
      return void draft.cart.splice(action.payload, 1);
    default:
  }
};

export default function App() {
  const [state, dispatch] = useImmerReducer(reducer, appState);
  const location = useLocation();
  const handleCart = (item) => {
    dispatch({
      type: "addToCart",
      payload: item,
    });
  };
  const handleRemove = (item) => {
    const index = state.cart.findIndex((i) => i.id === item.id);
    dispatch({
      type: "removeFromCart",
      payload: index,
    });
  };
  console.log(
    state.cart[state.cart.length - 1] && state.cart[state.cart.length - 1].price
  );
  return (
    <ShoppingContext.Provider
      value={{ appState, handleRemove, state, handleCart, items }}
    >
      <div className="container antialiased text-gray-900">
        <div className="max-w-2xl mx-auto">
          <Navbar />
          {/* <AnimatePresence exitBeforeEnter> */}
          <Switch location={location} key={location.key}>
            <Route path={"/"} exact>
              <ItemsPage />
            </Route>
            <Route path="/itemDetails/:id">
              <ItemDetails />
            </Route>
            <Route path={"/cart"}>
              <CartPage />
            </Route>
          </Switch>
          {/* </AnimatePresence> */}
        </div>
      </div>
    </ShoppingContext.Provider>
  );
}
