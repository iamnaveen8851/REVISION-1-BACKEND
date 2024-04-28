const express = require("express");
const connectDb = require("./config/db");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
require("dotenv").config();

const app = express();
app.use(express.json())
app.use('/users', userRouter)
app.use('/products', productRouter)
const PORT = process.env.PORT || 8080;


app.get("/", (req, res) => {
  res.send("Welcome to the app.");
});

app.listen(PORT, async () => {
  try {
    await connectDb
    console.log(`Server is listening at ${PORT}`);
  } catch (error) {
    console.log(error);
  }
});
