import { createContext, useState, useContext } from "react";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (item) => {
    setOrders((prev) => [...prev, item]);
  };

  const totalPrice = orders.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', ''));
    return total + price;
  }, 0);

  return (
    <OrderContext.Provider value={{ orders, addOrder, totalPrice }}>
      {children}
    </OrderContext.Provider>
  );
};
