import { Router } from "express";

const classJSON = require("../data/class.json")

const classRoute = Router()

classRoute.get("/", (req, res) => {
  res.send(classJSON)
})

export default classRoute