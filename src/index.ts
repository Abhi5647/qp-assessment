import express from "express";
import sequelize from "./config/database";
import adminRoutes from "./routes/admin";
import userRoutes from "./routes/user";

const app = express();
app.use(express.json());

// Routes
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

// Sync Database
sequelize
  .sync()
  .then(() => {
    console.log("Database synced!");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.error("Error syncing database:", err));
