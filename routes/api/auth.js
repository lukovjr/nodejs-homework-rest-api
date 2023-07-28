import express from 'express';
import authController from '../../controllers/auth-controller.js';
import usersSchemas from '../../schemas/users-schemas.js';

import { validateBody } from '../../decorators/index.js';
import { authenticate } from '../../middlewars/index.js';

const authRouter = express.Router();


authRouter.post("/register", validateBody(usersSchemas.authSchema), authController.register);

authRouter.post("/login", validateBody(usersSchemas.authSchema), authController.login);

authRouter.get("/current", authenticate, authController.getCurrent);

authRouter.post("/logout", authenticate, authController.logout);

authRouter.patch("/", authenticate, validateBody(usersSchemas.updateSubscriptionSchema), authController.updateSubscription);


export default authRouter;