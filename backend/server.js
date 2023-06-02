const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

const userRouter = require("./routes/userRoute");
const adminRouter = require("./routes/adminRoute");

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/user", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connect to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/api/users", userRouter);
app.use("/api/admin", adminRouter);

app.listen(4000, () => {
  console.log("server running on port 4000");
});
