const connectDB = require("./config/dbConfig");
const app = require("./app");

//DB Connection
const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
