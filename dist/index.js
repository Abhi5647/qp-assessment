"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
const admin_1 = __importDefault(require("./routes/admin"));
const user_1 = __importDefault(require("./routes/user"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Routes
app.use("/admin", admin_1.default);
app.use("/user", user_1.default);
// Sync Database
database_1.default
    .sync()
    .then(() => {
    console.log("Database synced!");
    app.listen(3000, () => console.log("Server running on port 3000"));
})
    .catch((err) => console.error("Error syncing database:", err));
