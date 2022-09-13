const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3300;
app.use(express.json());

app.use(require("./routes/users.route"));
app.use(require("./routes/books.route"));
app.use(require("./routes/genres.route"));
app.use(require("./routes/reviews.route"));

mongoose
  .connect(
    "mongodb+srv://soNomad:222888ma@cluster0.9v9d232.mongodb.net/test",
    {}
  )
  .then(() => console.log("Успешно соединились с сервером MongoDB"))
  .catch(() => console.log("Ошибка при соединении с сервером MongoDB"));

app.listen(PORT, () => {
  console.log("Порт запущен по адресу http://localhost:" + PORT);
});
