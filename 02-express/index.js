import express from "express";

const app = express();
const port = 3000;

app.use(express.json()); // allow json data

let teaData = [];
let nextid = 1;

//when we want to save the data in the database, post is the best. We can uae get as well, but post is much better

//adding tea
app.post("/teas", (req, res) => {
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
