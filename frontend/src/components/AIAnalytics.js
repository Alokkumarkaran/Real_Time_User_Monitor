import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AIAnalytics = () => {
  const [interactionData, setInteractionData] = useState([]);
  const [summary, setSummary] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:5000/api/activity") // Adjust endpoint if needed
      .then((res) => res.json())
      .then((data) => {
        console.log("🔥 AI Analytics Data:", data);
        processAnalytics(data);
      })
      .catch((err) => console.error("❌ Error fetching AI data:", err));
  }, []);

  const processAnalytics = (data) => {
    const counts = {
      imageClicks: 0,
      addToCartClicks: 0,
      buyNowClicks: 0,
    };

    data.forEach((entry) => {
      if (entry.eventType === "click") {
        if (entry.element?.includes("Product Image")) counts.imageClicks++;
        if (entry.element?.includes("Add to Cart")) counts.addToCartClicks++;
        if (entry.element?.includes("Buy Now")) counts.buyNowClicks++;
      }
    });

    setInteractionData([
      { name: "Product Image", count: counts.imageClicks },
      { name: "Add to Cart", count: counts.addToCartClicks },
      { name: "Buy Now", count: counts.buyNowClicks },
    ]);

    if (counts.buyNowClicks > counts.addToCartClicks && counts.buyNowClicks > counts.imageClicks) {
      setSummary("🛍️ Users are mostly interested in buying directly!");
    } else if (counts.addToCartClicks > counts.imageClicks) {
      setSummary("🛒 Users are adding items to cart but not buying much.");
    } else {
      setSummary("🖼️ Users are exploring product images more.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🤖 AI Analytics</h1>
      <p className="text-lg mb-6">{summary}</p>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={interactionData} layout="vertical" margin={{ top: 20, right: 30, left: 100, bottom: 20 }}>
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AIAnalytics;
