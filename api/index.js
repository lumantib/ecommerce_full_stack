const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const photoRoute = require("./routes/photo");
// const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const typeRoute = require("./routes/type");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const router = require("express").Router();

dotenv.config();

// mongoose
//     .connect(process.env.MONGO_URL)
mongoose.connect("mongodb://127.0.0.1:27017/shop", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("DB connection successful"))
    .catch((error) => {
        console.log(error)
    });

app.use(cors());

app.use(express.json());



app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/products", productRoute);
app.use("/photo", photoRoute);
// app.use("/carts", cartRoute);
app.use("/orders", orderRoute);
app.use("/type", typeRoute);
app.use("/checkout", stripeRoute);


app.listen(process.env.PORT || 5000, () => {
    console.log("backend server is runnning!");
});