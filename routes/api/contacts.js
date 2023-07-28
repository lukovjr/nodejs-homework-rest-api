import express from "express";
import contactControllers from "../../controllers/contact-controller.js";
import contactsSchemas from "../../schemas/contacts-schemas.js";

import {validateBody, isValidId} from "../../decorators/index.js";
import authenticate from "../../middlewars/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.get('/', authenticate, contactControllers.getAll)

contactsRouter.get('/:id', authenticate, isValidId, contactControllers.getById)

contactsRouter.post('/', authenticate, validateBody(contactsSchemas.contactsAddSchema), contactControllers.add)

contactsRouter.delete('/:id', authenticate, isValidId, contactControllers.deleteById)

contactsRouter.put('/:id', authenticate, isValidId, validateBody(contactsSchemas.contactsAddSchema), contactControllers.updateById)

contactsRouter.patch('/:id/favorite', authenticate, isValidId, validateBody(contactsSchemas.updateFavoriteSchema), contactControllers.updateStatusContact)

export default contactsRouter;