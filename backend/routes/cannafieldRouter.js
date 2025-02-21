const {
  getAllCtrl,
  getCtrl,
  updateCtrl,
} = require("../controllers/Cannafield/cannafieldCtrl");

const cannafieldRouter = require("express").Router();
cannafieldRouter.get("/", getAllCtrl);
cannafieldRouter.post("/", getCtrl);
cannafieldRouter.post("/purcharge", updateCtrl);
module.exports = cannafieldRouter;
