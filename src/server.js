require("dotenv").config();
// const { connectToMongoDB } = require("./database/db");
const app = require("./app");

const PORT = process.env.PORT;

// connectToMongoDB();

app.listen(PORT, () => {
  console.log(`App is listening on localhost:${PORT}`);
});
