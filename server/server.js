const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const vehiclesRouter = require("./routes/vehicles");
app.use("/api/vehicles", vehiclesRouter);

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
