import { Router } from "express";

const classJSON = require("../data/class.json");

const classRoute = Router();

classRoute.get("/:id", (req, res) => {
 const { id } = req.params;
 const classFilter = classJSON.find(
  (classElement) => classElement.id.toString() === id
 );
 if (!classFilter) {
  res.send("Not exists this ID");
 } else {
  res.send(classFilter);
 }
});

export default classRoute;
