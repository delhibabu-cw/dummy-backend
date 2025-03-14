const express = require("express");
const cors = require("cors"); // ✅ Import CORS
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const route = require("./Router/router");

// ✅ Enable CORS
app.use(cors({
    origin: "*", // Allow all origins (change "*" to your frontend URL for better security)
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const DB_URL = "mongodb+srv://DelhiBabu:RLDB2003@cluster0.krbqv.mongodb.net/";

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to DB', DB_URL))
.catch((error) => {
    console.error(error);
    process.exit(1);
});

app.get("/", (req, res) => {
    res.json({ message: "Hello world From Backend" });
});

app.use("/", route);

app.listen(7172, () => {
    console.log("Server running on port 7172...");
});
