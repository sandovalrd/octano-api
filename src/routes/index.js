import express from "express";
import players_routes from "./playerRoutes";
import moves_routes from "./moveRoutes";
import auth_routes from "./auth";
import games_routes from "./gameRoutes";

const app = express();

// Routes
app.use("/auth", auth_routes);
app.use("/players", players_routes);
app.use("/moves", moves_routes);
app.use("/games", games_routes);

export default app;
