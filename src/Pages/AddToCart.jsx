import React from "react";
import { useOrder } from "../Context/OrderContext";

const AddToCart = () => {
  const { orders, totalPrice } = useOrder();

  return (
    <div className="pt-24 px-6 max-w-4xl mx-auto ">
      <h2 className="text-3xl font-bold mb-6 text-cyan-700">Alaabada Aad Dalbatay</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600">Wax alaab ah lama dalban wali.</p>
      ) : (
        <div className="space-y-6">
          {/* Orders List */}
          <div className="bg-white rounded-xl shadow-md p-6">
            {orders.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-3 mb-3 last:border-b-0 last:pb-0 last:mb-0"
              >
                <div>
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-600">Cinwaan: {item.address}</p>
                  <p className="text-sm text-gray-600">Telefoon: {item.phone}</p>
                </div>
                <span className="font-semibold text-cyan-600">{item.price}</span>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-cyan-100 rounded-xl p-4 text-lg font-bold flex justify-between">
            <span>Wadarta Alaabta: {orders.length}</span>
            <span>Qiimaha Guud: ${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
