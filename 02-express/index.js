import express from "express";
import morgan from "morgan";
import logger from "./logger.js";

const app = express();
const port = 3000;

app.use(express.json()); // allow json data

const morganFormat = ":method :url :status :response-time ms";
//This line is defining a custom log format for Morgan, which is an HTTP request logger for Express.js. For example, GET /login 200 5.6 ms

//You are using Morgan to capture HTTP request logs and then sending those logs to your Winston logger instead of printing them directly to the console.

/*So the request log goes like this:
Morgan → format request → push result → Winston logger → save/log it*/

app.use(
  morgan(morganFormat, {
    stream: {
      //Morgan normally writes logs to the console. But you override this behavior by giving it your own stream. Every time Morgan generates a log line, it will call your write() function.
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
          //message.split(" ") turns the string into an array:
          /*
          {
            method: "GET",
            url: "/api",
            status: "200",
            responseTime: "3.92"
          }
          */
        };
        logger.info(JSON.stringify(logObject)); //You send the log object as a stringified JSON to your Winston logger.
      },
    },
  })
);

let teaData = [];
let nextid = 1;

//when we want to save the data in the database, post is the best. We can uae get as well, but post is much better

//adding tea
app.post("/teas", (req, res) => {
  logger.info("A post request was made to add a new tea!");
  const { name, price } = req.body;
  const newTea = { id: nextid++, name, price };
  teaData.push(newTea);
  res.status(201).send(newTea);
});

//getting all tea
app.get("/teas", (req, res) => {
  res.status(200).send(teaData);
});

//getting tea with ID
app.get("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id == parseInt(req.params.id));
  //whatever comes inside the url, we call it params and we can access it through that keyword. Whatever data comes params is a string and we have to parseInt it.
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  res.status(200).send(tea);
});

//update tea
app.put("/teas/:id", (req, res) => {
  const tea = teaData.find((t) => t.id == parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("Tea not found");
  }
  const { name, price } = req.body;
  tea.name = name;
  tea.price = price;
  res.status(200).send(tea);
});

//delete tea
app.delete("/teas/:id", (req, res) => {
  const index = teaData.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send("Tea not found");
  }
  teaData.splice(index, 1);
  res.status(200).send("Deleted");
});

app.listen(port, () => {
  console.log(`Server is running at port:${port}`);
});
