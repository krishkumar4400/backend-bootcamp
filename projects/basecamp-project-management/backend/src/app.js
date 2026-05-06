import express from "express";
import cors from "cors";
import healthCheckRouter from "./routes/healthCheck.routes.js";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

const app = express();

// middlewares configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
// cors configurations
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  }),
);

app.get("/", (req, res) => {
  return res.send("Hello Express");
});

// import the routes
app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", userRouter);

export default app;
