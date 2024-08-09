const express = require("express");
const app = express();

const { quotes } = require("./data");
const { getRandomElement } = require("./utils");

const PORT = process.env.PORT || 4001;

app.use(express.static("public"));

const quotesRouter = express.Router();

app.use("/api/quotes", quotesRouter);

//Get random quote
quotesRouter.get("/random", (req, res, next) => {
  const randomQuote = getRandomElement(quotes);
  res.send({ quote: randomQuote });
});

//Get quote
quotesRouter.get("/", (req, res, next) => {
  if (req.query.person) {
    const filteredQuotes = quotes.filter(
      (quote) => quote["person"] === req.query.person
    );
    if (filteredQuotes.length > 0) {
      res.send({ quotes: filteredQuotes });
    } else {
      res.status(404).send();
    }
  } else {
    res.send({ quotes: quotes });
  }
});

quotesRouter.post("/", (req, res, next) => {
  const quote = req.query.quote;
  const person = req.query.person;
  if (quote && person) {
    const object = { quote, person };
    quotes.push(object);
    res.send({ quote: object });
  } else {
    res.status(400).send();
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
