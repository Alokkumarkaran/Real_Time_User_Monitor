import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import h337 from "heatmap.js";

const socket = io("http://localhost:5000");

const Heatmap = () => {
  const heatmapRef = useRef(null);
  const heatmapInstance = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (heatmapRef.current) {
      heatmapInstance.current = h337.create({
        container: heatmapRef.current,
        radius: 30,
        maxOpacity: 0.6,
        minOpacity: 0.2,
        blur: 0.75,
      });
      console.log("✅ Heatmap initialized");
    }

    // Handle socket connection events
    socket.on("connect", () => {
      setConnected(true);
      console.log("🟢 WebSocket Connected");
    });
    socket.on("disconnect", () => {
      setConnected(false);
      console.log("🔴 WebSocket Disconnected");
    });

    // Handle incoming heatmap data
    socket.on("updateHeatmap", (data) => {
      console.log("🔥 Received Heatmap Data:", data);
      const { x, y, eventType } = data;

      if (eventType === "click" && typeof x === "number" && typeof y === "number") {
        heatmapInstance.current.addData({ x, y, value: 1 });
        console.log(`📍 Point added at x: ${x}, y: ${y}`);
      }
    });

    return () => {
      socket.off("updateHeatmap");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const handleClear = () => {
    heatmapInstance.current?.setData({ max: 1, data: [] });
    console.log("🧹 Heatmap cleared");
  };

  const handleDownload = () => {
    const canvas = heatmapRef.current?.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.download = "heatmap_snapshot.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
      console.log("📸 Heatmap downloaded");
    } else {
      console.error("❌ No canvas found for downloading heatmap.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🔥 User Heatmap</h1>
      <div className="flex gap-4 mb-4">
        <button
          onClick={handleClear}
          className="bg-red-500 text-white px-4 py-2 rounded"
          disabled={!connected}
        >
          🧹 Clear Heatmap
        </button>
        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={!connected}
        >
          📸 Download
        </button>
      </div>
      <div
        ref={heatmapRef}
        className="bg-gray-100 border shadow rounded"
        style={{ width: "100%", height: "90vh", position: "relative" }}
      ></div>
      {!connected && <p className="text-red-500">❌ WebSocket Disconnected. Waiting for connection...</p>}
    </div>
  );
};

export default Heatmap;
