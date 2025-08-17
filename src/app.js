import express from "express";
import cors from "cors";
import overlayRoutes from "./routes/overlayRoutes.js";

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "https://staging.yourapp.com",
  "https://yourapp.com"
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("❌ Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/overlays", overlayRoutes);

export default app;
