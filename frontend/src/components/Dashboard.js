import React, { useEffect } from "react";
import io from "socket.io-client";
import alokImage from "./alok_sty.png";
import secondImage from "./alok_sty.png";
import thirdImage from "./alok_sty.png";

const socket = io("http://localhost:5000");

const Dashboard = () => {
  useEffect(() => {
    const handleClick = (e) => {
      const element = e.currentTarget.getAttribute("data-track");
      socket.emit("userActivity", {
        eventType: "click",
        element,
        x: e.clientX,
        y: e.clientY,
        timestamp: new Date(),
        userId: "user123",
      });
    };

    const elements = document.querySelectorAll("[data-track]");
    elements.forEach((el) => el.addEventListener("click", handleClick));

    return () => {
      elements.forEach((el) => el.removeEventListener("click", handleClick));
    };
  }, []);

  const products = [
    { id: 1, image: alokImage, name: "Product 1" },
    { id: 2, image: secondImage, name: "Product 2" },
    { id: 3, image: thirdImage, name: "Product 3" },
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <h1 className="text-2xl font-bold col-span-full">🛒 Product Page</h1>
      {products.map((product, index) => (
        <div key={index} className="border rounded-xl p-4 shadow-md w-full max-w-sm">
          <img
            src={product.image}
            alt={product.name}
            data-track={`Product Image ${product.id}`}
            className="w-full cursor-pointer"
          />
          <button
            data-track={`Add to Cart ${product.id}`}
            className="bg-blue-500 text-white px-4 py-2 m-2 w-full"
          >
            Add to Cart
          </button>
          <button
            data-track={`Buy Now ${product.id}`}
            className="bg-green-500 text-white px-4 py-2 m-2 w-full"
          >
            Buy Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
