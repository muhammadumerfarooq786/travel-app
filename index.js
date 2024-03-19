import express from "express";
import session from "express-session";
import connect from "./database/connect.js";
import { fileURLToPath } from "url";
import path from "path";
import travelRoutes from "./routes/travel_routes.js";

connect();

const app = express();
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(
  session({
    secret: "travel",
    resave: false,
    saveUninitialized: true,
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.set("views", path.join(__dirname, "views"));

app.use("/travel", travelRoutes);

app.get("/", async (req, res) => {
  try {
    const travelSession = req.session.traveluser;
    res.render("login", { travelSession });
  } catch (error) {
    console.error("Error fetching user session data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.redirect("/");
    } else {
      res.status(500).json({ error: "Error while destroying session" });
    }
  });
});

app.get("/signup", async (req, res) => {
  try {
    const travelSession = req.session.traveluser;
    res.render("signup", { travelSession });
  } catch (error) {
    console.error("Error fetching user session data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/homepage", async (req, res) => {
  try {
    const travelSession = req.session.traveluser;
    res.render("homepage", { travelSession });
  } catch (error) {
    console.error("Error fetching user session data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/new", async (req, res) => {
  try {
    const travelSession = req.session.traveluser;
    res.render("newplan", { travelSession });
  } catch (error) {
    console.error("Error fetching user session data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/action", async (req, res) => {
  try {
    const travelSession = req.session.traveluser;
    res.render("actions", { travelSession });
  } catch (error) {
    console.error("Error fetching user session data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/edit", async (req, res) => {
  try {
    const travelSession = req.session.traveluser;
    res.render("edit", { travelSession });
  } catch (error) {
    console.error("Error fetching user session data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/travel/create-session", (req, res) => {
  req.session.traveluser = req.body;
  res.sendStatus(200);
});

app.get("/", (req, res) => {
  console.log("App is running");
  res.send(`API is running`);
});

app.listen(3000, console.log("Server running on port 3000"));
