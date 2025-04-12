const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const UserActivity = require("./models/UserActivity");
const adminRoutes = require("./routes/adminRoutes");
const activityRoutes = require("./routes/activityRoutes");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());
app.use("/api/activity", activityRoutes);
app.use("/api/admin", adminRoutes);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

io.on("connection", (socket) => {
  console.log("✅ User Connected:", socket.id);

  socket.on("userActivity", async (data) => {
    console.log("🔥 User Interaction:", data);
    try {
      const newActivity = new UserActivity(data);
      await newActivity.save();
      io.emit("updateAdminPanel", data);
      io.emit("updateHeatmap", data); // 👈 This line makes Heatmap work!
    } catch (error) {
      console.error("❌ Error saving activity:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ User Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
