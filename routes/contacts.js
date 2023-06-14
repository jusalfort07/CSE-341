const routes = require("express").Router();
const contactsController = require("../controllers/contacts");

routes.get("/", contactsController.getContacts);
routes.get("/:id", contactsController.getContact);
routes.post("/", contactsController.createContact);
routes.put("/:id", contactsController.updateContact);
routes.delete("/:id", contactsController.deleteContact);

module.exports = routes;
